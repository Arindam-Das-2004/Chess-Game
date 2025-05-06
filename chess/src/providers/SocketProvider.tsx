import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthProvider';
import { toast } from 'sonner';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: number;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (roomId: string, message: string) => void;
  sendGameMove: (roomId: string, move: any) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const { user, profile } = useAuth();

  useEffect(() => {
    // Only connect to socket if user is authenticated
    if (!user) return;

    try {
      const socketUrl = import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:3001';

      // Create socket instance with error handling
      let socketInstance;
      try {
        socketInstance = io(socketUrl, {
          auth: {
            userId: user.id,
            username: profile?.username || 'Anonymous',
          },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          timeout: 5000, // 5 second timeout
        });
      } catch (error) {
        console.error('Error creating socket instance:', error);
        return; // Exit early if socket creation fails
      }

      // Set up event listeners
      socketInstance.on('connect', () => {
        setIsConnected(true);
        console.log('Socket connected');
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
        console.log('Socket disconnected');
      });

      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        // Only show toast once to avoid spamming the user
        if (isConnected) {
          toast.error('Failed to connect to game server. Real-time features will be limited.');
        }
        setIsConnected(false);
      });

      socketInstance.on('online_users', (count) => {
        setOnlineUsers(count);
      });

      socketInstance.on('notification', (data) => {
        toast(data.title, {
          description: data.message,
        });
      });

      setSocket(socketInstance);

      return () => {
        try {
          socketInstance.disconnect();
        } catch (error) {
          console.error('Error disconnecting socket:', error);
        }
      };
    } catch (error) {
      console.error('Error in socket effect:', error);
      // Set mock online users for development
      if (process.env.NODE_ENV !== 'production') {
        setOnlineUsers(42); // Mock value
      }
    }
  }, [user, profile, isConnected]);

  const joinRoom = (roomId: string) => {
    if (socket && isConnected) {
      socket.emit('join_room', { roomId });
    }
  };

  const leaveRoom = (roomId: string) => {
    if (socket && isConnected) {
      socket.emit('leave_room', { roomId });
    }
  };

  const sendMessage = (roomId: string, message: string) => {
    if (socket && isConnected) {
      socket.emit('chat_message', {
        roomId,
        message,
        sender: profile?.username || 'Anonymous',
        timestamp: new Date().toISOString(),
      });
    }
  };

  const sendGameMove = (roomId: string, move: any) => {
    if (socket && isConnected) {
      socket.emit('game_move', {
        roomId,
        move,
        player: profile?.username || 'Anonymous',
        timestamp: new Date().toISOString(),
      });
    }
  };

  const value = {
    socket,
    isConnected,
    onlineUsers,
    joinRoom,
    leaveRoom,
    sendMessage,
    sendGameMove,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
