[![npm version](https://badge.fury.io/js/print-date.svg)](https://badge.fury.io/js/print-date)
[![](https://img.shields.io/npm/dm/print-date.svg)](https://www.npmjs.com/package/print-date)

# print-date
This project forked from https://github.com/felixge/node-dateformat
- Date, String, and Number are supported in the first argument of `dateFormat`.
- Improved the pattern of the second argument of `dateFormat`.

## Install

```
npm install print-date -S
```

## Usage
The PrintDate class has default i18n values: 
If you need to change it, you can use the `PrintDate.setI18n` function to modify the custom value.

```js
import {PrintDate, printDate} from 'print-date';

/*
PrintDate.i18n
{
    dayNames: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    timeNames: [
      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};
*/

PrintDate.setI18n({
    dayNames: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]
});
```

```js
import {PrintDate, printDate} from 'print-date';

printDate('20180101', 'yy-MM-dd')
// 18-01-01
printDate('20180226', 'yyyy-M-d')
// 2018-2-26
printDate('20181225', 'MMM dd, yyyy')
// Dec 25, 2018
printDate('20181225', 'MMMM dd, yyyy')
// December 25, 2018
printDate('20181225', 'MMMM dd, yyyy(E)')
// December 25, 2018(T)
printDate('20181225', 'MMMM dd, yyyy(EE)')
// December 25, 2018(Tu)
printDate('20181225', 'MMMM dd, yyyy(EEE)')
// December 25, 2018(Tue)
printDate('20181225', 'MMMM dd, yyyy(EEEE)')
// December 25, 2018(Tuesday)
printDate('20180102152222', 'MMMM dd(EEE), yyyy. HH:mm:ss')
// January 02(Tue), 2018. 15:22:22
printDate('20180102152222', 'MMMM dd(EEE), yyyy. aa hh:mm:ss z')
// January 02(Tue), 2018. pm 03:22:22 GMT+0900
printDate('20180102152222', 'MMMM dd(EEE), yyyy. AA hh:mm:ss z')
// January 02(Tue), 2018. PM 03:22:22 GMT+0900
printDate(new Date(), 'yy-MM-dd')
// 18-02-28
printDate(new Date(), 'yyyy-M-d')
// 2018-2-28
printDate(new Date(), 'MMM dd, yyyy')
// Feb 28, 2018
printDate(new Date(), 'MMMM dd, yyyy')
// February 28, 2018
printDate(new Date(), 'MMMM dd, yyyy(E)')
// February 28, 2018(W)
printDate(new Date(), 'MMMM dd, yyyy(EE)')
// February 28, 2018(We)
printDate(new Date(), 'MMMM dd, yyyy(EEE)')
// February 28, 2018(Wed)
printDate(new Date(), 'MMMM dd, yyyy(EEEE)')
// February 28, 2018(Wednesday)
printDate(new Date(), 'MMMM dd(EEE), yyyy. HH:mm:ss')
// February 28(Wed), 2018. 16:03:38
printDate(new Date(), 'MMMM dd(EEE), yyyy. aa hh:mm:ss z')
// February 28(Wed), 2018. pm 04:03:38 GMT+0900
printDate(new Date(), 'MMMM dd(EEE), yyyy. AA hh:mm:ss z')
// February 28(Wed), 2018. PM 04:03:38 GMT+0900

let myPrintDate = new PrintDate();
myPrintDate.setDate(20180226).print('yyyy, MM, dd');
```

## Print format description

Format | Description
---- | -----------
`d` |  Day of the month as digits; no leading zero for single-digit days. ex) 1
`dd` |  Day of the month as digits; leading zero for single-digit days. ex) 01
`E` |  Day of the week as a single-letter abbreviation.
`EE` |  Day of the week as a two-letter abbreviation.
`EEE` |  Day of the week as a three-letter abbreviation.
`EEEE` |  Day of the week as its full name.
`M` |  Month as digits; no leading zero for single-digit months.
`MM` |  Month as digits; leading zero for single-digit months.
`MMM` |  Month as a three-letter abbreviation.
`MMMM` |  Month as its full name.
`yy` |  Year as last two digits; leading zero for years less than 10.
`yyyy` |  Year represented by four digits.
`h` | Hours; no leading zero for single-digit hours (12-hour clock).
`hh` | Hours; leading zero for single-digit hours (12-hour clock).
`H` | Hours; no leading zero for single-digit hours (24-hour clock).
`HH` | Hours; leading zero for single-digit hours (24-hour clock).
`m` | Minutes; no leading zero for single-digit minutes.
`mm` | Minutes; leading zero for single-digit minutes.
`N` | ISO 8601 numeric representation of the day of the week.
`o` | GMT/UTC timezone offset, e.g. -0500 or +0230.
`s` | Seconds; no leading zero for single-digit seconds.
`ss` | Seconds; leading zero for single-digit seconds.
`S` | The date's ordinal suffix (st, nd, rd, or th). Works well with `d`.
`l` |  Milliseconds; gives 3 digits.
`L` | Milliseconds; gives 2 digits.
`a`	| Lowercase, single-character time marker string: a or p.
`aa` | Lowercase, two-character time marker string: am or pm.
`A` | Uppercase, single-character time marker string: A or P.
`AA` | Uppercase, two-character time marker string: AM or PM.
`W` | ISO 8601 week number of the year, e.g. 42
`z` | US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the
`'...'`, `"..."` | Literal character sequence. Surrounding quotes are removed.
`UTC:` |	Must be the first four characters of the mask. Converts the date from local time to UTC/GMT/Zulu time before applying the mask. The "UTC:" prefix is removed.
