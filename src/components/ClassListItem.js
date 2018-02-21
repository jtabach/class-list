import React from 'react';

const ClassListItem = ({ item }) => {
  console.log(item);
  return (
    <h2 key={Math.random()}>{item.id}</h2>
  )
}

export default ClassListItem;