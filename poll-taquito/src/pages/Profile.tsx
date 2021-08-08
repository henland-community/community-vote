import '../assets/styles/utility-classes.css';
import './profile.css';
import { Link } from "react-router-dom";

import { ReactComponent as IconFor } from '../assets/icons/vote-for.svg';
import { ReactComponent as IconAgainst } from '../assets/icons/vote-against.svg';

export const Profile = (props: any) => {
  console.log(props)
  return (
    <article className="pageContents">
      <header className="pageHeader">
        <h1>Your profile</h1>
      </header>
      <section className="pageSection-gray">
        <strong>{ props.activeAccount }</strong> 
        <div style={{display:'flex', justifyContent: 'space-between'}}>
          <strong>{ props.votes.count } VOTES:</strong> 
          <span>TzProfiles: { props.votes.tzprof?<IconFor/>:<IconAgainst/>}</span>
          <span>hDAO: { props.votes.hDAO?<IconFor/>:<IconAgainst/>}</span>
          <span>Badge: { props.votes.badge?<IconFor/>:<IconAgainst/>}</span>
        </div>
      </section>
      <section className="pageSection">
        <Link to='/my-votes'>My Votes</Link>
        <br></br>
        <Link to='/contact'>Contact admin</Link>
      </section>
    </article>
  );
}
