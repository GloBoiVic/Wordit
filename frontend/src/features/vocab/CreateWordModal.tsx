import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from '@nextui-org/react';
import TextInputField from '../../ui/TextInputField';
import { Form } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { Vocab } from '../../models/vocab';
import { createWord } from '../../services/api';

interface CreateWordModalProps {
  onDismiss: () => void;
}

function CreateWordModal({ onDismiss }: CreateWordModalProps) {
  const [word, setWord] = useState('');
  const [contextWordExample, setContextWordExample] = useState('');

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log({ word, contextWordExample });
  };
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
              <form onSubmit={handleSubmit} id="createWordForm" className="space-y-4">
                <Input
                  value={word}
                  label="Word"
                  placeholder="Add a word"
                  labelPlacement="outside"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}
                  name="word"
                />
                <Textarea
                  value={word}
                  placeholder="Context"
                  labelPlacement="outside"
                  label="Context Example"
                  name="context"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setContextWordExample(e.target.value)}
                />
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
