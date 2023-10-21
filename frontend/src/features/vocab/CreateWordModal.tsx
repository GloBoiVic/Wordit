import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import TextInputField from '../../ui/TextInputField';

interface CreateWordModalProps {
  onDismiss: () => void;
}

function CreateWordModal({ onDismiss }: CreateWordModalProps) {
  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal placement="center" defaultOpen onClose={onDismiss}>
        <ModalContent>
          <>
            <ModalHeader className="flex items-center justify-center text-2xl font-bold tracking-wide">
              Add a word
            </ModalHeader>
            <ModalBody>
              <form id="createWordForm" className="space-y-4">
                <TextInputField label="Word" placeholder="Add a word" />
                <TextInputField as="textarea" placeholder="Context" label="Context Example" />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button id="createWordForm" fullWidth color="primary">
                Save
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateWordModal;
