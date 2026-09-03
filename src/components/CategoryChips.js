import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function CategoryChips({ categories, selected, onSelect }) {
  const all = ['all', ...categories];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container} contentContainerStyle={{ paddingHorizontal: 12 }}>
      {all.map((cat) => {
        const active = cat === selected;
        return (
          <TouchableOpacity key={cat} style={[styles.chip, active ? styles.chipActive : null]} onPress={() => onSelect(cat)}>
            <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{cat === 'all' ? 'All' : cat}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { maxHeight: 44, marginBottom: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.gray100, marginRight: 8, borderWidth: 1, borderColor: COLORS.gray300 },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 13, color: COLORS.black, textTransform: 'capitalize' },
  chipTextActive: { color: COLORS.white, fontWeight: '700' },
});
