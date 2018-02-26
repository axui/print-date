import * as React from 'react';
import {Header, Segment} from 'semantic-ui-react';
import {PrintDate, printDate} from 'print-date';

let myPrintDate = new PrintDate();

const BasicSample = (props) => (
  <Segment basic padded>
    <Header as='h2' dividing>Test printDate</Header>
    <p>
      {printDate('20180226', 'yy-MM-dd')}
    </p>
    <p>
      {printDate(20180226, 'yyyy-MM-dd')}
    </p>
    <p>
      {printDate(new Date(), 'yyyy-MM-dd hh:mm:ss(W)')}
    </p>
    <p>
      {printDate(new Date(), 'yyyy-MM-dd hh:mm:ss(WW)')}
    </p>
    <p>
      {myPrintDate.setDate(20180226).print('yyyy년 MM월 dd일')}
    </p>
  </Segment>
);

export default BasicSample;