import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../../components/PrimaryButton';
import { logout } from '../../store/slices/authSlice';
import { COLORS } from '../../theme/colors';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={40} color={COLORS.white} />
      </View>
      <Text style={styles.username}>{user?.username || 'Guest'}</Text>
      <Text style={styles.email}>{user?.email || '—'}</Text>
      {user?.isMockSession ? (
        <Text style={styles.mockNote}>This account is a local demo session (see API_SOURCES.md).</Text>
      ) : null}
      <PrimaryButton title="Log Out" onPress={() => dispatch(logout())} variant="outline" style={{ marginTop: 30 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 24, backgroundColor: COLORS.white },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  username: { fontSize: 18, fontWeight: '800', color: COLORS.black },
  email: { fontSize: 13, color: COLORS.gray700, marginTop: 4 },
  mockNote: { fontSize: 12, color: COLORS.gray700, textAlign: 'center', marginTop: 12, fontStyle: 'italic' },
});
