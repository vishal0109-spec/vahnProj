import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';


const { width } = Dimensions.get('window');

const EventCard = ({ event, onPress, userLocation }) => {
  const {
    title,
    description,
    startTime,
    location,
    distance,
    isJoined,
  } = event;



  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            {isJoined && (
              <View style={styles.joinedBadge}>
                <Text style={styles.joinedText}>Joined</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
          
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>📅</Text>
              <Text style={styles.detailText}>
                {new Date(startTime).toLocaleDateString()}
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000000',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
    flex: 1,
    marginRight: 8,
    lineHeight: 24,
  },
  joinedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  joinedText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  details: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 8,
    width: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },

});

export default EventCard; 