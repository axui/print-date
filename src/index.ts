import isNumber from 'lodash-es/isNumber';
import isString from 'lodash-es/isString';
import padStart from 'lodash-es/padStart';

function right(str, pos) {
  if (typeof str === 'undefined' || typeof pos === 'undefined') return '';
  str = '' + str;
  if (isString(pos)) {
    return (str.lastIndexOf(pos) > -1) ? str.substr(str.lastIndexOf(pos) + 1) : '';
  }
  else if (isNumber(pos)) {
    return str.substr(str.length - pos);
  }
  else {
    return '';
  }
}

function localDate(yy, mm, dd, hh?: number, mi?: number, ss?: number) {
  let utcD;
  if (mm < 0) mm = 0;
  if (typeof hh === 'undefined') hh = 12;
  if (typeof mi === 'undefined') mi = 0;

  utcD = new Date(Date.UTC(yy, mm, dd || 1, hh, mi, ss || 0));

  if (mm == 0 && dd == 1 && utcD.getUTCHours() + (utcD.getTimezoneOffset() / 60) < 0) {
    utcD.setUTCHours(0);
  }
  else {
    utcD.setUTCHours(utcD.getUTCHours() + (utcD.getTimezoneOffset() / 60));
  }
  return utcD;
}

export class PrintDate {

  public static WeekNames: AXIWeekName[];

  public static setConfig(config) {

  }

  // 기준일자
  currDate: Date;

  constructor() {
    this.currDate = new Date();

  }

  public setDate(d: any) {
    let currDate: Date = new Date();
    let yy, mm, dd, hh, mi, aDateTime, aTimes, aTime, aDate, va;
    const ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;
    const ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

    if (isString(d)) {
      if (d.length > 15) {
        if (ISO_8601_FULL.test(d) || ISO_8601.test(d)) {
          currDate = new Date(d);
        } else {
          aDateTime = d.split(/ /g);
          aDate = aDateTime[0].split(/\D/g);
          yy = aDate[0];
          mm = parseFloat(aDate[1]);
          dd = parseFloat(aDate[2]);
          aTime = aDateTime[1] || '09:00';
          aTimes = aTime.substring(0, 5).split(':');
          hh = parseFloat(aTimes[0]);
          mi = parseFloat(aTimes[1]);
          if (right(aTime, 2) === 'AM' || right(aTime, 2) === 'PM') hh += 12;
          currDate = localDate(yy, mm - 1, dd, hh, mi);
        }
      }
      else if (d.length == 14) {
        va = d.replace(/\D/g, '');
        currDate = localDate(va.substr(0, 4), va.substr(4, 2) - 1, parseFloat(va.substr(6, 2)), parseFloat(va.substr(8, 2)), parseFloat(va.substr(10, 2)), parseFloat(va.substr(12, 2)));
      }
      else if (d.length > 7) {
        va = d.replace(/\D/g, '');
        currDate = localDate(va.substr(0, 4), va.substr(4, 2) - 1, parseFloat(va.substr(6, 2)));
      }
      else if (d.length > 4) {
        va = d.replace(/\D/g, '');
        currDate = localDate(va.substr(0, 4), va.substr(4, 2) - 1, 1);
      }
      else if (d.length > 2) {
        va = d.replace(/\D/g, '');
        currDate = localDate(va.substr(0, 4), va.substr(4, 2) - 1, 1);
      }
      else {
        currDate = new Date();
      }
    }

    this.currDate = currDate;

    return this;
  }

  public print(format: string) {
    if (typeof format === 'undefined') {
      return this.currDate;
    } else {
      let d = this.currDate;
      let fStr = format, nY, nM, nD, nH, nMM, nS, nDW,
        yre, regY, mre, regM, dre, regD, hre, regH, mire, regMI, sre, regS, dwre, regDW;

      nY = d.getUTCFullYear();
      nM = padStart(d.getMonth() + 1, 2, '0');
      nD = padStart(d.getDate(), 2, '0');
      nH = padStart(d.getHours(), 2, '0');
      nMM = padStart(d.getMinutes(), 2, '0');
      nS = padStart(d.getSeconds(), 2, '0');
      nDW = d.getDay();

      yre = /[^y]*(yyyy)[^y]*/gi;
      yre.exec(fStr);
      regY = RegExp.$1;
      mre = /[^m]*(MM)[^m]*/g;
      mre.exec(fStr);
      regM = RegExp.$1;
      dre = /[^d]*(dd)[^d]*/gi;
      dre.exec(fStr);
      regD = RegExp.$1;
      hre = /[^h]*(hh)[^h]*/gi;
      hre.exec(fStr);
      regH = RegExp.$1;
      mire = /[^m]*(mm)[^i]*/g;
      mire.exec(fStr);
      regMI = RegExp.$1;
      sre = /[^s]*(ss)[^s]*/gi;
      sre.exec(fStr);
      regS = RegExp.$1;
      dwre = /[^d]*(dw)[^w]*/gi;
      dwre.exec(fStr);
      regDW = RegExp.$1;

      if (regY === 'yyyy') {
        fStr = fStr.replace(regY, right(nY, regY.length));
      }
      if (regM === 'MM') {
        if (regM.length == 1) nM = (d.getMonth() + 1);
        fStr = fStr.replace(regM, nM);
      }
      if (regD === 'dd') {
        if (regD.length == 1) nD = d.getDate();
        fStr = fStr.replace(regD, nD);
      }
      if (regH === 'hh') {
        fStr = fStr.replace(regH, nH);
      }
      if (regMI === 'mm') {
        fStr = fStr.replace(regMI, nMM);
      }
      if (regS === 'ss') {
        fStr = fStr.replace(regS, nS);
      }
      if (regDW == 'dw') {
        fStr = fStr.replace(regDW, PrintDate.WeekNames[nDW].label);
      }
      return fStr;
    }
  }

}

export function printDate(d: any, format: string) {
  return new PrintDate().setDate(d).print(format);
}