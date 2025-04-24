import { Stack, useLocalSearchParams } from 'expo-router';
import DetailScreen from '../screens/DetailScreen';

export default function Detail() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <DetailScreen itemId={itemId} />
    </>
  );
}