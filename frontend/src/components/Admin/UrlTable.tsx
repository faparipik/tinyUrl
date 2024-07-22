import { useEffect, useState } from "react";
import { Table } from "antd";
import api from "../../libraries/api";
import { ITableUrlResponseData } from "../../types/url.types";

const columns: any = [
  {
    title: "Domain",
    dataIndex: "domain",
    key: "domain",
    align: "center",
  },
  {
    title: "Clicks In 24 Hours",
    dataIndex: "clicksIn24Hours",
    key: "clicksIn24Hours",
    align: "center",
  },
];

function UrlTable() {
  const [data, setData] = useState<ITableUrlResponseData[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await api.get<ITableUrlResponseData[]>(
      "/url/most-visited-urls"
    );
    setData(response.data);
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        size="large"
      />
    </>
  );
}

export default UrlTable;
