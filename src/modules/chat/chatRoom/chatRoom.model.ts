import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {schemaOptions} from "../../../config/common.config";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {User} from "../../user/user.model";
import {ChatMessage} from "../chatMessage/chatMessage.model";
import {QRCode} from '../../qrCode/qrCode.model';

enum ChatRoomStatus {
    PENDING,
    ACCEPTED,
    BLOCKED,
    ARCHIVED,
}

export interface NewChatRoomRequestVO {
    ownerId: string;
    finderId: string;
    qrId: string;
}

export interface UpdateChatRoomStatusVO {
    id: string;
    user: string;
    status: ChatRoomStatus;
}

export interface UpdateChatRoomVO {
    id: string;
    title?: string;
    lastMessage?: string;
    status?: string;
    data: string;
}

@modelOptions(schemaOptions)
export class ChatRoom extends TimeStamps {
    @prop({required: false})
    public title?: string;

    @prop({required: false})
    public lastMessage?: string;

    @prop({default: ChatRoomStatus.PENDING})
    public status: ChatRoomStatus;

    @prop()
    public chats: Ref<ChatMessage>;

    @prop()
    public owner: Ref<User>;

    @prop()
    public finder: Ref<User>;

    @prop()
    public qr: Ref<QRCode>

    isOwner(user: string): boolean {
        return this.owner.id == user;
    }
}

const ChatRoomModel = getModelForClass(ChatRoom);

export default ChatRoomModel;