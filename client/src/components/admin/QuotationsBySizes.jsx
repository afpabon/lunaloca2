import _ from 'lodash';
import React from 'react';
import { uuid } from 'uuidv4';

const getPrice = (quotations, size) =>
  _.get(_.find(quotations, q => q.size === size), 'price', null);

const QuotationsBySizes = ({
  availableSizes,
  quotations,
  onQuotationsChanged,
}) => {
  const updateQuotation = (e, size) => {
    const price = e.target.value;
    const index = _.findIndex(quotations, q => q.size === size);
    if (index >= 0 && price === '') {
      const quotationsCopy = [...quotations];
      quotationsCopy.splice(index, 1);
      onQuotationsChanged(quotationsCopy);
    } else if (index >= 0 && price !== '') {
      onQuotationsChanged(
        quotations
          .slice(0, index)
          .concat({ size, price: parseInt(e.target.value) })
          .concat(quotations.slice(index + 1)),
      );
    } else if (price !== '') {
      onQuotationsChanged(
        quotations.concat({
          size,
          price: parseInt(e.target.value),
        }),
      );
    }
  };

  return (
    <div>
      <ul className='list-group'>
        {_.map(_.sortBy(_.sortBy(availableSizes), 'index'), size => (
          <li key={uuid()} className='list-group-item'>
            <div className='row'>
              <div className='col-md-2'>
                <span className='badge badge-primary badge-pill'>{size}</span>
              </div>
              <div className='col-md-10'>
                <div className='input-group'>
                  <input
                    type='number'
                    className={`form-control${
                      getPrice(quotations, size) === null
                        ? ' border-warning'
                        : ''
                    }`}
                    placeholder='Precio'
                    defaultValue={getPrice(quotations, size)}
                    onBlur={e => updateQuotation(e, size)}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuotationsBySizes;
