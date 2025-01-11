import { FC } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';

interface DeleteModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ isOpen, isLoading, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">Delete Confirmation</h2>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete this contact?
          </p>
        </div>
        <div className="flex justify-end px-6 py-4 space-x-3">
          <Button onClick={onClose} text="No" variant="edit" />
          <Button onClick={onConfirm} text="Yes" variant="delete" loading={isLoading} />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DeleteModal;
