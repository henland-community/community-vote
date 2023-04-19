import React from 'react';
import '../assets/styles/design-tokens.css';
import './footer.css';

export const Footer = () => {
  return (
    <footer
      className="footer"
    >
      Learn more about <a target="_blank" rel="noreferrer" href="https://teia.art/">Teia</a>
      <div/><br/>
      Contract Address: <a target="_blank" rel="noreferrer" href={'https://better-call.dev/'+process.env.REACT_APP_NETWORK+'/'+process.env.REACT_APP_CONTRACT_ADDRESS}>{process.env.REACT_APP_CONTRACT_ADDRESS}</a>
      <br/>
      Open Source: <a target="_blank" rel="noreferrer" href="https://github.com/teia-community/community-vote">github.com/teia-community/community-vote</a>
    </footer>
  );
};
