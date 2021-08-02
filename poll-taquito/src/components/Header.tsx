import React from 'react';
import { Link } from "react-router-dom";
import '../assets/styles/design-tokens.css';
import './header.css';

import { ReactComponent as Logo } from '../assets/icons/hen-vote-logo.svg';

import { SyncMenu } from './SyncMenu';
import { ProposalsNav } from './ProposalsNav';

interface HeaderProps {
  votes: number;
  connected: boolean;
  connect: any;
  disconnect: any;
  activeAccount: any;
}

function shortAddr(address:string){
  return address ?
    address.slice(0,4)+"..."+address.slice(address.length - 4,address.length)
    : ''
}


export const Header = ({
  votes = 0,
  connect = () => {},
  disconnect = () => {},
  connected = false,
  activeAccount = "",
  ...props
}: HeaderProps) => {
  const addr = activeAccount?shortAddr(activeAccount.address):'';
  return (
    <header
      className="appHeader"
      {...props}
    >
      <nav className="appHeader-primaryNav">
        <section className="appHeader-primaryNav-left">
          <div className="appHeader-logo">
            <Link to="/"><Logo/></Link>
          </div>
          <nav className="appHeader-resources">
            <Link to="/">Home</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/about">About</Link>
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
            {addr}
          </div>
          <SyncMenu 
            admin={activeAccount.address === process.env.REACT_APP_ADMIN}
            connect={connect}
            disconnect={disconnect}
            connected={connected}
            activeAccount={activeAccount}
            addr={addr}
          />
        </section>
      </nav>
      <ProposalsNav className="appHeader-proposalsNav" />
    </header>
  );
};
