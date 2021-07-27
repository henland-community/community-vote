import henLogo from '../assets/icons/hen-vote-logo.svg';
import menuClose from '../assets/icons/menu-close.svg';
import menuOpen from '../assets/icons/menu-open.svg';
import options from '../assets/icons/options.svg';
import other from '../assets/icons/other.svg';
import hdao from '../assets/icons/hdao.svg';
import voteAgainst from '../assets/icons/vote-against.svg';
import voteFor from '../assets/icons/vote-for.svg';
import voteDraw from '../assets/icons/vote-draw.svg';
import views from '../assets/icons/views.svg';

export default {
  title: 'Icons',
};

export const icons = () => <div>
    <h1>Logo</h1>
    <img src={henLogo} />
    <h1>Voting</h1>
    <img src={voteFor} />
    <img src={voteAgainst} />
    <img src={voteDraw} />
    <h1>Proposal Categories</h1>
    <img src={hdao} />
    <img src={other} />
    <h1>Navigation</h1>
    <img src={menuClose} />
    <img src={menuOpen} />
    <h1>Others</h1>
    <img src={views} />
    <img src={options} />
  </div>;
