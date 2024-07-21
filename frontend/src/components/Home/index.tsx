import { useState } from "react";
import { Flex } from "antd";

import ShortUrl from "./ShortUrl";
import LongUrl from "./LongUrl";

function Home() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  return (
    <>
      <Flex gap="50%" justify="space-evenly">
        <LongUrl longUrl={longUrl} setLongUrl={setLongUrl} />
        <ShortUrl shortUrl={shortUrl} setShortUrl={setShortUrl} />
      </Flex>
    </>
  );
}

export default Home;
