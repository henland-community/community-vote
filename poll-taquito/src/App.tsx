import * as React from "react";
import { useBeaconWallet, useWallet } from "@tz-contrib/react-wallet-provider";
import { initPollContract, initTezos, setWalletProvider } from "./contract";
import CreatePollCard from "./components/CreatePollCard";
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

const queryBadgeCheck = `query BadgeCheck($wallet: String = "") {
  hic_et_nunc_token(where: {id: {_eq: "93229"}}) {
    metadata
    title
    token_holders(where: {quantity: {_gt: "0"}, holder_id: {_eq: $wallet}}) {
      quantity
    }
  }
}`;

async function fetchGraphQL(operationsDoc: string, operationName: string, variables: object) {
  const result = await fetch(
      "https://api.hicdex.com/v1/graphql", {
          method: "POST",
          body: JSON.stringify({
              query: operationsDoc,
              variables: variables,
              operationName: operationName
          })
      }
  );
  console.log(result);
  return await result.json();
}
export async function checkBadge(address: string) {
  const {
      errors,
      data
  } = await fetchGraphQL(queryBadgeCheck, "BadgeCheck", {
      "wallet": address
  });
  if (errors) console.error(errors);

  const result = data.hic_et_nunc_token[0].token_holders.length > 0;
  return result
}

function App() {
  const { connected, disconnect, activeAccount, connect } = useWallet();
  const beaconWallet = useBeaconWallet();
  const [votePower, setVotePower] = React.useState(0);
  function getVotePower(address: string) {
    let p = 0;
    Promise.all([
      hasTzProfiles(address).then(has => p++),
      checkBadge(address).then(has => p++)
    ]).then(() => {
      setVotePower(p);
    });
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
      <Header 
        votes={votePower}
        connected={connected}
        disconnect={disconnect}
        activeAccount={activeAccount}
        connect={connect}
      />
      <div className="pageContent wrap">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/faq" component={Faq} />
          <Route path="/profile" component={Profile} />
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
          <Route path="/admin" component={CreatePollCard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
