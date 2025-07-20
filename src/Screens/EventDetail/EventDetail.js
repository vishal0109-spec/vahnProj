import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEvents } from '../../context/EventsContext';



const { width, height } = Dimensions.get('window');

const EventDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { event: routeEvent } = route.params || {};
  
  const {
    toggleJoinEvent,
    getEventById,
    userLocation,
  } = useEvents();

  const event = getEventById(routeEvent?.id) || routeEvent;
  
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const joinButtonAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(joinButtonAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(joinButtonAnim, {
        toValue: 1,
        tension: 100,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [event?.isJoined, joinButtonAnim]);

  const handleJoinEvent = () => {
    if (!event) return;

    Animated.sequence([
      Animated.timing(joinButtonAnim, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(joinButtonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    toggleJoinEvent(event.id);

    const action = event.isJoined ? 'left' : 'joined';
    Alert.alert(
      'Success',
      `You have ${action} ${event.title}!`,
      [{ text: 'OK' }]
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };



  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1F1F1F" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <View style={styles.heroContainer}>
            <Image
              source={require('../../Assets/event.png')}
              style={styles.heroImage}
              resizeMode="cover"
              onLoad={() => setImageLoaded(true)}
            />
            
            <View style={styles.overlay}>
              <TouchableOpacity 
                style={styles.backIconButton}
                onPress={handleGoBack}
              >
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.mapIconButton}>
                <View style={styles.mapIcon}>
                  <Text style={styles.mapIconText}>🗺️</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.eventTitle}>{event.title}</Text>

            <Text style={styles.eventDescription}>{event.description}</Text>

            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>📅</Text>
                <Text style={styles.detailText}>
                  {new Date(event.startTime).toLocaleDateString('en-US', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🕐</Text>
                <Text style={styles.detailText}>
                  {new Date(event.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
              </View>

              {event.distance && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>📍</Text>
                  <Text style={styles.detailText}>
                    {event.distance < 1 ? `${Math.round(event.distance * 1000)}m` : `${event.distance}km`}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <Animated.View
          style={[
            styles.joinButtonContainer,
            {
              transform: [{ scale: joinButtonAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.joinButton,
              event.isJoined ? styles.joinButtonJoined : styles.joinButtonDefault,
            ]}
            onPress={handleJoinEvent}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.joinButtonText,
                event.isJoined ? styles.joinButtonTextJoined : styles.joinButtonTextDefault,
              ]}
            >
              {event.isJoined ? 'Leave Event' : 'Join'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    position: 'relative',
    height: 280,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backIconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mapIconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIconText: {
    fontSize: 16,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 12,
    lineHeight: 30,
  },
  eventDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 32,
  },
  detailsContainer: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
  },
  detailText: {
    fontSize: 16,
    color: '#1F1F1F',
    fontWeight: '500',
  },
  joinButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  joinButton: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonDefault: {
    backgroundColor: '#2196F3',
  },
  joinButtonJoined: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  joinButtonTextDefault: {
    color: '#FFFFFF',
  },
  joinButtonTextJoined: {
    color: '#4CAF50',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 18,
    color: '#1F1F1F',
    marginBottom: 24,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default EventDetail;