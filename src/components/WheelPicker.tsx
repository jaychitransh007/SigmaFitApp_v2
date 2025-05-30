import React, { useRef, useEffect, useMemo, ComponentType } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, ScrollView, ViewStyle } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

type AnimatedScrollView = ComponentType<any> & typeof Animated.ScrollView;

const DEFAULT_ITEM_HEIGHT = 50;
const DEFAULT_VISIBLE_ITEMS = 3;

interface WheelPickerProps {
  items: (string | number)[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  formatItem?: (item: string | number) => string;
  width?: number | string;
  height?: number;
  itemHeight?: number;
  visibleItemCount?: number;
  pickerText?: any;
  pickerSelectedText?: any;
}

export default function WheelPicker({
  items,
  selectedIndex,
  onSelect,
  formatItem = (item) => String(item),
  width = 80,
  height = 200,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  visibleItemCount = DEFAULT_VISIBLE_ITEMS,
  pickerText = {},
  pickerSelectedText = {},
}: WheelPickerProps) {
  const theme = useAppTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const containerHeight = useMemo(() => itemHeight * visibleItemCount, [itemHeight, visibleItemCount]);
  const paddingVertical = useMemo(() => (containerHeight - itemHeight) / 2, [containerHeight, itemHeight]);

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < items.length) {
      const scrollTo = selectedIndex * itemHeight;
      scrollViewRef.current?.scrollTo({
        y: scrollTo,
        animated: false,
      });
    }
  }, [selectedIndex, itemHeight, items.length]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const handleMomentumScrollEnd = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    onSelect(index);
  };

  const getItemStyle = (index: number) => {
    const inputRange = [
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
      (index + 1) * itemHeight,
      (index + 2) * itemHeight,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 0.9, 1, 0.9, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.4, 0.7, 1, 0.7, 0.4],
      extrapolate: 'clamp',
    });

    const color = scrollY.interpolate({
      inputRange: [
        (index - 1) * itemHeight,
        index * itemHeight,
        (index + 1) * itemHeight,
      ],
      outputRange: ['#CCCCCC', '#000000', '#CCCCCC'],
      extrapolate: 'clamp',
    });

    // Calculate scale for font size animation
    const fontSizeScale = scrollY.interpolate({
      inputRange: [
        (index - 1) * itemHeight,
        index * itemHeight,
        (index + 1) * itemHeight,
      ],
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp',
    });
    
    // Base font size
    const baseFontSize = index === selectedIndex ? 24 : 16;

    return {
      transform: [
        { scale },
        { scale: fontSizeScale }
      ],
      opacity,
      color,
      fontSize: baseFontSize,
    };
  };

  return (
    <View style={[styles.container, { width: Number(width), height: containerHeight } as ViewStyle]}>
      <View style={[styles.selectedIndicator, { height: itemHeight, top: paddingVertical }]} />
      <AnimatedScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingVertical },
        ]}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        bounces={false}
      >
        {items.map((item, index) => (
          <View
            key={index}
            style={[styles.itemContainer, { height: itemHeight }]}
          >
            <Animated.Text
              style={[
                styles.itemText,
                getItemStyle(index),
                pickerText,
                index === selectedIndex && [styles.selectedItemText, pickerSelectedText],
              ]}
            >
              {formatItem(item)}
            </Animated.Text>
          </View>
        ))}
      </AnimatedScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#F8F8F8',
    borderRadius: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  itemText: {
    textAlign: 'center',
    fontWeight: '400',
    color: '#CCCCCC',
  },
  selectedItemText: {
    fontWeight: '600',
    color: '#000000',
  },
  selectedIndicator: {
    position: 'absolute',
    left: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    zIndex: -1,
  },
});
