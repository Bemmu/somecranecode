$(function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:8000');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
    };

    $('#left, #right, #forward, #backward').on('mousedown mouseup', function () {
        $('#left, #right, #forward, #backward').removeClass('down');
        $(this).toggleClass('down');
        var pin = $(this).data('pin');
        var bool = $(this).hasClass('down') ? 1 : 0;
        var text = 'Pin ' + pin + ' ' + bool;
        socket.emit('send', { message: text });
        socket.emit('set_pin', { pin: pin, bool: bool });
    });
 
});