import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearAuthError } from '../../store/slices/authSlice';
import { registerSchema, validateForm } from '../../utils/validation';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS } from '../../theme/colors';

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.auth);
  const [values, setValues] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (key, val) => setValues((v) => ({ ...v, [key]: val }));

  const handleSubmit = async () => {
    dispatch(clearAuthError());
    const { valid, errors: validationErrors } = await validateForm(registerSchema, values);
    setErrors(validationErrors);
    if (!valid) return;
    dispatch(registerUser(values));
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to start shopping</Text>

        <InputField label="Username" placeholder="Choose a username" autoCapitalize="none" value={values.username} onChangeText={(t) => handleChange('username', t)} error={errors.username} />
        <InputField label="Email" placeholder="you@example.com" autoCapitalize="none" keyboardType="email-address" value={values.email} onChangeText={(t) => handleChange('email', t)} error={errors.email} />
        <InputField label="Password" placeholder="At least 6 characters" secureTextEntry value={values.password} onChangeText={(t) => handleChange('password', t)} error={errors.password} />
        <InputField label="Confirm Password" placeholder="Re-enter your password" secureTextEntry value={values.confirmPassword} onChangeText={(t) => handleChange('confirmPassword', t)} error={errors.confirmPassword} />

        <Text style={styles.note}>
          Note: this free demo API doesn't persist new accounts for real login, so signing up starts a local
          session on this device. See API_SOURCES.md for details.
        </Text>

        {error ? <Text style={styles.apiError}>{error}</Text> : null}

        <PrimaryButton title="Sign Up" onPress={handleSubmit} loading={status === 'loading'} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}> Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.white },
  container: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.black },
  subtitle: { fontSize: 14, color: COLORS.gray700, marginBottom: 16, marginTop: 4 },
  note: { fontSize: 12, color: COLORS.gray700, marginBottom: 16, fontStyle: 'italic' },
  apiError: { color: COLORS.danger, marginBottom: 12, textAlign: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: COLORS.gray700 },
  link: { color: COLORS.primary, fontWeight: '700' },
});
