import {io, Socket} from 'socket.io-client';

import {HOST_NAME, PRODUCTION, HOST_NAME_TEST} from '@env';

const hostName = PRODUCTION == 'true' ? HOST_NAME : HOST_NAME_TEST;
// const hostName = 'https://app.trollaexpress.com/';
let socket;
console.log('soc', hostName);
try {
  console.log('initializing socket----');
  socket = io(hostName, {autoConnect: true, timeout: 1000 * 10});
  socket.on('connect', data => {
    console.log('socket initialized on --', hostName);
  });
  socket.on('disconnect', data => {
    console.log('socket disconnected--');
  });
  socket.on('error', data => {
    console.log('socket error--,', data);
  });
} catch (error) {
  console.log('socket is not initialized--', error);
}

// const socket = io(HOST_NAME,{autoConnect: true, timeout: 1000 * 10});

export default socket;
