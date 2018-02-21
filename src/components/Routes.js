import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ClassList from './ClassList.js';
import ClassOverview from './ClassOverview.js';

export default () => {
  return (
    <div>
      <Route exact path='/' component={ClassList} />
      <Route path='/class/:id' component={ClassOverview} />
    </div>
  );
};