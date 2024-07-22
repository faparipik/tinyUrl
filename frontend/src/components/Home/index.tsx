import { useState } from "react";
import { Flex } from "antd";
import toast from "react-hot-toast";

import ShortUrl from "./ShortUrl";
import LongUrl from "./LongUrl";
import api from "../../libraries/api";
import { IShortUrlResponseData } from "../../types/url.types";

const { VITE_TINY_URL_BACKEND } = import.meta.env;

function Home() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const createShortUrl = async () => {
    try {
      const response = await api.post<IShortUrlResponseData>("/url", {
        fullUrl: longUrl,
      });
      setShortUrl(`${VITE_TINY_URL_BACKEND}/${response.data.shortUrl}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getLongUrl = async () => {
    try {
      const response = await api.get<IShortUrlResponseData>("/url", {
        shortUrl: shortUrl,
      });
      setLongUrl(response.data.fullUrl);
    } catch (error: any) {
      toast.error(error.message);
    }
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
