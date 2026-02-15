import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

/* eslint
	'key-spacing': ['error', { multiLine: { beforeColon : false, afterColon: true } }]
	'quote-props': ['error', 'always'] */

export default defineConfig([{
	'extends': ['js/recommended'],
	'files': ['**/*.{js,mjs,cjs}'],
	'languageOptions': { 'globals': globals.browser },
	'plugins': { js },
	'rules': {
		'array-bracket-spacing': ['error', 'never'],
		'arrow-parens': ['error', 'as-needed'],
		'arrow-spacing': 'error',
		'brace-style': 'error',
		'camelcase': 'off',
		'comma-dangle': ['error', 'never'],
		'comma-spacing': ['error', { 'before': false, 'after': true }],
		'comma-style': ['error', 'last'],
		'computed-property-spacing': ['error', 'never'],
		'no-constant-condition': 'off',
		'dot-notation': 'error',
		'no-empty': ['error', { 'allowEmptyCatch': true }],
		'indent': ['error', 'tab', { 'flatTernaryExpressions': true }],
		'key-spacing': ['error', {
			'multiLine': { 'beforeColon': false, 'afterColon': true },
			'align': { 'beforeColon': false, 'afterColon': true, 'on': 'colon' }
		}],
		'keyword-spacing': ['error', {
			'overrides': {
				'catch': { 'after': false },
				'for': { 'after': false },
				'if': { 'after': false },
				'switch': { 'after': false },
				'while': { 'after': false }
			}
		}],
		'linebreak-style': ['error', 'windows'],
		'max-len': ['error', 110, { 'ignoreRegExpLiterals': true, 'ignoreUrls': true }],
		'new-cap': ['error', {
			'capIsNewExceptions': [
				'GM_getValue',
				'GM_setValue',
				'GM_deleteValue',
				'GM_openInTab',
				'GM_openInTab',
				'GM_xmlhttpRequest'
			]
		}],
		'no-case-declarations': 'error',
		'no-const-assign': 'error',
		'no-extra-parens': ['error', 'all', {
			'conditionalAssign': false,
			'nestedBinaryExpressions': false,
			'returnAssign': false
		}],
		'no-extra-semi': 'error',
		'no-global-assign': ['error', { 'exceptions': ['FormData'] }],
		'no-labels': ['error', { 'allowLoop': true }],
		'no-mixed-spaces-and-tabs': 'error',
		'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
		'no-tabs': ['error', { 'allowIndentationTabs': true }],
		'no-trailing-spaces': 'error',
		'no-undef': 'error',
		'no-unsafe-optional-chaining': 'error',
		'no-useless-concat': 'error',
		'no-unused-vars': ['error', { 'caughtErrors': 'none', 'vars': 'all', 'args': 'after-used' }],
		'object-curly-newline': ['error', { 'multiline': true }],
		'object-curly-spacing': ['error', 'always'],
		'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
		'object-shorthand': ['error', 'always'],
		'one-var': ['error', { 'initialized': 'never', 'uninitialized': 'consecutive' }],
		'prefer-arrow-callback': 'error',
		'prefer-const': ['error', { 'destructuring': 'all' }],
		'prefer-destructuring': ['error', { 'object': true }],
		'quotes': ['error', 'single'],
		'quote-props': ['error', 'as-needed'],
		'require-jsdoc': 'off',
		'semi': ['error', 'always'],
		'space-before-blocks': ['error', 'always'],
		'space-before-function-paren': ['error', {
			'anonymous': 'never',
			'named': 'never',
			'asyncArrow': 'always'
		}],
		'space-in-parens': ['error', 'never'],
		'space-infix-ops': 'error',
		'template-curly-spacing': ['error', 'always']
	}
}]);
