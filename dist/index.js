import isNumber from 'lodash-es/isNumber';
import isString from 'lodash-es/isString';
import isDate from 'lodash-es/isDate';
import padStart from 'lodash-es/padStart';

const token = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsTt])\1?|[LloSzWN]|"[^"]*"|'[^']*'/g;
const timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
const timezoneClip = /[^-+\dA-Z]/g;

function right( str, pos ) {
  if ( typeof str === 'undefined' || typeof pos === 'undefined' )
    return '';
  str = '' + str;
  if ( isString( pos ) ) {
    return (str.lastIndexOf( pos ) > -1) ? str.substr( str.lastIndexOf( pos ) + 1 ) : '';
  }
  else if ( isNumber( pos ) ) {
    return str.substr( str.length - pos );
  }
  else {
    return '';
  }
}

function localDate( yy, mm, dd, hh, mi, ss ) {
  let utcD;
  if ( mm < 0 )
    mm = 0;
  if ( typeof hh === 'undefined' )
    hh = 12;
  if ( typeof mi === 'undefined' )
    mi = 0;
  utcD = new Date( Date.UTC( yy, mm, dd || 1, hh, mi, ss || 0 ) );
  if ( mm == 0 && dd == 1 && utcD.getUTCHours() + (utcD.getTimezoneOffset() / 60) < 0 ) {
    utcD.setUTCHours( 0 );
  }
  else {
    utcD.setUTCHours( utcD.getUTCHours() + (utcD.getTimezoneOffset() / 60) );
  }
  return utcD;
}

function getWeek( date ) {
  // https://github.com/felixge/node-dateformat
  let targetThursday, firstThursday, ds, weekDiff;

  // Remove time components of date
  targetThursday = new Date( date.getFullYear(), date.getMonth(), date.getDate() );

  // Change date to Thursday same week
  targetThursday.setDate( targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3 );

  // Take January 4th as it is always in week 1 (see ISO 8601)
  firstThursday = new Date( targetThursday.getFullYear(), 0, 4 );

  // Change date to Thursday same week
  firstThursday.setDate( firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3 );

  // Check if daylight-saving-time-switch occurred and correct for it
  ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours( targetThursday.getHours() - ds );

  // Number of weeks between target Thursday and first Thursday
  weekDiff = (targetThursday - firstThursday) / (86400000 * 7);

  return 1 + Math.floor( weekDiff );
}

function getDayOfWeek( date ) {
  // https://github.com/felixge/node-dateformat
  let dow = date.getDay();
  if ( dow === 0 ) {
    dow = 7;
  }
  return dow;
}

function pad( s, l = 2 ) {
  return padStart( s, l, '0' );
}

export class PrintDate {
  constructor() {
    this.currDate = new Date();
  }

  static setConfig( config ) {

  }

  setDate( d ) {
    let currDate = new Date();
    let yy, mm, dd, hh, mi, aDateTime, aTimes, aTime, aDate, va;
    const ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;
    const ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

    if ( isString( d ) ) {
      if ( Date.parse( d ) ) {
        currDate = new Date( d );
      } else {
        if ( d.length > 15 ) {
          if ( ISO_8601_FULL.test( d ) || ISO_8601.test( d ) ) {
            currDate = new Date( d );
          }
          else {
            aDateTime = d.split( / /g );
            aDate = aDateTime[ 0 ].split( /\D/g );
            yy = aDate[ 0 ];
            mm = parseFloat( aDate[ 1 ] );
            dd = parseFloat( aDate[ 2 ] );
            aTime = aDateTime[ 1 ] || '09:00';
            aTimes = aTime.substring( 0, 5 ).split( ':' );
            hh = parseFloat( aTimes[ 0 ] );
            mi = parseFloat( aTimes[ 1 ] );
            if ( right( aTime, 2 ) === 'AM' || right( aTime, 2 ) === 'PM' )
              hh += 12;
            currDate = localDate( yy, mm - 1, dd, hh, mi );
          }
        }
        else if ( d.length === 14 ) {
          va = d.replace( /\D/g, '' );
          currDate = localDate( va.substr( 0, 4 ), va.substr( 4, 2 ) - 1, parseFloat( va.substr( 6, 2 ) ), parseFloat( va.substr( 8, 2 ) ), parseFloat( va.substr( 10, 2 ) ), parseFloat( va.substr( 12, 2 ) ) );
        }
        else if ( d.length > 7 ) {
          va = d.replace( /\D/g, '' );
          currDate = localDate( va.substr( 0, 4 ), va.substr( 4, 2 ) - 1, parseFloat( va.substr( 6, 2 ) ) );
        }
        else if ( d.length > 4 ) {
          va = d.replace( /\D/g, '' );
          currDate = localDate( va.substr( 0, 4 ), va.substr( 4, 2 ) - 1, 1 );
        }
        else if ( d.length > 2 ) {
          va = d.replace( /\D/g, '' );
          currDate = localDate( va.substr( 0, 4 ), va.substr( 4, 2 ) - 1, 1 );
        }
        else {
          currDate = new Date();
        }
      }
    }
    else if ( isNumber( d ) ) {
      currDate = new Date( d );
    }
    else if ( isDate( d ) ) {
      currDate = d;
    }

    this.currDate = currDate;
    return this;
  }

  print( format, utc, gmt ) {
    if ( typeof format === 'undefined' ) {
      return this.currDate;
    }
    else {
      const date = this.currDate;
      const _get = utc ? 'getUTC' : 'get';

      let d = date[ _get + 'Date' ]();
      let D = date[ _get + 'Day' ]();
      let M = date[ _get + 'Month' ]();
      let y = date[ _get + 'FullYear' ]();
      let H = date[ _get + 'Hours' ]();
      let m = date[ _get + 'Minutes' ]();
      let s = date[ _get + 'Seconds' ]();
      let L = date[ _get + 'Milliseconds' ]();
      let o = utc ? 0 : date.getTimezoneOffset();
      let W = getWeek( date );
      let N = getDayOfWeek( date );
      let flags = {
        d: d,
        dd: pad( d ),
        EEE: PrintDate.i18n.dayNames[ D ],
        EEEE: PrintDate.i18n.dayNames[ D + 7 ],
        M: M + 1,
        MM: pad( M + 1 ),
        MMM: PrintDate.i18n.monthNames[ m ],
        MMMM: PrintDate.i18n.monthNames[ m + 12 ],
        yy: String( y ).slice( 2 ),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad( H % 12 || 12 ),
        H: H,
        HH: pad( H ),
        m: m,
        mm: pad( m ),
        s: s,
        ss: pad( s ),
        l: pad( L, 3 ),
        L: pad( Math.round( L / 10 ) ),
        t: H < 12 ? PrintDate.i18n.timeNames[ 0 ] : PrintDate.i18n.timeNames[ 1 ],
        tt: H < 12 ? PrintDate.i18n.timeNames[ 2 ] : PrintDate.i18n.timeNames[ 3 ],
        T: H < 12 ? PrintDate.i18n.timeNames[ 4 ] : PrintDate.i18n.timeNames[ 5 ],
        TT: H < 12 ? PrintDate.i18n.timeNames[ 6 ] : PrintDate.i18n.timeNames[ 7 ],
        z: gmt ? 'GMT' : utc ? 'UTC' : (String( date ).match( timezone ) || [ '' ]).pop().replace( timezoneClip, '' ),
        o: (o > 0 ? '-' : '+') + pad( Math.floor( Math.abs( o ) / 60 ) * 100 + Math.abs( o ) % 60, 4 ),
        S: [ 'th', 'st', 'nd', 'rd' ][ d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10 ],
        W: W,
        N: N
      };

      return ('' + format).replace( token, function ( match ) {
        if ( match in flags ) {
          return flags[ match ];
        }
        return match.slice( 1, match.length - 1 );
      } );
    }
  }
}

PrintDate.i18n = {
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

export function printDate( d, format ) {
  return new PrintDate().setDate( d ).print( format );
}
