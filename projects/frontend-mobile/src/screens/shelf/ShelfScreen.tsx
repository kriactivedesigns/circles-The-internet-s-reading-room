import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { FeedCard } from '../../components/molecules/FeedCard';

const { width } = Dimensions.get('window');

const CollectionCard: React.FC<{ title: string, count: number, color: string }> = ({ title, count, color }) => {
  const { colors, isDark } = useTheme();

  return (
    <TouchableOpacity style={[styles.collectionCard, { backgroundColor: colors.background.glass, borderColor: colors.border.glass }]}>
      <View style={[styles.collectionIcon, { backgroundColor: color + '20' }]}>
         <View style={{ width: 12, height: 16, backgroundColor: color, borderRadius: 2 }} />
      </View>
      <View>
        <Text style={[styles.collectionTitle, { color: colors.text.primary }]}>{title}</Text>
        <Text style={[styles.collectionCount, { color: colors.text.muted }]}>{count} items</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ShelfScreen: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={[styles.pageTitle, { color: isDark ? '#fff' : '#05070A' }]}>Your Shelf</Text>
          {/* Progress Bar (Skill mockup 12) */}
          <View style={styles.progressContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={styles.progressLabel}>Reading List Progress</Text>
              <Text style={styles.progressValue}>3 / 20</Text>
            </View>
            <View style={[styles.progressBarBase, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary.base }]} />
            </View>
          </View>
        </View>

        {/* ── Category Filters ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
           <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.primary.base }]}><Text style={styles.filterBtnTextActive}>All Items</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.filterBtn, styles.filterBtnOutline, { borderColor: colors.border.glass }]}><Text style={styles.filterBtnText}>Books</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.filterBtn, styles.filterBtnOutline, { borderColor: colors.border.glass }]}><Text style={styles.filterBtnText}>Articles</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.filterBtn, styles.filterBtnOutline, { borderColor: colors.border.glass }]}><Text style={styles.filterBtnText}>Saved Stages</Text></TouchableOpacity>
        </ScrollView>

        <View style={styles.shelfGrid}>
           {/* Reusing FeedCard for consistency */}
          <View style={styles.gridItem}>
             <FeedCard 
               type="book" 
               title="The Great Good Place" 
               author="Ray Oldenburg" 
               description="Exploring the third place..."
             />
          </View>
          
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.primary.base }]}>Collections</Text>
            <TouchableOpacity><Text style={{ color: colors.primary.base, fontSize: 10, fontWeight: '700' }}>EDIT</Text></TouchableOpacity>
          </View>
          
          <View style={styles.collectionGrid}>
            <CollectionCard title="UX & Design" count={24} color="#5C94E9" />
            <CollectionCard title="Sociology" count={12} color="#10B981" />
            <CollectionCard title="Indie Hacking" count={8} color="#F59E0B" />
            <CollectionCard title="Daily Reads" count={45} color="#8B5CF6" />
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
    paddingTop: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  progressContainer: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  progressLabel: { fontSize: 11, fontWeight: '600' },
  progressValue: { fontSize: 11, fontWeight: '600' },
  progressBarBase: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progressBarFill: { width: '15%', height: '100%' },

  filterScroll: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  filterBtnOutline: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  filterBtnText: { fontSize: 10, fontWeight: '600' },
  filterBtnTextActive: { fontSize: 10, fontWeight: '700' },

  shelfGrid: {
    paddingHorizontal: 20,
  },
  gridItem: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  collectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  collectionCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },
  collectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  collectionCount: {
    fontSize: 9,
    marginTop: 2,
  },
});
