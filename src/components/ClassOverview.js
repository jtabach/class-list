import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ClassOverview.scss';

const ClassOverview = () => {
  return (
    <div styleName="test">Another Example Component with CSS Modules</div>
  );
}

export default CSSModules(ClassOverview, styles);