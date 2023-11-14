"use client";

import NoteForm from "@/components/NoteForm";
import { NoteList } from "@/components/NoteList";
import { useCallback, useState } from "react";

import { Box, Button, Container, Group, Title } from "@mantine/core";
import { Modal } from "@mantine/core";
import { IconNotebook, IconPlus } from "@tabler/icons-react";
import { TriggerCronJobButton } from "@/components/TriggerCron";

export default function Home() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <main>
      <Container>
        <Title order={1} mt="xl" mb="xs">
          <Group gap="xs">
            <IconNotebook size="1em" />
            <span>Note Reminders</span>
          </Group>
        </Title>
        <Group mb="sm" justify="flex-end">
          <Button
            variant="default"
            radius="md"
            leftSection={<IconPlus />}
            onClick={toggle}
          >
            Add Note
          </Button>
          <TriggerCronJobButton />
        </Group>

        <NoteList />
      </Container>
      <Modal opened={open} onClose={toggle} title="Submit New Note">
        <NoteForm />
      </Modal>
    </main>
  );
}
