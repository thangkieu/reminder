"use client";

import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

type NoteItemType = {
  id: string;
  name: string;
  email: string;
  role: string;
  imageUrl: string;
  lastSeen: string | null;
  lastSeenDateTime?: string;
};

interface Props {
  data: NoteItemType;
  onEdit?(payload: NoteItemType): void;
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
      <Title order={4}>You&apos;ve won a million dollars in cash!</Title>

      <Text mt="xs" c="dimmed" size="sm">
        Please click anywhere on this card to claim your reward, this is not a
        fraud, trust us
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

export type { NoteItemType };
