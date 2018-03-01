import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ClassList.scss'
import axios from 'axios';
import Pagination from 'react-js-pagination';

import ClassListItem from './ClassListItem';
import LoadingSpinner from './LoadingSpinner';

const classesPerPage = 3;

const GET_CLASSES_URL = 'https://zenrez-interview.herokuapp.com/classes';

class ClassList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      filteredClasses: [],
      loading: true,
      activePage: 1,
      textValue: ''
    };
  }

  componentDidMount() {
    axios.get(GET_CLASSES_URL)
      .then(resp => {
        const { classes } = resp.data;
        this.setState({
          classes,
          filteredClasses: classes,
          loading: false
        });
      })
      .catch(err => {
        // handle error
      });
  }

  handlePageChange(pageNumber) {
    console.log(pageNumber);
    this.setState({
      activePage: pageNumber
    })
  }

  handleTextChange(e) {
    const filteredClasses = this._filterClasses(this.state.classes);

    this.setState({
      textValue: e.target.value,
      filteredClasses
    });
  }

  renderClasses() {
    const { filteredClasses } = this.state;
    let start = (this.state.activePage - 1) * classesPerPage;
    let end = start + classesPerPage;
    const displayClasses = filteredClasses.slice(start,end);
    return displayClasses.map(item =>
      <ClassListItem key={item.id} item={item} />
    )
  }

  _filterClasses(classes) {
    const {textValue} = this.state;
    console.log(classes);
    return classes.filter(item => {
      if (item.title.toLowerCase().indexOf(textValue.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });

  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <h1>List of Classes</h1>
        <input type="text"
          value={this.state.textValue}
          onChange={this.handleTextChange.bind(this) }/>
        {
          loading
          ?
          <LoadingSpinner />
          :
          <ul styleName="list">
            {this.renderClasses()}
          </ul>
        }
        <div styleName="pagination-wrapper">
          <Pagination
             innerClass={styles.paginate}
             itemClass={styles.paginateItem}
             activeClass={styles.paginateActive}
             disabledClass={styles.paginateDisabled}
             hideDisabled={false}
             activePage={this.state.activePage}
             itemsCountPerPage={classesPerPage}
             totalItemsCount={this.state.filteredClasses.length}
             pageRangeDisplayed={2}
             onChange={this.handlePageChange.bind(this)}
         />
         </div>
      </div>
    );
  }
}

export default CSSModules(ClassList, styles);