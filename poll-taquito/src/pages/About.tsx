import { useWallet } from "@tz-contrib/react-wallet-provider";
import { Link } from "react-router-dom";

export default function About() {
  // const { ... } = useParams();
  const { disconnect, activeAccount, connect } = useWallet();
  return (
    <div>
      <h1>DAO TITLE</h1>
      <strong className="subtitle">Help to create the future of hicetnunc</strong>
      <br></br>
      <h2>WHAT CAN I DO HERE</h2>
      <p></p>
      <h2>THE MISSION</h2>
      <p></p>
      <h2>THE VISION</h2>
      <p></p>
    </div>
  );
}
