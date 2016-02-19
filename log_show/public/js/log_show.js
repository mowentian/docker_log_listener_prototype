var socket = io('http://127.0.0.1:3001');

socket.on('counts', (data) => {
  console.log(data);
  Morris.Donut({
    element: 'donut-example',
    data: data
  });
});
