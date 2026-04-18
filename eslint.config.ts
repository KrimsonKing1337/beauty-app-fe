import { globalIgnores } from 'eslint/config';
import globals from 'globals';

import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

import importPlugin from 'eslint-plugin-import';
import pluginPlaywright from 'eslint-plugin-playwright';
import vitest from '@vitest/eslint-plugin';

const ignores = [
  '**/*.js',
  'capacitor.config.ts',
  'eslint.config.ts',
  '**/dist/**',
  '**/dist-ssr/**',
  '**/coverage/**',
  'lib',
];

export default defineConfigWithVueTs(
  globalIgnores(ignores),

  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,

  {
    name: 'app/base',
    files: ['**/*.{ts,mts,tsx,vue}'],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      import: importPlugin,
    },

    settings: {
      'import/internal-regex':
        '^(@/|assets/|api/|stores/|composables/|components/|utils/|types/)',
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },

    rules: {
      'import/order': ['error', {
        'newlines-between': 'always-and-inside-groups',
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          { pattern: 'vue', group: 'external', position: 'before' },
          { pattern: 'vue-router', group: 'external', position: 'after' },
          { pattern: 'pinia', group: 'external', position: 'after' },
          { pattern: '@tanstack/**', group: 'external', position: 'after' },
          { pattern: 'primevue/**', group: 'external', position: 'after' },

          { pattern: '@/assets{,/**}', group: 'internal', position: 'after' },
          { pattern: '@/api{,/**}', group: 'internal', position: 'after' },
          { pattern: '@/stores{,/**}', group: 'internal', position: 'after' },
          { pattern: '@/composables{,/**}', group: 'internal', position: 'after' },
          { pattern: '@/pages{,/**}', group: 'internal', position: 'after' },
          { pattern: '@/components{,/**}', group: 'internal', position: 'after' },
          { pattern: '@/utils{,/**}', group: 'internal', position: 'after' },
          { pattern: '@/types{,/**}', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'alphabetize': {
          'order': 'ignore'
        }
      }],

      'eol-last': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single', { avoidEscape: true }],
      'object-curly-spacing': ['error', 'always'],

      'max-len': ['error', {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],

      'max-lines': ['warn', {
        max: 150,
        skipBlankLines: true,
        skipComments: true,
      }],

      'import/no-default-export': 'warn',
    },
  },

  {
    name: 'app/typescript',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-floating-promises': 'off',

      '@typescript-eslint/no-explicit-any': ['warn', {
        ignoreRestArgs: false,
      }],

      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    },
  },

  {
    name: 'app/vue',
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',

      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
      }],

      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      }],

      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside',
        multiline: 'below',
      }],

      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],

      'vue/html-closing-bracket-spacing': ['error', {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always',
      }],

      'vue/mustache-interpolation-spacing': ['error', 'always'],

      'vue/block-lang': ['error', {
        script: {
          lang: 'ts',
        },
      }],

      'vue/component-api-style': ['warn', ['script-setup']],

      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
      }],

      'vue/custom-event-name-casing': ['error', 'camelCase'],

      'vue/define-macros-order': ['error', {
        order: [
          'defineOptions',
          'defineProps',
          'defineEmits',
          'defineSlots',
        ],
      }],

      'vue/no-v-html': 'off',
      'vue/html-self-closing': 'off',
    },
  },

  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },

  {
    ...vitest.configs.recommended,
    files: [
      'src/**/__tests__/*',
      'src/**/*.{test,spec}.{ts,tsx}',
    ],
    rules: {
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
    },
  },
);
