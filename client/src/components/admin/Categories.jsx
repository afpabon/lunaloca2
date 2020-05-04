import Swal from 'sweetalert2';
import _ from 'lodash';
import { uuid } from 'uuidv4';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CategoriesRow from './CategoriesRow';
import EditCategory from './EditCategory';

import {
  loadAdminCategories,
  editCategory,
  removeCategory,
} from '../../actions/categories';
import { setLoadingStatus } from '../../actions/loadingStatus';

import { Button } from 'react-bootstrap';

const Categories = ({
  categories,
  loadAdminCategories,
  editCategory,
  removeCategory,
  setLoadingStatus,
}) => {
  useEffect(() => {
    loadAdminCategories();
  }, [loadAdminCategories]);

  const removeRequested = category => {
    Swal.fire({
      title: '¿Estás segur@?',
      text: '¡La categoría será eliminada de la base de datos!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, ¡mejor no!',
      confirmButtonText: 'Sí, ¡estoy segur@!',
    }).then(async confirm => {
      if (confirm.value) {
        setLoadingStatus(true);
        await removeCategory(category);
        setLoadingStatus(false);
      } else {
        Swal.fire('Cancelado', 'La categoría no ha sido eliminada', 'error');
      }
    });
  };

  return (
    <>
      <EditCategory />
      <div className='card'>
        <div className='card-body'>
          <h3>Categorías</h3>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>En menú</th>
                <th scope='col'>Unidades</th>
                <th scope='col'>Tamaños aceptables</th>
                <th scope='col'>Elementos cotizables</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {_.map(categories, category => (
                <>
                  <CategoriesRow
                    key={uuid()}
                    category={category}
                    onEdit={() => editCategory(category)}
                    onDelete={() => removeRequested(category._id.toString())}
                  />
                </>
              ))}
            </tbody>
          </table>
          <Button
            className='btn btn-noteworthy btn-xs'
            onClick={() => editCategory()}
          >
            <i className='fas fa-plus' /> Agregar categoría
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  categories: state.categories.categoriesData,
});

const mapDispatchToProps = {
  loadAdminCategories,
  editCategory,
  removeCategory,
  setLoadingStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categories);
