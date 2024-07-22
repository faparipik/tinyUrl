import mongoose, { Schema } from "mongoose";
import { IUrlAuditLogModel } from "../types/url.types";

const urlAuditLogSchema: Schema = new mongoose.Schema(
  {
    url: {
      type: mongoose.Types.ObjectId,
      ref: "Url",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUrlAuditLogModel>(
  "UrlAuditLog",
  urlAuditLogSchema
);
