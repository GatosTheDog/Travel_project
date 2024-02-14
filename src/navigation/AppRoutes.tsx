import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { PackagesScreen } from "../screens/PackagesScreen";
import { PACKAGES } from "../lib/navigator";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={PACKAGES} />} />
        <Route path={PACKAGES} element={<PackagesScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
