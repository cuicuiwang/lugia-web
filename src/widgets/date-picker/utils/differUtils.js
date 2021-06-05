import moment from 'moment';
import { getValueIsInRange, rangeValueMonthIsSame, modeStyle } from './booleanUtils';
import { sortable } from '../../common/Math';
function getWeekIndex(moments: Object) {
  const momentA = moments.clone();
  const weekDay = momentA.date(1).weekday();
  return { weekIndex: weekDay };
}
function getIndexInValue(value: string, weekIndex: number, format: string) {
  const date = moment(value, format).date();
  const dateIndex = date + weekIndex;
  return dateIndex;
}
function getMinAndMaxInMonth(rangeValue: Array<string>, format: string) {
  const start = rangeValue[0];
  const end = rangeValue[1];
  const min = moment.min(moment(start, format), moment(end, format)).format(format);
  const max = moment.max(moment(start, format), moment(end, format)).format(format);
  return { max, min };
}
function getDatesInRangeValue(
  rangeValue: Array<string>,
  panelDatesArray: Array<string>,
  monthAndYear: Array<string>,
  format: string
) {
  const { min, max } = getMinAndMaxInMonth(rangeValue, format);
  const rangeDatesFirst = [];
  const rangeDatessecond = [];
  panelDatesArray.forEach((current, index) => {
    panelDatesArray[index].forEach(item => {
      const isInRange = getValueIsInRange(max, min, item, format);
      const isNoCurrentItemone = rangeDatesFirst.indexOf(item) < 0;
      const isNoCurrentItemTwo = rangeDatessecond.indexOf(item) < 0;
      const isSameYearandMonthOne = rangeValueMonthIsSame([item, monthAndYear[0]], format);
      const isSameYearandMonthTwo = rangeValueMonthIsSame([item, monthAndYear[1]], format);
      if (isInRange && isSameYearandMonthOne && isNoCurrentItemone) {
        rangeDatesFirst.push(item);
      }
      if (isInRange && isSameYearandMonthTwo && isNoCurrentItemTwo) {
        rangeDatessecond.push(item);
      }
    });
  });
  return [rangeDatesFirst, rangeDatessecond];
}
function getRangeIndex(
  rangeDates: Array<Array<string>>,
  monthAndYear: Array<string>,
  format: string
) {
  const rangeIndex = [];
  rangeDates.forEach((items, index) => {
    const moments = moment(monthAndYear[index], format);
    const { weekIndex } = getWeekIndex(moments);
    const dateIndexArray = [];
    items.forEach((current, i) => {
      const dateIndex = getIndexInValue(current, weekIndex, format);
      dateIndexArray.push(dateIndex);
    });
    rangeIndex.push(dateIndexArray);
  });
  return rangeIndex;
}

function getRangeChoseDayIndex(
  rangeValue: Array<string>,
  monthAndYear: Array<string>,
  format: string
) {
  const choseDayIndexs = [];
  monthAndYear.forEach((item, index) => {
    const moments = moment(monthAndYear[index], format);
    const { weekIndex } = getWeekIndex(moments);
    const choseDayIndex = [];
    rangeValue.forEach((list, i) => {
      const monthIsSame = rangeValueMonthIsSame([item, list], format);
      if (monthIsSame) {
        const dateIndex = getIndexInValue(list, weekIndex, format);
        choseDayIndex.push(dateIndex);
      }
    });
    choseDayIndexs.push(choseDayIndex);
  });
  return choseDayIndexs;
}
//range
export function getIndexInRange(
  rangeValue: Array<string>,
  monthAndYear: Array<string>,
  panelDatesArray: Array<string>,
  format: string
) {
  const rangeDates = getDatesInRangeValue(rangeValue, panelDatesArray, monthAndYear, format);
  const rangeIndex = getRangeIndex(rangeDates, monthAndYear, format);
  const choseDayIndex = getRangeChoseDayIndex(rangeValue, monthAndYear, format);
  return { rangeIndex, choseDayIndex };
}
export function differMonthAndYear(monthAndYear) {
  const first = moment(monthAndYear[0], 'YYYY-MM');
  const second = moment(monthAndYear[1], 'YYYY-MM');
  const differ = second.diff(first, 'month');
  const differAmonth = differ === 1 || differ === 0 || first.diff(second, 'month') >= 1;
  const differAyear = differ <= 12;
  return {
    differAmonth,
    differAyear,
  };
}
export function getCurrentPageDates(monthAndYear: Array<string>, format: string) {
  const datesArray = [];
  monthAndYear.forEach((item, index) => {
    const moments = moment(item, format);
    const days = getDays(moments);
    const year = moments.year();
    const month = moments.month();
    const { weekIndex } = getWeekIndex(moments);
    const maxDay = moments.daysInMonth();
    const parmasGetDates = {
      weekIndex,
      format,
      year,
      month,
      maxDay,
    };
    const { dates } = getDates(days, 'range', item, parmasGetDates);
    datesArray.push(dates);
  });
  return datesArray;
}
//public
export const getYandM = (obj: Object) => {
  const { index, child, value, mode, firstDayIndex, props } = obj;
  const choseDate = child;
  const { weekIndex, format } = props;
  const { year, month } = props;
  const { isRange, isWeeks } = modeStyle(mode);
  const newFormat = isWeeks ? 'YYYY-MM-DD' : format;
  const newValue = isRange
    ? moment()
        .set({ month, year })
        .format(format)
    : value;

  const { choseDayIndex, choseValue } = getChoseDayIndex(
    'getNode',
    choseDate,
    weekIndex,
    firstDayIndex,
    index,
    newValue,
    mode,
    props
  );
  const moments = moment(choseValue, newFormat);
  const newYear = moments.year();
  const newMonth = moments.month();
  return {
    choseValue: moments.format(newFormat),
    year: newYear,
    month: newMonth,
    choseDate,
    choseDayIndex,
  };
};
export const getChoseDayIndex = (
  funGoal: string,
  choseDate: number,
  weekIndex: number,
  firstDayIndex: [],
  index: number,
  value: string,
  mode: string,
  props: { format: string, maxDay: number }
) => {
  let { format } = props;
  const { isWeeks } = modeStyle(mode);
  if (isWeeks) {
    format = 'YYYY-MM-DD';
  }
  const { maxDay } = props;
  const first = firstDayIndex && firstDayIndex[0];
  const second = firstDayIndex && firstDayIndex[1];
  const moments = moment(value, format);
  if (funGoal === 'changeHead' && choseDate > maxDay) {
    choseDate = maxDay;
  }
  let choseDayIndex = choseDate + weekIndex;
  let choseValue = getChoseValue(moments, 'add', 0, choseDate, format);

  if (index < first) {
    choseDayIndex = index + 1;
    choseValue = getChoseValue(moments, 'subtract', 1, choseDate, format);
  }

  if (index >= second) {
    choseDayIndex = weekIndex + choseDate;
    choseValue = getChoseValue(moments, 'add', 1, choseDate, format);
  }
  return {
    choseDayIndex,
    choseValue,
  };
};
export const getChoseValue = (
  moments: Object,
  funName: string,
  number: number,
  choseDate: number,
  format
) => {
  const newMoments = moment(moments);
  newMoments[funName](number, 'month').set('date', choseDate);
  return newMoments.format(format);
};
export const getFirstDayIndex = (days: Array<number>) => {
  const firstDayIndex = [];
  days.forEach((currentVal, index) => {
    currentVal === 1 && firstDayIndex.push(index);
  });
  return { firstDayIndex };
};
export const getDates = (
  days: [],
  mode: string,
  value,
  params: {
    weekIndex: number,
    format: string,
    year: number,
    month: number,
    maxDay: number,
  }
) => {
  const dates = [];
  const { firstDayIndex } = getFirstDayIndex(days);
  days.forEach((item, index) => {
    const getYandMParams = {
      index,
      child: item,
      value,
      mode,
      firstDayIndex,
      props: params,
    };
    const { choseValue } = getYandM(getYandMParams);
    dates.push(choseValue);
  });
  return { dates };
};
export const getDays = (moments: Object) => {
  const days = [];
  const newMoments = moment(moments.date(1));
  const { weekIndex } = getWeekIndex(moments);
  const newMoment = newMoments.subtract(weekIndex, 'day');
  days.push(newMoment.date());
  for (let i = 1; i < 42; i++) {
    const nowMoment = moment(newMoment);
    days.push(nowMoment.add(i, 'day').date());
  }
  return days;
};

//week
//7的倍数的end and start ，用于weeks hover时，正行选中的index值
export const getWeeksIndexRange = (index: number) => {
  const start = Math.floor(index / 7);
  const end = start + 1;
  const startIndex = start * 7 + 1;
  const endIndex = end * 7;
  return {
    startIndex,
    endIndex,
  };
};
export function getRangeIndexfromWeeks(
  moments: moment.Moment,
  weekIndex: number,
  isStartOfWeek: boolean
) {
  let FuncName = 'startOf';
  let number = 6;
  if (!isStartOfWeek) {
    FuncName = 'endOf';
    number = -6;
  }
  const start = moments[FuncName]('week').date();
  const startInWeeks = start + weekIndex;
  const endInWeeks = startInWeeks + number;
  const indexs = [startInWeeks, endInWeeks].sort(sortable);
  return {
    startInWeeks: indexs[0],
    endInWeeks: indexs[1],
  };
}
export const getweekFormatValue = (year: number, weeks: number, format: string) => {
  const weekValue = moment()
    .set({ year, weeks })
    .format(format);
  return weekValue;
};
export const getValueFromWeekToDate = (value: string, format: string, funName?: string) => {
  const moments = moment(value, format);
  const weeks = moments.format('w');
  const year = moment(value, 'YYYY').year();
  const result = moment()
    .set({ year, weeks })
    [funName || 'startOf']('week')
    .format('YYYY-MM-DD');
  return result;
};
export function getWeeksRange(
  weeks: number,
  weeksInYear: number,
  step: number
): {
  weeksDate: Array<any>,
  rangeIndex: number,
} {
  const weeksDate = [];
  let rangeIndex = 0;
  const howNumber = Math.ceil(weeksInYear / step);
  for (let i = 0; i < howNumber; i++) {
    const start = step * i + 1;
    const end = i === howNumber - 1 ? weeksInYear : step * i + step;
    const text = `${start}-${end}周`;
    if (weeks >= start && weeks <= end) {
      rangeIndex = i;
    }
    weeksDate.push({ text, start, end, index: i, value: i });
  }
  return {
    weeksDate,
    rangeIndex,
  };
}
export const getWeeksRangeInDates = (moments: moment.Moment): Object => {
  const month = moments.month();
  const weeks = moments.weeks();
  let year = moments.year();
  if (month === 11 && weeks === 1) {
    year = year + 1;
  }
  if (month === 0 && weeks > 40) {
    year = year - 1;
  }
  return {
    year,
    weeks,
    month,
  };
};
//time
export const getTimes = (number: number) => {
  const Times = [];
  for (let i = 0; i < number; i++) {
    let text = i;
    if (i < 10) {
      text = '0' + i;
    }
    Times.push({ text, value: i });
  }
  return Times;
};
export const getShowTime = (value: string, format: string): Array<number> => {
  let newValue = ['', '', ''];
  if (value) {
    const moments = moment(value, format);
    newValue[0] = moments.hour();
    newValue[1] = moments.minute();
    newValue[2] = moments.second();
  } else {
    newValue = [0, 0, 0];
  }
  return newValue;
};
export function haveWhichOneItemInTime(format) {
  let hasHour = false;
  let hasMinutes = false;
  let hasSeconds = false;
  for (let i = 0; i < format.length; i++) {
    const newFormat = format[i].toUpperCase();
    if (newFormat === 'H') {
      hasHour = true;
    }
    if (newFormat === 'M') {
      hasMinutes = true;
    }
    if (newFormat === 'S') {
      hasSeconds = true;
    }
  }
  const result = [hasHour, hasMinutes, hasSeconds];
  let hasItemNumber = 3;
  let number = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i]) {
      number += 1;
    }
  }
  if (number < hasItemNumber) {
    hasItemNumber = number;
  }
  return { hasHour, hasMinutes, hasSeconds, hasItemNumber };
}
export const getCoversTimes = (times: Array<number>, number: number, item: any) => {
  const newTimes = [...times];
  for (let i = 0; i < number - 1; i++) {
    newTimes.push(item);
  }
  return newTimes;
};
export const getBoundaryValue = (min: number, max: number, val: number) => {
  let newValue = val;
  if (val < min) {
    newValue = min;
  }
  if (val > max) {
    newValue = max;
  }
  return newValue;
};
