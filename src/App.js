import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RenderRoute from './RenderRoute';

function App() {
  return (
    <BrowserRouter>
      <Route path="*">
        <RenderRoute />
      </Route>
    </BrowserRouter>
  );
}

export default App;
