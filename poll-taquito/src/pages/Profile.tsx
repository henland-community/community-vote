import '../assets/styles/utility-classes.css';
import './profile.css';
import { Link } from "react-router-dom";

export const Profile = (props: any) => {
  console.log(props)
  return (
    <article className="pageContents">
      <header className="pageHeader">
        <h1>Your profile</h1>
      </header>
      <section className="pageSection-gray">
        <strong>{ props.activeAccount }</strong> 
        <div>
          <strong>{ props.votes.count } VOTES:</strong> 
          <br/>TzProfiles: { props.votes.tzprof?'yes':'no' } 
          <br/>hDAO: { props.votes.hDAO?'yes':'no' } 
          <br/>Badge: { props.votes.badge?'yes':'no' }
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
