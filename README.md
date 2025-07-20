# Nearby Events - React Native App

A cross-platform React Native application that allows users to browse and join community events around them. The app features both list and map views, event details with animations, and a complete state management system.

## Features

### Core Functionality
- 📱 **Cross-platform**: Runs on both iOS and Android
- 📍 **Location-based**: Shows events based on user's current location
- 🗺️ **Dual Views**: Toggle between List and Map views
- 🎯 **Event Details**: Detailed view with animations and join functionality
- 🔄 **State Management**: React Context + custom hooks
- 🎨 **Material Design**: Beautiful UI with Material Design principles

### Technical Features
- **JSDoc Documentation**: Fully documented event models using JSDoc
- **Custom Hooks**: `useCurrentLocation()` for geolocation
- **Performance Optimized**: React.memo, optimized FlatList, lazy loading
- **Animations**: Smooth transitions using React Native Animated API
- **Error Handling**: Comprehensive error boundaries and states
- **Offline Support**: Mock API with local data

## Project Structure

```
src/
├── api/                    # Mock API layer
│   └── eventsApi.js       # Events data and API functions
├── Components/            # Reusable UI components
│   ├── CustomButton.js    # Custom button component
│   ├── EventCard.js       # Event card for list view
│   ├── ViewToggle.js      # List/Map toggle switch
│   ├── LoadingSpinner.js  # Animated loading indicator
│   └── ErrorBoundary.js   # Error boundary component
├── context/               # React Context for state management
│   └── EventsContext.js   # Events context and provider
├── hooks/                 # Custom React hooks
│   └── useCurrentLocation.js # Geolocation hook
├── Navigation/            # Navigation configuration
│   └── Navigator.js       # Stack navigator setup
├── Screens/               # Screen components
│   ├── ListView/          # List view of events
│   ├── MapView/           # Map view with pins
│   └── EventDetail/       # Event detail screen
├── types/                 # JavaScript type definitions (JSDoc)
│   ├── eventTypes.js      # Event model type definitions
│   └── navigationTypes.js # Navigation type definitions
└── Utils/                 # Utility functions
    
    ├── constants.js       # App constants and styles
    └── img.js             # Image utilities
```

## Technologies Used

- **React Native**: Core framework
- **React Navigation**: Navigation system
- **React Native Maps**: Map integration
- **JSDoc**: Type documentation for models
- **React Context**: State management
- **Animated API**: Smooth animations
- **Geolocation**: Location services

## Key Components

### Event Model (JSDoc)
```javascript
/**
 * @typedef {Object} EventDTO
 * @property {string} id - Unique identifier
 * @property {string} title - Short title of the event
 * @property {string} description - Full description
 * @property {string} startTime - ISO-8601 timestamp for start
 * @property {string} endTime - ISO-8601 timestamp for end
 * @property {Object} location - Event location coordinates
 * @property {number} location.latitude - Latitude coordinate
 * @property {number} location.longitude - Longitude coordinate
 * @property {boolean} [isJoined] - RSVP status for current user
 * @property {string} [imageUrl] - Optional event image URL
 */
```

### Custom Hooks

#### useCurrentLocation()
- Handles device geolocation
- Requests permissions appropriately
- Provides fallback location
- Returns: `{ latitude, longitude, error, loading }`

#### useEvents() (Context Hook)
- Manages events state
- Handles join/leave functionality
- Provides sorting utilities
- Calculates distances

### Performance Optimizations

1. **React.memo**: Components memoized to prevent unnecessary re-renders
2. **FlatList Optimization**: 
   - `getItemLayout` for better scrolling
   - `removeClippedSubviews` for memory efficiency
   - Controlled render batching
3. **Animation**: Native driver usage for 60fps animations
4. **Image Caching**: Proper image loading and caching
5. **Lazy Loading**: Components loaded on demand

## UI/UX Features

### Material Design Elements
- Card-based layout with proper shadows
- Consistent color scheme and typography
- Touch feedback with `activeOpacity`
- Proper spacing and visual hierarchy

### Animations
- **Screen Transitions**: Smooth navigation animations
- **Join Button**: Scale and fade animations on state change
- **Loading States**: Animated spinners and skeletons
- **Pull to Refresh**: Native refresh indicators

### Responsive Design
- Adapts to different screen sizes
- Proper safe area handling
- Optimized for both orientations

## Getting Started

### Prerequisites
- Node.js (>= 18)
- React Native CLI
- Android Studio / Xcode
- Android SDK / iOS SDK

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vahnProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npx react-native start
   ```

5. **Run the app**
   ```bash
   # For Android
   npx react-native run-android
   
   # For iOS
   npx react-native run-ios
   ```

### Development Commands

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run tests
npm test

# Lint code
npm run lint
```

## Mock Data

The app includes 20 mock events with:
- Diverse event types (marathons, markets, concerts, etc.)
- Realistic Indian city coordinates (Delhi, Jaipur, Mumbai, Bangalore, etc.)
- Cultural events adapted for Indian context
- Varied dates and times

## State Management Architecture

```
EventsProvider (Context)
├── Events data
├── Join/leave functionality
├── Location-based sorting
├── Distance calculations
└── Loading/error states
```

## Navigation Flow

```
ListView ←→ MapView
    ↓
EventDetail (Modal)
```

## Error Handling

- **Network errors**: Graceful fallbacks
- **Location permissions**: Default location provided
- **JavaScript errors**: Error boundary catches crashes
- **Loading states**: Proper loading indicators
- **Empty states**: Informative empty state messages

## Performance Considerations

1. **Memory Management**: Proper cleanup of listeners and animations
2. **Bundle Size**: Minimal dependencies, tree-shaking enabled
3. **Render Optimization**: Memoization and efficient re-renders
4. **Image Optimization**: Lazy loading and caching
5. **Map Performance**: Marker clustering for large datasets

## Testing Strategy

- Unit tests for utility functions
- Integration tests for context providers
- Component tests for UI elements
- E2E tests for critical user flows

## Future Enhancements

1. **Real API Integration**: Replace mock API with real backend
2. **Offline Support**: Cache events for offline viewing
3. **Push Notifications**: Event reminders and updates
4. **Social Features**: User profiles and event sharing
5. **Advanced Filtering**: Date, category, and distance filters
6. **Calendar Integration**: Add events to device calendar

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

Built with ❤️ using React Native and modern development practices.
