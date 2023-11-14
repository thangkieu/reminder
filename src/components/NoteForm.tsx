'use client';

import { useCallback, useEffect } from 'react';

import { useSubmitNote, useUpdateNote } from '@/hooks/useSubmitNote';
import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface Props {
  initialValue?: NoteItem;
  onDone?(): void;
  onCancel?(): void;
}

export default function NoteForm(p: Readonly<Props>) {
  const { onDone, onCancel } = p;

  const submitNote = useSubmitNote();
  const updateNote = useUpdateNote();

  const form = useForm<NoteItemPOST | NoteItemPUT>({
    initialValues: p.initialValue || {
      title: '',
      content: '',
    },
  });

  const handleSubmit = useCallback(
    async (values: NoteItemPOST | NoteItemPUT) => {
      console.log('Form submitted:', values);
      if (p.initialValue?.id) {
        updateNote.mutate(values as NoteItemPUT);
      } else {
        submitNote.mutate(values);
      }
    },
    [p.initialValue?.id, submitNote, updateNote]
  );

  useEffect(() => {
    if (submitNote.isSuccess) onDone?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitNote.isSuccess]);

  useEffect(() => {
    if (updateNote.isSuccess) onDone?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateNote.isSuccess]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Title" mb="md" {...form.getInputProps('title')} />
      <Textarea autosize label="Content" mb="md" {...form.getInputProps('content')} />

      <Group justify="flex-end">
        <Button type="button" variant="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button loading={submitNote.isPending || updateNote.isPending} type="submit">
          Submit
        </Button>
      </Group>
    </form>
  );
}
