import Modal from "../Modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeErrorModal } from "../../store/slices/settingsSlice";

const GlobalErrorModal = () => {
    const dispatch = useAppDispatch();
    const { isErrorModalOpen, errorMessage } = useAppSelector((state) => state.settings);

    return (
        <Modal
            isOpen={isErrorModalOpen}
            onClose={() => dispatch(closeErrorModal())}
            title="Request Error"
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-700">{errorMessage || "Something went wrong."}</p>

                <button
                    type="button"
                    className="card-btn"
                    onClick={() => dispatch(closeErrorModal())}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default GlobalErrorModal;
