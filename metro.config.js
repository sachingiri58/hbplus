const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
// Firebase v10 ships .cjs files that Metro must resolve
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
