import { Space, Input, Tooltip, Button } from "antd";
import { CopyTwoTone } from "@ant-design/icons";

type Props = {
  longUrl: string;
  setLongUrl: (value: string) => void;
};

const LongUrl = ({ longUrl, setLongUrl }: Props) => {
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
            <Button icon={<CopyTwoTone />} />
          </Tooltip>
        </Space.Compact>
        <Button type="primary" ghost>
          Create Short Url
        </Button>
      </Space>
    </div>
  );
};

export default LongUrl;
