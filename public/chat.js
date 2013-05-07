//Crea un módulo de chat para usar.
(function () {
  window.Chat = {
    socket : null,
  
    initialize : function(socketURL) {
      this.socket = io.connect(socketURL);

      //Para enviar los mensajes presionando enter o presionando el boton envia
      $('#send').click(function() {
        Chat.send();
       });

      $('#message').keyup(function(evt) {
        if ((evt.keyCode || evt.which) == 13) {
          Chat.send();
          return false;
        }
      });

      //Procesa cualquier mensaje entrante
      this.socket.on('new', this.add);
    },

    //Añade un nuevo mensaje en el chat.
    add : function(data) {
      var name = data.name || 'anonymous';
      var msg = $('<div class="msg"></div>')
        .append('<span class="name">' + name + '</span>: ')
        .append('<span class="text">' + data.msg + '</span>');

      $('#messages')
        .append(msg)
        .animate({scrollTop: $('#messages').prop('scrollHeight')}, 0);
    },
 
    //Envia un mensaje al servidor
    //Luego limpia el area del texto
    send : function() {
      this.socket.emit('msg', {
        name: $('#name').val(),
        msg: $('#message').val()
      });

      $('#message').val('');

      return false;
    }
  };
}());