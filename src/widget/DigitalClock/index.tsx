import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import styles from "./index.less";

dayjs.locale("zh-cn");

const DigitalClock = () => {
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    function tick() {
      setDate(dayjs());
    }

    const timerID = setInterval(tick, 1000);

    return function clearTick() {
      clearInterval(timerID);
    };
  });

  return (
    <div className={styles.box}>
      <span>{date.format("dddd")}</span>
      <span>{date.format("YYYY-MM-DD HH:mm:ss")}</span>
    </div>
  );
};

export default DigitalClock;
