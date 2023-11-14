'use client';

import axios from 'axios';

import { Button } from '@mantine/core';

export function TriggerCronJobButton() {
  const triggerCronJob = () => {
    axios.get('/api/cron', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`,
      },
    });
  };

  return (
    <Button variant="light" onClick={triggerCronJob}>
      Trigger CronJob
    </Button>
  );
}
