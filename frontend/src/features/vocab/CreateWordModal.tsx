import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Vocab } from '../../models/vocab';
import * as WordsApi from '../../services/api';
import { wordSchema } from '../../validators/validateWordInput';
import toast from 'react-hot-toast';

interface CreateWordModalProps {
  onDismiss: () => void;
  onWordSaved: (newWord: Vocab) => void;
}

type TInput = z.infer<typeof wordSchema>;

function CreateWordModal({ onDismiss, onWordSaved }: CreateWordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TInput>({
    resolver: zodResolver(wordSchema),
    defaultValues: {
      word: '',
      contextExample: '',
    },
  });

  const onSubmit = async (values: TInput) => {
    try {
      const wordResponse = await WordsApi.createWord(values);
      onWordSaved(wordResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal placement="center" defaultOpen onClose={onDismiss}>
        <ModalContent>
          <>
            <ModalHeader className="flex items-center justify-center text-2xl font-bold tracking-wide">
              Add a word
            </ModalHeader>
            <ModalBody>
              <form id="createWordForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  {...register('word')}
                  label="Word"
                  placeholder="Add a word"
                  labelPlacement="outside"
                  name="word"
                />
                {errors.word?.message && <p className="mt-1 text-xs text-red-500">{errors.word?.message}</p>}
                <Textarea
                  {...register('contextExample')}
                  placeholder="Context"
                  labelPlacement="outside"
                  label="Context Example"
                  name="contextExample"
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                form="createWordForm"
                fullWidth
                color="primary"
                onPress={() => {
                  if (!isValid) return;
                  toast.success('Word created', {
                    className: '',
                  });
                }}
              >
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
