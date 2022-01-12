import React from 'react';
import '../assets/styles/design-tokens.css';
import './footer.css';

export const Footer = () => {
  return (
    <footer
      className="footer"
    >
      H=NC Vote is part of the <a target="_blank" rel="noreferer" href="https://hencommunity.quest/">H=NCommunity Quest</a>
      <div/><br/>
      Contract Address: <a target="_blank" rel="noreferer" href={'https://better-call.dev/'+process.env.REACT_APP_NETWORK+'/'+process.env.REACT_APP_CONTRACT_ADDRESS}>{process.env.REACT_APP_CONTRACT_ADDRESS}</a>
      <br/>
      Open Source: <a target="_blank" rel="noreferer" href="https://github.com/hen-community/community-vote">github.com/hen-community/community-vote</a>
    </footer>
  );
};
