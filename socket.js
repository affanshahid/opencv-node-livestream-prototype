var cv = require('opencv');

var camWidth = 320;
var camHeight = 240;
var camFps = 30;
var camInterval = 1000 / camFps;

var rectColor = [0, 0, 255];
var rectThickness = 4;

var cam = new cv.VideoCapture(0);
cam.setHeight(camHeight);
cam.setWidth(camWidth);

module.exports = function(socket) {
    setInterval(function() {
        cam.read(function(error, im) {
            if (error)
                throw error;

            im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt2.xml', {}, function(error, faces) {
                if (error) throw error;

                for (var i = 0; i < faces.length; i++) {
                    var face = faces[i];
                    im.rectangle([face.x, face.y], [face.width, face.height], rectColor, rectThickness);
                }

                socket.emit('frame', { image: im.toBuffer() });
            });
        });
    }, camInterval);
};
