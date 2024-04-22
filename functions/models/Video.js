const { Schema, model } = require("mongoose");

//I need the videoSchema to hold the video file name and the video file path, and the associated userID
const videoSchema = new Schema(
  {
    videoName: {
      type: String,
      required: true,
    },
    videoPath: {
      type: String,
      required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' // Reference to the Users model
      },
      dateUploaded: {
        type: Date,
        default: Date.now,
      },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Video = model("Video", videoSchema);

module.exports = Video;

