-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  rating INTEGER DEFAULT 1200,
  games_played INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  draws INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create discussions table
CREATE TABLE IF NOT EXISTS discussions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT TRUE,
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_end_date TIMESTAMP WITH TIME ZONE,
  participants_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create follows table
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- Create function to get trending tags
CREATE OR REPLACE FUNCTION get_trending_tags(limit_count INTEGER DEFAULT 4)
RETURNS TEXT[] AS $$
DECLARE
  result TEXT[];
BEGIN
  SELECT ARRAY_AGG(tag) INTO result
  FROM (
    SELECT UNNEST(tags) as tag, COUNT(*) as count
    FROM discussions
    WHERE created_at > NOW() - INTERVAL '7 days'
    GROUP BY tag
    ORDER BY count DESC
    LIMIT limit_count
  ) t;
  
  -- Return default tags if no trending tags found
  IF result IS NULL OR array_length(result, 1) = 0 THEN
    result := ARRAY['Openings', 'Tactics', 'Endgame', 'Analysis'];
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Set up Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Discussions policies
CREATE POLICY "Public discussions are viewable by everyone"
ON discussions FOR SELECT
USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own discussions"
ON discussions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own discussions"
ON discussions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own discussions"
ON discussions FOR DELETE
USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
ON notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON notifications FOR UPDATE
USING (auth.uid() = user_id);

-- Events policies
CREATE POLICY "Events are viewable by everyone"
ON events FOR SELECT
USING (true);

-- Follows policies
CREATE POLICY "Users can view follows"
ON follows FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own follows"
ON follows FOR INSERT
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete their own follows"
ON follows FOR DELETE
USING (auth.uid() = follower_id);
