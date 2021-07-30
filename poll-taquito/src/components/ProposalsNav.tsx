import React from 'react';
import { NavLink } from "react-router-dom";
import '../assets/styles/design-tokens.css';
import './proposalsNav.css';

export const ProposalsNav = ({...props}) => {
  return (
    <nav
      className={`proposalsNav ${props.className??''}`}
    > 
      <div className="wrap">
        <div className="proposalsNav-primary">
          <NavLink to="/proposals" className={`text-l-bold proposalsNav-item`}>Proposals<sup className="proposalsNav-itemCount text-xs">15</sup></NavLink>
          <NavLink to="/questions" href="#hereandnow" className={`text-l-bold proposalsNav-item`}>Questions<sup className="proposalsNav-itemCount text-xs">34</sup></NavLink>
        </div>
        <div className="proposalsNav-secondary">
          <NavLink to="/past-votes" href="#hereandnow" className={`text-l-light proposalsNav-item`}>Past Votes<sup className="proposalsNav-itemCount text-xs">123</sup></NavLink>
        </div>
      </div>
    </nav>
  );
};
