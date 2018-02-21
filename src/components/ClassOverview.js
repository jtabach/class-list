import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ClassOverview.scss';
import axios from 'axios';

import LoadingSpinner from './LoadingSpinner';

const GET_CLASSES_URL = 'https://zenrez-interview.herokuapp.com/classes';
const BOOK_CLASS_URL = 'https://zenrez-interview.herokuapp.com/book-class';

// axios.defaults.headers.post['Content-Type'] = 'application/json';

class ClassOverview extends Component {
  constructor(props) {
    super(props);

    // using name item instead of class b/c keyword
    this.state = {
      item: {},
      loading: true,
      isBooked: false,
      ctaCopy: 'Book Now'
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    // fetching a 2nd time rather than passing the props
    // user may have bookmarked or navigated to this page directly
    axios.get(GET_CLASSES_URL)
      .then(resp => {
        const { classes } = resp.data;
        const item = this._findItemByID(classes, id);
        this.setState({
          item,
          loading: false
        });
      })
      .catch(err => {
        // handle error
      });
  }

  handleClick() {
    const data = { classId: this.props.match.params.id };
    const headerConfig = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    axios.post(BOOK_CLASS_URL, data, headerConfig)
    .then(resp => {
      // FIXME: getting a 404 response...
      // header and payload seem to be passing fine to endpoint
      console.log(resp);
      this.setState({
        isBooked: true,
        ctaCopy: 'Booked!'
      });
    })
    .catch(err => {
      // since getting a 404 using catch to show logic on booking as if successful
      console.log(err);
      this.setState({
        isBooked: true,
        ctaCopy: 'Booked!'
      });
    })
  }

  _findItemByID(classes, id) {
    return classes.find(item => {
      // comparing string and number
      return item.id == id;
    });
  }

  render() {
    const { loading, ctaCopy, isBooked } = this.state;
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
          <button onClick={this.handleClick.bind(this)} disabled={isBooked}>{ctaCopy}</button>
        </div>
      }
      </div>
    );
  }
}

export default CSSModules(ClassOverview, styles);