import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ViewToggle = ({ isMapView, onToggle }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, !isMapView && styles.activeLabel]}>List</Text>
      
      <TouchableOpacity 
        style={styles.toggleContainer} 
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <View style={[styles.track, isMapView && styles.mapTrack]}>
          <View 
            style={[
              styles.thumb,
              {
                transform: [{ translateX: isMapView ? 22 : 2 }],
              },
            ]} 
          />
        </View>
      </TouchableOpacity>
      
      <Text style={[styles.label, isMapView && styles.activeLabel]}>Map</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999999',
  },
  activeLabel: {
    color: '#000000',
  },
  toggleContainer: {
    width: 44,
    height: 24,
  },
  track: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  mapTrack: {
    backgroundColor: '#2196F3',
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    position: 'absolute',
  },
});

export default ViewToggle; 