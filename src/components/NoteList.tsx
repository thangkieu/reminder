"use client";

import { Grid } from "@mantine/core";
import { NodeItem, NoteItemType } from "./NoteItem";

export function NoteList() {
  const items: NoteItemType[] = [];
  return (
    <Grid pb="xl">
      {items.map((person) => (
        <Grid.Col key={person.id} span={3}>
          <NodeItem data={person} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
