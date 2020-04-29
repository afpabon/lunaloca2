export const GALLERY_GROUP = {
  CUPCAKES: 1,
  CAKES: 2,
  OTHERS: 99,
};

export const getGalleryLabelById = id => {
  switch (id) {
    case 1:
      return 'Cupcakes';
    case 2:
      return 'Tortas';
    case 99:
      return 'Otros';
    default:
      return '';
  }
};
