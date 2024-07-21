import { Document } from "mongoose";

export interface IUrl {
  fullUrl: string;
  shortUrl: string;
  clicks: number;
}

export interface IUrlModel extends IUrl, Document {}
