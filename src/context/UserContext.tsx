import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { fetchUser, User } from '../api/userApi';

interface UserContextType {
  user: User | undefined;
  isLoading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: user, isLoading, error } = useQuery<User, Error>('user', () => fetchUser(1), {
    staleTime: Infinity, // This will prevent refetching the data unless explicitly invalidated
  });

  return (
    <UserContext.Provider value={{ user, isLoading, error: error || null }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};