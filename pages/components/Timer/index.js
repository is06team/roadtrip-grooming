import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss'

const defaultSeconds = 300

const Timer = () => {
    const [seconds, setSeconds] = useState(defaultSeconds);
    const [active, setActive] = useState(false);

    const format = (seconds) => {
        const m = Math.floor(seconds / 60)
        let s = seconds % 60
        if (s < 10) s = "0" + s
        return m + ':' + s
    }

    const progressWidth = (seconds) => {
        return (seconds / defaultSeconds) * 100 + '%'
    }

    const startPause = () => {
        setActive(active => !active)
    }

    const reset = () => {
        setSeconds(defaultSeconds)
    }

    useEffect(() => {
        if (active) {
            const interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
            if (seconds <= 0) {
                clearInterval(interval)
                setActive(false)
            }
            return () => clearInterval(interval);
        }
    }, [seconds, active]);

    return (
        <div className={styles.Timer}>
            <div>
                <span className={styles.digits}>{format(seconds)}</span>
                <div className={styles.progressContainer}>
                    <div className={styles.progress} style={{ width: progressWidth(seconds)}}></div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button onClick={startPause}>Start / Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;