import { useEffect, useRef, useState } from "react";

export function useVisible(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    if (typeof IntersectionObserver !== "function") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= threshold),
      { threshold },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
