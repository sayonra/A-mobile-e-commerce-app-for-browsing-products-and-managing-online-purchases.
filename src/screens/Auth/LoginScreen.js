import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearAuthError } from '../../store/slices/authSlice';
import { loginSchema, validateForm } from '../../utils/validation';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS } from '../../theme/colors';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.auth);
  const [values, setValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (key, val) => setValues((v) => ({ ...v, [key]: val }));

  const handleSubmit = async () => {
    dispatch(clearAuthError());
    const { valid, errors: validationErrors } = await validateForm(loginSchema, values);
    setErrors(validationErrors);
    if (!valid) return;
    dispatch(loginUser(values));
  };

  const fillDemo = () => {
    setValues({ username: 'mor_2314', password: '83r5^_' });
    setErrors({});
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue shopping</Text>

        <InputField
          label="Username"
          placeholder="Enter your username"
          autoCapitalize="none"
          value={values.username}
          onChangeText={(t) => handleChange('username', t)}
          error={errors.username}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={values.password}
          onChangeText={(t) => handleChange('password', t)}
          error={errors.password}
        />

        {error ? <Text style={styles.apiError}>{error}</Text> : null}

        <PrimaryButton title="Log In" onPress={handleSubmit} loading={status === 'loading'} />

        <TouchableOpacity onPress={fillDemo} style={styles.demoBtn}>
          <Text style={styles.demoText}>Use demo account (mor_2314)</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}> Sign up</Text>
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
  subtitle: { fontSize: 14, color: COLORS.gray700, marginBottom: 24, marginTop: 4 },
  apiError: { color: COLORS.danger, marginBottom: 12, textAlign: 'center' },
  demoBtn: { marginTop: 14, alignItems: 'center' },
  demoText: { color: COLORS.primary, fontWeight: '600', fontSize: 13 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: COLORS.gray700 },
  link: { color: COLORS.primary, fontWeight: '700' },
});
