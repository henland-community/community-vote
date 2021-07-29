import React from 'react';
import '../assets/styles/design-tokens.css';
import './syncMenu.css';
import { ProposalsNav } from './ProposalsNav';
import { ReactComponent as Logo } from '../assets/icons/hen-vote-logo.svg';
import { ReactComponent as MenuOpen } from '../assets/icons/menu-open.svg';
import { ReactComponent as MenuClose } from '../assets/icons/menu-close.svg';
import { useState } from 'react';
// import { truncateSync } from 'fs';

interface SyncProps {
  synced: boolean,
  admin: boolean
}

export const SyncMenu = ({
  synced = false,
  admin = false,
  ...props
}: SyncProps) => {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="syncMenu"
      {...props}
    >
      { open ? 
          <MenuClose className="syncMenu-close" onClick={(event: any) => { setOpen(false); }} /> 
        : <MenuOpen className="syncMenu-open" onClick={(event: any) => { setOpen(true) }} />  
      }
      { open && 
        <div className="syncMenu-contents">
          <section className="syncMenu-mobileOnly">
            <Logo className="syncMenu-logo"/><br/>
            <ProposalsNav />
          </section>
          <section className="syncMenu-mainOptions">
            <section className="syncMenu-section">
              <a href="#hereandnow" className="syncMenu-item">my votes</a>
              <a href="#hereandnow" className="syncMenu-item">profile</a>
            </section>
            { admin && 
            <section className="syncMenu-section">
              <a href="#hereandnow" className="syncMenu-item">create</a>
              <a href="#hereandnow" className="syncMenu-item">settings</a>
            </section> }
            <section className="syncMenu-section mobileOnly">
              <a href="#hereandnow" className="syncMenu-item">About</a>
              <a href="#hereandnow" className="syncMenu-item">FAQ</a>
              <a href="#hereandnow" className="syncMenu-item">Discourse</a>
            </section>
            <section className="syncMenu-section">
              <a href="#hereandnow" className="syncMenu-item">
                { synced && <div>tz33...39ab</div> }
                <div>{ synced ? 'Unsync' : 'Sync'}</div>
              </a>
            </section>
          </section>
        </div>
      }
    </nav>
  );
};
