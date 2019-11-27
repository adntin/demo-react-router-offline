import React from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import Product from './Product';

function ProductList() {
  const { url } = useRouteMatch();
  return (
    <div>
      <p>Product List</p>
      <ul>
        <li>
          <Link to={`${url}/1`}>Product 1</Link>
        </li>
        <li>
          <Link to={`${url}/2`}>Product 2</Link>
        </li>
        <li>
          <Link to={`${url}/3`}>Product 3</Link>
        </li>
      </ul>
      <Route path={`${url}/:id`}>
        <Product />
      </Route>
    </div>
  );
}

export default ProductList;
