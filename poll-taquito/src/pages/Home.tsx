import '../assets/styles/utility-classes.css';
import './home.css';

export const Home = () => {
  return (
    <article className="pageContents--centered homePage">
      <header className="pageHeader pageHeader--centered">
        <h1>DAO TITLE</h1>
        <h3 className="text-xl">Help to create the future of hicetnunc</h3>
      </header>
      <section className="pageSection">
        <h2>WHAT CAN I DO HERE</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt orci in tempus feugiat. Duis congue ac turpis eu blandit. Phasellus dolor nisi, rutrum quis tempus in, volutpat sit amet mi. Quisque nisi tortor, dictum nec leo at, molestie eleifend ipsum.</p>
      </section>
      <section className="pageSection">
        <h2>THE MISSION</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt orci in tempus feugiat. Duis congue ac turpis eu blandit. Phasellus dolor nisi, rutrum quis tempus in, volutpat sit amet mi. Quisque nisi tortor, dictum nec leo at, molestie eleifend ipsum.</p>
      </section>
      <section className="pageSection">
        <h2>THE VISION</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt orci in tempus feugiat. Duis congue ac turpis eu blandit. Phasellus dolor nisi, rutrum quis tempus in, volutpat sit amet mi. Quisque nisi tortor, dictum nec leo at, molestie eleifend ipsum.</p>
      </section>
    </article>
  );
}
