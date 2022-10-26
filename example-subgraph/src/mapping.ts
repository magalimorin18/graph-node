import utils from "web3-utils";
import fetch from "node-fetch";

import { DataChanged } from "../generated/UniversalProfile/UniversalProfile";
import { Data } from "../generated/schema";
import { jsonType } from "./interfaces";

async function fetchJson(dataValue: string) {
  const hashFunction = dataValue.slice(0, 10);
  const hash = "0x" + dataValue.slice(0, 74); // TODO : use hash to verify the validity of the json
  const hexURL = "0x" + dataValue.slice(74);
  const utf8URL = utils.hexToUtf8(hexURL);

  if (hashFunction === "0x6f357c6a") {
    try {
      const response = await fetch(`https://2eff.lukso.dev/ipfs/${utf8URL}`);
      if (response.ok) {
        return response.json();
      } else {
        console.log("Failed to load. Status: ", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export function handleUpdatedData(event: DataChanged): void {
  const dataKey = event.params.key;
  const dataValue = event.params.value;
  const jsonFile: jsonType = fetchJson(dataValue);

  const existingData = Data.load(dataKey);

  if (existingData == null) {
    const newData = new Data(dataKey);
    newData.name = jsonFile.LSP3Profile.name;
    newData.description = jsonFile.LSP3Profile.description;
    newData.tags = jsonFile.LSP3Profile.tags;
    newData.profileImage = jsonFile.LSP3Profile.profileImage;
    newData.save();
  }

  existingData.name = jsonFile.LSP3Profile.name;
  existingData.description = jsonFile.LSP3Profile.description;
  existingData.tags = jsonFile.LSP3Profile.tags;
  existingData.profileImage = jsonFile.LSP3Profile.profileImage;
  existingData.save();
}
