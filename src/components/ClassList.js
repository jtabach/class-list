import React, { Component } from 'react';
import axios from 'axios';

import ClassListItem from './ClassListItem';

const CLASSES_URL = 'https://zenrez-interview.herokuapp.com/classes';

class ClassList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: []
    };
  }

  componentDidMount() {
    axios.get(CLASSES_URL)
      .then(resp => {
        const { classes } = resp.data;
        this.setState({
          classes
        });
      });
  }

  renderClasses() {
    const { classes } = this.state;
    return classes.map(item =>
      <ClassListItem key={item.id} item={item} />
    )
  }

  render() {
    return (
      <div>
        <h1>List of Classes</h1>
        <ul>
          {this.renderClasses()}
        </ul>
      </div>
    );
  }
}

export default ClassList;