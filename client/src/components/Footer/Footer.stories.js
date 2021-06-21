import React from 'react';

import Footer from '.';

export default {
  title: 'Common Components/Footer',
  component: Footer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Footer {...args} />;

export const ReadyStatus = Template.bind({});
