import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import tripService, { Trip } from '../services/trip.service';

interface TripsContextProps {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}

const TripsContext = createContext<TripsContextProps | undefined>(undefined);

export const TripsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { authData, isLoggedIn } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      if (authData && isLoggedIn) {
          try {
            const fetchedTrips = await tripService.getUserTrips(authData.userId);
            if (fetchedTrips) {
              setTrips(fetchedTrips);
            }
          } catch (err) {
            setError('Failed to fetch trips');
          } finally {
            setLoading(false);
          }
      }
    };

    fetchTrips();
  }, [authData, isLoggedIn]);

  return (
    <TripsContext.Provider value={{ trips, loading, error }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = (): TripsContextProps => {
  const context = useContext(TripsContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return context;
};