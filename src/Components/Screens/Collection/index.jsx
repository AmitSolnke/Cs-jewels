import React from 'react';

import { useSearchParams } from 'react-router-dom';
import SingleCollection from './SingleCollection';
import CollectionCataloguePage from './CollectionCatalogue';

const Collection = () => {
  const [searchParams] = useSearchParams();
  const collectionMasterId = searchParams?.get('collectionId');
  const page = searchParams?.get('page');
  return (
    <>
      {collectionMasterId || page ? (
        <SingleCollection page={page} collectionMasterId={collectionMasterId} />
      ) : (
        <CollectionCataloguePage />
      )}
    </>
  );
};

export default Collection;
