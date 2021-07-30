import * as React from "react";
import { useBeaconWallet, useWallet } from "@tz-contrib/react-wallet-provider";
import { initPollContract, initTezos, setWalletProvider } from "./contract";
import CreatePollCard from "./components/CreatePollCard";
import AddVoterCard from "./components/AddVoterCard";
import RemoveVoterCard from "./components/RemoveVoterCard";
import VoteCard from "./components/VoteCard";
import { Header } from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from "axios";

import {Home} from './pages/Home';
import {About} from './pages/About';
import {Faq} from './pages/Faq';
import {Profile} from './pages/Profile';
import {Polls} from './pages/Polls';
import { ProposalDetail } from "./pages/ProposalDetail";

const RPC_URL =
  process.env.REACT_APP_RPC_URL || "https://florencenet.smartpy.io/";
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

export async function getTzProfiles(address: string) {
  return await axios.post('https://indexer.tzprofiles.com/v1/graphql', {
    query: `query MyQuery { tzprofiles_by_pk(account: "${address}") { valid_claims } }`,
    variables: null,
    operationName: 'MyQuery',
  })
}

export async function hasTzProfiles(address: string) {
  await getTzProfiles(address).then(res => {
      return typeof res.data.tzprofiles_by_pk !== 'undefined';
  });
  return false;
}

function App() {
  const { connected, disconnect, activeAccount, connect } = useWallet();
  const beaconWallet = useBeaconWallet();
  const [votePower, setVotePower] = React.useState(0);
  function getVotePower(address: string) {
    let p = 0;
    hasTzProfiles(address).then(has => p++)
  };
  React.useEffect(() => {
    initTezos(RPC_URL);
    initPollContract(CONTRACT_ADDRESS);
  }, []);
  React.useEffect(() => {
    setWalletProvider(beaconWallet);
  }, [beaconWallet]);
  
  return (
    <Router>
      <Header votes={votePower}/>
      <div className="pageContent wrap">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/faq">
            <Faq />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/proposals">
            <Polls view="proposals"/>
          </Route>
          <Route path="/questions">
            <Polls view="questions"/>
          </Route>
          <Route path="/past-votes">
            <Polls view="past"/>
          </Route>
          <Route path="/my-votes">
            <Polls view="my"/>
          </Route>
          <Route path="/vote/:poll">
            <ProposalDetail></ProposalDetail>
          </Route>
          <Route path="/admin">
            <CreatePollCard />
            <AddVoterCard />
            <RemoveVoterCard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
