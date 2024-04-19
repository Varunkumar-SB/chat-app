const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        defailt: [],
      },
    ],
  },
  { timestamps: true }
);

exports.Conversation = mongoose.model("Conversation", ConversationSchema);
