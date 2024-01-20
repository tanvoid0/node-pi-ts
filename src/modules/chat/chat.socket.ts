import {Server} from "socket.io";
import AuthSocket from "../auth/auth.socket";

export enum ChatSocketEnum {
    TYPING = 'typing',
    MESSAGE = 'message',
}

class ChatSocket {
    private io: Server;
    // private client;
    private authSocket: AuthSocket = AuthSocket.getInstance();

    constructor(io: Server) {
        this.io = io;
        // this.client = client;
    }

    public run(client: any) {
        // this.io.on(SocketEnum.CONNECT, (client) => {
        console.log('chat socket connected');
        // console.log("Message received: " + data);
        // client.on(ChatSocketEnum.JOIN, async (data: any) => {
        //     try {
        //         console.log(`JOIN: ${data}`)
        //         // const clients = await this.authSocket.userJoined({id, socketId: socket.id});
        //         // this.io.to(socket.id).emit(SOCKET_JOIN, clients);
        //     } catch (e) {
        //         // console.error(e);
        //         // io.to(socket.id).emit(SOCKET_JOIN, null);
        //     }
        // });


        client.on(ChatSocketEnum.TYPING, (client1Id: string, client2Id: string) => {
            // this.io.emit('typing', data)
        });

        client.on(ChatSocketEnum.MESSAGE, (data: any) => {
            console.log(data);
            // this.io.emit('message', data)
        })

        // client.on('location', (data) => {
        //     console.log(data);
        //     this.io.emit('location', data);
        // })
        // });
    }
}

export default ChatSocket;