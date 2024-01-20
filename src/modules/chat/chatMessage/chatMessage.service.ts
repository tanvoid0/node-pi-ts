import ChatMessageModel, {ChatMessage, NewChatMessageVO, UpdateChatMessageVO} from "./chatMessage.model";
import ResourceNotFoundException from "../../../exceptions/resource.not.found.exception";

class ChatMessageService {
    find = async () => {
        return ChatMessageModel.find().sort({'createdAt': 'desc'});
    }

    findByRoom = async (room: string) => await ChatMessageModel.find({room}).sort({'createdAt': 'desc'});

    findById = async (id: string) => await ChatMessageModel.findById(id)
        .orFail(new ResourceNotFoundException('ChatMessage', 'id', id));

    create = async (newMessage: NewChatMessageVO) => {
        const chatMessage = new ChatMessageModel(newMessage);
        const savedChatMessage = await chatMessage.save();
        await savedChatMessage.set('isSender', true);
        return savedChatMessage;
    }

    update = async (updateMessage: UpdateChatMessageVO) => {
        const message = await this.findById(updateMessage.id);
        message.data = updateMessage.data;
        return await message.save();
    }

    remove = async (id: string) => ChatMessageModel.findOneAndDelete({id});

    removeAllByRoom = async (room: string) => ChatMessageModel.deleteMany({room: room});
}

export default ChatMessageService;