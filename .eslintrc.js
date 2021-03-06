module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["vue"],
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/html-closing-bracket-newline": "on",
    indent: ["error", 2],
    "vue/html-indent": ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"]

    // 'no-unused-vars': 'warn',
  }
};
