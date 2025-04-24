import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing } from '../styles/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  style?: ViewStyle;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  style,
  showBackButton = false,
  onBackPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      {showBackButton && (
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.iconButton}
        >
          <Icon name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      )}
      
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search..."
        placeholderTextColor={colors.text.secondary}
        style={styles.input}
      />
      
      {value.length > 0 && (
        <TouchableOpacity
          onPress={onClear}
          style={styles.iconButton}
        >
          <Icon name="clear" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: spacing.sm,
    padding: spacing.xs,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  } as ViewStyle,
  input: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
    padding: spacing.sm,
  } as ViewStyle,
  iconButton: {
    padding: spacing.xs,
    marginHorizontal: spacing.xs,
  } as ViewStyle,
});

export default SearchBar;