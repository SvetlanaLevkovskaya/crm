module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    plugins: ['react', '@typescript-eslint', 'react-hooks'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': ['error', { singleQuote: true, semi: false }],
        '@typescript-eslint/no-unused-vars': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
