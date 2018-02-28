import * as React from 'react';
import {Segment} from 'semantic-ui-react';
import {PrintDate, printDate} from 'print-date';
import {SourceCodeEditor} from "@root/dev/components/SourceCodeEditor";

let myPrintDate = new PrintDate();


const testItem = [
  {label: '20180101', format: 'yy-MM-dd'},
  {label: '20180226', format: 'yyyy-M-d'},
  {label: '20181225', format: 'MMM dd, yyyy'},
  {label: '20181225', format: 'MMMM dd, yyyy'},
  {label: '20181225', format: 'MMMM dd, yyyy(E)'},
  {label: '20181225', format: 'MMMM dd, yyyy(EE)'},
  {label: '20181225', format: 'MMMM dd, yyyy(EEE)'},
  {label: '20181225', format: 'MMMM dd, yyyy(EEEE)'},
  {label: '20180102152222', format: 'MMMM dd(EEE), yyyy. HH:mm:ss'},
  {label: '20180102152222', format: 'MMMM dd(EEE), yyyy. aa hh:mm:ss z'},
  {label: '20180102152222', format: 'MMMM dd(EEE), yyyy. AA hh:mm:ss z'},
  {label: 'new Date()', date: new Date(), format: 'yy-MM-dd'},
  {label: 'new Date()', date: new Date(), format: 'yyyy-M-d'},
  {label: 'new Date()', date: new Date(), format: 'MMM dd, yyyy'},
  {label: 'new Date()', date: new Date(), format: 'MMMM dd, yyyy'},
  {label: 'new Date()', date: new Date(), format: 'MMMM dd, yyyy(E)'},
  {label: 'new Date()', date: new Date(), format: 'MMMM dd, yyyy(EE)'},
  {label: 'new Date()', date: new Date(), format: 'MMMM dd, yyyy(EEE)'},
  {label: 'new Date()', date: new Date(), format: 'MMMM dd, yyyy(EEEE)'},
  {label: 'new Date()', date: new Date(), format: 'MMMM dd(EEE), yyyy. HH:mm:ss'},
  {label: 'new Date()', date: new Date(), format: 'MMMM dd(EEE), yyyy. aa hh:mm:ss z'},
  {label: 'new Date()', date: new Date(), format: 'MMMM dd(EEE), yyyy. AA hh:mm:ss z'},

];

const BasicSample = (props) => (
  <Segment basic padded>
    <h2>Install</h2>
    <SourceCodeEditor>
      {`
npm install print-date -S
    `}
    </SourceCodeEditor>

    <h2>Import</h2>
    <SourceCodeEditor>
      {`
import {PrintDate, printDate} from 'print-date';
    `}
    </SourceCodeEditor>

    <h2>Usage</h2>
    <SourceCodeEditor>
      {
        testItem.map((item) => {
          const label = item['date'] ? item.label : "'" + item.label + "'";
          return "printDate(" + label + ", '" + item.format + "')" +
            "\n// " + printDate(item['date'] || item.label, item.format);
        }).join('\n')
      }
    </SourceCodeEditor>

  </Segment>
);

export default BasicSample;