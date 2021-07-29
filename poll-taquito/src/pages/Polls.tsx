import '../assets/styles/utility-classes.css';
import './faq.css';

export const Polls = (props: any) => {
  const viewTitles: any = {
    'proposals': 'Proposals',
    'questions': 'Questions',
    'my': 'My Votes',
    'past': 'Past Votes'
  }
  return (
    <article>
      <header className="pageHeader">
        <h1>{ viewTitles[props.view] ?? 'All Votes' }</h1>
      </header>
      <section className="pageSection">
        <p>here are the polls</p>
      </section>
    </article>
  );
}
