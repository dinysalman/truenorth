import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useTheme } from '@/lib/theme';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginBackground } from '@/components/auth/LoginBackground';
import { supabase } from '@/lib/supabase';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORM_MAX_WIDTH = 360;
const TABLET_BREAKPOINT = 768;
const TERMS_URL = 'https://example.com/terms';
const PRIVACY_URL = 'https://example.com/privacy';

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

function getPasswordRequirementErrors(password: string): string[] {
  const errors: string[] = [];
  if (!/[A-Za-z]/.test(password)) {
    errors.push('At least one letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('At least one number');
  }
  return errors;
}

function mapSignupError(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes('already') || normalized.includes('registered')) {
    return 'An account with this email already exists.';
  }
  if (normalized.includes('password')) {
    return 'Password does not meet the required strength.';
  }
  return 'Unable to create account. Please try again.';
}

/**
 * Signup screen.
 * Order: email, password, confirm password -> Create Account -> Log in -> Terms/Privacy.
 */
export default function SignupScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState<string | undefined>();
  const [passwordError, setPasswordError] = React.useState<string | undefined>();
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<string | undefined>();
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const validEmail = isValidEmail(email);
  const passwordErrors = getPasswordRequirementErrors(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const canSubmit = validEmail && passwordErrors.length === 0 && passwordsMatch && !loading;

  const handleEmailBlur = () => {
    if (email.trim().length === 0) {
      setEmailError(undefined);
      return;
    }
    setEmailError(validEmail ? undefined : 'Enter a valid email address');
  };

  const handlePasswordBlur = () => {
    setPasswordError(
      password.length === 0 || passwordErrors.length === 0
        ? undefined
        : 'Password does not meet requirements'
    );
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword.length === 0) {
      setConfirmPasswordError(undefined);
      return;
    }
    setConfirmPasswordError(passwordsMatch ? undefined : 'Passwords do not match');
  };

  const handleOpenLink = async (url: string) => {
    await Linking.openURL(url);
  };

  const handleCreateAccount = async () => {
    if (!canSubmit) return;

    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (signUpError) {
        setError(mapSignupError(signUpError.message));
        return;
      }

      setSuccessMessage('Check your email to confirm');
      setPassword('');
      setConfirmPassword('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }} edges={['top']}>
      <LoginBackground />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: isTablet ? 32 : 24,
            paddingBottom: 32,
          }}
          keyboardShouldPersistTaps="handled"
          accessibilityLabel="Signup form"
        >
          <View style={{ width: '100%', maxWidth: Math.min(FORM_MAX_WIDTH, width - 48) }}>
            <View style={{ marginBottom: 24, alignItems: 'center' }}>
              <Text style={{ color: colors.softMist, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 }}>
                Create account
              </Text>
              <Text style={{ color: colors.softMist, opacity: 0.9, fontSize: 14, marginTop: 4 }}>
                Start aligned, one step at a time.
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.surface,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingHorizontal: 24,
                paddingTop: 28,
                paddingBottom: 28,
                shadowColor: colors.deepNorthBlue,
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Input
                label="Email"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  setEmailError(undefined);
                  setError(null);
                  setSuccessMessage(null);
                }}
                onBlur={handleEmailBlur}
                placeholder="you@example.com"
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Email"
              />

              <Input
                label="Password"
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  setPasswordError(undefined);
                  setConfirmPasswordError(undefined);
                  setError(null);
                  setSuccessMessage(null);
                }}
                onBlur={handlePasswordBlur}
                placeholder="Create a password"
                secureTextEntry
                error={passwordError}
                autoCapitalize="none"
                accessibilityLabel="Password"
              />

              <View style={{ marginTop: -8, marginBottom: 12 }}>
                <Text style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 6 }}>
                  Password requirements:
                </Text>
                <Text style={{ fontSize: 12, color: password.length === 0 || passwordErrors.length === 0 ? colors.textSecondary : colors.priority1 }}>
                  {passwordErrors.length === 0 ? 'Meets requirements' : passwordErrors.join(', ')}
                </Text>
              </View>

              <Input
                label="Confirm password"
                value={confirmPassword}
                onChangeText={(t) => {
                  setConfirmPassword(t);
                  setConfirmPasswordError(undefined);
                  setError(null);
                  setSuccessMessage(null);
                }}
                onBlur={handleConfirmPasswordBlur}
                placeholder="Re-enter your password"
                secureTextEntry
                error={confirmPasswordError}
                autoCapitalize="none"
                accessibilityLabel="Confirm password"
              />

              {error ? (
                <View
                  style={{
                    marginTop: 8,
                    marginBottom: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.priority1,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '700', color: colors.priority1 }}>{error}</Text>
                </View>
              ) : null}

              {successMessage ? (
                <View
                  style={{
                    marginTop: 8,
                    marginBottom: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.evergreen,
                    borderRadius: 12,
                  }}
                  accessibilityLabel={successMessage}
                >
                  <Text style={{ fontSize: 12, fontWeight: '700', color: colors.evergreen }}>
                    {successMessage}
                  </Text>
                </View>
              ) : null}

              <Button
                title="Create Account"
                onPress={handleCreateAccount}
                variant="primary"
                disabled={!canSubmit}
                loading={loading}
                accessibilityLabel="Create account button"
                style={{ width: '100%', marginTop: 12, marginBottom: 20, borderRadius: 12 }}
              />

              <View
                style={{
                  marginTop: 8,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>Already have an account? </Text>
                <Link href="/(auth)/login">
                  <Text
                    style={{ fontSize: 14, fontWeight: '700', color: colors.deepNorthBlue }}
                    accessibilityRole="link"
                    accessibilityLabel="Log in"
                  >
                    Log in
                  </Text>
                </Link>
              </View>

              <View style={{ marginTop: 20, alignItems: 'center', paddingHorizontal: 8 }}>
                <Text style={{ fontSize: 11, color: colors.textMuted, textAlign: 'center', lineHeight: 16 }}>
                  By creating an account, you agree to our
                </Text>
                <View
                  style={{
                    marginTop: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  <Pressable
                    onPress={() => handleOpenLink(TERMS_URL)}
                    accessibilityRole="link"
                    accessibilityLabel="Terms of Service"
                    hitSlop={12}
                  >
                    <Text style={{ color: colors.northBlue, textDecorationLine: 'underline', fontSize: 11 }}>
                      Terms of Service
                    </Text>
                  </Pressable>
                  <Text style={{ fontSize: 11, color: colors.textMuted }}>and</Text>
                  <Pressable
                    onPress={() => handleOpenLink(PRIVACY_URL)}
                    accessibilityRole="link"
                    accessibilityLabel="Privacy Policy"
                    hitSlop={12}
                  >
                    <Text style={{ color: colors.northBlue, textDecorationLine: 'underline', fontSize: 11 }}>
                      Privacy Policy
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
