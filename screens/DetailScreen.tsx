import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  Image,
  ImageStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { mockData } from '@/data/mockData';
import { colors, spacing, typography } from '@/styles/theme';

interface DetailScreenProps {
  itemId?: string;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ itemId = '' }) => {
  const router = useRouter();

  const item = useMemo(() => {
    return mockData.find(item => item.id === itemId);
  }, [itemId]);

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.errorText}>Item not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Replace placeholder with Image */}
        {item.imageUrl ? (
          <Image
            source={
              item.imageUrl.includes('glitch.png') ? require('../assets/images/glitch.png') :
              item.imageUrl.includes('Gameboy XL.png') ? require('../assets/images/Gameboy XL.png') :
              item.imageUrl.includes('RGB Glasses.png') ? require('../assets/images/RGB Glasses.png') :
              item.imageUrl.includes('image (1).png') ? require('../assets/images/image (1).png') :
              require('../assets/images/glitch.png') // fallback image
            }
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.categoryContainer}>
            <Icon name="label" size={14} color={colors.text.secondary} />
            <Text style={styles.category}>{item.category}</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Icon name="visibility" size={14} color={colors.text.secondary} />
              <Text style={styles.statText}>{item.views} views</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="favorite" size={14} color={colors.success} />
              <Text style={styles.statText}>{item.likes} likes</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: spacing.xl, // Added top padding to prevent overlap with topbar
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  } as ViewStyle,
  backButton: {
    padding: spacing.xs,
  } as ViewStyle,
  content: {
    flex: 1,
  } as ViewStyle,
  imagePlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: colors.surface,
  } as ViewStyle,
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  } as ImageStyle,
  infoContainer: {
    padding: spacing.md,
  } as ViewStyle,
  title: {
    // Apply heading typography
    ...typography.heading,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textTransform: 'lowercase', // Match app style
  } as TextStyle,
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  } as ViewStyle,
  category: {
    // Apply caption typography for consistency
    ...typography.caption,
    color: colors.text.secondary,
    textTransform: 'uppercase', // Match app style
  } as TextStyle,
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: spacing.sm,
  } as ViewStyle,
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  } as ViewStyle,
  statText: {
    // Apply stats typography for consistency
    ...typography.stats,
    color: colors.text.secondary,
  } as TextStyle,
  errorText: {
    // Apply body typography for error message
    ...typography.body,
    color: colors.error,
    marginLeft: spacing.md,
  } as TextStyle,
});

export default DetailScreen;