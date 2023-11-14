'use client';

import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import { useDeleteNote } from '@/hooks/useDeleteNote';
import { Button, Card, Divider, Group, Modal, Text, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import NoteForm from './NoteForm';

interface Props {
  data: NoteItem;
  onEdit?(payload: NoteItem): void;
  onDelete?(id: string): void;
}

export function NodeItem(p: Readonly<Props>) {
  const { onEdit, onDelete, ...props } = p;

  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<NoteItem>();

  const toggle = useCallback(() => setOpen((o) => !o), []);

  const deleteNote = useDeleteNote();

  const handleEdit = useCallback(() => {
    setEditingData(props.data);
    toggle();
  }, [props.data, toggle]);

  const handleRemove = useCallback(() => {
    deleteNote.mutate(props.data.id);
  }, [deleteNote, props.data.id]);

  return (
    <>
      <Card withBorder shadow="sm" padding="md" radius="md">
        <Title order={4} mb={8}>
          {props.data.title}
        </Title>

        <Text mb="xs" c="dimmed" size="sm">
          {props.data.content}
        </Text>
        <Text c="dimmed" size="sm" mb="md">
          {dayjs(props.data.createdAt).format('DD/MM/YYYY')}
        </Text>

        <Card.Section withBorder>
          <Group wrap="nowrap" gap={0}>
            <Button
              onClick={handleEdit}
              py="sm"
              color="gray"
              variant="subtle"
              fullWidth
              leftSection={<IconEdit size="1.2em" />}
              radius={0}
            >
              Edit
            </Button>

            <Divider orientation="vertical" />

            <Button
              onClick={handleRemove}
              py="sm"
              color="red"
              variant="subtle"
              fullWidth
              leftSection={<IconTrash size="1.2em" />}
              radius={0}
              loading={deleteNote.isPending}
            >
              Delete
            </Button>
          </Group>
        </Card.Section>
      </Card>
      <Modal opened={open} onClose={toggle} title={`Update Note: ${editingData?.title}`}>
        <NoteForm initialValue={editingData} onDone={toggle} onCancel={toggle} />
      </Modal>
    </>
  );
}
