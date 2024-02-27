import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'app/styles/index.scss';
import { Add } from 'pages/Add';
import { Books } from 'pages/Books';
import { Update } from 'pages/Update';

const routes = [
  {
    path: '/',
    element: <Books />,
  },
  {
    path: '/add',
    element: <Add />,
  },
  {
    path: '/update/:id',
    element: <Update />,
  }
]

const App = () => (
  <div className="app">
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<Suspense fallback={<div>loading...</div>}>
              {element}
            </Suspense>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  </div>
)

export default App;
