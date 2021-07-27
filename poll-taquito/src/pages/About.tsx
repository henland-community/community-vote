import { useWallet } from "@tz-contrib/react-wallet-provider";
import { Link } from "react-router-dom";

export default function About() {
  // const { ... } = useParams();
  const { disconnect, activeAccount, connect } = useWallet();
  return (
    <div>
      <h1>ABOUT</h1>
      <p></p>
    </div>
  );
}
