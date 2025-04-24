import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

import SearchScreen from '../../screens/SearchScreen';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{
        headerShown: false
      }} />
      <SearchScreen />
    </>
  );
}

const styles = StyleSheet.create({});
