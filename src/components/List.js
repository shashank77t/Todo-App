import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function List({ items, removeItem, editItem }) {
  // Check if items is not an array or is empty
  if (!Array.isArray(items) || items.length === 0) {
    return <p>No items to display</p>;
  }

  return (
   
    <div className='container'>
      <ul className='list-group list-group-flush'>
        {items.map((item) => {
          const { id, title } = item;
          console.log(item);
          return (
            <li className='list-group-item d-flex justify-content-between align-items-center' key={id}>
              {title}
         
              <div style={{ float: 'right' }}>
                <button type='button' className='edit-btn' onClick={() => editItem(id)}>
                  <FaEdit />
                </button>
                <button type='button' className='delete-btn' onClick={() => removeItem(id)}>
                  <FaTrash />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default List;
