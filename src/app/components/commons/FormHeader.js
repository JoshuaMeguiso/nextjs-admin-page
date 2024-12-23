"use client"; //Important
import React from "react";
import { Input, Button, Row, Col, Space, Breadcrumb } from "antd";

const Search = Input.Search;

export default ({
  name,
  value,
  onSearch,
  onChange,
  onNew,
  onDownload,
  breadcrumb_items = [],
}) => {
  const items = breadcrumb_items.map((o) => ({ title: o }));
  return (
    <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
      {items.length > 0 && <Breadcrumb items={items} />}
      <Space>
        {onSearch && (
          <Search
            name={name}
            placeholder="Search keyword"
            value={value}
            onSearch={onSearch}
            onChange={onChange}
            style={{ width: 200 }}
          />
        )}

        {onNew && (
          <Button style={{ marginLeft: "0.5rem" }} onClick={onNew}>
            New
          </Button>
        )}

        {onDownload && (
          <Button
            style={{ marginLeft: "0.5rem" }}
            icon={<i className="fa-solid fa-print pad-right-8"></i>}
            onClick={onDownload}
          >
            Download Excel
          </Button>
        )}
      </Space>
    </Row>
  );
};
