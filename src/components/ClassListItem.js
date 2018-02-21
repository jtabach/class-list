import React from 'react';

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
    <li>
      <img src={img_url} alt=""/>
      <h4>{title}</h4>
      <p>{instructor}</p>
      <p>{start_time} - {end_time}</p>
      <div>
        {price}
      </div>
    </li>
  )
}

export default ClassListItem;