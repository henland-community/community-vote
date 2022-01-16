import '../assets/styles/utility-classes.css';
import './proposalDetail.css';
import { useParams } from "react-router-dom";
import * as React from "react";
import { Link } from "react-router-dom";

import DiscourseForum from "../components/DiscourseForum";

// import { ReactComponent as ProposalIcon } from '../assets/icons/other.svg';

import { Button } from '../components/Button';

// import { ReactComponent as Logo } from '../assets/icons/hen-logo.svg';
import { ReactComponent as VoteForIcon } from '../assets/icons/vote-for.svg';
import { ReactComponent as VoteAgainstIcon } from '../assets/icons/vote-against.svg';
// import { ReactComponent as VoteDrawIcon } from '../assets/icons/vote-draw.svg';
// import { ReactComponent as ViewsIcon } from '../assets/icons/views.svg';
// import { ReactComponent as OtherIcon } from '../assets/icons/other.svg';

import { vote } from "../contract";
import { useToasts } from "react-toast-notifications";

function sumVals(obj: any) {
  return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
}

async function getPollData(key: string) {
  return await fetch(`https://api.${process.env.REACT_APP_NETWORK}.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_POLLS}/keys?key=${key}`)
    .then(response => response.json())
    .then(polls => {
      if (polls[0].key === key) {
        return polls[0];
      } else {
        throw new Error(`Poll with key ${key} not found`);
      }
    });
}
async function getVoteData(key: string) {
  return await fetch(`https://api.${process.env.REACT_APP_NETWORK}.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_VOTES}/keys?key.string=${key}`)
    .then(response => response.json())
}

async function getIpfs(hash: string) {
  return await fetch(`https://infura-ipfs.io/ipfs/${hash}`)
    .then(response => response.json())
}

async function getResults(poll: string) {
  return await fetch(`/results.json`)
    .then(response => response.json())
    .then(data => {
      console.log(['data',data[poll], poll])
      return data[poll];
    });
}

function sumVotes(votes: any) {
  // console.log(votes)
  return {
    1: votes.filter((v: any) => v.value === "1").length,
    2: votes.filter((v: any) => v.value === "2").length,
    3: votes.filter((v: any) => v.value === "3").length,
    4: votes.filter((v: any) => v.value === "4").length,
    5: votes.filter((v: any) => v.value === "5").length,
    6: votes.filter((v: any) => v.value === "6").length,
    7: votes.filter((v: any) => v.value === "7").length,
    8: votes.filter((v: any) => v.value === "8").length,
    9: votes.filter((v: any) => v.value === "9").length,
    10: votes.filter((v: any) => v.value === "10").length
  };
}

export const ProposalDetail = (props: any) => {
  const activeAccount = props.activeAccount && props.activeAccount.address
  const votePower = props.votePower

  const params = useParams<{poll: string}>();
  const { addToast } = useToasts();

  const [hasResults, setHasResults] = React.useState(false);
  const [resultsData, setResultsData] = React.useState({} as any);
  
  const [pollData, setPollData] = React.useState({
    hash: '',
    metadata: {
      startDate: '',
      endDate: '',
      numOptions: 0,
      category: '',
      title: ''
    },
    totals: {}
  });
  const [voteData, setVoteData] = React.useState({votes:[],myvote:0});
  const [voteSums, setVoteSums] = React.useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0
  });
  const [pollIpfs, setPollIpfs] = React.useState({
    description: '',
    opt1: 'Option 1',
    opt2: 'Option 2',
    opt3: 'Option 3',
    opt4: 'Option 4',
    opt5: 'Option 5',
    opt6: 'Option 6',
    opt7: 'Option 7',
    opt8: 'Option 8',
    opt9: 'Option 9',
    opt10: 'Option 10',
    multi: "false"
  });
  React.useEffect(() => {
    getPollData(params.poll)
      .then(poll =>{
        // console.log(poll)
        setPollData({ 
          hash: poll.hash,
          metadata: {
            startDate: poll.value.metadata.start_date,
            endDate: poll.value.metadata.end_date,
            numOptions: Math.floor(poll.value.metadata.num_options),
            category: poll.value.metadata.category,
            title: poll.value.metadata.title
          },
          totals: poll.value.totals
        })
      })
      .catch(err => console.error(err));
    getIpfs(params.poll)
      .then(ipfs =>{
        // console.log(ipfs)
        setPollIpfs(ipfs)
      }
    )
    getResults(params.poll)
      .then(results =>{
        console.log(['results',results])
        if (results !== undefined) {
          setHasResults(true)
          if (typeof results[1] === 'undefined') results[1] = 0;
          if (typeof results[2] === 'undefined') results[2] = 0;
          if (typeof results[3] === 'undefined') results[3] = 0;
          if (typeof results[4] === 'undefined') results[4] = 0;
          if (typeof results[5] === 'undefined') results[5] = 0;
          if (typeof results[6] === 'undefined') results[6] = 0;
          if (typeof results[7] === 'undefined') results[7] = 0;
          if (typeof results[8] === 'undefined') results[8] = 0;
          if (typeof results[8] === 'undefined') results[9] = 0;
          if (typeof results[10] === 'undefined') results[10] = 0;
          console.log(['results',results])
          setResultsData(results)
        }
      }
    )
  }, [params.poll]);
  React.useEffect(() => {
    getVoteData(params.poll)
      .then(votes =>{
        // console.log(votes)
        var myvote = 0
        for (let i = 0; i < votes.length; i++) {
          if (votes[i].key.address === activeAccount) {
            myvote = votes[i].value * 1;
          }
        }
        setVoteData({
          votes: votes,
          myvote: myvote
        })
        setVoteSums(sumVotes(votes))
      })
      .catch(err => console.error(err));
  }, [params.poll, activeAccount]);

  async function handleVote(option: number) {
    
    if (params.poll) {
      try {
        const hash = await vote(params.poll, option);
        if (hash) {
          addToast("Tx Submitted", {
            appearance: "success",
            autoDismiss: true,
          });
        }
      } catch (error) {
        console.error(error);
        const errorMessage = error?.message || error?.data[1]?.with?.string || "Tx Failed";
        addToast(errorMessage, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }
  return (
    <article className="proposalDetail pageContents">
      <header className="proposalDetail-header pageHeader">
        <div className="proposalDetail-meta">
          <div className="proposalDetail-metaPrimary text-s">
            <div className="proposalDetail-idAndType">
              { pollData.metadata.category === '1' && (
                <>Proposal</>
              )}
              { pollData.metadata.category === '2' && (
                <>Question</>
              )}
            </div>
          </div>
          <div className="proposalDetail-countdown text-s">
            Ends { pollData ? pollData.metadata.endDate.substr(0,10) : '...' }
          </div>
        </div>
        <h1>
        { pollData.metadata.title }
        </h1>
        { pollIpfs.multi === 'score' && (
          <div><strong>Scored Vote:</strong>  Please rank this proposal from 1 to 5 (5 is the best)</div>
        )}
        <hr />
        { console.log(['voteData',voteData]) }
        { console.log(votePower) }
        { pollIpfs.opt1 === "" ? (
          <footer className="proposalDetail-voteStatus">
            <div className="proposalDetail-graph">
              { hasResults && (
                <>
                  <div className="proposalDetail-graph-labels">
                    <span className={"proposalDetail-graph-label "+(resultsData["1"]>resultsData["2"]?'winner':'') }>For {((resultsData["1"] / (resultsData["1"] + resultsData["2"])) * 100).toFixed(0)}%</span>
                    <span className="proposalDetail-graph-label">Against {((resultsData["2"] / (resultsData["1"] + resultsData["2"])) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="proposalDetail-graph-bar">
                    <div className="proposalDetail-graph-bar-part" style={{flex: resultsData["1"]+" 0 auto", background: (resultsData["1"]>resultsData["2"]?"black":"var(--gray-20)")}}></div>
                    <div className="proposalDetail-graph-bar-part" style={{flex: resultsData["2"]+" 0 auto", background: (resultsData["2"]>resultsData["1"]?"black":"var(--gray-20)")}}></div>
                  </div>
                </>
              )}
              <div>
                <a href="#votes" className="text-s-bold">Votes Submitted:</a>&nbsp;
                { Object.values(voteSums).reduce((a, b) => a + b, 0) || 0 }
                <small className="text-s-light"> &nbsp; (30 votes required)</small>
              </div>
            </div>
            <div className={"proposalDetail-yourVote multi-"+(pollIpfs.multi)}>
              <Button
                voted={ voteData.myvote === 2 }
                onClick={()=>{handleVote(2)}}
                disabled={ !votePower.henOG }
              >AGAINST <VoteAgainstIcon/></Button>
              <Button
                voted={ voteData.myvote === 1 }
                onClick={()=>{handleVote(1)}}
                disabled={ !votePower.henOG }
              >FOR <VoteForIcon/></Button>
            </div>
             { votePower.henOG || (
               <span>Sync your hicetnunc wallet to vote. Voting currently limited to artists and collectors who interacted with hicetnunc before the website was discontinued (11/11/21).</span>
              ) }
          </footer>
        ) : (
          <footer className="proposalDetail-voteStatus">
            <div className="proposalDetail-graph">
              { hasResults && resultsData && (
                <>
                  { pollIpfs.multi === 'score' && (
                    <strong className="proposalDetail-graph-score">
                      Total Weighted Score: {(
                        resultsData[1] * 1 +
                        resultsData[2] * 2 +
                        resultsData[3] * 3 +
                        resultsData[4] * 4 +
                        resultsData[5] * 5 +
                        resultsData[6] * 6 +
                        resultsData[7] * 7 +
                        resultsData[8] * 8 +
                        resultsData[9] * 9 +
                        resultsData[10] * 10
                      )}
                    </strong>
                  )}
                  <div className="proposalDetail-graph-labels">
                    {[...Array(pollData.metadata.numOptions)].map((x, i) =>
                    <span 
                      key={i} 
                      className={
                        "proposalDetail-graph-label "+
                        (
                          (parseInt(
                            Object.keys(resultsData).reduce((a,b)=> resultsData[a] > resultsData[b] ? a : b)
                          ) === (i+1)) ? 'winner' : ''
                        ) 
                      }
                      style={{
                        border: "3px solid "+((parseInt(
                          Object.keys(resultsData).reduce((a,b)=> resultsData[a] > resultsData[b] ? a : b)
                        ) === (i+1))?"black":`hsl(${i*36} 67% 75%)`)
                      }}>
                      {console.log((resultsData[i+1] / sumVals(resultsData) * 100).toFixed(1))}
                      {i+1} {
                        (
                          (
                            resultsData[i+1] /
                            sumVals(resultsData)
                          ) * 100
                        ).toFixed(1)
                      }%
                    </span>
                    )}
                  </div>
                  <div className="proposalDetail-graph-bar">
                    {[...Array(pollData.metadata.numOptions)].map((x, i) =>
                      <div 
                        key={i} 
                        className="proposalDetail-graph-bar-part" 
                        style={{
                          flex: resultsData[i+1] +" 0 auto", 
                          background: ((parseInt(
                            Object.keys(resultsData).reduce((a,b)=> resultsData[a] > resultsData[b] ? a : b)
                          ) === (i+1))?"black":`hsl(${i*36} 70% 70%)`)
                        }}>
                      </div>
                    )}
                  </div>
                </>
              )}
              <div>
                <a href="#votes" className="text-s-bold">Votes Submitted:</a>&nbsp;
                { Object.values(voteSums).reduce((a, b) => a + b, 0) || 0 }
                <small className="text-s-light"> (30 votes required)</small>
              </div>
            </div>
            <div className={"proposalDetail-yourVote multi-"+(pollIpfs.multi)}>
              <Button
                voted={ voteData.myvote === 1 }
                onClick={()=>{handleVote(1)}} 
                disabled={ !votePower.henOG }
              >{ pollIpfs.opt1 }</Button>
              <Button
                voted={ voteData.myvote === 2 }
                onClick={()=>{handleVote(2)}} 
                disabled={ !votePower.henOG }
              >{ pollIpfs.opt2 }</Button>
              { pollData.metadata.numOptions > 2 ? (
                <Button
                  voted={ voteData.myvote === 3 }
                  onClick={()=>{handleVote(3)}} 
                  disabled={ !votePower.henOG }
                >{ pollIpfs.opt3 }</Button>
                ) : '' }
              { pollData.metadata.numOptions > 3 ? (
                <Button
                  voted={ voteData.myvote === 4 }
                  onClick={()=>{handleVote(4)}} 
                  disabled={ !votePower.henOG }
                >{ pollIpfs.opt4 }</Button>
              ) : '' }
              { pollData.metadata.numOptions > 4 ? (
                <Button
                  voted={ voteData.myvote === 5 }
                  onClick={()=>{handleVote(5)}} 
                  disabled={ !votePower.henOG }
                >{ pollIpfs.opt5 }</Button>
              ) : '' }
              { pollData.metadata.numOptions > 5 ? (
                <Button
                  voted={ voteData.myvote === 6 }
                  onClick={()=>{handleVote(6)}} 
                  disabled={ !votePower.henOG }
                >{ pollIpfs.opt6 }</Button>
              ) : '' }
              { pollData.metadata.numOptions > 6 ? (
                <Button
                  voted={ voteData.myvote === 7 }
                  onClick={()=>{handleVote(7)}} 
                  disabled={ !votePower.henOG }
                >{ pollIpfs.opt7 }</Button>
              ) : '' }
              { pollData.metadata.numOptions > 7 ? (
                <Button
                  voted={ voteData.myvote === 8 }
                  onClick={()=>{handleVote(8)}} 
                  disabled={ !votePower.henOG }
                >{ pollIpfs.opt8 }</Button>
              ) : '' }
              { pollData.metadata.numOptions > 8 ? (
                <Button
                  voted={ voteData.myvote === 9 }
                  onClick={()=>{handleVote(9)}} 
                  disabled={ !votePower.henOG }
                >{ pollIpfs.opt9 }</Button>
              ) : '' }
              { pollData.metadata.numOptions > 9 ? (
                <Button
                  voted={ voteData.myvote === 10 }
                  onClick={()=>{handleVote(10)}} 
                  disabled={ !votePower.henOG || true }
                >{ pollIpfs.opt10 }</Button>
              ) : '' }
            </div>
            { votePower.henOG || (
              <span>Sync your hicetnunc wallet to vote. Voting currently limited to artists and collectors who interacted with hicetnunc before the website was discontinued.</span>
            ) }
          </footer>
        )}
      </header>
      <section className="pageSection proposalDetail-columns">
        <section className="proposalDetail-details">
          <p>{ pollIpfs.description }</p>
          <DiscourseForum/>
        </section>
        <section className="proposalDetail-sidebar">
          <p className="proposalDetail-sidebarHeader">
            <span className="proposalDetail-sidebarHeader-line"></span>
            <span className="proposalDetail-sidebarHeader-text text-s-medium">Specs</span>
          </p>
          <p className="text-s-light">
            Start date:<br/>
            { pollData.metadata.startDate }
          </p>
          <p className="text-s-light">
            End date:<br/>
            { pollData.metadata.endDate }
          </p>
          <p className="text-s-light">
            Hash:<br/>
            <a target="_blank" rel="noreferrer" href={"https://ipfs.io/ipfs/"+ params.poll }>{ params.poll }</a>
          </p>
          <p className="proposalDetail-sidebarHeader">
          <span className="proposalDetail-sidebarHeader-line"></span>
            <span className="proposalDetail-sidebarHeader-text text-s-medium">Help</span>
          </p>
          <p className="text-s-light">
            <Link to="/faq">How does the voting system work?</Link>
          </p>
          <p className="proposalDetail-sidebarHeader">
          <span className="proposalDetail-sidebarHeader-line"></span>
            <span className="proposalDetail-sidebarHeader-text text-s-medium" id="votes">Votes</span>
          </p>
          <p className="text-s-light">
            { voteData.votes.map((vote: any) => 
              <div className="voteRow" key={vote.id}>
                {/* { vote.key.address.substr(0,4)+"..."+vote.key.address.substr(vote.key.address.length - 4,vote.key.address.length) } voted { vote.value === "1" ? 'for' : 'against' } */}
                <a target="_blank" rel="noreferrer" href={"https://better-call.dev/mainnet/big_map/"+process.env.REACT_APP_BIGMAP_VOTES+"/"+vote.hash }>{ vote.key.address }</a>
              </div>
            )}
          </p>
        </section>
      </section>
    </article>
  );
}