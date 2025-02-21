import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import isEmpty from "../validation/is-empty";
import { Form, Icon, Input, Button, Checkbox, Col, Row, Table } from "antd";
import ReportHeading from "../utils/ReportHeading";
import { addKeysToArray } from "../utils/utilities";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";

const SimplePrintoutComponent = ({
  state = {},
  reprint = false,
  duplicate = false,
  title = "",
  initial_items = [],
  table_columns = [],
  table_items = [],
  signature_items = [],
  header_content,
  title_content = null,
  intial_content = null,
  table_content = null,
  signature_content = null,
}) => {
  return (
    <Content
      className={classnames("inventory-print print", {
        "m-t-4": duplicate,
        "draft-watermark": state.status?.approval_status === "Open",
        "closed-watermark": state.status?.approval_status === "Closed",
        "cancelled-watermark": state.status?.approval_status === "Cancelled",
      })}
    >
      <div>
        {/* HEADER */}
        {header_content ? (
          header_content
        ) : (
          <Row>
            <Col offset={4} span={16}>
              <ReportHeading has_logo={true} has_business_name={true} />
            </Col>
            <Col span={4}>
              {((!isEmpty(state.printed) &&
                state.printed?.approval_status !==
                  state.status?.approval_status) ||
                reprint) && (
                <div className="has-text-right has-text-weight-bold">
                  REPRINT
                </div>
              )}
            </Col>
          </Row>
        )}

        {/* TITLE */}
        {title_content ? (
          title_content
        ) : (
          <div className="has-text-centered is-size-5">{title}</div>
        )}

        <br />

        {/* <div className="m-t-1"/> */}

        {/* INITIAL CONTENT */}
        {intial_content ? (
          intial_content
        ) : (
          <Row>
            {initial_items.map((item, index) => {
              const { label = "", content = "", is_ref = false } = item;

              return (
                <React.Fragment>
                  <Col span={4} className="is-flex align-items-flex-end">
                    {label}:
                  </Col>
                  <Col span={8} className="is-flex align-items-flex-end">
                    <span className={classnames({ "ref-number": is_ref })}>
                      {content}
                    </span>
                  </Col>
                </React.Fragment>
              );
            })}
            <Col span={4}>Printed:</Col>
            <Col span={8}>
              {state.printed?.datetime &&
                moment(state.printed?.datetime).format("lll")}
            </Col>
          </Row>
        )}

        {/* TABLE CONTENT */}
        {table_content ? (
          table_content
        ) : (
          <div className="m-t-1">
            <Table
              size="small"
              dataSource={addKeysToArray(table_items)}
              columns={table_columns}
              pagination={false}
              rowClassName={(record, index) =>
                record.footer === 1 ? "footer-summary has-text-weight-bold" : ""
              }
            />
          </div>
        )}
      </div>

      {/* SIGNATURES */}
      {signature_content ? (
        signature_content
      ) : (
        <div className="signatories-container">
          <Row gutter={48}>
            {signature_items.map((item) => (
              <Col span={8}>{item?.label || ""}</Col>
            ))}
          </Row>
          <Row gutter={48}>
            {signature_items.map((item) => (
              <Col span={8}>
                <div className="signatory">{item?.content || <>&nbsp;</>}</div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Content>
  );
};

SimplePrintoutComponent.propTypes = {
  state: PropTypes.object.isRequired,
  reprint: PropTypes.bool,
  duplicate: PropTypes.bool,
  title: PropTypes.string,
  initial_items: PropTypes.array,
  table_columns: PropTypes.array,
  table_items: PropTypes.array,
  signature_items: PropTypes.array,
  header_content: PropTypes.element,
  title_content: PropTypes.element,
  intial_content: PropTypes.element,
  table_content: PropTypes.element,
  signature_content: PropTypes.element,
};

SimplePrintoutComponent.defaultProps = {};

export default SimplePrintoutComponent;
