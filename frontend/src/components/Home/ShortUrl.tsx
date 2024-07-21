import { Space, Input, Tooltip, Button } from "antd";
import { CopyTwoTone } from "@ant-design/icons";

type Props = {
  shortUrl: string;
  setShortUrl: (value: string) => void;
  getLongUrl: () => void;
};

const ShortUrl = ({ shortUrl, setShortUrl, getLongUrl }: Props) => {
  return (
    <div>
      <h3>SHORT URL</h3>
      <Space direction="vertical">
        <Space.Compact block>
          <Input
            style={{
              width: "20vw",
            }}
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            defaultValue="git@github.com:ant-design/ant-design.git"
          />
          <Tooltip title="copy url">
            <Button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              icon={<CopyTwoTone />}
            />
          </Tooltip>
        </Space.Compact>
        <Button onClick={getLongUrl} type="primary" ghost>
          Get Long Url
        </Button>
      </Space>
    </div>
  );
};

export default ShortUrl;
