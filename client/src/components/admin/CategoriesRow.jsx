import _ from 'lodash';
import React from 'react';

const CategoriesRow = ({ category, onEdit, onDelete }) => (
  <>
    <tr
      data-toggle='collapse'
      data-target={`#edit_${category._id.toString()}`}
      className='accordion-toggle'
    >
      <td>{_.get(category, 'publicid')}</td>
      <td>{_.get(category, 'name')}</td>
      <td>{_.get(category, 'onmenu') ? 'Sí' : 'No'}</td>
      <td>{_.get(category, 'units')}</td>
      <td>{_.get(category, 'validsizes').join(', ')}</td>
      <td>{_.map(_.get(category, 'elements'), e => e.name).join(', ')}</td>
      <td>
        <button
          className='btn btn-sm btn-noteworthy'
          type='button'
          onClick={() => onEdit(category._id)}
        >
          <i className='fas fa-pencil-alt' />
        </button>
        <button
          className='btn btn-sm btn-danger'
          type='button'
          onClick={() => onDelete(category._id)}
        >
          <i className='fas fa-trash' />
        </button>
      </td>
    </tr>
  </>
);

export default CategoriesRow;
