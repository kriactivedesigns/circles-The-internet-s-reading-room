import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { ShelfCard } from '../../components/molecules/ShelfCard';

const { width } = Dimensions.get('window');

export const ShelfScreen: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={[styles.pageTitle, { color: colors.text.primary }]}>Your Shelf</Text>
        </View>

        {/* ── Category Filters ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ paddingRight: 40 }}>
           <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.primary.base }]}>
             <Text style={[styles.filterBtnText, { color: '#fff' }]}>All Items</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.filterBtn, styles.filterBtnOutline, { borderColor: colors.border.glass }]}>
             <Text style={[styles.filterBtnText, { color: colors.text.secondary }]}>Books</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.filterBtn, styles.filterBtnOutline, { borderColor: colors.border.glass }]}>
             <Text style={[styles.filterBtnText, { color: colors.text.secondary }]}>Articles</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.filterBtn, styles.filterBtnOutline, { borderColor: colors.border.glass }]}>
             <Text style={[styles.filterBtnText, { color: colors.text.secondary }]}>Saved Stages</Text>
           </TouchableOpacity>
        </ScrollView>

        <View style={styles.shelfBody}>
          <View style={styles.shelfGrid}>
            <ShelfCard type="book" title="The Great Good Place" subtitle="Ray Oldenburg" />
            <ShelfCard type="article" title="Defensive Design Patterns" subtitle="12 min read" />
          </View>
          
          <ShelfCard type="stage" title="State Management in 2026" subtitle="45 mins · Frontend Masters" />

          {/* Reading List Progress */}
          <View style={[styles.progressContainer, { borderColor: colors.border.glass, backgroundColor: colors.background.glass }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={[styles.progressLabel, { color: colors.text.primary }]}>Reading List</Text>
              <Text style={[styles.progressValue, { color: colors.text.muted }]}>3<Text style={{ fontSize: 9.5 }}> / 20</Text></Text>
            </View>
            <View style={[styles.progressBarBase, { backgroundColor: 'rgba(255,255,255,0.06)' }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary.base }]} />
            </View>
            <Text style={[styles.progressSubValue, { color: colors.text.muted }]}>Free plan - 17 slots remaining</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  titleSection: {
    padding: 20,
    paddingTop: 16, // Under header space
  },
  pageTitle: {
    fontFamily: typography.families.ui,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  filterScroll: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 10,
  },
  filterBtnOutline: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  filterBtnText: {
    fontFamily: typography.families.ui,
    fontSize: 10.5,
    fontWeight: '700',
  },
  shelfBody: {
    paddingHorizontal: 20,
  },
  shelfGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  progressContainer: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  progressLabel: {
    fontFamily: typography.families.ui,
    fontSize: 12,
    fontWeight: '700',
  },
  progressValue: {
    fontFamily: typography.families.ui,
    fontSize: 11,
    fontWeight: '600',
  },
  progressSubValue: {
    fontFamily: typography.families.ui,
    fontSize: 9.5,
    marginTop: 10,
  },
  progressBarBase: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progressBarFill: { width: '15%', height: '100%' },
});
