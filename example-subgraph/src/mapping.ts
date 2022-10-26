import Web3 from "web3";
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";

import { DataChanged } from "../generated/UniversalProfile/UniversalProfile";
import { Data } from "../generated/schema";
import { dataUP } from "./interfaces";

const schema: ERC725JSONSchema[] = [
  {
    name: "LSP3Profile",
    key: "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
    keyType: "Singleton",
    valueType: "bytes",
    valueContent: "JSONURL",
  },
];

const address = "0x86475811e711FbFe7765a51d7d44C02F0Fb71613";
const provider = new Web3.providers.HttpProvider(
  "https://rpc.l16.lukso.network"
);
const config = {
  ipfsGateway: "https://2eff.lukso.dev/ipfs/",
};

const erc725 = new ERC725(schema, address, provider, config);

export async function handleUpdatedData(event: DataChanged): Promise<void> {
  const dataKey = event.params.dataKey;
  const id = dataKey.toString();
  const jsonFile = await erc725.fetchData("LSP3Profile");
  const incomingData: any = jsonFile.value;
  // incoming data should be of type dataUP
  // incoming data type is forced to any because erc725 library wrongly specifies the types of fethData function

  const existingData = Data.load(id);

  if (existingData == null) {
    const newData = new Data(id);
    newData.name = incomingData.LSP3Profile.name;
    newData.description = incomingData.LSP3Profile.description;
    newData.tags = incomingData.LSP3Profile.tags;
    newData.save();
  } else {
    existingData.name = incomingData.LSP3Profile.name;
    existingData.description = incomingData.LSP3Profile.description;
    existingData.tags = incomingData.LSP3Profile.tags;
    existingData.save();
  }
}
