import { useEffect, useState } from 'react';

/** True after hydration — use for Swiper / client-only UI without fake state hacks. */
export function useClientMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
