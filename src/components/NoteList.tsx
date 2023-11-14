'use client';

import { useGetNotes } from '@/hooks/useGetNotes';
import { Grid, Skeleton } from '@mantine/core';

import { NodeItem } from './NoteItem';

export function NoteList() {
  const getNotes = useGetNotes();

  return (
    <Grid pb="xl">
      {getNotes.isLoading &&
        [1, 2, 3, 4].map((item) => (
          <Grid.Col key={item} span={3}>
            <Skeleton height={100} />
          </Grid.Col>
        ))}

      {getNotes.data?.data.map((data) => (
        <Grid.Col key={data.id} span={3}>
          <NodeItem data={data} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
