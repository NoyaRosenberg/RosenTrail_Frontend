import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useAuth } from "./AuthProvider";
import tripService, { Trip } from "../services/trip.service";

interface TripsContextProps {
  userTrips: Trip[];
  communityTrips: Trip[];
  loading: boolean;
  error: string | null;
  fetchUserTrips: () => void;
  fetchCommunityTrips: () => void;
  updateTrip: (trip: Trip) => Promise<Trip | undefined>;
}

const TripsContext = createContext<TripsContextProps | undefined>(undefined);

export const TripsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { authData, isLoggedIn } = useAuth();
  const [userTrips, setUserTrips] = useState<Trip[]>([]);
  const [communityTrips, setCommunityTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunityTrips = async () => {
    setLoading(true);

    try {
      const fetchedTrips = await tripService.getCommunityTrips();
      setCommunityTrips(fetchedTrips || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch trips");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTrips = async () => {
    if (authData && isLoggedIn) {
      setLoading(true);
      try {
        const fetchedTrips = await tripService.getUserTrips(authData.userId);
        setUserTrips(fetchedTrips || []); 
        setError(null);
      } catch (err) {
        setError("Failed to fetch trips");
      } finally {
        setLoading(false);
      }
    }
  };

  const updateTrip = async (trip: Trip) => {
    try {
      const updatedTrip = await tripService.updateTrip(trip);
      fetchUserTrips();
      setError(null);

      return updatedTrip;
    } catch (err) {
      setError("Failed to update trip");
    }
  };

  useEffect(() => {
    fetchUserTrips();
  }, [authData, isLoggedIn]);

  return (
    <TripsContext.Provider
      value={{ userTrips, communityTrips, loading, error, fetchUserTrips,fetchCommunityTrips, updateTrip }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = (): TripsContextProps => {
  const context = useContext(TripsContext);
  if (!context) {
    throw new Error("useTrips must be used within a TripsProvider");
  }

  return context;
};
