import { CloseOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Form } from "antd";

import React, { useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import validator from "validator";
import {
  PO_STATUS_ACCOMPLISHED,
  PO_STATUS_CLOSED,
  PO_STATUS_PENDING,
  APPROVED,
  DISCOUNT_PERCENT,
  USER_ADMINISTRATOR,
  ACCESS_PRINT,
  CLOSED,
  ACCESS_APPROVE,
  PO_STATUS_FULL,
  PO_STATUS_TERMINATED,
  PENDING,
  OPEN,
  APPROVED_FOR_QUOTE,
  CLOSE_QUOTE,
  PRINT,
  ACCESS_ADD,
  ACCESS_UPDATE,
} from "../utils/constants";
import { hasAccess, onUpdateStatus } from "../utils/form_utilities";

import { discount_options } from "../utils/Options";
import round from "../utils/round";
import { onStockSearch } from "../utils/utilities";
import isEmpty from "../validation/is-empty";
import SelectFieldGroup from "./SelectFieldGroup";
import SimpleSelectFieldGroup from "./SimpleSelectFieldGroup";
import TextFieldGroup from "./TextFieldGroup";

export default function ComparativeFormButtons({
  state,
  auth,
  loading,
  onClose,
  url,
  transaction,
  onDelete,
  initialValues,
  initialItemValues,
  setState,
  setItem,
  onFinalize,
  additional_buttons = [],
  onEdit = null,
  has_approve = true,
  is_termination = false,
  has_print = true,
  onSearch,
  has_save = true,
  setIsNext,
  has_next = false,
}) {
  const location = useLocation();

  return (
    isEmpty(state.deleted) && (
      <Form.Item className="m-t-1">
        <div className="field is-grouped">
          {([PENDING, OPEN].includes(state.status?.approval_status) ||
            [APPROVED_FOR_QUOTE, CLOSE_QUOTE].includes(
              state.comparative_slip_status?.approval_status
            ) ||
            isEmpty(state.status?.approval_status)) &&
            has_save &&
            ((hasAccess({
              auth,
              access: ACCESS_ADD,
              location,
            }) &&
              isEmpty(state._id)) ||
              (hasAccess({
                auth,
                access: ACCESS_UPDATE,
                location,
              }) &&
                !isEmpty(state._id))) && (
              <div className="control">
                <button
                  className="button is-small is-primary"
                  disabled={loading}
                >
                  Save
                </button>
              </div>
            )}

          {([OPEN, PRINT].includes(state.status?.approval_status) ||
            [APPROVED_FOR_QUOTE, CLOSE_QUOTE].includes(
              state.comparative_slip_status?.approval_status
            ) ||
            isEmpty(state.status?.approval_status)) &&
            has_next && (
              <div className="control">
                <button
                  className="button is-small is-primary"
                  disabled={loading}
                  onClick={() => {
                    if (setIsNext) setIsNext(true);
                  }}
                >
                  Next
                </button>
              </div>
            )}

          {/* {!isEmpty(state?._id) &&
            additional_buttons.map((Component) => Component)} */}

          <div className="control">
            <button
              className="button is-small is-info"
              onClick={(e) => {
                e.preventDefault();
                onSearch();
              }}
            >
              Exit
            </button>
          </div>
        </div>
      </Form.Item>
    )
  );
}
