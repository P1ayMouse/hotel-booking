module.exports = {
  customSyntax: "postcss-scss",

  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss"
  ],

  plugins: [
    "stylelint-scss"
  ],

  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "max-nesting-depth": 6,
    "selector-class-pattern": "^[A-Za-z][A-Za-z0-9\-]+$",
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-redundant-longhand-properties": null,
    "property-no-unknown": [
      true,
      { ignoreProperties: ["composes"] }
    ],
    "unit-allowed-list": ["%", "deg", "fr", "px", "s", "vw", "vh"],
    "no-descending-specificity": null,
    "scss/at-import-partial-extension": null,
    "scss/load-partial-extension": null,
    "color-function-notation": "modern",
    "media-feature-range-notation": null,
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] }
    ],
    "import-notation": null
  },

  overrides: [
    {
      files: ["**/*.module.scss"],
      rules: {
        "selector-class-pattern": null,
        "unit-allowed-list": null,
      }
    }
  ]
};
