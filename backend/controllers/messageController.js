import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

const getAllMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    // senderId is always the user who is logged in and userToChat is the user who is being chatted with
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChat],
      },
    }).populate("messages");
    // populate is used to get the data of the messages from the message model

    if (!conversation) {
      return res.status(200).json([]);
    }
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error in get all messages controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    // this syntax is used to extract the id from the params of the request and rename it to recieverId
    const { id: recieverId } = req.params;
    // senderId is always the user who is logged in and recieverId is the user who is being chatted with
    const senderId = req.user._id;

    // this is used to find the conversation between the sender and the reciever
    // we are saying find the conversation where participants are includes all these fields (senderId and recieverId)
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, recieverId],
      },
    });

    // if conversation is not found then we are creating a new conversation
    if (!conversation) {
      const newConversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
      conversation = newConversation;
    }

    const newMessage = await Message.create({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      // store the message id in the conversation (because one conversation have many messages - check conversationModel.js)
      conversation.messages.push(newMessage._id);
    }

    //* SOCKET IO FUNCTIONALITY (soon)

    await conversation.save();
    // await newMessage.save(); here no need to save the message again because we are already saving it in the above line while creating the message, if we will save it again then it will create a duplicate message

    res.status(200).json({ newMessage });
  } catch (error) {
    console.error("Error in send message controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { sendMessage, getAllMessages };
