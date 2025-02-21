import { PrinterOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import React from "react";
import ReactToPrint from "react-to-print";
import { tailFormItemLayout } from "../utils/Layouts";

export default ({
  report,
  onSearch,
  onDownload,
  has_print = true,
  additional_buttons = [],
  search_label = "Search",
  download_label = "Download Excel",
  formItemLayout = tailFormItemLayout,
}) => {
  return (
    <Form.Item {...formItemLayout}>
      <Space>
        {onSearch && <Button onClick={onSearch}>{search_label}</Button>}
        {has_print && report && (
          <ReactToPrint
            trigger={() => (
              <Button type="primary" icon={<PrinterOutlined />}>
                Print
              </Button>
            )}
            bodyClass="print"
            content={() => report.current}
          />
        )}
        {onDownload && <Button onClick={onDownload}>{download_label}</Button>}

        {additional_buttons.map((Component) => Component)}
      </Space>
    </Form.Item>
  );
};
