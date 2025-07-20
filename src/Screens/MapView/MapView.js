import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useEvents } from '../../context/EventsContext';
import ViewToggle from '../../Components/ViewToggle';


const { width, height } = Dimensions.get('window');

const MapViewScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const {
    events,
    loading,
    error,
    userLocation,
  } = useEvents();

  const [selectedEvent, setSelectedEvent] = useState(null);

  const defaultRegion = {
    latitude: 28.6129,
    longitude: 77.2295,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleToggleView = useCallback(() => {
    navigation.navigate('ListView');
  }, [navigation]);

  const handleEventPress = useCallback((event) => {
    navigation.navigate('EventDetail', { event });
  }, [navigation]);

  const handleMarkerPress = useCallback((event) => {
    setSelectedEvent(event);
    
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: event.location.latitude,
        longitude: event.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  }, []);

  const handleMapPress = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const fitToEvents = useCallback(() => {
    if (events.length > 0 && mapRef.current) {
      const coordinates = events.map(event => ({
        latitude: event.location.latitude,
        longitude: event.location.longitude,
      }));
      
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }
  }, [events]);

  const getMarkerColor = (event) => {
    return event.isJoined ? '#4CAF50' : '#2196F3';
  };

  const renderEventCallout = () => {
    if (!selectedEvent) return null;



    return (
      <View style={styles.calloutContainer}>
        <TouchableOpacity 
          style={styles.callout}
          onPress={() => handleEventPress(selectedEvent)}
          activeOpacity={0.8}
        >
          <Text style={styles.calloutTitle} numberOfLines={1}>
            {selectedEvent.title}
          </Text>
          <Text style={styles.calloutDescription} numberOfLines={2}>
            {selectedEvent.description}
          </Text>
          
          <View style={styles.calloutDetails}>
            <Text style={styles.calloutDate}>
              📅 {new Date(selectedEvent.startTime).toLocaleDateString()}
            </Text>
            {selectedEvent.distance && (
              <Text style={styles.calloutDistance}>
                📍 {selectedEvent.distance < 1 ? `${Math.round(selectedEvent.distance * 1000)}m` : `${selectedEvent.distance}km`}
              </Text>
            )}
          </View>
          
          {selectedEvent.isJoined && (
            <View style={styles.joinedBadge}>
              <Text style={styles.joinedText}>Joined</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => setSelectedEvent(null)}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2196F3" />
      <Text style={styles.loadingText}>Loading map...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Unable to load map</Text>
      <Text style={styles.errorDescription}>{error}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.header}>
          <Text style={styles.title}>Nearby Events</Text>
          <ViewToggle 
            isMapView={true} 
            onToggle={handleToggleView}
          />
        </View>
        {renderLoadingState()}
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.header}>
          <Text style={styles.title}>Nearby Events</Text>
          <ViewToggle 
            isMapView={true} 
            onToggle={handleToggleView}
          />
        </View>
        {renderErrorState()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Events</Text>
        <ViewToggle 
          isMapView={true} 
          onToggle={handleToggleView}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={defaultRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          onPress={handleMapPress}
          onMapReady={fitToEvents}
        >
          {events.map((event) => (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.location.latitude,
                longitude: event.location.longitude,
              }}
              pinColor={getMarkerColor(event)}
              onPress={(e) => {
                e.stopPropagation?.();
                handleMarkerPress(event);
              }}
            >
              <Callout tooltip={true}>
                <View style={{ width: 0, height: 0 }} />
              </Callout>
            </Marker>
          ))}
        </MapView>

        {events.length > 0 && (
          <TouchableOpacity 
            style={styles.fitButton}
            onPress={fitToEvents}
          >
            <Text style={styles.fitButtonText}>📍</Text>
          </TouchableOpacity>
        )}

        {renderEventCallout()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000000',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fitButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000000',
  },
  fitButtonText: {
    fontSize: 20,
  },
  calloutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    zIndex: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000000',
  },
  callout: {
    padding: 16,
  },
  calloutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  calloutDetails: {
    gap: 4,
  },
  calloutDate: {
    fontSize: 14,
    color: '#888888',
  },
  calloutDistance: {
    fontSize: 14,
    color: '#888888',
  },
  joinedBadge: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  joinedText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '400',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F44336',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default MapViewScreen;