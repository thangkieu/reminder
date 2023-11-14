"use client";

import axios from "axios";

export function TriggerCronJobButton() {
  const triggerCronJob = () => {
    axios.get("/api/cron", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`,
      },
    });
  };

  return <button onClick={triggerCronJob}>Trigger CronJob</button>;
}
