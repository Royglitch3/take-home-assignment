import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
  withSpring
} from 'react-native-reanimated';

import { SearchItem, mockData } from '@/data/mockData';
import { colors, spacing, typography } from '@/styles/theme';
import SearchBar from '@/components/SearchBar';

const SearchScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<SearchItem[]>([]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredData([]);
      return;
    }

    const filtered = mockData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setFilteredData([]);
  }, []);

  const handleItemPress = useCallback((item: SearchItem) => {
    router.push({ pathname: '/detail', params: { itemId: item.id } });
  }, [router]);

  const handleShowAllResults = useCallback(() => {
    router.push({ pathname: '/results', params: { query: searchQuery } });
  }, [router, searchQuery]);

  const renderHighlightedTitle = useCallback((title: string, query: string) => {
    if (!query) return <Text style={styles.suggestionTitle}>{title}</Text>;

    const lowerTitle = title.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerTitle.indexOf(lowerQuery);

    if (index === -1) return <Text style={styles.suggestionTitle}>{title}</Text>;

    return (
      <Text style={styles.suggestionTitle}>
        {title.slice(0, index)}
        <Text style={styles.highlightedText}>{title.slice(index, index + query.length)}</Text>
        {title.slice(index + query.length)}
      </Text>
    );
  }, []);

  const renderItem = useCallback(({ item, index }: { item: SearchItem; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      layout={Layout.springify()}
    >
      <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleItemPress(item)}
    >
      <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.searchIcon} />
      <View style={styles.suggestionContent}>
        {renderHighlightedTitle(item.title, searchQuery)}
        <View style={styles.categoryContainer}>
          <Text style={styles.suggestionCategory}>in {item.category}</Text>
          <Ionicons name="folder" size={16} color={colors.text.secondary} style={styles.categoryIcon} />
        </View>
      </View>
      <View style={styles.thumbnailPlaceholder} />
      </TouchableOpacity>
    </Animated.View>
  ), [handleItemPress, renderHighlightedTitle, searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={handleClearSearch}
      />
      
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={() => {
          if (!searchQuery) return null;

          if (filteredData.length > 0) {
            return (
              <Animated.View
                entering={FadeInUp.springify()}
                layout={Layout.springify()}
              >
                <TouchableOpacity
                style={styles.suggestionItem}
                onPress={handleShowAllResults}
              >
                <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.searchIcon} />
                <View style={styles.suggestionContent}>
                  <Text style={[styles.suggestionTitle, styles.showAllText]}>
                    <Text style={styles.dimmedText}>Show all results for </Text>
                    "{searchQuery}"
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={colors.text.secondary} />
                </TouchableOpacity>
              </Animated.View>
            );
          } else {
            // Show "No results found" when we have no matches
            return (
              <Animated.View
                entering={FadeInUp.springify()}
                layout={Layout.springify()}
              >
                <TouchableOpacity
                style={styles.suggestionItem}
              >
                <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.searchIcon} />
                <View style={styles.suggestionContent}>
                  <Text style={[styles.suggestionTitle, styles.showAllText]}>
                    <Text style={styles.dimmedText}>No results found for </Text>
                    "{searchQuery}"
                  </Text>
                </View>
                </TouchableOpacity>
              </Animated.View>
            );
          }
        }}
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
  list: {
    flex: 1,
  } as ViewStyle,
  listContent: {
    paddingHorizontal: spacing.md,
  } as ViewStyle,
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.xs,
    backgroundColor: colors.secondary,
    borderRadius: spacing.sm,
    elevation: 2,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  } as ViewStyle,
  thumbnailPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: colors.surface,
    borderRadius: 4,
  } as ViewStyle,
  searchIcon: {
    marginLeft: spacing.md,
  } as TextStyle,
  suggestionContent: {
    marginLeft: spacing.sm,
    flex: 1,
  } as ViewStyle,
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  categoryIcon: {
    marginLeft: spacing.xs,
  } as TextStyle,
  suggestionTitle: {
    color: colors.text.secondary, // Dimmed text color
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily,
    fontWeight: typography.body.fontWeight,
  } as TextStyle,
  highlightedText: {
    color: colors.text.primary, // Normal bright text color
  } as TextStyle,
  suggestionCategory: {
    color: colors.text.secondary,
    fontSize: typography.caption.fontSize,
    fontFamily: typography.caption.fontFamily,
    fontWeight: typography.caption.fontWeight,
    marginTop: spacing.xs,
  } as TextStyle,
  showAllText: {
    color: colors.accent,
    paddingVertical: spacing.xs,
  } as TextStyle,
  dimmedText: {
    color: colors.text.secondary,
  } as TextStyle,
});

export default SearchScreen;
