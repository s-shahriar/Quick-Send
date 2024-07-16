import { createBrowserRouter } from "react-router-dom";
import HrProtector from "../Components/HrProtector";
import LoginProtector from "../Components/LoginProtect";
import PrivateRoute from "../Components/PrivateRoute";
import RegisterProtect from "../Components/RegisterProtect";
import Transaction from "../Components/Transaction";
import { default as EmployeeProtector, default as UserProtector } from "../Components/UserProtector";
import AddAsset from "../Pages/Add-Asset/AddAsset";
import UpdateAsset from "../Pages/Asset-Update/UpdateAsset";
import AllAssets from "../Pages/Assets-List/AllAssets";
import RequestAssets from "../Pages/Assets-List/RequestAssets";
import ErrorPage from "../Pages/Error-Page/ErrorPage";
import Home from "../Pages/Home/Home";
import JoinAsEmployee from "../Pages/Join/JoinAsEmploye";
import JoinAsHR from "../Pages/Join/JoinAsHR";
import Register from "../Pages/Join/Register";
import Layout from "../Pages/Layout/Layout";
import Login from "../Pages/Login/Login";
import LoginTo from "../Pages/Login/LoginTo";
import NewPayment from "../Pages/Payment/NewPayment";
import Payment from "../Pages/Payment/Payment";
import Profile from "../Pages/Profile/Profile";
import HRRequestsPage from "../Pages/Requested-Assets/HRRequestsPage";
import { default as RequestedAssets } from "../Pages/Requested-Assets/RequestedAssets";
import AddEmployee from "../Pages/Team/AddEmployee";
import EmployeeTeam from "../Pages/Team/EmployeeTeam";
import HREmployeeList from "../Pages/Team/HREmployeeList";
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
        path: "loginTo",
        element: (
          <RegisterProtect>
            <Login></Login>
          </RegisterProtect>
        ),
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
        path: "join-employee",
        element: (
          <RegisterProtect>
            <JoinAsEmployee></JoinAsEmployee>
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
        path: "join-hr",
        element: (
          <RegisterProtect>
            <JoinAsHR></JoinAsHR>
          </RegisterProtect>
        ),
      },
      {
        path: "payment/:packageName",
        element: (
          <HrProtector>
            <Payment></Payment>
          </HrProtector>
        ),
      },
      {
        path: "payment",
        element: (
          <HrProtector>
            <NewPayment></NewPayment>
          </HrProtector>
        ),
      },
      {
        path: "/asset-list",
        element: (
          <HrProtector>
            <AllAssets></AllAssets>
          </HrProtector>
        ),
      },
      {
        path: "/request-asset",
        element: (
          <EmployeeProtector>
            <RequestAssets></RequestAssets>
          </EmployeeProtector>
        ),
      },
      {
        path: "/my-assets",
        element: (
          <EmployeeProtector>
            <RequestedAssets></RequestedAssets>
          </EmployeeProtector>
        ),
      },
      {
        path: "/add-asset",
        element: (
          <HrProtector>
            <AddAsset></AddAsset>
          </HrProtector>
        ),
      },
      {
        path: "/update-asset/:id",
        element: (
          <HrProtector>
            <UpdateAsset></UpdateAsset>
          </HrProtector>
        ),
      },
      {
        path: "my-team",
        element: (
          <EmployeeProtector>
            <EmployeeTeam></EmployeeTeam>
          </EmployeeProtector>
        ),
      },
      {
        path: "employee-list",
        element: (
          <HrProtector>
            <HREmployeeList></HREmployeeList>
          </HrProtector>
        ),
      },
      {
        path: "add-employee",
        element: (
          <HrProtector>
            <AddEmployee></AddEmployee>
          </HrProtector>
        ),
      },
      {
        path: "all-requests",
        element: (
          <HrProtector>
            <HRRequestsPage></HRRequestsPage>
          </HrProtector>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
