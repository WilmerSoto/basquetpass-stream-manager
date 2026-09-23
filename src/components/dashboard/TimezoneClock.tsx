"use client";

import TimezoneDisplay from "@/components/common/TimezoneDisplay";
import { useCurrentTime } from "@/utils/useCurrentTime";

export default function TimezoneClock() {
  const time = useCurrentTime();
  /* const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []); */

  return <TimezoneDisplay date={time} variant="header" />;
}
