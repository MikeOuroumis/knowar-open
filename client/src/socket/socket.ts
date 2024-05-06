import io from 'socket.io-client';
import {apiUrl} from '../config';

const socket = io(apiUrl);
export default socket;
