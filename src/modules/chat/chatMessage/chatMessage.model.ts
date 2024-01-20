import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {schemaOptions} from "../../../config/common.config";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {User} from "../../user/user.model";
import {ChatRoom} from "../chatRoom/chatRoom.model";

enum ChatStatus {
    QUEUED,
    SENT,
    VIEWED,
}

enum ChatType {
    TEXT,
    IMAGE,
    FILE,
    AUDIO,
    VIDEO
}

export interface NewChatMessageVO {
    title?: string;
    lastMessage?: string;
    status?: string;
    owner: string;
    finder: string;
    data: string;
}

export interface UpdateChatMessageVO {
    id: string;
    title?: string;
    lastMessage?: string;
    status?: string;
    data: string;
}


@modelOptions(schemaOptions)
export class ChatMessage extends TimeStamps {
    @prop()
    public room: ChatRoom;

    @prop({required: true})
    public data: string;

    @prop({default: ChatStatus.QUEUED})
    public status: ChatStatus

    @prop({default: ChatType.TEXT})
    public type: ChatType;

    @prop({required: true})
    public sender: Ref<User>;
}

const ChatMessageModel = getModelForClass(ChatMessage);
export default ChatMessageModel;