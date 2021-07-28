import React from 'react';
import '../assets/styles/design-tokens.css';
import './pageLayout.css';

import { Header } from './Header';
import { Footer } from './Footer';

export const PageLayout = ({...props}) => {
  return (
    <div className="pageLayout">
      <div
        className="pageLayout-contents"
      >
        <Header />
        <div className="pageLayout-body">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
};
