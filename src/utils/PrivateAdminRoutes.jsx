import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const PrivateAdminRoutes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const cookies = new Cookies();

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACK_URL + "/authenticated", { withCredentials: true });
                const role = response.data.data.role;
                if (role === "admin") {
                    setIsAdmin(true);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    try {
                        const tokenResponse = await axios.get(process.env.REACT_APP_BACK_URL + "/refresh", { withCredentials: true });
                        const newAccessToken = tokenResponse.data.data.newAccessToken;
                        cookies.set("access_token", newAccessToken, { path: '/'});

                        const retryResponse = await axios.get(process.env.REACT_APP_BACK_URL + "/authenticated", { withCredentials: true });
                        const role = retryResponse.data.data.role;
                        if (role === "admin") {
                            setIsAdmin(true);
                            setIsAuthenticated(true);
                        } else {
                            setIsAuthenticated(false);
                        }
                    } catch (retryError) {
                        console.log("Retry failed, redirecting to login");
                        setIsAuthenticated(false);
                    }
                } else {
                    console.log("Error in authentication", error);
                    setIsAuthenticated(false);
                }
            } finally {
                setIsLoading(false);
            }
        };

        authenticateUser();
    }, []);

    if (isLoading) {
        return <div></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAuthenticated && isAdmin) {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
};

export default PrivateAdminRoutes;
