import React from 'react';
import '../assets/styles/design-tokens.css';
import './proposalsNav.css';

export const ProposalsNav = ({...props}) => {
  return (
    <nav
      className={`proposalsNav ${props.className}`}
    >
      <div className="proposalsNav-primary">
        <a className="proposalsNav-item">Proposals<sup className="proposalsNav-itemCount">15</sup></a>
        <a className="proposalsNav-item">Questions<sup className="proposalsNav-itemCount">34</sup></a>
      </div>
      <div className="proposalsNav-secondary">
        <a className="proposalsNav-item">Past Votes<sup className="proposalsNav-itemCount">123</sup></a>
      </div>
    </nav>
  );
};
