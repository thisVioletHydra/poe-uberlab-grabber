module.exports = {
  root: true,
  env: {
    es6: true,
    es2021: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
  },
  plugins: ['package-json', 'prettier', 'promise'],
  extends: [
    'eslint:recommended',

    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:package-json/recommended',
    'plugin:json/recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',

    'plugin:prettier/recommended',

    'airbnb-base',
    '@nuxtjs',
    'prettier',
  ],
  globals: {
    $nuxt: true,
  },

  rules: {
    /**
     * "off" or 0 - turn the rule off
     * "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
     * "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
     */
    // ------------------------
    'prettier/prettier': [0, 'replace'],

    'arrow-parens': 0,
    'linebreak-style': 0,
    'max-len': 0,
    'space-before-function-paren': 0,
    'comma-dangle': [2, 'only-multiline'],
    curly: [2, 'multi-line'],
    eqeqeq: 2,
    indent: 0,
    quotes: 0,
    semi: 0,

    'no-multi-spaces': 0,
    'no-multiple-empty-lines': 0,
    'no-trailing-spaces': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'no-debugger': 0,

    'no-unused-vars': 1,
    'no-param-reassign': [
      2,
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'acc', 'e', 'ctx', 'req', 'request', 'res', 'response', '$scope'],
      },
    ],
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],

    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,

    'node/no-unsupported-features/es-syntax': 0,
    'node/no-missing-require': 0,
    'node/no-missing-import': 0,
    'node/no-deprecated-api': 2,

    'vue/html-indent': 0,
    'vue/html-self-closing': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
  },
};
