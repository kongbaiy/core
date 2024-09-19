import antfu from '@antfu/eslint-config'

export function baseConfig() {
  return antfu({
    overrides: {
      vue: {
        'vue/component-name-in-template-casing': ['off'],
      },
    },
    vue: true,
    typescript: true,
    rules: {
      'no-unused-vars': 'off',
      'camelcase': [2, { properties: 'always' }],
      'no-console': 'off',
      'curly': 'off',
      'antfu/if-newline': 'off',
      'brace-style': 'off',
      'style/brace-style': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/component-name-in-template-casing': ['error', 'kebab-case', {
        registeredComponentsOnly: false,
      }],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/html-indent': 'off',
      '@stylistic/indent': 0,
    },
  })
}
