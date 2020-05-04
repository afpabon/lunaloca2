import _ from 'lodash';
import React from 'react';

const QuotationBasesRow = ({ quotationBase, onEdit, onDelete }) => (
  <>
    <tr
      data-toggle='collapse'
      data-target={`#edit_${quotationBase._id.toString()}`}
      className='accordion-toggle'
    >
      <td>{_.get(quotationBase, 'name')}</td>
      <td>{_.get(quotationBase, 'description')}</td>
      <td>
        {_.map(
          _.sortBy(_.get(quotationBase, 'quotationbysizes'), 'size'),
          e => `${e.price} (${e.size})`,
        ).join(', ')}
      </td>
      <td>
        <button
          className='btn btn-sm btn-noteworthy'
          type='button'
          onClick={() => onEdit(quotationBase._id)}
        >
          <i className='fas fa-pencil-alt' />
        </button>
        <button
          className='btn btn-sm btn-danger'
          type='button'
          onClick={() => onDelete(quotationBase._id)}
        >
          <i className='fas fa-trash' />
        </button>
      </td>
    </tr>
  </>
);

export default QuotationBasesRow;
