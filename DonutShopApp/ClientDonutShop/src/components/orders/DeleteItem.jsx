import React from 'react';

const DeleteItem = ({ type, index, onDeleteItemClick }) => {
  const handleClick = () => {
    onDeleteItemClick(type, index);
  };

  return (
    <button onClick={handleClick}>Delete</button>
  );
};

export default DeleteItem;