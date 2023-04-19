import io from 'socket.io-client';
const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
if (!SERVER_BASE_URL) throw new Error('SERVER_BASE_URL is not defined');

export const socket = io(SERVER_BASE_URL, {});
