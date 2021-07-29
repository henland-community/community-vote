import React from 'react';
import '../assets/styles/design-tokens.css';
import './proposalsNav.css';

export const ProposalsNav = ({...props}) => {
  return (
    <nav
      className={`proposalsNav ${props.className}`}
    >
      <div className="proposalsNav-primary">
        <a href="#hereandnow" className="text-l-bold active proposalsNav-item">Proposals<sup className="proposalsNav-itemCount text-xs">15</sup></a>
        <a href="#hereandnow" className="text-l-bold proposalsNav-item">Questions<sup className="proposalsNav-itemCount text-xs">34</sup></a>
      </div>
      <div className="proposalsNav-secondary">
        <a href="#hereandnow" className="text-l-light proposalsNav-item">Past Votes<sup className="proposalsNav-itemCount text-xs">123</sup></a>
      </div>
    </nav>
  );
};
