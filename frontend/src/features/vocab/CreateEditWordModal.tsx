import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { VocabModel } from '../../models/vocabModel';
import { wordSchema } from '../../validators/validateWordInput';
import useCreateWord from './useCreateWord';
import useUpdateWord from './useUpdateWord';

interface CreateEditWordModalProps {
  onDismiss: () => void;
  onWordEdit?: () => void;
  wordToEdit?: VocabModel;
}

type TInput = z.infer<typeof wordSchema>;

function CreateEditWordModal({ onDismiss, wordToEdit, onWordEdit }: CreateEditWordModalProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const { createWord, isCreating } = useCreateWord();
  const { updateWord, isUpdating } = useUpdateWord();

  const isWorking = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({
    resolver: zodResolver(wordSchema),
    defaultValues: {
      word: wordToEdit?.word || '',
      contextExample: wordToEdit?.contextExample || '',
    },
  });

  function onSubmit(values: TInput) {
    if (wordToEdit) {
      const updateValue = {
        id: wordToEdit._id,
        values,
      };
      updateWord(updateValue);
      onWordEdit?.();
      onDismiss();
    } else {
      createWord(values, {
        onError: (error) => {
          // server is throwing error code 500. Why??
          setErrorText(error.message);
        },
        onSuccess: () => onDismiss(),
      });
    }
  }

  return (
    <Modal placement="center" defaultOpen onClose={onDismiss}>
      <ModalContent>
        <>
          <ModalHeader className="flex items-center justify-center text-2xl font-bold tracking-wide">
            Add a word
          </ModalHeader>
          <ModalBody>
            {errorText && (
              <div
                className="flex items-center w-full gap-4 px-3 py-2 text-sm text-red-500 bg-red-100 border border-red-200 rounded"
                role="alert"
              >
                <ExclamationCircleIcon className="w-6 h-5" />
                <p>{errorText}</p>
              </div>
            )}
            <form id="createWordForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register('word')}
                label="Word"
                placeholder="Add a word"
                labelPlacement="outside"
                name="word"
                isInvalid={!!errors.word}
              />
              {errors.word?.message && (
                <p className="mt-1 text-xs text-red-500">{errors.word?.message}</p>
              )}
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
              disabled={isWorking}
              form="createWordForm"
              fullWidth
              color="primary"
            >
              Save
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}

export default CreateEditWordModal;
