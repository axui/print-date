import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Image, List, Segment } from 'semantic-ui-react';
import axuiLogo from '../assets/axui-logo.png';
import {features} from './features';

export const Introduction = ( props ) => (
  <Container>

    <Segment textAlign={'center'} basic padded>
      <Image src={axuiLogo} size='small' centered />
      <h1>AXUI print-date</h1>
    </Segment>

    {features.map((f, fi) => {
      return <f.Component key={fi} />
    })}

  </Container>
);