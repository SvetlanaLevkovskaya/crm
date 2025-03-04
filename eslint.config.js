module.exports = {
  parser: '@typescript-eslint/parser', // Для TypeScript
  parserOptions: {
    ecmaVersion: 2020, // или выше, в зависимости от нужд
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended', // Для хуков React
    'prettier', // Отключает правила ESLint, которые могут конфликтовать с Prettier
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off', // В Next.js нет необходимости в импортировании React
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: 'detect', // Автоматически определяет версию React
    },
  },
}
