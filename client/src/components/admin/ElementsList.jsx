import _ from 'lodash';
import React, { useState, useRef } from 'react';
import { uuid } from 'uuidv4';
import { Button } from 'react-bootstrap';

const ElementsList = ({ elements, onChange, newAllowed }) => {
  const [editingElementIndex, setEditingElementIndex] = useState(-1);
  const inputRef = useRef(null);

  const adjustIndices = (element, up) => {
    const index = _.findIndex(
      elements,
      e => e._id.toString() === element._id.toString(),
    );
    if (index >= 0) {
      const newElements = [...elements];
      if (up && index > 0) {
        newElements[index].index -= 1;
        newElements[index - 1].index += 1;
      } else if (!up && index < elements.length - 1) {
        newElements[index].index += 1;
        newElements[index + 1].index -= 1;
      }
      onChange(elements);
    }
  };

  const createElement = () => {
    const newIndex = elements.length;
    onChange([
      ...elements,
      { _id: uuid(), index: newIndex, name: '', isNew: true },
    ]);
    setEditingElementIndex(newIndex);
  };

  const removeElement = element => {
    const index = _.findIndex(
      elements,
      e => e._id.toString() === element._id.toString(),
    );
    if (index >= 0) {
      const newElements = [...elements];
      newElements.splice(index, 1);
      onChange(newElements);
    }
  };

  const nameChanged = () => {
    const newElements = [...elements];
    newElements[editingElementIndex].name = inputRef.current.value;
    onChange(newElements);
    setEditingElementIndex(-1);
  };

  return (
    <ul className='list-group'>
      {_.map(_.sortBy(elements, 'index'), (element, index) => (
        <li key={uuid()} className='list-group-item'>
          <div className='btn-toolbar' role='toolbar'>
            {index === editingElementIndex ? (
              <div className='btn-group' role='group'>
                <Button
                  className='btn btn-light btn-xs'
                  onClick={() => nameChanged()}
                >
                  <i className='fas fa-check' />
                </Button>
                <Button
                  className='btn btn-light btn-xs'
                  onClick={() => setEditingElementIndex(-1)}
                >
                  <i className='fas fa-times' />
                </Button>
              </div>
            ) : (
              <div className='btn-group' role='group'>
                <Button
                  className='btn btn-light btn-xs'
                  onClick={() => adjustIndices(element, true)}
                >
                  <i className='fas fa-chevron-up' />
                </Button>
                <Button
                  className='btn btn-light btn-xs'
                  onClick={() => adjustIndices(element, false)}
                >
                  <i className='fas fa-chevron-down' />
                </Button>
                <Button
                  className='btn btn-light btn-xs'
                  onClick={() => setEditingElementIndex(index)}
                >
                  <i className='fas fa-pencil-alt' />
                </Button>
                <Button
                  className='btn btn-light btn-xs'
                  onClick={() => removeElement(element)}
                >
                  <i className='fas fa-trash' />
                </Button>
              </div>
            )}
            <div className='input-group'>
              {index === editingElementIndex ? (
                <input
                  type='text'
                  className='form-control'
                  placeholder='Elemento'
                  defaultValue={element.name}
                  ref={inputRef}
                />
              ) : (
                element.name
              )}
            </div>
          </div>
        </li>
      ))}
      {newAllowed && (
        <li key={uuid()} className='list-group-item'>
          <div className='btn-toolbar' role='toolbar'>
            <div className='btn-toolbar' role='toolbar'>
              <div className='btn-group' role='group'>
                <Button
                  className='btn btn-light btn-xs'
                  onClick={() => createElement()}
                >
                  <i className='fas fa-plus' />
                </Button>
              </div>
            </div>
          </div>
        </li>
      )}
    </ul>
  );
};

export default ElementsList;
