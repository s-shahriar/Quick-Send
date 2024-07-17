import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const NavBar = () => {
  const { logOut, user, loading } = useAuth();
  const [data, isRoleLoading, error] = useRole();

  const handleLogout = async () => {
    await logOut().then(() => {
      toast.success("Logout Successful", {
        position: "top-center",
      });
    });
  };

  const navOptions = {
    user: [
      { to: "/send-money", label: "Send Money" },
      { to: "/cash-out", label: "Cash Out" },
      { to: "/cash-in", label: "Cash-in" },
      { to: "/transactions-history", label: "Transactions History" },
    ],
    agent: [
      { to: "/transaction-management", label: "Transaction Management" },
      { to: "/transactions-history", label: "Transactions History" },
    ],
    admin: [
      { to: "/transactions-history", label: "Transactions History" },
    ],
  };

  const renderNavLinks = (role, status) =>
    status === "pending" || status === "blocked"
      ? null
      : navOptions[role]?.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                  : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
              }
            >
              {label}
            </NavLink>
          </li>
        ));

  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        {/* mobile menu */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden bg-teal-500 hover:bg-teal-600 px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[55] p-2 shadow bg-white rounded-box w-52 space-y-1"
          >
            {!user && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="block py-2 px-4 hover:bg-teal-500 hover:text-white"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {user && !isRoleLoading && renderNavLinks(data?.role, data?.status)}
          </ul>
        </div>
        {/* mobile menu ends */}

        {/* Company Logo Portion Starts */}
        <NavLink to="/" className="text-base font-extrabold text-yellow-300 ml-4">
          QuicK Send
        </NavLink>
      </div>
      {/* Company Logo Portion Ends */}

      {/* center position */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 text-white uppercase font-bold space-x-6">
          {!user && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-teal-500 text-white rounded-lg"
                      : "block py-2 px-4 hover:bg-teal-500 hover:text-white rounded-lg"
                  }
                >
                  Home
                </NavLink>
              </li>
            </>
          )}
          {user && !isRoleLoading && renderNavLinks(data?.role, data?.status)}
        </ul>
      </div>
      {/* center position ends */}

      {/* end position */}
      <div className="navbar-end space-x-1 md:space-x-4 lg:space-x-4">
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="text-white btn bg-teal-500 border-0 hover:bg-teal-600 hover:border-0"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className="text-white btn bg-teal-500 border-0 hover:bg-teal-600 hover:border-0"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
