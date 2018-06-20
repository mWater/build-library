import { configure } from '@storybook/react';

function loadStories() {
  require('../../mwater-forms/stories/index');
}

configure(loadStories, module);