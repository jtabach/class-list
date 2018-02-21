import React, { Component } from 'react';
import axios from 'axios';

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
        this.setState({
          classes: resp.data.classes
        });
      });
  }

  renderClasses() {
    const { classes } = this.state;
    {
      return this.state.classes.map(item =>
        <h2 key={Math.random()}>Test</h2>
      )
    }
  }

  render() {
    console.log(this.state.classes);
    return (
      <div>
        <h1>List of Classes</h1>
        {this.renderClasses()}
      </div>
    );
  }
}

export default ClassList;