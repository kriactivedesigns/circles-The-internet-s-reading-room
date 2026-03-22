import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { Colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { FeedCard } from '../../components/molecules/FeedCard';

export const FeedWallScreen: React.FC<{ route: any }> = ({ route }) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors);
  const scrollY = route.params?.scrollY;

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (scrollY) {
        scrollY.value = event.contentOffset.y;
      }
    },
  });

  return (
    <View style={styles.base}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background.base} />
      
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.curatedBadge}>Curated for Alex_UX</Text>
            <Text style={styles.sectionTitle}>Design & Architecture</Text>
          </View>

          {/* Feed Content */}
          <FeedCard 
            type="article"
            title="The Death of the Follower Count"
            subtitle="UX Philosophy"
            description="As social media pivots away from the broadcast model, highly contextual networks are proving that 15 engaged peers are worth more than 15,000 passive scrollers."
            tag="Deep Read"
            author="Kevin Rose · UX Weekly"
            time="8 min read"
            initial="K"
          />

          <FeedCard 
            type="book"
            title="The Great Good Place"
            author="Ray Oldenburg · Sociology"
          />

          <FeedCard 
            type="stage"
            title="Micro-SaaS scaling without burnout"
            description="A live session on sustainable SaaS growth — product, distribution, and founder mental health."
            author="Vercel Team"
            initial="V"
            time="Tonight, 8 PM"
          />

          {/* Dummy Boxes for Scroll Testing */}
          {Array.from({ length: 5 }).map((_, i) => (
             <FeedCard 
                key={`dummy-${i}`}
                type="article"
                title={`Testing Scroll Physics Content ${i + 1}`}
                subtitle="DUMMY CONTENT"
                description="This card exists purely to test the bottom navigation shrink/restore animation as you navigate through the feed."
                author="System Tester"
                time="1 min read"
                initial="T"
             />
          ))}

          {/* Extra padding for BottomNav transparency area */}
          <View style={{ height: 100 }} />
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  curatedBadge: {
    fontSize: 8.5,
    fontWeight: '600',
    color: colors.primary.base,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
});
