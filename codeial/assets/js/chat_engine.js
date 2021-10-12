//creating the connection
//front-end or subsriber
class ChatEngine {
    //ID of the chat box ,email id of the user
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;


        //initating the connection request,io is been given to us by socket.io file
        this.socket = io.connect('http://localhost:5000');//step-1

        if (this.userEmail) {
            this.connectionHandler();
        }

    }


    connectionHandler() {
        //this will handle the to and fro connection bewteen the user and the server
        //on detects the event
        //this will run after establising the connection 
        let self = this;

        this.socket.on('connect', function () {
            console.log('connection establish using socket..')//step-3
            //This name could be anything but should correspond with the server as well,and should be meanig full as well
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            }
            );

            self.socket.on('user_joined', function (data) {
                console.log('a user joined', data);
            })
        });
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg !=''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}
