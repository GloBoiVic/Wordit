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
import toast from 'react-hot-toast';
import { z } from 'zod';
import { InternalServerError } from '../../errors/http_errors';
import { VocabModel } from '../../models/vocabModel';
import * as WordsApi from '../../services/api';
import { wordSchema } from '../../validators/validateWordInput';
import useCreateWord from './useCreateWord';
import useUpdateWord from './useUpdateWord';

interface CreateEditWordModalProps {
  onDismiss: () => void;
  // onWordSaved: (word: VocabModel) => void;
  onWordEdit: () => void;
  wordToEdit?: VocabModel;
}

type TInput = z.infer<typeof wordSchema>;

function CreateEditWordModal({ onDismiss, wordToEdit, onWordEdit }: CreateEditWordModalProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const { createWord, isCreating } = useCreateWord();
  const { updateWord, isUpdating } = useUpdateWord();

  const isWorking = isCreating || isUpdating;
  console.log(wordToEdit);
  const id = wordToEdit?._id;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TInput>({
    resolver: zodResolver(wordSchema),
    defaultValues: {
      word: wordToEdit?.word || '',
      contextExample: wordToEdit?.contextExample || '',
    },
  });

  // async function onSubmit(values: TInput) {
  //   try {
  //     let wordResponse;

  //     if (wordToEdit) {
  //       wordResponse = await WordsApi.updateWord(wordToEdit._id, values);
  //     } else {
  //       wordResponse = await WordsApi.createWord(values);
  //     }
  //     onWordSaved(wordResponse);
  //   } catch (error) {
  //     if (error instanceof InternalServerError) {
  //       setErrorText(error.message);
  //     } else {
  //       alert(error);
  //     }
  //     console.error(error);
  //   }
  // }

  // TODO: id coming back as underfined!!
  // NOTE: Google how to perform an update with react query
  function onSubmit(values: TInput) {
    if (wordToEdit) {
      updateWord(id, values);
      onWordEdit();
      onDismiss();
    } else {
      createWord(values);
      onDismiss();
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
                className="flex items-center w-full gap-4 px-3 py-2 text-sm text-red-500 bg-red-200 border border-red-200 rounded"
                role="alert"
              >
                <ExclamationCircleIcon />
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
