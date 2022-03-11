module.exports = {
  extends:
    ["next/core-web-vitals", "plugin:@typescript-eslint/recommended",],
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint",],
  rules: {

    // Possible Problems
    "array-callback-return": "error",
    "no-await-in-loop": "error",
    "no-constructor-return": "error",
    "no-duplicate-imports": "error",
    "no-promise-executor-return": "error",
    "no-self-compare": "error",
    "no-template-curly-in-string": "error",
    "no-unmodified-loop-condition": "error",
    "no-unreachable-loop": "error",
    "no-unused-private-class-members": "error",
    "no-use-before-define": ["error", "nofunc",],
    "require-atomic-updates": "error",

    // Suggestions
    "accessor-pairs": "error",
    "arrow-body-style": ["error", "always",],
    "block-scoped-var": "error",
    camelcase: "error",
    "capitalized-comments": [
      "error",
      "always",
      { ignoreConsecutiveComments: true, },
    ],
    "class-methods-use-this": "off",
    complexity: ["error", 10,],
    "consistent-return": "error",
    "consistent-this": ["error", "that",],
    curly: ["error", "all",],
    "default-case": "error",
    "default-case-last": "error",
    "default-param-last": "error",
    "dot-notation": "error",
    eqeqeq: ["error", "always",],
    "func-name-matching": "error",
    "func-names": "off",
    "func-style": ["error", "declaration", { allowArrowFunctions: true, },],
    "grouped-accessor-pairs": ["error", "getBeforeSet",],
    "guard-for-in": "error",
    "id-denylist": ["error", "cb", "callback",],
    "id-length": "error",
    "id-match": "off",
    "init-declarations": ["error", "always",],
    "max-depth": ["error", 4,],
    "max-lines": ["error", 1000,],
    "max-lines-per-function": ["error", 1000,],
    "max-nested-callbacks": ["error",],
    "max-params": ["error", 4,],
    "max-statements": "off",
    "multiline-comment-style": ["error", "bare-block",],
    "new-cap": "error",
    "no-array-constructor": "error",
    "no-bitwise": "warn",
    "no-caller": "error",
    "no-confusing-arrow": "error",
    "no-console": "error",
    "no-continue": "error",
    "no-div-regex": "error",
    "no-else-return": "off",
    "no-empty-function": "off",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implied-eval": "error",
    "no-implicit-globals": [
      "error", {
        lexicalBindings: true
        ,
      },
    ],
    "no-inline-comments": "error",
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-magic-numbers": "off",
    "no-mixed-operators": "error",
    "no-multi-assign": "error",
    "no-multi-str": "error",
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true, },],
    "no-proto": "error",
    "no-restricted-exports": "off",
    "no-restricted-globals": "off",
    "no-restricted-imports": "off",
    "no-restricted-properties": "off",
    "no-restricted-syntax": "off",
    "no-return-assign": ["error", "always",],
    "no-return-await": "error",
    "no-script-url": "error",
    "no-sequences": ["error",],
    "no-shadow": "error",
    "no-ternary": "off",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-undefined": "error",
    "no-underscore-dangle": "error",
    "no-unneeded-ternary": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-void": "error",
    "no-warning-comments": ["error", { terms: ["fixme", "xxx",], },],
    "object-shorthand": "error",
    "one-var": ["error", "never",],
    "one-var-declaration-per-line": ["error", "always",],
    "operator-assignment": ["error", "always",],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": ["error", { object: true, array: false, },],
    "prefer-exponentiation-operator": "error",
    "prefer-named-capture-group": "error",
    "prefer-numeric-literals": "error",
    "prefer-object-has-own": "error",
    "prefer-object-spread": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-regex-literals": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "quote-props": ["error", "as-needed",],
    radix: "error",
    "require-await": "off",
    "require-unicode-regexp": "error",
    "sort-imports": "error",
    "sort-keys": "off",
    "sort-vars": "off",
    "spaced-comment": ["error", "always",],
    strict: "off",
    "symbol-description": "error",
    "vars-on-top": "error",
    yoda: "error",

    // Layout & Formatting
    "array-bracket-newline": ["error", { multiline: true, },],
    "array-bracket-spacing": "error",
    "array-element-newline": ["error", "consistent",],
    "arrow-parens": "error",
    "arrow-spacing": "error",
    "block-spacing": "error",
    "brace-style": "error",
    "comma-dangle": [
      "error", {
        arrays: "always",
        objects: "always",
        imports: "always",
        exports: "always",
        functions: "always",
      },
    ],
    "comma-spacing": "off",
    "comma-style": ["error", "last",],
    "computed-property-spacing": ["error", "never",],
    "dot-location": ["error", "property",],
    "eol-last": ["error", "always",],
    "func-call-spacing": "error",
    "function-call-argument-newline": ["error", "consistent",],
    "generator-star-spacing": ["error", { before: false, after: true, },],
    "implicit-arrow-linebreak": "error",
    indent: ["error", 2,],
    "jsx-quotes": ["error", "prefer-double",],
    "key-spacing": "error",
    "keyword-spacing": "error",
    "line-comment-position": "error",
    "linebreak-style": "error",
    "lines-around-comment": [
      "error",
      { beforeLineComment: true, beforeBlockComment: true, },
    ],
    "lines-between-class-members": "error",
    "max-len": [
      "error", {
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "max-statements-per-line": "error",
    "multiline-ternary": ["error", "always-multiline",],
    "new-parens": "error",
    "newline-per-chained-call": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": "error",
    "no-tabs": "error",
    "no-trailing-spaces": ["error", { skipBlankLines: true, },],
    "no-whitespace-before-property": "error",
    "nonblock-statement-body-position": "error",
    "object-curly-newline": ["error", { multiline: true, },],
    "object-curly-spacing": ["error", "always",],
    "object-property-newline": [
      "error",
      { allowAllPropertiesOnSameLine: true, },
    ],
    "operator-linebreak": ["error", "before",],
    "padded-blocks": ["error", "never",],
    "padding-line-between-statements": "off",
    quotes: ["error", "double", { allowTemplateLiterals: true, },],
    "rest-spread-spacing": "error",
    semi: ["error", "always",],
    "semi-spacing": "error",
    "semi-style": "error",
    "space-before-blocks": "error",
    "space-before-function-paren": "error",
    "space-infix-ops": ["error", { int32Hint: true, },],
    "space-unary-ops": "error",
    "switch-colon-spacing": "error",
    "template-curly-spacing": "error",
    "template-tag-spacing": "error",
    "unicode-bom": "error",
    "wrap-iife": "error",
    "wrap-regex": "error",
    "yield-star-spacing": "error",
  },
  reportUnusedDisableDirectives: true,
};
