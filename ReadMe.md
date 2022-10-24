This repo is used to extract event information in The Graph by using erc725.js

Link to ticket : <link>https://app.clickup.com/t/3200fcb<link>

## Usage

### 1. Run a graph node locally

```
cd graph-node/docker
```

```
docker-compose up
```

This will start IPFS, Postgres and Graph Node in Docker and create persistent
data directories for IPFS and Postgres in `./data/ipfs` and `./data/postgres`. You
can access these via:

- Graph Node:
  - GraphiQL: `http://localhost:8000/`
  - HTTP: `http://localhost:8000/subgraphs/name/<subgraph-name>`
  - WebSockets: `ws://localhost:8001/subgraphs/name/<subgraph-name>`
  - Admin: `http://localhost:8020/`
- IPFS:
  - `127.0.0.1:5001` or `/ip4/127.0.0.1/tcp/5001`
- Postgres:
  - `postgresql://graph-node:let-me-in@localhost:5432/graph-node`

### 2. Deploy a subgraph to the running Graph Node

```
cd example-subgraph
```

```javascript
yarn install
```

```javascript
yarn codegen
```

This command throw an error that I have not been able to debug yet.

## Next Steps :

- Replace abi and smart contract with the ones of my address

##### => Blocker : could not access to l16 website because of an internal server error. 

- Debug `yarn codegen` command in order to generate the import `DataChanged` and `Data` to `mapping.ts` file inside folder `/example-subgraph/src`

##### => Blocker : don't understand the error

```
  Path: dataSources > 0 > mapping > eventHandlers > 1
  Unexpected key in map: name
```

- Test function `fetchJson`

##### => Blocker : tried testing the function in a typescript console or in the browser console but couldn't import web3. Need to find a new way to test the function.
