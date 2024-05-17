module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation/.*|expo(-.*)?|@expo(-.*)?|react-navigation|@unimodules/.*|unimodules-.*|sentry-expo|native-base))',
  ],
};
