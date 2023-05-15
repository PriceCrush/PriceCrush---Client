import { io } from 'socket.io-client';
import { createContext } from 'react';

const SOCKET_URL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}auction`;

export const socket = io(`${SOCKET_URL}`);
export const SocketContext = createContext(socket);
