import React from 'react';

import 'antd/dist/antd.css';

const style = {
  width: '100%',
  minHeight: '100vh',
};

const ThemeDecorator = (storyFn) => (
  <>
    <div style={style}>{storyFn()}</div>
  </>
);

export default ThemeDecorator;
