import React, {useState} from 'react';
import { Link } from "react-router-dom";
import '../assets/styles/design-tokens.css';
import './syncMenu.css';
import { ProposalsNav } from './ProposalsNav';
import { ReactComponent as Logo } from '../assets/icons/hen-vote-logo.svg';
import { ReactComponent as MenuOpen } from '../assets/icons/menu-open.svg';
import { ReactComponent as MenuClose } from '../assets/icons/menu-close.svg';
import { useWallet } from "@tz-contrib/react-wallet-provider";
// import { truncateSync } from 'fs';

interface SyncProps {
  synced: boolean,
  admin: boolean,
  addr: string
}
export const SyncMenu = ({
  synced = false,
  admin = false,
  addr = '',
  ...props
}: SyncProps) => {
  const { disconnect, activeAccount, connect } = useWallet();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="syncMenu"
      {...props}
    >
      { open ? <MenuClose className="syncMenu-close" onClick={(event: any) => { setOpen(false); }} /> : <MenuOpen className="syncMenu-open" onClick={(event: any) => { setOpen(true) }} />  
      }
      { open && 
        <div className="syncMenu-contents">
          <section className="syncMenu-mobileOnly">
            <div className="wrap">
              <Link to="/"><Logo className="syncMenu-logo"/></Link><br/>
              <MenuClose className="syncMenu-close" onClick={(event: any) => { setOpen(false); }} />
              <ProposalsNav />
            </div>
          </section>
          <section className="syncMenu-mainOptions">
            <section className="syncMenu-section wrap">
              <Link to="/my-votes" className="syncMenu-item" onClick={(event: any) => { setOpen(false); }}>my votes</Link>
              <Link to="/profile" className="syncMenu-item" onClick={(event: any) => { setOpen(false); }}>profile</Link>
            </section>
            { admin && 
            <section className="syncMenu-section wrap">
              <Link to="/admin" className="syncMenu-item" onClick={(event: any) => { setOpen(false); }}>create</Link>
              <Link to="/profile" className="syncMenu-item" onClick={(event: any) => { setOpen(false); }}>settings</Link>
            </section> }
            <section className="syncMenu-section mobileOnly wrap">
              <Link to="/about" className="syncMenu-item" onClick={(event: any) => { setOpen(false); }}>About</Link>
              <Link to="/faq" className="syncMenu-item" onClick={(event: any) => { setOpen(false); }}>FAQ</Link>
              <a target="_blank" rel="noreferrer" href="https://community.hicetnunc.xyz" className="syncMenu-item">Discourse</a>
            </section>
            <section className="syncMenu-section wrap">
              <Link to="/" className="syncMenu-item">
                { activeAccount && <div>{addr}</div> }
                <div>{ activeAccount ? (
                  <button onClick={disconnect}>Unsync</button>
                 ) : (
                   <button onClick={connect}>Sync</button>
                 )}</div>
              </Link>
            </section>
          </section>
        </div>
      }
    </nav>
  );
};
