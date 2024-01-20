export enum SocketEnum {
    CONNECTION = 'connection',
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    JOIN = 'join',
    USER_JOINED = 'user_joined',
    LEAVE = 'leave',
    USER_LEFT = 'user_left',
    TYPING = 'typing',
    MESSAGE = 'message',
}

export interface IJoin {
    clientId: string;
    userId: string;
}

export interface ILeave {
    clientId: string;
}

