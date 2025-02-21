"use client"; //Important
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Row, Space } from "antd";
import React from "react";
import PageHeader from "./PageHeader";

const { Panel } = Collapse;

export default ({
  onSearch,
  items = [],
  additional_buttons = [],
  access = true,
}) => {
  return (
    access && (
      <Row>
        <Col span={24}>
          <Collapse
            style={{ background: "white" }}
            items={[
              {
                key: "1",
                label: "Advance Search",
                children: (
                  <div>
                    <PageHeader
                      onBack={() => null}
                      title="Advance Filter"
                      subTitle="Enter appropriate data to filter records"
                    />
                    <Row gutter={[0, 0]}>
                      {items.map((component, index) => (
                        <Col
                          key={index}
                          xs={24} // Full width on extra small screens
                          sm={12} // Half width on small screens
                          md={8} // One-third width on medium screens
                        >
                          {component}
                        </Col>
                      ))}
                    </Row>
                    <Row justify="start">
                      <Col span={22} offset={2}>
                        <Space>
                          <Button
                            icon={<SearchOutlined />}
                            onClick={onSearch}
                          >
                            Search
                          </Button>
                          {additional_buttons.map((Component, index) => (
                            <React.Fragment key={index}>
                              {Component}
                            </React.Fragment>
                          ))}
                        </Space>
                      </Col>
                    </Row>
                  </div>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    )
  );
};
