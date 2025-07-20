import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

const DEFAULT_LOCATION = {
  latitude: 28.6129,
  longitude: 77.2295
};

const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show nearby events.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    return true;
  };

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setError(err.message || 'Unable to get location');
        setLocation(DEFAULT_LOCATION);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  const watchPosition = () => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);
      },
      (err) => {
        console.warn('Watch position error:', err);
        setError(err.message || 'Unable to watch location');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
        distanceFilter: 100,
      }
    );

    return watchId;
  };

  useEffect(() => {
    let watchId = null;

    const initializeLocation = async () => {
      setLoading(true);
      
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by this device');
        setLocation(DEFAULT_LOCATION);
        setLoading(false);
        return;
      }

      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setError('Location permission denied');
        setLocation(DEFAULT_LOCATION);
        setLoading(false);
        return;
      }

      getCurrentPosition();

      watchId = watchPosition();
    };

    initializeLocation();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const refreshLocation = async () => {
    setLoading(true);
    setError(null);
    
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      getCurrentPosition();
    } else {
      setError('Location permission denied');
      setLocation(DEFAULT_LOCATION);
      setLoading(false);
    }
  };

  return {
    latitude: location?.latitude || DEFAULT_LOCATION.latitude,
    longitude: location?.longitude || DEFAULT_LOCATION.longitude,
    error,
    loading,
    refreshLocation,
    hasRealLocation: location !== null && !error
  };
};

export default useCurrentLocation; 