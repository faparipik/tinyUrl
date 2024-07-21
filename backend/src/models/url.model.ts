import mongoose, { Schema } from "mongoose";
import { nanoid } from "nanoid";
import { IUrlModel } from "../types/url.types";

const urlSchema: Schema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      default: () => nanoid().substring(0, 10),
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUrlModel>("Url", urlSchema);
