import React from 'react';
import { NavLink } from "react-router-dom";
import '../assets/styles/design-tokens.css';
import './proposalsNav.css';

export const ProposalsNav = ({...props}) => {
  const [pastVoteCount] = React.useState(0);
  return (
    <nav
      className={`proposalsNav ${props.className??''}`}
    > 
      <div className="proposalsNav-primary">

      </div>
      <div className="proposalsNav-secondary">
        <NavLink to="/past-votes" href="#hereandnow" className={`text-l-light proposalsNav-item`}>
          Past Votes
          { pastVoteCount ? (
            <span className="proposalsNav-item-count text-xs">{pastVoteCount}</span>
            ) : null }
        </NavLink>
      </div>
    </nav>
  );
};
