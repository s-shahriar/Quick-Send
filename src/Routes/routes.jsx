import { createBrowserRouter } from "react-router-dom";
import AgentProtector from "../Components/AgentProtector";
import LoginProtector from "../Components/LoginProtect";
import RegisterProtect from "../Components/RegisterProtect";
import Transaction from "../Components/Transaction";
import { default as UserProtector } from "../Components/UserProtector";
import TransactionManagement from "../Pages/Agent/TransactionManagement";
import ErrorPage from "../Pages/Error-Page/ErrorPage";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Join/Register";
import Layout from "../Pages/Layout/Layout";
import LoginTo from "../Pages/Login/LoginTo";
import CashIn from "../Pages/UserTransaction/CashIn";
import CashOut from "../Pages/UserTransaction/CashOut";
import SendMoney from "../Pages/UserTransaction/SendMoney";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: (
          <RegisterProtect>
            <LoginTo></LoginTo>
          </RegisterProtect>
        ),
      },
      {
        path: "register",
        element: (
          <RegisterProtect>
            <Register></Register>
          </RegisterProtect>
        ),
      },
      {
        path: "send-money",
        element: (
          <UserProtector>
            <SendMoney></SendMoney>
          </UserProtector>
        ),
      },
      {
        path: "cash-out",
        element: (
          <UserProtector>
            <CashOut></CashOut>
          </UserProtector>
        ),
      },
      {
        path: "cash-in",
        element: (
          <UserProtector>
            <CashIn></CashIn>
          </UserProtector>
        ),
      },
      {
        path: "transactions-history",
        element: (
          <LoginProtector>
            <Transaction></Transaction>
          </LoginProtector>
        ),
      },
      {
        path: "transaction-management",
        element: (
          <AgentProtector>
            <TransactionManagement></TransactionManagement>
          </AgentProtector>
        ),
      },
    ],
  },
]);

export default router;
