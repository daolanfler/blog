module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],
  plugins: ["vue", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
  rules: {
    curly: ["error", "all"],
    // vue
    "vue/max-attributes-per-line": [
      "warn",
      {
        singleline: 5,
      },
    ],
    "vue/no-v-html": "off",
    "vue/require-prop-types": "off",
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
    // ts
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
