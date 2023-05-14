import { io } from 'socket.io-client';
import { createContext } from 'react';

//FIXME: 현재 Context로 생성된 Socket을 상품 상세 페이지에서만 사용하게 수정

const SOCKET_URL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}auction`;

export const socket = io(`${SOCKET_URL}`);
export const SocketContext = createContext(socket);
