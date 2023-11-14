"use client";

import { useSubmitNote } from "@/hooks/useSubmitNote";
import { Button, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback } from "react";

export default function NoteForm() {
  const submitNote = useSubmitNote();

  const form = useForm<NoteItemPOST>({
    initialValues: {
      title: "",
      content: "",
    },
  });

  const handleSubmit = useCallback(
    async (values: NoteItemPOST | NoteItemPUT) => {
      console.log("Form submitted:", values);
      submitNote.mutate(values);
    },
    [submitNote]
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Title" mb="md" {...form.getInputProps("title")} />
      <Textarea label="Content" mb="md" {...form.getInputProps("content")} />

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
