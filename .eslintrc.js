const memberTypes = [

  // Index signature
  "signature",

  // Fields
  "public-static-field",
  "protected-static-field",
  "private-static-field",

  "public-decorated-field",
  "protected-decorated-field",
  "private-decorated-field",

  "public-instance-field",
  "protected-instance-field",
  "private-instance-field",

  "public-abstract-field",
  "protected-abstract-field",
  "private-abstract-field",

  "public-field",
  "protected-field",
  "private-field",

  "static-field",
  "instance-field",
  "abstract-field",

  "decorated-field",

  "field",

  // Constructors
  "public-constructor",
  "protected-constructor",
  "private-constructor",

  "constructor",

  // Methods
  "public-static-method",
  "protected-static-method",
  "private-static-method",

  "public-decorated-method",
  "protected-decorated-method",
  "private-decorated-method",

  "public-instance-method",
  "protected-instance-method",
  "private-instance-method",

  "public-abstract-method",
  "protected-abstract-method",
  "private-abstract-method",

  "public-method",
  "protected-method",
  "private-method",

  "static-method",
  "instance-method",
  "abstract-method",

  "decorated-method",

  "method",
];

module.exports = {
  extends:
    ["next/core-web-vitals", "eslint:recommended",],
  root: true,
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
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx",],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json",],
      },
      plugins: ["@typescript-eslint",],
      extends: [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {

        // TypeScript Rules
        "@typescript-eslint/array-type": ["error", { default: "array", },],
        "@typescript-eslint/ban-tslint-comment": "error",
        "@typescript-eslint/class-literal-property-style": ["error", "fields",],
        "@typescript-eslint/consistent-indexed-object-style": [
          "error",
          "record",
        ],
        "@typescript-eslint/consistent-type-assertions": [
          "error", {
            assertionStyle: "as",
            objectLiteralTypeAssertions: "never",
          },
        ],
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],
        "@typescript-eslint/consistent-type-exports": [
          "error",
          { fixMixedExportsWithInlineTypeSpecifier: true, },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "type-imports",
            disallowTypeAnnotations: true,
          },
        ],
        "@typescript-eslint/explicit-member-accessibility": [
          "error",
          { accessibility: "explicit", },
        ],
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/member-delimiter-style": [
          "error", {
            multiline: {
              delimiter: "semi",
              requireLast: true,
            },
            singleline: {
              delimiter: "semi",
              requireLast: true,
            },
            multilineDetection: "brackets",
          },
        ],
        "@typescript-eslint/member-ordering": [
          "error",
          { default: memberTypes, },
        ],
        "@typescript-eslint/method-signature-style": ["error", "property",],
        "@typescript-eslint/no-base-to-string": "error",
        "@typescript-eslint/no-confusing-non-null-assertion": "error",
        "@typescript-eslint/no-confusing-void-expression": "error",
        "@typescript-eslint/no-dynamic-delete": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/no-invalid-void-type": "error",
        "@typescript-eslint/no-meaningless-void-operator": "error",
        "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
        "@typescript-eslint/no-parameter-properties": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/prefer-enum-initializers": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-literal-enum-member": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/prefer-reduce-type-parameter": "error",
        "@typescript-eslint/prefer-regexp-exec": "error",
        "@typescript-eslint/prefer-return-this-type": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/require-array-sort-compare": "error",
        "@typescript-eslint/sort-type-union-intersection-members": "error",
        "@typescript-eslint/strict-boolean-expressions": "error",
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "error",

        // TypeScript ESLint Extensions
        "brace-style": "off",
        "@typescript-eslint/brace-style": "error",
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": [
          "error", {
            arrays: "always",
            objects: "always",
            imports: "always",
            exports: "always",
            functions: "always",
            enums: "always",
            generics: "always",
            tuples: "always",
          },
        ],
        "default-param-last": "off",
        "@typescript-eslint/default-param-last": "error",
        "dot-notation": "off",
        "@typescript-eslint/dot-notation": "error",
        "func-call-spacing": "off",
        "@typescript-eslint/func-call-spacing": "error",
        indent: "off",
        "@typescript-eslint/indent": ["error", 2,],
        "init-declarations": "off",
        "@typescript-eslint/init-declarations": ["error", "always",],
        "keyword-spacing": "off",
        "@typescript-eslint/keyword-spacing": "error",
        "lines-between-class-members": "off",
        "@typescript-eslint/lines-between-class-members": "error",
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-dupe-class-members": "error",
        "no-duplicate-imports": "off",
        "@typescript-eslint/no-duplicate-imports": "error",
        "no-invalid-this": "off",
        "@typescript-eslint/no-invalid-this": "error",
        "no-loop-func": "off",
        "@typescript-eslint/no-loop-func": "error",
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": "error",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "no-throw-literal": "off",
        "@typescript-eslint/no-throw-literal": "error",
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": "error",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
          "error",
          {
            functions: false,
            classes: true,
            variables: true,
            enums: true,
            typedefs: true,
            ignoreTypeReferences: true,
          },
        ],
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "object-curly-spacing": "off",
        "@typescript-eslint/object-curly-spacing": ["error", "always",],
        quotes: "off",
        "@typescript-eslint/quotes": [
          "error",
          "double",
          { allowTemplateLiterals: true, },
        ],
        "return-await": "off",
        "@typescript-eslint/return-await": "error",
        semi: "off",
        "@typescript-eslint/semi": ["error", "always",],
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": "error",
        "space-infix-ops": "off",
        "@typescript-eslint/space-infix-ops": ["error", { int32Hint: true, },],
      },
    },
  ],
  reportUnusedDisableDirectives: true,
};
