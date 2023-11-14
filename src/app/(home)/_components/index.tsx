'use client';

import { useCallback, useState } from 'react';

import NoteForm from '@/components/NoteForm';
import { NoteList } from '@/components/NoteList';
import { TriggerCronJobButton } from '@/components/TriggerCron';
import { Button, Container, Group, Modal, Title } from '@mantine/core';
import { IconNotebook, IconPlus } from '@tabler/icons-react';

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
          <Button variant="default" radius="md" leftSection={<IconPlus />} onClick={toggle}>
            Add Note
          </Button>
          <TriggerCronJobButton />
        </Group>

        <NoteList />
      </Container>
      <Modal opened={open} onClose={toggle} title="Submit New Note">
        <NoteForm onDone={toggle} onCancel={toggle} />
      </Modal>
    </main>
  );
}
