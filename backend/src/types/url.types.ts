import { Document } from "mongoose";

export interface IUrl {
  fullUrl: string;
  shortUrl: string;
  clicks: number;
}

export interface IUrlModel extends IUrl, Document {}

export interface IUrlAuditLog {
  url: string;
}

export interface IUrlAuditLogModel extends IUrlAuditLog, Document {}

export interface IUrlParam {
  shortUrl: string;
}

export interface IMostVisitedUrlResponse extends IUrl {
  _id: string;
  clicksIn24Hours: number;
  createdAt: string;
  updatedAt: string;
}
