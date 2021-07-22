import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss'

const defaultSeconds = 300

const format: (seconds: number) => string = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  const formattedSeconds = (s < 10) ? "0" + s : s
  return m + ':' + formattedSeconds
}

const progressWidth: (seconds: number) => string = (seconds) => {
  return (seconds / defaultSeconds) * 100 + '%'
}

const TimerView = () => {
  const [seconds, setSeconds] = useState<number>(defaultSeconds);
  const [active, setActive] = useState<boolean>(false);

  const startPause = () => {
    setActive(active => !active)
  }

  const reset = () => {
    setActive(false)
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
      <div className={styles.buttons}>
        <button className="timer" onClick={startPause}><i className={'fas ' + (active ? 'fa-pause' : 'fa-play')}></i></button>
        <button className="timer" onClick={reset}><i className="fas fa-undo-alt"></i></button>
      </div>
      <div className={styles.counter}>
        <span className={styles.digits}>{format(seconds)}</span>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: progressWidth(seconds)}}></div>
        </div>
      </div>
    </div>
  );
};

export default TimerView;