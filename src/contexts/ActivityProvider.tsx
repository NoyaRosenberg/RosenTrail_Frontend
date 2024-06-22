import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Activity } from '../services/activity.service'; // Adjust the path as necessary
import activityService from '../services/activity.service';

type ActivityContextType = {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  fetchActivities: (tripId: string) => void;
};

const ActivitiesContext = createContext<ActivityContextType | undefined>(undefined);

export const useActivities = (): ActivityContextType => {
  const context = useContext(ActivitiesContext);
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivitiesProvider');
  }
  return context;
};

type ActivityProviderProps = {
  children: ReactNode;
};

export const ActivityProvider: React.FC<ActivityProviderProps> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async (tripId: string) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedActivities = await activityService.getTripActivities(tripId);
      console.log('Fetched activities in provider:', fetchedActivities); // Add logging
      setActivities(fetchedActivities || []);
    } catch (err) {
      setError('Failed to fetch activities');
    } finally {
      setLoading(false);
      console.log('Loading state set to false'); // Add logging
    }
  }, []);

  return (
    <ActivitiesContext.Provider value={{ activities, loading, error, fetchActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
};