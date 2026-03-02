import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '@/lib/theme';
import { Eye, EyeOff } from 'lucide-react-native';

export interface InputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  accessibilityLabel?: string;
}

/**
 * Accessible text input with persistent label, optional error, and password show/hide toggle.
 * Uses theme tokens only.
 */
export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  accessibilityLabel = label,
  keyboardType,
  autoCapitalize,
  editable = true,
  ...rest
}: InputProps) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = secureTextEntry;
  const effectiveSecure = isPassword && !showPassword;

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text
          style={[styles.label, { color: error ? colors.priority1 : colors.textPrimary }]}
          numberOfLines={1}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.priority1 : colors.textMuted + '80',
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={effectiveSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          style={[styles.input, { color: colors.textPrimary }]}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={error ? error : undefined}
          {...rest}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword((s) => !s)}
            style={styles.eyeButton}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={20} color={colors.textSecondary} />
            ) : (
              <Eye size={20} color={colors.textSecondary} />
            )}
          </Pressable>
        )}
      </View>
      {error ? (
        <Text style={[styles.error, { color: colors.priority1 }]} numberOfLines={2}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingRight: 8,
  },
  eyeButton: {
    padding: 4,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});
