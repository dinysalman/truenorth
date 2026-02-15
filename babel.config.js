/**
 * Babel configuration for TrueNorth (Expo + NativeWind v4).
 * nativewind/babel must run after babel-preset-expo so Tailwind classNames are compiled.
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'nativewind/babel',
    ],
    plugins: [
      'react-native-reanimated/plugin', // Must be listed last per Reanimated docs
    ],
  };
};
