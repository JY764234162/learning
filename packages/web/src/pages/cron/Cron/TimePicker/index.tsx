import { InputNumber, Radio, RadioChangeEvent, Select, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import useLanguage from "../Language";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const options = Array(60)
  .fill(0)
  .map((item, index) => ({ label: index, value: index }));
const thisYear = new Date().getFullYear();
const typeInfo = {
  second: {
    max: 59,
    min: 0,
    options: options,
  },
  minute: {
    max: 59,
    min: 0,
    options: options,
  },
  hour: {
    max: 23,
    min: 0,
    options: Array(24)
      .fill(0)
      .map((item, index) => ({ label: index, value: index })),
  },
  month: {
    max: 12,
    min: 1,
    options: Array(12)
      .fill(0)
      .map((item, index) => ({ label: index + 1, value: index + 1 })),
  },
  year: {
    max: thisYear + 100,
    min: thisYear,
    options: Array(100)
      .fill(0)
      .map((item, index) => ({
        label: index + thisYear,
        value: index + thisYear,
      })),
  },
};

const ExecutingTimePicker: React.FC<{
  value: { hour: string; minute: string; second: string };
  language: "cn" | "en";
  onChange: (hour: string, minute: string, second: string) => void;
  type: "second" | "minute" | "hour" | "month" | "year";
}> = ({ value, onChange, type, language }) => {
  const [selectRadio, setSelectRadio] = useState<0 | 1 | 2 | 3>(0); // 单选值
  const [circleStart, setCircleStart] = useState<number>(typeInfo[type].min); // 循环开始时间
  const [circleTime, setCircleTime] = useState<number>(1); // 循环时间大小
  const [cycleStart, setCycleStart] = useState<number>(typeInfo[type].min); // 周期开始时间
  const [cycleEnd, setCycleEnd] = useState<number>(typeInfo[type].min); // 周期结束时间
  const [selectTime, setSelectTime] = useState<number[]>([
    typeInfo[type].options[0].value,
  ]);
  const Language = useLanguage(language);

  const [timeStr, setTimeStr] = useState("00:00:00");
  useEffect(() => {
    setTimeStr(`${value.hour}:${value.minute}:${value.second}`);
    //   // 回显数据
    //   if (value === '*') {
    //     setSelectRadio(0);
    //   } else if (value.indexOf('/') > -1) {
    //     setSelectRadio(1);
    //     const [start, end] = value.split('/');
    //     setCircleStart(parseInt(start));
    //     setCircleTime(parseInt(end));
    //   } else if (value.indexOf('-') > -1) {
    //     setSelectRadio(2);
    //     const [start, end] = value.split('-');
    //     setCycleStart(parseInt(start));
    //     setCycleEnd(parseInt(end));
    //   } else {
    //     setSelectRadio(3);
    //     setSelectTime(value.split(',').map((item) => parseInt(item)));
    //   }
  }, [value.hour, value.minute, value.second]);

  // 单选修改
  const handleChange = (date: any, dateString: string | string[]) => {
    const dateArr = String(dateString).split(":"); // [hour, minutes, second]
    onChange(
      dateArr[0],
      dateArr[1],
      dateArr[2]
      // String(Number(dateArr[0])),
      // String(Number(dateArr[1])),
      // String(Number(dateArr[2]))
    );
  };

  useEffect(() => {
    if (!circleStart) setCircleStart(typeInfo[type].min);
    if (!circleTime) setCircleTime(1);
    if (!cycleStart) setCycleStart(typeInfo[type].min);
    if (!cycleEnd) setCycleStart(typeInfo[type].min);
  }, [circleStart, circleTime, cycleStart, cycleEnd, type]);
  return (
    <TimePicker
      onChange={handleChange}
      value={dayjs(timeStr, "HH:mm:ss")}
      allowClear={false}
    />
  );
};

export default ExecutingTimePicker;
