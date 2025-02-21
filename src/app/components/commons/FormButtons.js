import { Button, Form, Modal, Space, message } from "antd";

import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
const { confirm } = Modal;

import InputModal from "../components/InputModal";
import {
  ACCESS_ADD,
  ACCESS_APPROVE,
  ACCESS_CANCEL,
  ACCESS_PRINT,
  ACCESS_UPDATE,
  CANCELLED,
  FOR_APPROVAL,
  OPEN,
  STATUS_ALLOW_EDIT,
} from "../utils/constants";
import { hasAccess } from "../utils/form_utilities";
import isEmpty from "../validation/is-empty";

export default function FormButtons({
  state,
  auth,
  loading,
  loading_state = {},
  onClose,
  onDelete,
  onFinalize,
  additional_buttons = [],
  has_print = true,
  has_cancel = true,
  onSearch,
  has_save = true,
  has_close = true,
  save_statuses = [],
  close_statuses = [],
  onPrint,
  finalize_label,
  close_label = "CLOSE",
  print_access = [],
  print_access_message = "Need to be Approved to Print",
  has_reason_modal_ondelete = true,
  formItemLayout,
}) {
  const location = useLocation();
  const cancellationModal = useRef(null);

  const disabled_buttons = (exempt_key) =>
    Object.values(loading_state).some(
      (val) => val === true && val !== loading_state?.[exempt_key]
    );

  return (
    <Form.Item className="m-t-1" {...formItemLayout}>
      <InputModal
        title="Reason for Cancellation"
        placeholder="Reason"
        ref={cancellationModal}
      />
      <Space size={12}>
        {[null, undefined, OPEN, STATUS_ALLOW_EDIT, ...save_statuses].includes(
          state.status?.approval_status
        ) &&
          has_save &&
          ((isEmpty(state._id) &&
            hasAccess({
              auth,
              access: ACCESS_ADD,
              location,
            })) ||
            (!isEmpty(state._id) &&
              hasAccess({
                auth,
                access: ACCESS_UPDATE,
                location,
              }))) && (
            <Button
              htmlType="submit"
              className="button black-red"
              loading={loading_state?.save || false}
              disabled={disabled_buttons("save")}
            >
              Save
            </Button>
          )}
        {onFinalize &&
          !isEmpty(state._id) &&
          [null, undefined, OPEN, FOR_APPROVAL].includes(
            state.status?.approval_status
          ) && (
            <Button
              htmlType="submit"
              className="button is-info is-outlined"
              loading={loading_state?.finalize || false}
              disabled={disabled_buttons("finalize")}
              onClick={(e) => {
                e.preventDefault();
                onFinalize();
              }}
            >
              {finalize_label}
            </Button>
          )}
        {has_print &&
          onPrint &&
          state.status?.approval_status !== CANCELLED &&
          hasAccess({
            auth,
            access: ACCESS_PRINT,
            location,
          }) && (
            <Button
              htmlType="submit"
              loading={loading_state?.print || false}
              disabled={disabled_buttons("print")}
              onClick={(e) => {
                e.preventDefault();
                if (print_access.length > 0) {
                  if (print_access.includes(state.status?.approval_status)) {
                    return onPrint();
                  } else {
                    return message.info(print_access_message);
                  }
                }
                onPrint();
              }}
              className="button is-info is-outlined"
            >
              <i className="fas fa-print pad-right-8" />
              Print
            </Button>
          )}

        {!isEmpty(state?._id) &&
          additional_buttons
            .filter((Component) => Component) // Remove null or undefined elements
            .map((Component) =>
              React.cloneElement(Component, { disabled: disabled_buttons() })
            )}

        {onClose &&
          !isEmpty(state?._id) &&
          has_close &&
          [OPEN, FOR_APPROVAL, ...close_statuses].includes(
            state.status?.approval_status
          ) &&
          hasAccess({
            auth,
            access: ACCESS_APPROVE,
            location,
          }) && (
            <Button
              htmlType="submit"
              className="button is-info"
              loading={loading_state?.close || false}
              disabled={disabled_buttons("close")}
              onClick={(e) => {
                e.preventDefault();
                confirm({
                  title: `${close_label} Transaction`,
                  content: "Would you like to confirm?",
                  okText: close_label,
                  cancelText: "No",
                  onOk: () => {
                    onClose();
                  },
                  onCancel: () => {},
                });
              }}
            >
              <i className="fas fa-lock pad-right-8" />
              {close_label}
            </Button>
          )}
        {has_cancel &&
          ![CANCELLED].includes(state.status?.approval_status) &&
          !isEmpty(state?._id) &&
          hasAccess({
            auth,
            access: ACCESS_CANCEL,
            location,
          }) && (
            <Button
              disabled={
                disabled_buttons("cancel") ||
                state.status?.approval_status === STATUS_ALLOW_EDIT
              }
              loading={loading_state?.cancel}
              htmlType="submit"
              className="button is-danger"
              onClick={(e) => {
                e.preventDefault();
                confirm({
                  title: "Cancel Transaction",
                  content: "Would you like to confirm?",
                  okText: "Cancel",
                  cancelText: "No",
                  onOk: () => {
                    if (has_reason_modal_ondelete) {
                      cancellationModal.current.open((remarks) => {
                        onDelete(remarks);
                      });
                    } else {
                      onDelete();
                    }
                  },
                  onCancel: () => {},
                });
              }}
            >
              <i className="fas fa-times pad-right-8" />
              Cancel
            </Button>
          )}
        <Button
          htmlType="submit"
          className="button "
          disabled={disabled_buttons("exit")}
          onClick={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          Exit
        </Button>
      </Space>
    </Form.Item>
  );
}
