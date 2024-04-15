/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useCloseMenu(handler) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [ref, handler]);
    return ref;
}
