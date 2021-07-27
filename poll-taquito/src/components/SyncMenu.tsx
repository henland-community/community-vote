import React from 'react';
import './design-tokens.css';
import './syncMenu.css';
import { ReactComponent as Logo } from '../assets/icons/hen-vote-logo.svg';
import { ReactComponent as MenuOpen } from '../assets/icons/menu-open.svg';
import { ReactComponent as MenuClose } from '../assets/icons/menu-close.svg';

interface SyncProps {
  synced: boolean,
  admin: boolean,
  open: boolean,
}

export const SyncMenu = ({
  synced = false,
  admin = false,
  open = false,
  ...props
}: SyncProps) => {
  return (
    <nav
      className="syncMenu"
      {...props}
    >
      <MenuOpen className="syncMenu-open" onClick={(event: any) => {
          open = !open
        }} />
      { open && 
        <div className="syncMenu-contents">
          <MenuClose className="syncMenu-close" />
          <section className="syncMenu-mobileOnly">
            <Logo className="syncMenu-logo"/><br/>
            <a className="syncMenu-mobileLink">Proposals</a>
            <a className="syncMenu-mobileLink">Questions</a>
            <a className="syncMenu-mobileLink">Past Votes</a>
          </section>
          <section className="syncMenu-mainOptions">
            <section className="syncMenu-section">
              <a className="syncMenu-item">my votes</a>
              <a className="syncMenu-item">profile</a>
            </section>
            { admin && 
            <section className="syncMenu-section">
              <a className="syncMenu-item">create</a>
              <a className="syncMenu-item">settings</a>
            </section> }
            <section className="syncMenu-section">
              <a className="syncMenu-item">
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
