import { createBrowserRouter } from "react-router-dom";

// import pages
import Lapangan from "./pages/Lapangan";
import Home from "./pages/Home";
import Profile from "./pages/Customer/Profile";
import PaymentCustomer from "./pages/Customer/Payment";
import HistoryCustomer from "./pages/Customer/History";

import FieldOwner from "./pages/Owner/AddField";
import EditField from "./pages/Owner/EditField";

import { PrivateRoute } from "./helper/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { ProtectedAuth } from "./helper/ProtectedAuth";
import MainLayout from "./components/MainLayout";
import PaymentOwner from "./pages/Owner/PaymentOwner";

// routernya
const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/profile", element: <Profile /> },
          { path: "/lapangan", element: <Lapangan /> },
          { path: "/editlapangan", element: <EditField /> },
          { path: "/lapangan/:id", element: <PaymentCustomer /> },
          { path: "/historypayment", element: <HistoryCustomer /> },
          { path: "/fields", element: <FieldOwner /> },
          { path: "/paymentowner", element: <PaymentOwner /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedAuth />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

export default router;
