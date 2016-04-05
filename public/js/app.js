/*globals io, Uint8Array*/
$(function() {
    var socket = io();

    var canvas =$('#video').get(0);
    var cx = canvas.getContext('2d');
    var img = new Image();

    cx.fillStyle = '#333';
    cx.fillText('Loading...', canvas.width / 2 - 30, canvas.height / 3);

    socket.on('frame', function(data) {
        var uint8Arr = new Uint8Array(data.image);
        var str = String.fromCharCode.apply(null, uint8Arr);
        var base64String = btoa(str);

        img.onload = function() {
            cx.drawImage(this, 0, 0, canvas.width, canvas.height);
        };
        img.src = 'data:image/png;base64,' + base64String;
    });
});