## Set Up

Install all dependencies

```javascript
yarn install
```

Create a `generated` folder to make it easier to interact with the smart contract.
The following command should create the folder.

```javascript
yarn codegen
```

Error when running codegen for now :

```
  Path: dataSources > 0 > mapping > eventHandlers > 1
  Unexpected key in map: name
```

### Understand the purpose of each file

File `subgraph.yaml` (the subgraph manifest) specifies information on the Smart Contract, the network and the of event we want to listen to.

File `schema.graphql` specifies the entities we store in the subgraph.

File `mapping.ts` specifies the functions to run when a specific event is emitted. The functions store the pieces of information we want in the database of the graph.

## Next Steps :
- Extract data from dataValue : the 64 last bytes of dataValue represents the url link to the json file with all data. We have to transfor it from Hex to UTF8 => extract json from url www.ipfs.up.com => parse the json file. These steps will be done in the function handleUpdatedUP in the mapping.ts file.

- Undestand why there is an error when running yarn codegen.
