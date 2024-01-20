import ChatRoomModel, {NewChatRoomRequestVO, UpdateChatRoomStatusVO} from "./chatRoom.model";
import QrCodeModel from "../../qrCode/qrCode.model";
import ResourceNotFoundException from "../../../exceptions/resource.not.found.exception";
import InvalidRequestException from "../../../exceptions/invalidRequest.exception";

class ChatRoomService {

    find = async () => ChatRoomModel.find().sort({'updatedAt': 'desc'});

    findById = async (_id: string) => {
        const chatRoom = await ChatRoomModel.findOne({_id});
        if (chatRoom === null) {
            throw new ResourceNotFoundException('ChatRoom', 'id', _id);
        }
        return chatRoom;
    }

    findChatRoomByUsers = async (user1: string, user2: string) => {
        return ChatRoomModel.findOne({
            $or: [
                {owner: user1, finder: user2},
                {owner: user2, finder: user1},
            ]
        });
    }

    request = async (request: NewChatRoomRequestVO) => {
        const qr = await QrCodeModel.findById(request.qrId);
        if (qr === null) {
            throw new ResourceNotFoundException("QRCode", "id", request.qrId);
        }
        if (qr.get('owner').id === request.finderId) {
            throw new InvalidRequestException("Owner and requesting user cannot be the same person.");
        }
        return await this.create(request);
    }

    create = async (request: NewChatRoomRequestVO) => {
        const chatRoomExists = await this.findChatRoomByUsers(request.ownerId, request.finderId);
        if (chatRoomExists === null) {
            return chatRoomExists;
        }
        const newChatRoom = new ChatRoomModel({
            owner: request.ownerId,
            finder: request.finderId,
            qr: request.qrId,
        });
        await newChatRoom.save();
        return newChatRoom;
    }

    response = async (request: UpdateChatRoomStatusVO) => {
        const chatRoom = await this.findById(request.id);
        // @ts-ignore
        if (!chatRoom.isOwner(request.user)) {
            throw new InvalidRequestException("Invalid user to take action.");
        }

        return ChatRoomModel.findOneAndUpdate({_id: request}, {
            status: request.status,
        }, {new: true});
    }

    remove = async (_id: string) => {
        await ChatRoomModel.findOneAndDelete({_id});
    }
}

export default ChatRoomService;