import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {

        const cookies = new Cookies();
        const token = cookies.get("access_token");
        const user = jwtDecode(token);
        const newSocket = io(process.env.REACT_APP_GATEWAY_SOCKET_URL + "/rooms" , 
            {
                extraHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        setSocket(newSocket);

        return () => newSocket.close(); // Cleanup on unmount
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
