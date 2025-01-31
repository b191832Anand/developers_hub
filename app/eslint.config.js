export default {
  ignores: ['dist'],
  files: ['**/*.{js,jsx}'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended', // Added accessibility rules
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: globals.browser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
      sourceType: 'module',
    },
  },
  settings: { react: { version: '18.3' } },
  plugins: ['react', 'react-hooks', 'react-refresh', 'jsx-a11y'], // Added jsx-a11y
  rules: {
    'react/jsx-no-target-blank': 'off', // Consider adding rel="noopener noreferrer"
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};