import React from 'react';
import { Link, useLocation } from "react-router-dom";
import '../assets/styles/design-tokens.css';
import './proposalsNav.css';

export const ProposalsNav = ({...props}) => {
  const location = useLocation();
  return (
    <nav
      className={`proposalsNav ${props.className??''}`}
    > 
      <div className="wrap">
        <div className="proposalsNav-primary">
          <Link to="/proposals" className={`text-l-bold ${location.pathname=='/proposals'?'active':''} proposalsNav-item`}>Proposals<sup className="proposalsNav-itemCount text-xs">15</sup></Link>
          <Link to="/questions" href="#hereandnow" className={`text-l-bold ${location.pathname=='/questions'?'active':''} proposalsNav-item`}>Questions<sup className="proposalsNav-itemCount text-xs">34</sup></Link>
        </div>
        <div className="proposalsNav-secondary">
          <Link to="/past-votes" href="#hereandnow" className={`text-l-light ${location.pathname=='/past-votes'?'active':''} proposalsNav-item`}>Past Votes<sup className="proposalsNav-itemCount text-xs">123</sup></Link>
        </div>
      </div>
    </nav>
  );
};
