const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // In production, restrict this to your frontend URL
    methods: ['GET', 'POST'],
  },
});

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Track connected users and game rooms
const connectedUsers = new Map();
const gameRooms = new Map();

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Get user info from auth data
  const userId = socket.handshake.auth.userId;
  const username = socket.handshake.auth.username || 'Anonymous';
  
  // Store user connection
  connectedUsers.set(socket.id, { userId, username, socket });
  
  // Update online users count
  io.emit('online_users', connectedUsers.size);
  
  // Update user's online status in database
  if (userId) {
    updateUserStatus(userId, true);
  }

  // Handle joining a game room
  socket.on('join_room', async ({ roomId }) => {
    socket.join(roomId);
    console.log(`User ${username} joined room: ${roomId}`);
    
    // Initialize room if it doesn't exist
    if (!gameRooms.has(roomId)) {
      gameRooms.set(roomId, {
        players: [],
        spectators: [],
        gameState: null,
        messages: [],
      });
    }
    
    const room = gameRooms.get(roomId);
    
    // Add player or spectator
    if (room.players.length < 2) {
      room.players.push({
        id: socket.id,
        userId,
        username,
      });
      
      // Notify room that player joined
      io.to(roomId).emit('player_joined', {
        username,
        playerNumber: room.players.length,
      });
      
      // If we now have 2 players, start the game
      if (room.players.length === 2) {
        io.to(roomId).emit('game_start', {
          white: room.players[0].username,
          black: room.players[1].username,
          timestamp: new Date().toISOString(),
        });
      }
    } else {
      // Add as spectator
      room.spectators.push({
        id: socket.id,
        userId,
        username,
      });
      
      // Notify room that spectator joined
      io.to(roomId).emit('spectator_joined', { username });
    }
    
    // Send current game state to the new joiner
    if (room.gameState) {
      socket.emit('game_state', room.gameState);
    }
    
    // Send chat history to the new joiner
    if (room.messages.length > 0) {
      socket.emit('chat_history', room.messages);
    }
  });

  // Handle leaving a room
  socket.on('leave_room', ({ roomId }) => {
    socket.leave(roomId);
    console.log(`User ${username} left room: ${roomId}`);
    
    if (gameRooms.has(roomId)) {
      const room = gameRooms.get(roomId);
      
      // Remove player or spectator
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        io.to(roomId).emit('player_left', { username, playerNumber: playerIndex + 1 });
      } else {
        const spectatorIndex = room.spectators.findIndex(s => s.id === socket.id);
        if (spectatorIndex !== -1) {
          room.spectators.splice(spectatorIndex, 1);
          io.to(roomId).emit('spectator_left', { username });
        }
      }
      
      // If no players left, clean up the room
      if (room.players.length === 0 && room.spectators.length === 0) {
        gameRooms.delete(roomId);
      }
    }
  });

  // Handle chat messages
  socket.on('chat_message', ({ roomId, message, sender, timestamp }) => {
    const messageData = { sender, message, timestamp };
    
    // Store message in room history
    if (gameRooms.has(roomId)) {
      const room = gameRooms.get(roomId);
      room.messages.push(messageData);
      
      // Keep only last 100 messages
      if (room.messages.length > 100) {
        room.messages.shift();
      }
    }
    
    // Broadcast message to room
    io.to(roomId).emit('chat_message', messageData);
  });

  // Handle game moves
  socket.on('game_move', ({ roomId, move, player, timestamp }) => {
    if (!gameRooms.has(roomId)) return;
    
    const room = gameRooms.get(roomId);
    
    // Verify player is in the game
    const playerIndex = room.players.findIndex(p => p.id === socket.id);
    if (playerIndex === -1) return;
    
    // Update game state
    room.gameState = {
      ...room.gameState,
      lastMove: move,
      currentPlayer: playerIndex === 0 ? 1 : 0,
      timestamp,
    };
    
    // Broadcast move to room
    io.to(roomId).emit('game_move', {
      move,
      player,
      timestamp,
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    // Get user info before removing
    const user = connectedUsers.get(socket.id);
    
    // Remove user from connected users
    connectedUsers.delete(socket.id);
    
    // Update online users count
    io.emit('online_users', connectedUsers.size);
    
    // Update user's online status in database
    if (user && user.userId) {
      updateUserStatus(user.userId, false);
    }
    
    // Handle user leaving all rooms
    for (const [roomId, room] of gameRooms.entries()) {
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        io.to(roomId).emit('player_left', { 
          username: user ? user.username : 'Unknown', 
          playerNumber: playerIndex + 1 
        });
      } else {
        const spectatorIndex = room.spectators.findIndex(s => s.id === socket.id);
        if (spectatorIndex !== -1) {
          room.spectators.splice(spectatorIndex, 1);
          io.to(roomId).emit('spectator_left', { 
            username: user ? user.username : 'Unknown' 
          });
        }
      }
      
      // If no players left, clean up the room
      if (room.players.length === 0 && room.spectators.length === 0) {
        gameRooms.delete(roomId);
      }
    }
  });
});

// Update user's online status in Supabase
async function updateUserStatus(userId, isOnline) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        online_status: isOnline,
        last_seen: new Date().toISOString(),
      })
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user status:', error);
    }
  } catch (err) {
    console.error('Error updating user status:', err);
  }
}

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    connections: connectedUsers.size,
    rooms: gameRooms.size,
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
