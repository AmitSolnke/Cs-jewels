import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useScrollToTop } from "./hooks";
import {
  frontAppRoutes,
  dashboardRoutes,
  orderRoutes,
  normalRouts,
} from "./routes";
import HomeLayout from "./HomeLayout";
import DashboardLayout from "./DashboardLayout";
import OrderLayout from "./OrderLayout";
import NormalLayout from "./NormalLayout";

import "./scss/style.scss";

const renderRoutes = (routes) =>
  routes.map((route, indx) =>
    route.element ? (
      <Route
        key={indx}
        path={route.path}
        element={route.element}
        exact={route.exact}
        strict={route.strict}
      />
    ) : null
  );

function App() {
  useScrollToTop();

  return (
    <div className="main-container">
      <div className="main-body-container">
        <Suspense>
          <Routes>
            <Route path="/success" element={<NormalLayout />}>
              {renderRoutes(normalRouts)}
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
              {renderRoutes(dashboardRoutes)}
            </Route>
            <Route path="/order" element={<OrderLayout />}>
              {renderRoutes(orderRoutes)}
            </Route>
            <Route path="/" element={<HomeLayout />}>
              {renderRoutes(frontAppRoutes)}
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
