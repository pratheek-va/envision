import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "./ConfirmModal.css";

const ConfirmModal = () => {
  const action = useSelector((state) => state.confirm);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: 'CONFIRM_CLOSE' });
  }

  const onConfirmYes = () => {
    action.onClick(action.id);
    dispatch({ type: 'CONFIRM_CLOSE' });
  }

  return (
    <div className="confirm-event-detail-modal">
      <div className="confirm-modal-content" data-aos="zoom-in">
        <div className="confirm-modal-title">
          <h5>{action.title}</h5>
        </div>
          <div>
            <p className="confirm-title">{action.confirmationText}</p>
          </div>
        <div className="confirm-button-container">
          <button
            type="button"
            className="confirm-modal-close"
            onClick={onConfirmYes}
          >
            Yes
          </button>
          <button
            className="confirm-modal-register"
            onClick={closeModal}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;