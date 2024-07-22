import { Document } from "mongoose";
import { z } from "zod";

export const UrlBody = z.object({
  fullUrl: z.string().url(),
});

export const ShortUrlQuery = z.object({
  shortUrl: z.string().url(),
});

export const ShortUrlParam = z.object({
  shortUrl: z.string().length(10),
});
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

export type IUrlParam = z.infer<typeof ShortUrlQuery>;
export interface IMostVisitedUrlResponse extends IUrl {
  _id: string;
  clicksIn24Hours: number;
  createdAt: string;
  updatedAt: string;
}
