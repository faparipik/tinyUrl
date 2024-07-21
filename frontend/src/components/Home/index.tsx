import { useState } from "react";
import { Flex } from "antd";

import ShortUrl from "./ShortUrl";
import LongUrl from "./LongUrl";
import api from "../../libraries/api";

const { VITE_TINY_URL_BACKEND } = import.meta.env;

interface IShortUrlResponseData {
  clicks: number;
  createdAt: string;
  fullUrl: string;
  shortUrl: string;
  updatedAt: string;
}

function Home() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const createShortUrl = async () => {
    const response = await api.post<IShortUrlResponseData>("/url", {
      fullUrl: longUrl,
    });
    setShortUrl(`${VITE_TINY_URL_BACKEND}/${response.data.shortUrl}`);
  };

  const getLongUrl = async () => {
    const response = await api.get<IShortUrlResponseData>("/url", {
      shortUrl: shortUrl,
    });
    setLongUrl(response.data.fullUrl);
  };

  return (
    <>
      <Flex gap="50%" justify="space-evenly">
        <LongUrl
          longUrl={longUrl}
          setLongUrl={setLongUrl}
          createShortUrl={createShortUrl}
        />
        <ShortUrl
          shortUrl={shortUrl}
          setShortUrl={setShortUrl}
          getLongUrl={getLongUrl}
        />
      </Flex>
    </>
  );
}

export default Home;
