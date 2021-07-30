import React from 'react';
import { Link } from "react-router-dom";
import '../assets/styles/design-tokens.css';
import './header.css';
import { useWallet } from "@tz-contrib/react-wallet-provider";

import { ReactComponent as Logo } from '../assets/icons/hen-vote-logo.svg';

import { SyncMenu } from './SyncMenu';
import { ProposalsNav } from './ProposalsNav';

interface HeaderProps {
  votes: number;
}

function shortAddr(address:string){
  return address.slice(0,4)+"..."+address.slice(address.length - 4,address.length)
}


export const Header = ({
  votes = 0,
  ...props
}: HeaderProps) => {
  const { disconnect, activeAccount, connect } = useWallet();
  const addr = activeAccount?shortAddr(activeAccount.address):'';
  return (
    <header
      className="appHeader"
      {...props}
    >
      <div className="wrap">
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
              synced={false}
              admin={false}
              addr={addr}
            />
          </section>
        </nav>
      </div>
      <ProposalsNav className="appHeader-proposalsNav" />
    </header>
  );
};
