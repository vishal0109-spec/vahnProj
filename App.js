import { View, Text } from 'react-native'
import React from 'react'
import Navigator from './src/Navigation/Navigator'
import { EventsProvider } from './src/context/EventsContext'
import ErrorBoundary from './src/Components/ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
      <EventsProvider>
        <Navigator />
      </EventsProvider>
    </ErrorBoundary>
  )
}

export default App