import React, { useEffect, useState, useCallback } from 'react';
import Animated, {
  FadeInDown,
  Layout,
  withSpring
} from 'react-native-reanimated';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions,
  TextStyle,
  ViewStyle,
  Image,
  ImageStyle,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { SearchItem, mockData } from '@/data/mockData';
import { colors, spacing, typography } from '@/styles/theme';
import SearchBar from '@/components/SearchBar';

interface ResultsScreenProps {
  query?: string;
}

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const GRID_SPACING = spacing.md;
const ITEM_WIDTH = (width - (GRID_SPACING * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

const ResultsScreen: React.FC<ResultsScreenProps> = () => {
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query: string }>();
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [filteredData, setFilteredData] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    const filtered = mockData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery(''); // Clear the search query
    setFilteredData([]); // Clear the results
    router.back(); // Go back to search screen
  }, [router]);

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  const handleItemPress = useCallback((item: SearchItem) => {
    router.push({ pathname: '/detail', params: { itemId: item.id } });
  }, [router]);

  const renderItem = useCallback(({ item, index }: { item: SearchItem; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      layout={Layout.springify()}
    >
      <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handleItemPress(item)}
    >
      {/* Replace placeholder with Image, ensure require path is correct */}
      {item.imageUrl ? (
        // Assuming imageUrl is like 'assets/images/...' and '@/' maps to root
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
      <View style={styles.itemContent}>
        {/* Apply body typography */}
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            {/* Use outlined visibility icon and adjust size/color */}
            <Icon name="visibility" size={14} color={colors.text.secondary} />
            {/* Apply stats typography */}
            <Text style={styles.statText}>{item.views}</Text>
          </View>
          <View style={styles.statItem}>
            {/* Use filled favorite icon (heart) and adjust size/color */}
            <Icon name="favorite" size={14} color={colors.success} />
            {/* Apply stats typography */}
            <Text style={styles.statText}>{item.likes}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    </Animated.View>
  ), [handleItemPress]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={handleClearSearch}
        showBackButton
        onBackPress={handleBackPress}
      />

      <Animated.Text
        entering={FadeInDown.springify()}
        layout={Layout.springify()}
        style={styles.queryText}
      >
        "{searchQuery}"
      </Animated.Text>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item: SearchItem) => item.id}
        numColumns={COLUMN_COUNT}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: spacing.xl, // Added top padding to prevent overlap with topbar
  } as ViewStyle,
  fullScreen: {
    flex: 1,
  } as ViewStyle,
  list: {
    flex: 1,
    minHeight: 1, // Ensure list takes space even when empty
  } as ViewStyle,
  listContent: {
    padding: GRID_SPACING,
  } as ViewStyle,
  columnWrapper: {
    justifyContent: 'space-between',
  } as ViewStyle,
  gridItem: {
    width: ITEM_WIDTH,
    marginBottom: GRID_SPACING,
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  } as ViewStyle,
  imagePlaceholder: {
    width: '100%',
    height: ITEM_WIDTH * 0.75,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: spacing.sm,
    borderTopRightRadius: spacing.sm,
  } as ViewStyle,
  image: { // Style for the actual image
    width: '100%',
    height: ITEM_WIDTH * 0.75,
    resizeMode: 'cover',
    borderTopLeftRadius: spacing.sm,
    borderTopRightRadius: spacing.sm,
  } as ImageStyle,
  itemContent: {
    padding: spacing.sm,
  } as ViewStyle,
  itemTitle: {
    // Apply body typography
    ...typography.body,
    color: colors.text.primary, // Ensure color is set
    marginBottom: spacing.xs,
  } as TextStyle,
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space out stats
    marginTop: spacing.xs,
  } as ViewStyle,
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  } as ViewStyle,
  statText: {
    // Apply stats typography
    ...typography.stats,
    color: colors.text.secondary, // Ensure color is set
  } as TextStyle,
  queryText: {
    // Apply heading typography
    ...typography.heading,
    color: colors.text.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  } as TextStyle,
});

export default ResultsScreen;