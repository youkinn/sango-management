module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
<<<<<<< HEAD
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
=======
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
>>>>>>> a5e3dbc55381f45fcc963fb9ec25eb55eab0785a
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
<<<<<<< HEAD
  globals: {
    Vue: 'readonly'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
=======
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        mocha: true
      }
    }
  ]
>>>>>>> a5e3dbc55381f45fcc963fb9ec25eb55eab0785a
};
