import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ClassList.scss'
import axios from 'axios';

import ClassListItem from './ClassListItem';
import LoadingSpinner from './LoadingSpinner';

const GET_CLASSES_URL = 'https://zenrez-interview.herokuapp.com/classes';

class ClassList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get(GET_CLASSES_URL)
      .then(resp => {
        const { classes } = resp.data;
        this.setState({
          classes,
          loading: false
        });
      })
      .catch(err => {
        // handle error
      });
  }

  renderClasses() {
    const { classes } = this.state;
    return classes.map(item =>
      <ClassListItem key={item.id} item={item} />
    )
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <h1>List of Classes</h1>
        {
          loading
          ?
          <LoadingSpinner />
          :
          <ul styleName="list">
            {this.renderClasses()}
          </ul>
        }
      </div>
    );
  }
}

export default CSSModules(ClassList, styles);