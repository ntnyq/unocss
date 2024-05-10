import * as vueParser from 'vue-eslint-parser'
import { $ as html, run } from 'eslint-vitest-rule-tester'
import rule from './blocklist'

run({
  name: 'blocklist',
  rule,
  languageOptions: {
    parser: vueParser,
  },

  valid: [
    html`
      <template>
        <div class="m1 mx1 mr-1"></div>
      </template>
    `,
  ],
  invalid: [
    {
      code: html`
        <template>
          <div class="border"></div>
        </template>
      `,
      errors: [
        {
          messageId: 'in-blocklist',
          data: {
            name: 'border',
            reason: '',
          },
        },
      ],
    },
    {
      description: 'with message',
      code: html`
        <template>
          <div class="bg-red-500"></div>
        </template>
      `,
      errors: [
        {
          messageId: 'in-blocklist',
          data: {
            name: 'bg-red-500',
            reason: ': Use bg-red-600 instead',
          },
        },
      ],
    },
    {
      description: 'dynamic blocklist with message',
      code: html`
        <template>
          <div class="text-red"></div>
        </template>
      `,
      errors: [
        {
          messageId: 'in-blocklist',
          data: {
            name: 'text-red',
            reason: ': Use color-* instead',
          },
        },
      ],
    },
  ],
})
