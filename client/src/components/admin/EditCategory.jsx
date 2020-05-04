import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import ElementsList from './ElementsList';

import {
  cancelEditCategory,
  updateCategory,
  saveCategory,
  removeCategory,
} from '../../actions/categories';

const MAX_SIZES = 100;

export const EditCategory = ({
  category,
  cancelEditCategory,
  updateCategory,
  saveCategory,
}) => {
  const { publicid, name, onmenu, units, validsizes, elements } = category;
  const [availableSizes, setAvailableSizes] = useState([]);

  useEffect(() => {
    setAvailableSizes(_.difference(_.range(1, MAX_SIZES), validsizes));
  }, [setAvailableSizes, validsizes]);

  const onChange = e =>
    updateCategory({ ...category, [e.target.name]: e.target.value });

  return (
    <Modal
      show={category.isNew !== undefined}
      onHide={cancelEditCategory}
      className='modal-container'
    >
      {category !== null && (
        <>
          <Modal.Body>
            <div className='form-group'>
              <label htmlFor='publicid'>Id pública</label>
              <input
                type='number'
                className='form-control'
                placeholder='Id pública'
                min={1}
                value={publicid}
                id='publicid'
                onChange={e =>
                  updateCategory({
                    ...category,
                    publicid: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Nombre</label>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre'
                value={name}
                id='name'
                name='name'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-check'>
              <input
                type='checkbox'
                className='form-check-input'
                id='onmenu'
                checked={onmenu}
                onChange={e =>
                  updateCategory({
                    ...category,
                    onmenu: e.target.checked,
                  })
                }
              />
              <label className='form-check-label' htmlFor='onmenu'>
                En menú
              </label>
            </div>
            <div className='form-group'>
              <label htmlFor='units'>Unidades</label>
              <input
                type='text'
                className='form-control'
                placeholder='Unidades'
                value={units}
                id='units'
                name='units'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='validsizes'>Tamaños permitidos</label>
              <Typeahead
                id='validsizes'
                multiple
                onChange={e =>
                  updateCategory({
                    ...category,
                    validsizes: _.map(e, i => parseInt(i)),
                  })
                }
                options={_.map(availableSizes, obj => obj.toString())}
                placeholder='Tamaños permitidos'
                selected={_.map(validsizes, obj => obj.toString())}
                selectHintOnEnter
              />
            </div>
            <div className='form-group'>
              <label htmlFor='elements'>Elementos cotizables</label>
              <ElementsList
                elements={_.sortBy(
                  _.filter(elements, e => e.index !== 99),
                  'index',
                )}
                onChange={e => updateCategory({ ...category, elements: e })}
                newAllowed
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='button'
              className='btn btn-warning'
              onClick={cancelEditCategory}
            >
              Cerrar
            </Button>
            <Button
              type='button'
              className='btn btn-highlight'
              onClick={() => saveCategory(category)}
            >
              Guardar
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

EditCategory.propTypes = {
  category: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  category: state.categories.editingCategory,
  cancelEditCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  saveCategory: PropTypes.func.isRequired,
});

const mapDispatchToProps = { cancelEditCategory, updateCategory, saveCategory };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditCategory);
