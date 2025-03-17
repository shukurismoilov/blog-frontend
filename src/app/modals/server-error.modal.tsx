import { FC } from "react";
import { ApiError } from "../fetch/types";
import { Alert, Modal } from "antd";

interface ServerErrorModalProps {
  open: boolean;
  hideModal: () => void;
  error: ApiError;
}

const ServerErrorModal: FC<ServerErrorModalProps> = ({
  open,
  hideModal,
  error,
}) => {
  return (
    <Modal open={open} onCancel={hideModal} footer={null}>
      <Alert
        message={error.message}
        description={error.reason}
        type="error"
        showIcon
      />
    </Modal>
  );
};

export { ServerErrorModal };
