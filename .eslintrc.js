module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'google', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'esnext',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'valid-jsdoc': 0,

    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],

    'quotes': ['error', 'single'],
    '@typescript-eslint/quotes': ['error', 'single'],

    'object-curly-spacing': ['error', 'always', { arraysInObjects: true }],
    'object-curly-newline': ['error', {
      consistent: true,
    }],
  },
  settings: {
    react: {
      version: 'detect',
    },
    jsdoc: {
      mode: 'typescript',
    },
  },
};
