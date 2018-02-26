[![npm version](https://badge.fury.io/js/print-date.svg)](https://badge.fury.io/js/print-date)
[![](https://img.shields.io/npm/dm/print-date.svg)](https://www.npmjs.com/package/print-date)

# print-date

## Install

```
npm install print-date
```

## Usage

```js
import {PrintDate, printDate} from 'print-date';

printDate('20180226', 'yyyy-MM-dd');
printDate(20180226, 'yyyy-MM-dd');
printDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
printDate(new Date(), 'yyy-MM-dd hh:mm:ss(W)');
printDate(new Date(), 'yy-MM-dd hh:mm:ss(WW)');

let myPrintDate = new PrintDate();
myPrintDate.setDate(20180226).print('yyyy, MM, dd');
```

## Print options

Format | Description
---- | -----------
`dd` | Day of the month as digits; leading zero for single-digit days.
`MM` | Month as digits; leading zero for single-digit months.
`yyyy` | Year represented by four digits.
`yyy` | Year represented by three digits.
`yy` | Year represented by two digits.
`y` | Year represented by one digits.
`hh` | Hours; leading zero for single-digit hours (12-hour clock).
`mm` | Minutes; leading zero for single-digit minutes.
`ss` | Seconds; leading zero for single-digit seconds.
`W` | Weekname; single-digit string.
`WW` | Weekname; full string.
