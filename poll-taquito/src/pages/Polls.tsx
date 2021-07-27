export default function Polls(props: any) {
  const viewTitles: any = {
    'proposals': 'Proposals',
    'questions': 'Questions',
    'my': 'My Votes',
    'past': 'Past Votes'
  }
  return (
    <div>
      <h1>{ viewTitles[props.view] ?? 'All Votes' }</h1>
    </div>
  );
}
