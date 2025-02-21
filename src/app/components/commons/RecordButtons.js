import { Form, message } from "antd";
import React, { useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  APPROVED,
  OPEN,
  CANCELLED,
  ACCESS_APPROVE,
  ACCESS_CANCEL,
  ACCESS_ADD,
  ACCESS_PRINT,
  PRINT,
} from "../utils/constants";

import isEmpty from "../validation/is-empty";
import axios from "axios";
import { onUpdatePoStatus } from "../utils/form_utilities";
import InputModal from "../components/InputModal";

const onUpdateStatus = ({
  url,
  state,
  approval_status,
  user,
  onSearch,
  remarks = null,
}) => {
  axios
    .post(`${url}${state._id}/update-status`, {
      status: {
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
      if (err.response?.data?.msg) {
        message.error(err.response?.data?.msg);
      } else {
        return message.error("There was an error updating transaction status");
      }
    });
};

export default function RecordButtons({
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
  onNew,
  has_close = false,
  is_termination = false,
  has_print = true,
  approve_label = "Approve",
  close_label = "Close",
  onCancelCallback = null,
  onCloseStatus = null,
  has_cancel = true,
  approval_status = APPROVED,
  has_approve = false,
  print_label = "Print",
  has_cancel_open = false,
}) {
  const params = useLocation();
  const hasAccess = useCallback(
    ({ access }) => {
      return (
        (auth.user?.permissions || [])
          .filter(
            (o) => o.route === params.pathname && o.access?.includes(access)
          )
          .map((o) => o.route).length > 0
      );
    },
    [params.pathname, auth]
  );

  const cancellationModal = useRef(null);
  return (
    <div>
      <InputModal
        title="Reason for Cancellation"
        placeholder="Reason"
        ref={cancellationModal}
      />
      <Form.Item className="m-t-1">
        <div className="field is-grouped">
          {hasAccess({ access: ACCESS_ADD }) && onNew && (
            <span
              className="button is-info is-outlined is-small control"
              onClick={() => {
                onNew();
              }}
            >
              <span>New</span>
            </span>
          )}
          {(state?.status?.approval_status === OPEN || has_approve) &&
            !isEmpty(state?._id) &&
            hasAccess({ access: ACCESS_APPROVE }) &&
            has_approve && (
              <span
                className="button is-info is-outlined is-small control"
                onClick={() => {
                  onUpdateStatus({
                    url,
                    state,
                    approval_status,
                    user: auth.user,
                    onSearch,
                  });
                }}
              >
                <span>{approve_label}</span>
              </span>
            )}

          {/* {state?.status?.approval_status === APPROVED &&
            hasAccess({ access: ACCESS_APPROVE }) && (
              <span
                className="button is-info is-outlined is-small control"
                onClick={() => {
                  onUpdateStatus({
                    url,
                    state,
                    approval_status: DISAPPROVED,
                    user: auth.user,
                    onSearch,
                  });
                }}
              >
                <span>Disapprove</span>
              </span>
            )} */}

          {!isEmpty(state?._id) &&
            [OPEN].includes(state?.status?.approval_status) && (
              <span
                className="button is-danger is-outlined is-small control"
                onClick={() => {
                  if (onCancelCallback) {
                    onCancelCallback()
                      .then(() => {
                        cancellationModal.current.open((remarks) => {
                          onUpdateStatus({
                            url,
                            state,
                            approval_status: CANCELLED,
                            user: auth.user,
                            onSearch,
                            remarks,
                          });
                        });
                      })
                      .catch((err) => message.error(err.msg));
                  } else {
                    cancellationModal.current.open((remarks) => {
                      onUpdateStatus({
                        url,
                        state,
                        approval_status: CANCELLED,
                        user: auth.user,
                        onSearch,
                        remarks,
                      });
                    });
                  }
                }}
              >
                <span>Cancel Open</span>
              </span>
            )}

          {!isEmpty(state?._id) &&
            ![CANCELLED].includes(state?.status?.approval_status) &&
            hasAccess({ access: ACCESS_CANCEL }) &&
            has_cancel &&
            !is_termination && (
              <span
                className="button is-danger is-outlined is-small control"
                onClick={() => {
                  if (onCancelCallback) {
                    onCancelCallback()
                      .then(() => {
                        cancellationModal.current.open((remarks) => {
                          onUpdateStatus({
                            url,
                            state,
                            approval_status: CANCELLED,
                            user: auth.user,
                            onSearch,
                            remarks,
                          });
                        });
                      })
                      .catch((err) => message.error(err.msg));
                  } else {
                    cancellationModal.current.open((remarks) => {
                      onUpdateStatus({
                        url,
                        state,
                        approval_status: CANCELLED,
                        user: auth.user,
                        onSearch,
                        remarks,
                      });
                    });
                  }
                }}
              >
                <span>Cancel</span>
              </span>
            )}

          {!isEmpty(state?._id) &&
            hasAccess({ access: ACCESS_PRINT }) &&
            ([APPROVED, PRINT].includes(state.status?.approval_status) ||
              has_print) &&
            !isEmpty(transaction) &&
            has_print && (
              <span
                className="button is-outlined is-link is-small control"
                onClick={(e) => {
                  e.preventDefault();

                  const url = is_termination
                    ? `/print/${transaction}/${state._id}/is-termination`
                    : `/print/${transaction}/${state._id}`;

                  const win = window.open(url, "_blank");
                  console.log(win);

                  win.onclose = () => {};
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-print" />
                </span>
                <span>{print_label}</span>
              </span>
            )}

          {!isEmpty(state?._id) &&
            additional_buttons.map((Component) => Component)}

          {/* {!isEmpty(state) &&
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
            )} */}
        </div>
      </Form.Item>
    </div>
  );
}
