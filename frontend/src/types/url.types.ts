export interface IShortUrlResponseData {
  clicks: number;
  createdAt: string;
  fullUrl: string;
  shortUrl: string;
  updatedAt: string;
}

export interface ITableUrlResponseData {
  _id: string;
  clicksIn24Hours: number;
  domain: string;
}
