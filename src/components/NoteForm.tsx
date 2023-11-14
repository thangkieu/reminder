'use client';

import { useCallback, useEffect } from 'react';

import { useSubmitNote } from '@/hooks/useSubmitNote';
import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface Props {
  onDone?(): void;
}

export default function NoteForm(p: Readonly<Props>) {
  const { onDone } = p;

  const submitNote = useSubmitNote();

  const form = useForm<NoteItemPOST>({
    initialValues: {
      title: '',
      content: '',
    },
  });

  const handleSubmit = useCallback(
    async (values: NoteItemPOST | NoteItemPUT) => {
      console.log('Form submitted:', values);
      submitNote.mutate(values);
    },
    [submitNote]
  );

  useEffect(() => {
    if (submitNote.isSuccess) onDone?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitNote.isSuccess]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Title" mb="md" {...form.getInputProps('title')} />
      <Textarea label="Content" mb="md" {...form.getInputProps('content')} />

      <Group justify="flex-end">
        <Button type="button" variant="default">
          Cancel
        </Button>
        <Button loading={submitNote.isPending} type="submit">
          Submit
        </Button>
      </Group>
    </form>
  );
}
