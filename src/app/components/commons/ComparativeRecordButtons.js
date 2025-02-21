import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Form, message, Input } from "antd";
import qs from "qs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import validator from "validator";
import {
  PO_STATUS_ACCOMPLISHED,
  PO_STATUS_CLOSED,
  PO_STATUS_PENDING,
  APPROVED,
  DISCOUNT_PERCENT,
  USER_ADMINISTRATOR,
  OPEN,
  CANCELLED,
  ACCESS_APPROVE,
  ACCESS_OPEN,
  ACCESS_CANCEL,
  ACCESS_ADD,
  ACCESS_PRINT,
  ACCESS_DELETE,
  CLOSED,
  ACCESS_VIEW,
  APPROVED_FOR_QUOTE,
  FOR_APPROVAL,
  CLOSE_QUOTE,
  COMPARATIVE_CLOSED,
} from "../utils/constants";

import { discount_options } from "../utils/Options";
import round from "../utils/round";
import { onStockSearch } from "../utils/utilities";
import isEmpty from "../validation/is-empty";
import SelectFieldGroup from "./SelectFieldGroup";
import SimpleSelectFieldGroup from "./SimpleSelectFieldGroup";
import TextFieldGroup from "./TextFieldGroup";
import axios from "axios";
import { onDelete } from "../utils/form_utilities";
import confirm from "antd/lib/modal/confirm";
import InputModal from "../components/InputModal";
import FileSaver from "file-saver";

const onUpdateStatus = ({
  url,
  state,
  approval_status,
  user,
  onSearch,
  remarks = null,
  update_url = "update-status",
  status_key = "status",
}) => {
  axios
    .post(`${url}${state._id}/${update_url}`, {
      [status_key]: {
        approval_status: approval_status,
        user,
        remarks,
      },
      user,
    })
    .then((response) => {
      onSearch();
    })
    .catch((err) => {
      message.error("There was an error updating transaction status");
    });
};

export default function ComparativeRecordButtons({
  state,
  auth,
  url,
  transaction,
  initialValues,
  initialItemValues,
  setState,
  setItem,
  additional_buttons = [],
  onSearch,
  onSendCanvas,
  onInputCanvas,
  can_close = true,
  row_selected,
  setRecords,
}) {
  const params = useLocation();
  const location = useLocation();
  const hasAccess = useCallback(
    ({ access }) => {
      return (
        (auth?.user?.permissions || [])
          .filter(
            (o) =>
              params.pathname.startsWith(o.route) && o.access?.includes(access)
          )
          .map((o) => o.route).length > 0
      );
    },
    [params.pathname, auth]
  );
  const cancellationModal = useRef(null);

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  const is_msalvio =
    auth.user?.username === "msalvio" && query.is_msalvio === "1";

  return (
    <div>
      <InputModal
        title="Reason for Cancellation"
        placeholder="Reason"
        ref={cancellationModal}
      />
      <Form.Item className="m-t-1">
        <div className="field is-grouped">
          {[FOR_APPROVAL].includes(
            state?.comparative_slip_status?.approval_status
          ) &&
            hasAccess({ access: ACCESS_APPROVE }) && (
              <span
                className="button is-info is-outlined is-small control"
                onClick={() => {
                  onUpdateStatus({
                    url: "/api/purchase-requests/",
                    state,
                    approval_status: APPROVED_FOR_QUOTE,
                    user: auth.user,
                    onSearch,
                    update_url: "comparative-slip-status",
                    status_key: "comparative_slip_status",
                  });
                }}
              >
                <span>Approve For Quote</span>
              </span>
            )}

          {/* {[CLOSED, APPROVED].includes(
            state?.comparative_slip_status?.approval_status
          ) &&
            state?.canvases?.length < 4 &&
            hasAccess({ access: ACCESS_OPEN }) && (
              <span
                className="button is-info is-outlined is-small control"
                onClick={() => {
                  onUpdateStatus({
                    url: "/api/purchase-requests/",
                    state,
                    approval_status: OPEN,
                    user: auth.user,
                    onSearch,
                    update_url: "comparative-slip-status",
                    status_key: "comparative_slip_status",
                  });
                }}
              >
                <span>Open</span>
              </span>
            )} */}

          {/* {hasAccess({ access: ACCESS_ADD }) &&
            !isEmpty(state) &&
            (isEmpty(state?.comparative_slip_status?.approval_status) ||
              state.comparative_slip_status?.approval_status === OPEN) &&
            (state.canvases || [])?.length <= 3 && (
              <span
                className="button is-info is-outlined is-small control"
                onClick={() => {
                  onSendCanvas(state);
                }}
              >
                <span>Send Canvas</span>
              </span>
            )} */}

          {/* {hasAccess({ access: ACCESS_ADD }) &&
            !isEmpty(state) &&
            (state?.canvases || []).length <= 4 && (
              <span
                className="button is-info is-outlined is-small control"
                onClick={() => {
                  onInputCanvas(state);
                }}
              >
                <span>Input Canvas</span>
              </span>
            )} */}

          {[APPROVED_FOR_QUOTE].includes(
            state?.comparative_slip_status?.approval_status
          ) && (
            <span
              key="download-canvas-button"
              className="button control is-info is-outlined is-small"
              onClick={() => {
                axios
                  .post(
                    `/api/comparative-slips/${state._id}/download-canvas`,
                    {},
                    {
                      responseType: "blob",
                    }
                  )
                  .then((response) => {
                    let blob = new Blob([response.data], {
                      type: "vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
                    });
                    FileSaver.saveAs(blob, `PRN${state.prq_no}.xlsx`);
                    message.success("Virtual Receipts Download");
                  });
              }}
            >
              <span>Download</span>
            </span>
          )}

          {[APPROVED_FOR_QUOTE].includes(
            state?.comparative_slip_status?.approval_status
          ) &&
            hasAccess({ access: ACCESS_PRINT }) && (
              <Link
                key="print-button"
                to={`/print/${transaction}/${state._id}`}
                target="_blank"
                className="control"
              >
                <span className="button is-outlined is-link is-small">
                  <span className="icon is-small">
                    <i className="fas fa-print" />
                  </span>
                  <span>Print</span>
                </span>
              </Link>
            )}

          {/* {[APPROVED_FOR_QUOTE].includes(
            state?.comparative_slip_status?.approval_status
          ) &&
            hasAccess({ access: ACCESS_APPROVE }) &&
            state?.status?.approval_status === APPROVED &&
            (isEmpty(state?.comparative_slip_status?.approval_status) ||
              state.comparative_slip_status?.approval_status ===
                APPROVED_FOR_QUOTE) &&
            can_close &&
            (state?.canvases || []).length <= 4 && (
              <span
                className="button is-info is-outlined is-small control"
                onClick={() => {
                  onUpdateStatus({
                    url: "/api/purchase-requests/",
                    state,
                    approval_status: CLOSE_QUOTE,
                    user: auth.user,
                    onSearch,
                    update_url: "comparative-slip-status",
                    status_key: "comparative_slip_status",
                  });
                }}
              >
                <span>Close Quote</span>
              </span>
            )} */}

          {(([APPROVED_FOR_QUOTE].includes(
            state?.comparative_slip_status?.approval_status
          ) &&
            state.po_count <= 0 &&
            state?.items?.filter((item) => {
              return (
                item.quotations?.filter((quotation) => quotation?.is_selected)
                  ?.length > 0
              );
            })?.length > 0) ||
            is_msalvio) && (
            <span
              key="generate-po-button"
              className="button control is-info is-outlined is-small"
              onClick={() => {
                axios
                  .post(`/api/comparative-slips/${state._id}/create-po`, {
                    user: auth.user,
                  })
                  .then((response) => {
                    message.success("Purchase Orders created");
                    //remove the requests from the search

                    setRecords((prevRecords) => {
                      prevRecords.splice(row_selected, 1);
                      return [...prevRecords];
                    });
                    // history.push("/purchase-orders");
                    // onSearch();
                  })
                  .catch((err) => {
                    message.error(
                      "There was an error processing your transaction"
                    );
                  });
              }}
            >
              <span>Generate PO</span>
            </span>
          )}

          {[FOR_APPROVAL, APPROVED_FOR_QUOTE].includes(
            state?.comparative_slip_status?.approval_status
          ) &&
            hasAccess({ access: ACCESS_CANCEL }) && (
              <span
                className="button is-danger is-outlined is-small control"
                onClick={() => {
                  cancellationModal.current.open((remarks) => {
                    onUpdateStatus({
                      url: "/api/purchase-requests/",
                      state,
                      approval_status: CANCELLED,
                      user: auth.user,
                      onSearch,
                      update_url: "comparative-slip-status",
                      status_key: "comparative_slip_status",
                    });
                  });
                }}
              >
                <span>Cancel</span>
              </span>
            )}

          {/* {[FOR_APPROVAL, APPROVED_FOR_QUOTE].includes(
            state?.comparative_slip_status?.approval_status
          ) &&
            hasAccess({ access: ACCESS_APPROVE }) && (
              <span
                className="button  is-outlined is-small control"
                onClick={() => {
                  onUpdateStatus({
                    url: "/api/purchase-requests/",
                    state,
                    approval_status: COMPARATIVE_CLOSED,
                    user: auth.user,
                    onSearch,
                    update_url: "comparative-slip-status",
                    status_key: "comparative_slip_status",
                  });
                }}
              >
                <span>Close</span>
              </span>
            )} */}

          {!isEmpty(state) &&
            state?.status?.approval_status !== APPROVED &&
            hasAccess({ access: ACCESS_DELETE }) && (
              <span
                className="button is-danger is-outlined is-small"
                onClick={() => {
                  onDelete({
                    id: state?._id,
                    url,
                    user: auth.user,
                  }).then(() => {
                    onSearch();
                  });
                }}
              >
                <span>Delete</span>
                <CloseOutlined />
              </span>
            )}

          {!isEmpty(state?._id) &&
            additional_buttons.map((Component) => Component)}
        </div>
      </Form.Item>
    </div>
  );
}
