const path = require('path');
const fs = require('fs');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


const resolve = (name) => {
  let current = path.dirname(require.resolve(name));

  while (true) {
    if (fs.existsSync(path.join(current, 'package.json'))) {
      return current;
    }

    const { dir, root } = path.parse(current);
    if (dir === root) {
      throw new Error(`could not find a module root of ${name}.`);
    }

    current = dir;
  }
};

module.exports = {
  staticDirs: ['../public'],
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig: {
            printWidth: 120,
            singleQuote: true,
            trailingComma: 'all',
            arrowParens: 'always',
          },
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    'builder': '@storybook/builder-webpack5'
  },
  typescript: {
    reactDocgen: 'none',
  },
  babel: async (config) => ({
    ...config,
    presets: [
      ...config.presets,
      '@emotion/babel-preset-css-prop',
    ],
  }),
  webpackFinal: async (config) => {
    config.module.rules = config.module.rules.map(rule => {
      if (String(rule.test) === String(/\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
        }
      }

      return rule
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': resolve('@emotion/react'),
      '@emotion/styled': resolve('@emotion/styled'),
      'emotion-theming': resolve('@emotion/react'),
    };

    (config.resolve.plugins ?? []).push(new TSConfigPathsPlugin());

    return config;
  },
}
