import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  TezosToolkit,
  WalletContract,
  MichelCodecPacker,
} from "@taquito/taquito";

let tezos: TezosToolkit;
let pollContract: WalletContract;

export const initTezos = (url: string): void => {
  tezos = new TezosToolkit(url);
  tezos.setPackerProvider(new MichelCodecPacker());
};

export const setWalletProvider = (wallet: BeaconWallet): void => {
  tezos && tezos.setProvider({ wallet });
};

export const initPollContract = async (
  pollContractAddress: string | null = null
): Promise<void> => {
  if (!pollContractAddress || tezos === null) {
    throw new Error("Poll contract address not set or Tezos not initialized");
  }
  pollContract = await tezos.wallet.at(pollContractAddress);
};

export const createPoll = async (
  pollId: string,
  endDate: Date,
  noOfOptions: number,
  ipfsHash: string
) => {
  const op = await pollContract.methods
    .createPoll(pollId, endDate.toISOString(), noOfOptions, ipfsHash)
    .send();
  return op.opHash;
};

export const vote = async (pollId: string, option: number) => {
  const op = await pollContract.methods.vote(pollId, option).send();
  return op.opHash;
};
