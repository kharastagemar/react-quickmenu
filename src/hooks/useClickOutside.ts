import {useEffect} from "react";

export default function useClickOutside(handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!(event.target as any).closest(".context-menu-container")) {
        handler();
      }
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [handler]);
}
