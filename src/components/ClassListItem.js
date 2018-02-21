import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './ClassListItem.scss';

const ClassListItem = ({ item }) => {
  const {
    end_time,
    id,
    img_url,
    instructor,
    price,
    start_time,
    title
  } = item;

  const imageStyle = {
    backgroundImage: `url(${img_url})`,
    backgroundSize: "cover",
    backgroundPosition: "center center"
  };

  return (
    <Link to={`class/${item.id}`} styleName="link">
      <li styleName="list-item">
        <div styleName="image" style={imageStyle}></div>
        <div styleName="content">
          <div styleName="inner">
            <h4 styleName="title">{title}</h4>
            <p styleName="instructor">{instructor}</p>
            <p styleName="time">{start_time} - {end_time}</p>
          </div>
        </div>
        <div styleName="price">
          <div styleName="inner">${price}</div>
        </div>
      </li>
    </Link>
  )
}

export default CSSModules(ClassListItem, styles);