/**
 * Full-screen login background: gradient hero area + squiggly divider into lower half.
 * Uses brand colors; squiggly path gives a hand-drawn separation (not straight).
 */
import * as React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Rect } from 'react-native-svg';
import { useTheme } from '@/lib/theme';

const GRADIENT_HEIGHT_PERCENT = 0.38;
const SQUIGGLY_AMP = 14;

export function LoginBackground() {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const y0 = height * GRADIENT_HEIGHT_PERCENT;
  const squigglyTop = `M 0,${y0 + 6} Q ${width * 0.2},${y0 - SQUIGGLY_AMP} ${width * 0.4},${y0 + 4} Q ${width * 0.55},${y0 + SQUIGGLY_AMP} ${width * 0.7},${y0 - 2} Q ${width * 0.85},${y0 - SQUIGGLY_AMP * 0.6} ${width},${y0 + 8} L ${width},${height} L 0,${height} Z`;

  return (
    <View style={[StyleSheet.absoluteFill, { width, height }]}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.deepNorthBlue} stopOpacity="1" />
          <Stop offset="50%" stopColor={colors.northBlue} stopOpacity="1" />
          <Stop offset="100%" stopColor={colors.robeBlue} stopOpacity="0.5" />
          </LinearGradient>
        </Defs>
        {/* Top: gradient */}
        <Rect x={0} y={0} width={width} height={y0 + SQUIGGLY_AMP + 10} fill="url(#heroGradient)" />
        {/* Lower half: squiggly top edge, fill background */}
        <Path d={squigglyTop} fill={colors.background} />
      </Svg>
    </View>
  );
}
