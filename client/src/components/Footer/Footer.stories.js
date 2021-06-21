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

// export const LoadingStatus = Template.bind({});
// LoadingStatus.args = {
//   status: 'loading',
//   image: '',
// };

// const testSrc = 'https://images.indianexpress.com/2020/03/amp-4.jpg';

export const ReadyStatus = Template.bind({});
// ReadyStatus.args = {
// };
