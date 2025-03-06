import { RefObject, useEffect } from 'react';

export const UseOutsideClick = (
    ref: RefObject<HTMLElement>,
    cb: () => void,
) => {
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const path = e.composedPath();
            if (ref.current) {
                if (!path.includes(ref.current)) {
                    cb();
                }
            }
        };

        document.addEventListener('click', handleGlobalClick);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, []);
};
