import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './ClassListItem.scss';

const ClassListItem = ({ item }) => {
  console.log(item);
  const {
    end_time,
    id,
    img_url,
    instructor,
    price,
    start_time,
    title
  } = item;

  return (
    <Link to={`class/${item.id}`}>
      <li>
        <img src={img_url} alt=""/>
        <h4>{title}</h4>
        <p>{instructor}</p>
        <p>{start_time} - {end_time}</p>
        <div>
          {price}
        </div>
      </li>
    </Link>
  )
}

export default ClassListItem;