"use client";

import { useEffect, useState } from "react";
import TimezoneDisplay from "@/components/common/TimezoneDisplay";

export default function TimezoneClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <TimezoneDisplay date={time} variant="header" />;
}
