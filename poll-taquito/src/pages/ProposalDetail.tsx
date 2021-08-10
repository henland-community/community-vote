import '../assets/styles/utility-classes.css';
import './proposalDetail.css';
import { useParams } from "react-router-dom";
import * as React from "react";
import { Link } from "react-router-dom";

import DiscourseForum from "../components/DiscourseForum";

import { ReactComponent as ProposalIcon } from '../assets/icons/other.svg';

import { Button } from '../components/Button';

import { ReactComponent as Logo } from '../assets/icons/hen-logo.svg';
import { ReactComponent as VoteForIcon } from '../assets/icons/vote-for.svg';
import { ReactComponent as VoteAgainstIcon } from '../assets/icons/vote-against.svg';
// import { ReactComponent as VoteDrawIcon } from '../assets/icons/vote-draw.svg';
// import { ReactComponent as ViewsIcon } from '../assets/icons/views.svg';
import { ReactComponent as OtherIcon } from '../assets/icons/other.svg';

import { vote } from "../contract";
import { useToasts } from "react-toast-notifications";

async function getPollData(key: string) {
  return await fetch(`https://api.florencenet.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_POLLS}/keys?key=${key}`)
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
  return await fetch(`https://api.florencenet.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_VOTES}/keys`)
    .then(response => response.json())
    .then(votes => votes.filter((v: any) => v.key.string === key))
}

async function getIpfs(hash: string) {
  return await fetch(`https://ipfs.io/ipfs/${hash}`)
    .then(response => response.json())
}

async function getUpdate(poll: string) {
  return await fetch(`https://api.florencenet.tzkt.io/v1/bigmaps/${(process.env.REACT_APP_BIGMAP_UPDATES ??'12345')}/keys/${poll}/updates`)
    .then(response => response.json())
    .then(data => {
      console.log(['data',data])
      return true; 
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
    7: votes.filter((v: any) => v.value === "7").length
  };
}

export const ProposalDetail = (props: any) => {
  const activeAccount = props.activeAccount
  const votePower = props.votePower

  const params = useParams<{poll: string}>();
  const { addToast } = useToasts();

  const [hasUpdate, setHasUpdate] = React.useState(false);
  const [updateIpfs, setUpdateIpfs] = React.useState({} as any);
  
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
  const [voteData, setVoteData] = React.useState([]);
  const [voteSums, setVoteSums] = React.useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  });
  const [pollIpfs, setPollIpfs] = React.useState({
    discourse: '',
    description: '',
    opt1: 'Option 1',
    opt2: 'Option 2',
    opt3: 'Option 3',
    opt4: 'Option 4',
    opt5: 'Option 5',
    opt6: 'Option 6',
    opt7: 'Option 7'
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
    getVoteData(params.poll)
      .then(votes =>{
        // console.log(votes)
        for (let i = 0; i < votes.length; i++) {
          if (votes[i].key.address === activeAccount.address) {
            votes.myvote = votes[i].value;
          }
        }
        votes.myvote = 
        setVoteData(votes)
        setVoteSums(sumVotes(votes))
      })
      .catch(err => console.error(err));
    getIpfs(params.poll)
      .then(ipfs =>{
        // console.log(ipfs)
        setPollIpfs(ipfs)
      }
    )
    getUpdate(params.poll)
      .then(update =>{
        if (update !== false) {
          setHasUpdate(true)
          setUpdateIpfs(update)
        }
      }
    )
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
  const discourseThreadUrl = pollIpfs.discourse
  console.log(discourseThreadUrl)
  let discourseThreadBits: any
  if (typeof discourseThreadUrl !== 'number')
    discourseThreadBits = discourseThreadUrl.split('/')
  const discourseThread = typeof discourseThreadUrl !== 'number' ? discourseThreadBits[discourseThreadBits.length - 1] : ''
  return (
    <article className="proposalDetail pageContents">
      <header className="proposalDetail-header pageHeader">
        <div className="proposalDetail-meta">
          <div className="proposalDetail-metaPrimary">
            <div className="proposalDetail-idAndType">
              { pollData.metadata.category === '1' && (
                <>Proposal <ProposalIcon /></>
              )}
              { pollData.metadata.category === '2' && (
                <>Question <ProposalIcon /></>
              )}
            </div>
            {/* <div className="proposalDetail-subCategory">
              <OtherIcon /> DAO
            </div> */}
          </div>
          <div className="proposalDetail-countdown">
            Ending { pollData ? pollData.metadata.endDate.substr(0,10) : '...' }
          </div>
        </div>
        <h1>
        { pollData.metadata.title }
        </h1>
        {/* <div className="proposalDetail-url">
        { discourseThreadUrl }
        </div> */}
        <hr />
        { pollData.metadata.numOptions === 2 ? (
          <footer className="proposalDetail-voteStatus">
            <div className="proposalDetail-graph">
              <div> <span className="text-s-bold">Results</span> <small className="text-s-light">30 votes required</small></div>
              <div>{ voteSums[1] } for • { voteSums[2] } against</div>
            </div>
            <a className="proposalDetail-discussionLink"
              href={ discourseThreadUrl }>
              Discuss on Discourse 
            </a>
            <div className="proposalDetail-yourVote">
              <div onClick={()=>{handleVote(2)}}><Button>AGAINST <VoteAgainstIcon/></Button></div>
              <div onClick={()=>{handleVote(1)}}><Button>FOR <VoteForIcon/></Button></div>
            </div>
            { votePower.count === 0 && "Sync your TzProfiles verified wallet to enable voting" }
          </footer>
        ) : (
          <footer className="proposalDetail-voteStatus">
            <div className="proposalDetail-graph">
              <div><span className="text-s-bold">Results</span> <small className="text-s-light">30 votes required</small></div>
              <div>{ JSON.stringify(voteSums) }</div>
            </div>
            { console.log(voteData) }
            <a className="proposalDetail-discussionLink"
              href={ discourseThreadUrl }>
              Discuss on Discourse
            </a>
            <div className="proposalDetail-yourVote">
              <div onClick={()=>{votePower.count > 0 && handleVote(1)}} className={ (votePower.count === 0) ? "disabled":'' } ><Button>{ pollIpfs.opt1 }</Button></div>
              <div onClick={()=>{votePower.count > 0 && handleVote(2)}}><Button>{ pollIpfs.opt2 }</Button></div>
              { pollData.metadata.numOptions > 2 ? (
                <div onClick={()=>{votePower.count > 0 && handleVote(3)}}><Button>{ pollIpfs.opt3 }</Button></div>
              ) : '' }
              { pollData.metadata.numOptions > 3 ? (
                <div onClick={()=>{votePower.count > 0 && handleVote(4)}}><Button>{ pollIpfs.opt4 }</Button></div>
              ) : '' }
              { pollData.metadata.numOptions > 4 ? (
                <div onClick={()=>{votePower.count > 0 && handleVote(5)}}><Button>{ pollIpfs.opt5 }</Button></div>
              ) : '' }
              { pollData.metadata.numOptions > 5 ? (
                <div onClick={()=>{votePower.count > 0 && handleVote(6)}}><Button>{ pollIpfs.opt6 }</Button></div>
              ) : '' }
              { pollData.metadata.numOptions > 6 ? (
                <div onClick={()=>{votePower.count > 0 && handleVote(7)}}><Button>{ pollIpfs.opt7 }</Button></div>
              ) : '' }
            </div>
            { votePower.count === 0 && "Sync your TzProfiles verified wallet to enable voting" }
          </footer>
        )}
      </header>
      { hasUpdate ? (
        <div className="pageSection proposalDetail-adoptionStatus">
          <Logo />
          <span className="text-l-light">STATUS</span>
          <span className="text-l-bold">PENDING</span>
          <a href="#adoptiondoc">{ JSON.stringify(updateIpfs) }</a>
        </div>
      ):'' }
      <section className="pageSection proposalDetail-columns">
        <section className="proposalDetail-details">
          {/* <p className="text-m-medium">{ pollData.metadata.title }</p> */}
          <p>{ pollIpfs.description }</p>
          { discourseThread && (
            <DiscourseForum thread={ discourseThread }/>
          )}
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
            { params.poll }
          </p>
          <p className="text-s-light">
            Proposer:<br/>
            Hicathon
          </p>
          <p className="proposalDetail-sidebarHeader">
          <span className="proposalDetail-sidebarHeader-line"></span>
            <span className="proposalDetail-sidebarHeader-text text-s-medium">Help</span>
          </p>
          <p className="text-s-light">
            <Link to="/faq">How does the voting system work?</Link>
          </p>
        </section>
      </section>
    </article>
  );
}
