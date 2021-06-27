module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['react', 'prettier'],
  rules: {
    semi: [1, 'always'],
    'no-debugger': 1,
    'no-console': [1, { allow: ['warn', 'error'] }],
    'padded-blocks': [1, 'never'],
    'space-infix-ops': 2,
    'brace-style': [1, 'stroustrup'],
    'comma-dangle': [
      1,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    'new-cap': 0,
    strict: 0,
    'no-unused-vars': 2,
    'no-use-before-define': 2,
    'consistent-return': 1,
    'no-empty': [
      2,
      {
        allowEmptyCatch: true,
      },
    ],
    'eol-last': 1,
    indent: ['error', 2],
    'no-multiple-empty-lines': [2, { max: 1 }],
    'object-curly-spacing': [1, 'always'],
    quotes: [2, 'single'],
    'jsx-quotes': [2, 'prefer-double'],
    'react/jsx-no-undef': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: '16.7',
    },
  },
};
