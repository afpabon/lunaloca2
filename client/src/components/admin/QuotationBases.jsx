import Swal from 'sweetalert2';
import _ from 'lodash';
import { uuid } from 'uuidv4';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import QuotationBasesRow from './QuotationBasesRow';
import EditQuotationBase from './EditQuotationBase';

import { loadCategories, loadElements } from '../../actions/main';
import {
  loadAdminQuotationBases,
  editQuotationBase,
  removeQuotationBase,
  setAdminCategory,
  setAdminElement,
} from '../../actions/quotationBases';
import { setLoadingStatus } from '../../actions/loadingStatus';

import { Button, Dropdown } from 'react-bootstrap';

const QuotationBases = ({
  categories,
  elements,
  quotationBases,
  category,
  element,
  loadCategories,
  loadElements,
  loadAdminQuotationBases,
  editQuotationBase,
  removeQuotationBase,
  setLoadingStatus,
  setAdminCategory,
  setAdminElement,
}) => {
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (category) loadElements(category._id);
  }, [loadElements, category]);

  useEffect(() => {
    if (category && element) loadAdminQuotationBases(category._id, element._id);
  }, [loadAdminQuotationBases, category, element]);

  const removeRequested = quotationBase => {
    Swal.fire({
      title: '¿Estás segur@?',
      text: '¡La base de cotización será eliminada de la base de datos!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, ¡mejor no!',
      confirmButtonText: 'Sí, ¡estoy segur@!',
    }).then(async confirm => {
      if (confirm.value) {
        setLoadingStatus(true);
        await removeQuotationBase(quotationBase);
        setLoadingStatus(false);
      } else {
        Swal.fire(
          'Cancelado',
          'La base de cotización no ha sido eliminada',
          'error',
        );
      }
    });
  };

  const table = category && element && (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Nombre</th>
            <th scope='col'>Descripción</th>
            <th scope='col'>Precios por tamaños</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {_.map(quotationBases, quotationBase => (
            <>
              <QuotationBasesRow
                key={uuid()}
                quotationBase={quotationBase}
                onEdit={() => editQuotationBase(quotationBase)}
                onDelete={() => removeRequested(quotationBase._id.toString())}
              />
            </>
          ))}
        </tbody>
      </table>
      <Button
        className='btn btn-noteworthy btn-xs'
        onClick={() => editQuotationBase()}
      >
        <i className='fas fa-plus' /> Agregar base de cotización
      </Button>
    </>
  );

  return (
    <>
      <EditQuotationBase />
      <div className='card'>
        <div className='card-body' style={{ minHeight: 500 }}>
          <h3>Bases de cotización</h3>
          <div className='btn-group'>
            <Dropdown>
              <Dropdown.Toggle variant='light' id='category'>
                {category ? category.name : 'Categoría'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {_.map(categories, category => (
                  <Dropdown.Item
                    key={uuid()}
                    onClick={() => setAdminCategory(category)}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {category && (
              <Dropdown>
                <Dropdown.Toggle variant='light' id='category'>
                  {element ? element.name : 'Elemento'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {_.map(elements, element => (
                    <Dropdown.Item
                      key={uuid()}
                      onClick={() => setAdminElement(element)}
                    >
                      {element.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
          {table}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  categories: state.main.categories,
  elements: state.main.elements,
  quotationBases: state.quotationBases.quotationBasesData,
  category: state.quotationBases.category,
  element: state.quotationBases.element,
});

const mapDispatchToProps = {
  loadCategories,
  loadElements,
  loadAdminQuotationBases,
  editQuotationBase,
  removeQuotationBase,
  setLoadingStatus,
  setAdminCategory,
  setAdminElement,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuotationBases);
