import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

interface ConfirmDeleteModalProps {
  onDismiss: () => void;
  vocabWord: string;
  onConfirmDelete: () => void;
}

function ConfirmDeleteModal({ onDismiss, vocabWord, onConfirmDelete }: ConfirmDeleteModalProps) {
  return (
    <Modal size="sm" placement="center" defaultOpen onClose={onDismiss}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Delete {vocabWord}</ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete{' '}
                <span className="font-semibold underline">{vocabWord} </span>
                permanently? This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="danger" onPress={onConfirmDelete}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ConfirmDeleteModal;
