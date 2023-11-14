'use client';

import { useCallback } from 'react';

import { Button, Card, Divider, Group, Text, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface Props {
  data: NoteItem;
  onEdit?(payload: NoteItem): void;
  onDelete?(id: string): void;
}

export function NodeItem(p: Readonly<Props>) {
  const { onEdit, onDelete, ...props } = p;

  const handleEdit = useCallback(() => {
    onEdit?.(props.data);
  }, [onEdit, props.data]);

  const handleRemove = useCallback(() => {
    onDelete?.(props.data.id);
  }, [onDelete, props.data.id]);

  return (
    <Card withBorder shadow="sm" padding="md" radius="md">
      <Title order={4}>{props.data.title}</Title>

      <Text mb="xs" c="dimmed" size="sm">
        {props.data.content}
      </Text>
      <Text c="dimmed" size="sm" mb="md">
        {props.data.createdAt}
      </Text>

      <Card.Section withBorder>
        <Group wrap="nowrap" gap={0}>
          <Button
            onClick={handleEdit}
            py="sm"
            color="gray"
            variant="subtle"
            fullWidth
            leftSection={<IconEdit />}
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
            leftSection={<IconTrash />}
            radius={0}
          >
            Delete
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
