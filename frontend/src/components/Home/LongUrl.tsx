import { Space, Input, Tooltip, Button } from "antd";
import { CopyTwoTone } from "@ant-design/icons";

type Props = {
  longUrl: string;
  setLongUrl: (value: string) => void;
  createShortUrl: () => void;
};

const LongUrl = ({ longUrl, setLongUrl, createShortUrl }: Props) => {
  return (
    <div>
      <h3>FULL URL</h3>
      <Space direction="vertical">
        <Space.Compact block>
          <Input
            onChange={(e) => setLongUrl(e.target.value)}
            style={{
              width: "20vw",
            }}
            value={longUrl}
          />
          <Tooltip title="copy url">
            <Button
              onClick={() => navigator.clipboard.writeText(longUrl)}
              icon={<CopyTwoTone />}
            />
          </Tooltip>
        </Space.Compact>
        <Button onClick={createShortUrl} type="primary" ghost>
          Create Short Url
        </Button>
      </Space>
    </div>
  );
};

export default LongUrl;
