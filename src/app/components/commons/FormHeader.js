"use client"; //Important
import React from "react";
import { Input, Button, Row, Col, Space, Breadcrumb, Grid } from "antd";
const { useBreakpoint } = Grid;

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
  const screens = useBreakpoint(); // Detect screen size
  const items = breadcrumb_items.map((o) => ({ title: o }));
  return (
    <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
      <Col span={screens.xs ? 8 : 12}>
        {items.length > 0 && <Breadcrumb items={items} />}
      </Col>
      <Col span={screens.xs ? 16 : 12} style={{ textAlign: "right" }}>
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
      </Col>
    </Row>
  );
};
