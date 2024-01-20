import {Application} from "express";
import {Server} from 'socket.io';
import {Server as HttpServer} from 'http';
import {logger} from "./utils/logger";
import ChatSocket from "./modules/chat/chat.socket";
import {PORT, SOCKET_PORT} from "./config/common.config";
import {SocketEnum} from "./interfaces/socket.interface";
import {ObjectId, Types} from "mongoose";
import {UserActiveVO} from "./modules/user/user.vo";
import AuthSocket from "./modules/auth/auth.socket";

class SocketServer {
    private readonly io;
    private chatSocket: ChatSocket;
    private readonly server;
    private connectedClients = new Map();
    private authSocket = AuthSocket.getInstance();

    constructor(server: HttpServer) {
        logger.debug("Socket Server initialized")
        this.io = new Server(server);
        this.server = server;

        this.chatSocket = new ChatSocket(this.io);
    }

    start() {
        logger.debug("Socket Server initialized");

        this.io.on(SocketEnum.CONNECTION, (client) => {

            console.log(`client with socketId=${client.id} connected`);
            this.connectedClients.set(client.id, client);
            // send connection client id to client
            this.chatSocket.run(client);

            client.on(SocketEnum.JOIN, async (userId: ObjectId) => {
                try {
                    console.log(`client with id=${userId} connected`)
                    const user: UserActiveVO = {
                        id: userId,
                        clientId: client.id,
                        active: true,
                    };
                    const users = await this.authSocket.userJoined(user);
                    // this.connectedClients.set(client.id, user);
                    // console.log(`connected clients: ${JSON.stringify(this.connectedClients)}`)
                    this.io.to(client.id).emit(SocketEnum.JOIN, user);
                    client.emit(SocketEnum.USER_JOINED, users);
                } catch(ex) {
                    console.error(`${SocketEnum.JOIN} error: ${ex}`);
                }
            });
            //
            // client.on(SocketEnum.JOIN, (id: string) => {
            //     try {
            //         console.log(`User joined with id=${id}`);
            //         // this.io.emit('join', data);
            //     } catch (ex) {
            //         console.error(ex);
            //     }
            // });
            //
            // client.on(SocketEnum.LEAVE, (id: string) => {
            //     console.log(`User left ${client.id}`);
            //     // this.io.emit('leave', data);
            // });

            //
            // client.on('connect', () => {
            //     console.log("Someone connected");
            // })

            client.on('disconnect', () => {
                console.log('client disconnect...', client.id)
                console.log(`Connected clients: ${JSON.stringify(this.connectedClients)}`)
                // this.io.emit('leave', client);
                // this.io.emit('disconnect', client.id);
                this.connectedClients.delete(client.id);
            })

            client.on('error', (err: any) => {
                console.log('received error from client:', client.id)
                console.log(err)
            })
        })

        this.server.listen(SOCKET_PORT, (err?: any) => {
            if (err) throw err;
            logger.info(`Listening on socket ${SOCKET_PORT}`);
        });
    }
}

export default SocketServer;