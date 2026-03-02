import * as React from 'react';
import { View, Text, ScrollView, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { useTheme } from '@/lib/theme';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginBackground } from '@/components/auth/LoginBackground';
import { GoogleLogo } from '@/components/icons/GoogleLogo';
import { AppleLogo } from '@/components/icons/AppleLogo';
import { supabase } from '@/lib/supabase';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

const FORM_MAX_WIDTH = 360;

/**
 * Login screen.
 * Order: email, password → Sign In → OR → Apple / Google → Sign up → Terms.
 */
export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [emailError, setEmailError] = React.useState<string | undefined>();

  const validEmail = isValidEmail(email);
  const validPassword = password.length >= 1;
  const canSubmit = validEmail && validPassword && !loading;

  const handleEmailBlur = () => {
    if (email.trim().length === 0) setEmailError(undefined);
    else setEmailError(validEmail ? undefined : 'Enter a valid email address');
  };

  const handleLogIn = async () => {
    if (!canSubmit) return;
    setError(null);
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      router.replace('/(tabs)');
    } catch (e) {
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
            paddingHorizontal: 24,
            paddingBottom: 32,
          }}
          keyboardShouldPersistTaps="handled"
          accessibilityLabel="Login form"
        >
          <View style={{ width: '100%', maxWidth: Math.min(FORM_MAX_WIDTH, width - 48) }}>
            {/* Hero */}
            <View style={{ marginBottom: 24, alignItems: 'center' }}>
              <Text style={{ color: colors.softMist, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 }}>
                TrueNorth
              </Text>
              <Text style={{ color: colors.softMist, opacity: 0.85, fontSize: 14, marginTop: 4 }}>
                Direction before speed.
              </Text>
            </View>

            {/* Form card */}
            <View
              style={{
                backgroundColor: colors.surface,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingHorizontal: 24,
                paddingTop: 28,
                paddingBottom: 28,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              {/* Email */}
              <Input
                label="Email"
                value={email}
                onChangeText={(t) => { setEmail(t); setEmailError(undefined); setError(null); }}
                onBlur={handleEmailBlur}
                placeholder="you@example.com"
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Email"
              />

              {/* Password + Forgot password */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Text style={{ fontSize: 10, fontWeight: '800', letterSpacing: 1, color: colors.textSecondary }}>
                  PASSWORD
                </Text>
                <Link href="/(auth)/forgot-password" hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
                  <Text
                    style={{ fontSize: 12, fontWeight: '700', color: colors.compassGold }}
                    accessibilityRole="link"
                    accessibilityLabel="Forgot password?"
                  >
                    Forgot password?
                  </Text>
                </Link>
              </View>
              <Input
                label=""
                value={password}
                onChangeText={(t) => { setPassword(t); setError(null); }}
                placeholder="••••••••"
                secureTextEntry
                accessibilityLabel="Password"
              />

              {error ? (
                <View
                  style={{
                    marginTop: 8,
                    marginBottom: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: '#FEF2F2',
                    borderWidth: 1,
                    borderColor: '#FECACA',
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '700', color: colors.priority1 }}>{error}</Text>
                </View>
              ) : null}

              {/* Sign In */}
              <Button
                title="Sign In"
                onPress={handleLogIn}
                variant="primary"
                disabled={!canSubmit}
                loading={loading}
                accessibilityLabel="Sign in"
                style={{ width: '100%', marginTop: 12, marginBottom: 20, borderRadius: 12 }}
              />

              {/* Divider */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: colors.textMuted + '40' }} />
                <Text style={{ fontSize: 10, fontWeight: '700', letterSpacing: 1, color: colors.textMuted, marginHorizontal: 12 }}>
                  OR
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: colors.textMuted + '40' }} />
              </View>

              {/* Apple (black) + Google (white) */}
              <View style={{ gap: 12 }}>
                <Button
                  title="Sign in with Apple"
                  onPress={() => {}}
                  variant="apple"
                  leftIcon={<AppleLogo size={20} color="#FFFFFF" />}
                  accessibilityLabel="Sign in with Apple"
                  style={{ width: '100%', borderRadius: 12 }}
                />
                <Button
                  title="Sign in with Google"
                  onPress={() => {}}
                  variant="google"
                  leftIcon={<GoogleLogo size={20} />}
                  accessibilityLabel="Sign in with Google"
                  style={{ width: '100%', borderRadius: 12 }}
                />
              </View>

              {/* No account? Sign up */}
              <View style={{ marginTop: 28, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>No account? </Text>
                <Link href="/(auth)/signup">
                  <Text
                    style={{ fontSize: 14, fontWeight: '700', color: colors.deepNorthBlue }}
                    accessibilityRole="link"
                    accessibilityLabel="Sign up"
                  >
                    Create one
                  </Text>
                </Link>
              </View>

              {/* Terms & Privacy */}
              <View style={{ marginTop: 20, alignItems: 'center', paddingHorizontal: 8 }}>
                <Text style={{ fontSize: 11, color: colors.textMuted, textAlign: 'center', lineHeight: 16 }}>
                  By signing in you agree to our{' '}
                  <Text
                    style={{ color: colors.northBlue, textDecorationLine: 'underline' }}
                    accessibilityRole="link"
                    onPress={() => {}}
                  >
                    Terms of Use
                  </Text>
                  {' '}and{' '}
                  <Text
                    style={{ color: colors.northBlue, textDecorationLine: 'underline' }}
                    accessibilityRole="link"
                    onPress={() => {}}
                  >
                    Privacy Policy
                  </Text>
                  .
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
