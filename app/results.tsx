import { Stack, useLocalSearchParams } from 'expo-router';
import ResultsScreen from '../screens/ResultsScreen';

export default function Results() {
  const { query } = useLocalSearchParams<{ query: string }>();
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ResultsScreen />
    </>
  );
}