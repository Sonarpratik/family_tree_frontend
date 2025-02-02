import React from "react";
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import Auth from "../../middleware/Auth";
import LoginLoader from "../../atoms/loading/LoginLoader";

const Layout = () => {
    const { isAuthenticated, loading, expand } = useSelector(
        (state) => state.user
    );
    return (
        <div className="flex h-screen">
            {loading && <LoginLoader />}
            {/* {isAuthenticated && <AdminSidebar />} */}
            <div
                style={{
                    minHeight: "calc(102vh - 64px)",
                    maxWidth: "80vw",
                    marginTop: "5rem",
                }}
                className="body-width py-10"
            >
                <Auth>
                    <Outlet />
                </Auth>
            </div>
        </div>
    );
};

export default Layout;
