export function defineConfig() {
  return {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-standard-scss',
      'stylelint-config-recommended-vue/scss',
      'stylelint-config-recess-order',
      'stylelint-config-html/vue',
      '@stylistic/stylelint-config',
    ],
    rules: {
      'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
      'scss/at-if-closing-brace-space-after': 'always-intermediate',
      '@stylistic/block-closing-brace-newline-after': 'always-single-line',
      'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
      // 自定义class命名规则
      'selector-class-pattern': [
        '^([a-z][a-z0-9]*)((-|__)[a-z0-9]+)*$',
        {
          message: 'Expected class selector to be kebab-case、kebab__case',
        },
      ],
      '@stylistic/indentation': 4,
    },
    overrides: [
    {
      files: ['*.html', '**/*.html'],
      customSyntax: 'postcss-html',
    },
  ],
  }
}
