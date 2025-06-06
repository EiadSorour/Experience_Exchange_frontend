import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const PrivateRoutes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const cookies = new Cookies();

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                console.log("2 Starting authenticated one");
                console.log(`3 sending GET request to ${process.env.REACT_APP_BACK_URL}/authenticated with credentials`);

                const response = await axios.get(process.env.REACT_APP_BACK_URL + "/authenticated", { withCredentials: true });
                
                console.log("Authenticated 1 done");
                console.log(`role : ${response.data.data.role}`);
                
                const role = response.data.data.role;
                if (role === "client") {
                    setIsClient(true);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    try {
                        const tokenResponse = await axios.get(process.env.REACT_APP_BACK_URL + "/refresh", { withCredentials: true });
                        const newAccessToken = tokenResponse.data.data.newAccessToken;
                        cookies.set("access_token", newAccessToken, { secure: true , sameSite: "none" ,path: '/', domain: "up.railway.app"});

                        const retryResponse = await axios.get(process.env.REACT_APP_BACK_URL + "/authenticated", { withCredentials: true });
                        const role = retryResponse.data.data.role;
                        if (role === "client") {
                            setIsClient(true);
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
        console.log("Redirect to login not authenticated");
        return <Navigate to="/login" />;
    }

    if (isAuthenticated && isClient) {
        console.log("Go to child !");
        return <Outlet />;
    }

    console.log("Redirect to login");
    return <Navigate to="/login" />;
};

export default PrivateRoutes;
