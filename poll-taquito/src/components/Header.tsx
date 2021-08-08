import React from 'react';
import { Link } from "react-router-dom";
import '../assets/styles/design-tokens.css';
import './header.css';

import { ReactComponent as Logo } from '../assets/icons/hen-vote-logo.svg';

import { SyncMenu } from './SyncMenu';
import { ProposalsNav } from './ProposalsNav';

interface HeaderProps {
  votes: any;
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

async function isAdmin(address:string){
  return await fetch(`https://api.florencenet.tzkt.io/v1/contracts/KT1A4ZehSZjQUf2iVKjez7UvkhUrfUoBBM35/storage?path=administrator`)
  .then(response => response.json())
  .then(data => {
    // if address is in response, then it is an admin
    console.log(data);
    return typeof data[address] === 'object';
  })
  .catch(err => {
    console.log(err);
    return false;
  });
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
  const [admin, setAdmin] = React.useState(false);
    React.useEffect(() => {
    if(activeAccount.address){
      isAdmin(activeAccount.address).then((res: boolean) => {
        setAdmin(res);
      });
    }
  }, [activeAccount.address]);
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
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <a target="_blank" rel="noreferrer" href="https://community.hicetnunc.xyz">Forum ↪</a>
          </nav>
        </section>
        <section className="appHeader-primaryNav-right">
          <div className="appHeader-votingStatus">
            <div className="votingStatus">
              <span className="votingStatus-count">
                { votes.count } votes
              </span>
            </div>
          </div>
          <div className="appHeader-walletAddress">
            {addr}
          </div>
          <SyncMenu 
            admin={activeAccount.address === process.env.REACT_APP_ADMIN || admin}
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
