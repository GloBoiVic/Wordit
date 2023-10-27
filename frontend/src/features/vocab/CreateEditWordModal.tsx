import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { VocabModel } from '../../models/vocabModel';
import * as WordsApi from '../../services/api';
import { wordSchema } from '../../validators/validateWordInput';
import toast from 'react-hot-toast';

interface CreateEditWordModalProps {
  onDismiss: () => void;
  onWordSaved: (word: VocabModel) => void;
  wordToEdit?: VocabModel;
}

type TInput = z.infer<typeof wordSchema>;

function CreateEditWordModal({ onDismiss, onWordSaved, wordToEdit }: CreateEditWordModalProps) {
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

  async function onSubmit(values: TInput) {
    try {
      let wordResponse;

      if (wordToEdit) {
        wordResponse = await WordsApi.updateWord(wordToEdit._id, values);
      } else {
        wordResponse = await WordsApi.createWord(values);
      }
      onWordSaved(wordResponse);
    } catch (error) {
      console.error(error);
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
            <form id="createWordForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register('word')}
                label="Word"
                placeholder="Add a word"
                labelPlacement="outside"
                name="word"
                isInvalid={!!errors.word}
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
                toast.success(wordToEdit ? 'Note Updated' : 'Note Added', {
                  className: 'border-green-500 bg-green-500 text-stone-100 p-3',
                });
              }}
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
