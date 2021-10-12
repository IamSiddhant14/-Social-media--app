
module.exports.chatSockets = function(socketServer){
        //Receving the request for connection
    //io will be handling the connection
    let io = require('socket.io')(socketServer);
    //connect on the front-end but here it is connection

    io.sockets.on('connection', function(socket){
         //sending the acknowlegment to server  - step2
        console.log('new connection received', socket.id);
         //This event is been detcted automatically

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        
        socket.on('join_room', function(data){
            console.log('joining request rec.', data);
             //if this chat room exist then it would entre that chat room if not then it will create that chat room and entre it 

            socket.join(data.chatroom);
            //when this joining chat room happen that the other user must be made aware that some on else joined that chat room
            //when we need to emit in a particular chat room we use io.in

            io.in(data.chatroom).emit('user_joined', data);
        });

        // detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });

    });

}