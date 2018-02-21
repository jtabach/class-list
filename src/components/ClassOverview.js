import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ClassOverview.scss';
import axios from 'axios';

import LoadingSpinner from './LoadingSpinner';

const CLASSES_URL = 'https://zenrez-interview.herokuapp.com/classes';

class ClassOverview extends Component {
  constructor(props) {
    super(props);

    // using name item instead of class b/c keyword
    this.state = {
      item: {},
      loading: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    // fetching a 2nd time rather than passing the props
    // user may have bookmarked or navigated to this page directly
    axios.get(CLASSES_URL)
      .then(resp => {
        const { classes } = resp.data;
        const item = this._findItemByID(classes, id);
        this.setState({
          item,
          loading: false
        });
      });
  }

  _findItemByID(classes, id) {
    return classes.find(item => {
      // comparing string and number
      return item.id == id;
    });
  }

  render() {
    const { loading } = this.state;
    const {
      description,
      end_time,
      img_url,
      instructor,
      price,
      start_time,
      title
    } = this.state.item;

    return (
      <div>
      {
        loading
        ?
        <LoadingSpinner />
        :
        <div>
          <img src={img_url} alt="" style={{ height: "400px" }}/>
          <h2>{title} - ${price}</h2>
          <h3>{instructor}</h3>
          <h4>{start_time} - {end_time}</h4>
          <p>{description}</p>
        </div>
      }
      </div>
    );
  }
}

export default CSSModules(ClassOverview, styles);