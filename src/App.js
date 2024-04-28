import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/style.scss';
import HomeLayout from './HomeLayout';
import DashboardLayout from './DashboardLayout';
import OrderLayout from './OrderLayout';
import { frontAppRoutes, dashboardRoutes, orderRoutes, normalRouts } from "./routes";
import NormalLayout from './NormalLayout';

function App() {
  return (
    <>
      <div className="main-container">
        <BrowserRouter>
          <div className="main-body-container">
            <Suspense>
              <Routes>
                <Route
                  path='/success'
                  element={<NormalLayout />}
                >
                  {normalRouts.map(
                    (route, indx) => route.element && (
                      <Route
                        key={indx}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        strict={route.strict}
                      />
                    ),
                  )}
                </Route>
                <Route
                  path='/dashboard'
                  element={<DashboardLayout />}
                >
                  {dashboardRoutes.map(
                    (route, indx) => route.element && (
                      <Route
                        key={indx}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        strict={route.strict}
                      />
                    ),
                  )}
                </Route>
                <Route
                  path='/order'
                  element={<OrderLayout />}
                >
                  {orderRoutes.map(
                    (route, indx) => route.element && (
                      <Route
                        key={indx}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        strict={route.strict}
                      />
                    ),
                  )}
                </Route>
                <Route
                  path='/'
                  element={<HomeLayout />}
                >
                  {frontAppRoutes.map(
                    (route, indx) => route.element && (
                      <Route
                        key={indx}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        strict={route.strict}
                      />
                    ),
                  )}
                </Route>
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
