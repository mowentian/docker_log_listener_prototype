var socket = io('http://127.0.0.1:3001');

socket.on('welcome', function (data) {
  console.log(data);
});

socket.on('counts', (data) => {
  console.log(data);
});
