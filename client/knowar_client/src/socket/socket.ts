import io from 'socket.io-client';
import {apiUrl} from '../constants/constants';

const socket = io(apiUrl);
export default socket;
