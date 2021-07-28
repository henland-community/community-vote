import React from 'react';
// import { Link } from "react-router-dom";
import '../assets/styles/design-tokens.css';
import './header.css';

import { ReactComponent as Logo } from '../assets/icons/hen-vote-logo.svg';

import { SyncMenu } from './SyncMenu';
import { ProposalsNav } from './ProposalsNav';

interface HeaderProps {
  votes: number;
}

export const Header = ({
  votes = 0,
  ...props
}: HeaderProps) => {
  return (
    <header
      className="appHeader"
      {...props}
    >
      <nav className="appHeader-primaryNav">
        <section className="appHeader-primaryNav-left">
          <div className="appHeader-logo">
            <Logo/>
          </div>
          <nav className="appHeader-resources">
            {/* <Link to="/">Home</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/about">About</Link> */}
          <a target="_blank" rel="noreferrer" href="https://community.hicetnunc.xyz">Forum ↪</a>
          </nav>
        </section>
        <section className="appHeader-primaryNav-right">
          <div className="appHeader-votingStatus">
            <div className="votingStatus">
              <span className="votingStatus-count">
                { votes } votes
              </span>
            </div>
          </div>
          <div className="appHeader-walletAddress">
            tz13...123s
          </div>
          <SyncMenu />
        </section>
      </nav>
      <ProposalsNav className="appHeader-proposalsNav" />
    </header>
  );
};
