import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    // The participants field is an array of ObjectId references to the User model
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    // The messages field is an array of ObjectId references to the Message model
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  // createdAt and updatedAt are automatically added by mongoose
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
