/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
export default function useAppLoad(props) {
    const { isProgressStartAutomatically = true, progressInterval = 500, incrementProgressValue = 10, successLoadedTimeout = 3000, stoppedProgressValue = 70, isManualProgressCompleted = true, } = props ?? {};
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        let interval;
        if (isProgressStartAutomatically) {
            interval = _initiateProgress();
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        let timeout;
        if (progress >= stoppedProgressValue && isManualProgressCompleted) {
            timeout = setTimeout(() => {
                setIsLoaded(true);
                setProgress(100);
            }, successLoadedTimeout);
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [progress, stoppedProgressValue, isManualProgressCompleted, successLoadedTimeout]);
    const _initiateProgress = () => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= stoppedProgressValue) {
                    clearInterval(interval);
                }
                return prev + incrementProgressValue;
            });
        }, progressInterval);
        return interval;
    };
    const start = () => {
        _initiateProgress();
    };
    const done = () => {
        if (!isManualProgressCompleted) {
            setIsLoaded(true);
        }
    };
    return { progress, isLoaded, start, done };
}
