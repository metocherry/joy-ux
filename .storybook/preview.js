import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';


export const parameters = {
  layout: 'fullscreen',
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex'
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    config: {
      rules: [
        { id: 'autocomplete-valid', selector: '*:not([autocomplete="nope"])' },
        { id: 'color-contrast', enabled: false },
      ],
    },
  },
};

export const decorators = [
  (Story) => {
    return (
      <Story />
    );
  },
];
