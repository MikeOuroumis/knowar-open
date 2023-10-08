import io from 'socket.io-client';
import {apiUrl} from '../constants/constants';

const socket = io(apiUrl + ':5000');
export default socket;
