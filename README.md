<p align="center">
 <h2 align="center"><strong>The Graph</strong></h2>
 <p align="center">Extract event information from [ERC725 Account](https://docs.lukso.tech/tools/erc725js/getting-started/) using The Graph</p>

# Getting Started

Read [`Investigation.md`](../docs/Investigation.md) file in the `docs` folder to have more information on The Graph.

## Installation

```
yarn install
```

## Run a graph node locally

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

The logs will show the current block head. You can compare it with what’s in the block explorer.
The subgraph is running locally and is connected to the correct blockchain.
![CurrentBlock](docs/pictures/currentblock.png)

## Deploy a subgraph to the running Graph Node

This command will generate a folder `generated` which files are used in `src/mapping.ts`.

```javascript
yarn codegen
```

```
yarn create-local
```

```
yarn deploy-local
```

Note : `yarn deploy-local` command might ask you to run the following command.

```
graph create --node http://127.0.0.1:8020 example
```

### Understand the purpose of each file

File `subgraph.yaml` (the subgraph manifest) specifies information on the Smart Contract we are indexing, the events that are emitted by the smart contract and the network we are connecting to.

File `schema.graphql` specifies the entities we store in the subgraph.

File `mapping.ts` specifies the functions to run when a specific event is emitted. The functions store the pieces of information we want in the database of the suibgraph.

### Example

1. An event `DataChanged` is emitted by the smart contract `0x41D0ADD4e04fd73598244cab0090E7D8042597f9`.

2. The function `handleUpdatedUP` is triggered.
   The parameter is `dataKey` and `dataValue`. dataValue could be use to decode the data but we are using erc725js library instead.
   We use `fetchData` function from erc725js library to decode data send by the emitted event.
   Then, `handleUpdated` checkes if a data entity with the id `dataKey` already exists. If not, it creates a new entity Data, if yes, it updates it.
   Finally, the function saves the entity.

## Improvement

- Add the profileImage in the Data entity (file `schema.graphql`).

## Connect to pgadmin to visualise data

- Create a new server on pgadmin
- Connect to the database

```
POSTGRES_USER: graph-node
POSTGRES_PASSWORD: let-me-in
POSTGRES_DB: graph-node
PGDATA: "/data/postgres"
```

## Blocker

(26.10.2022)

1. The Graph is not supporting external libraries like web3 or erc725js yet.
   In mapping.ts we use the libraries to extract information of ERC725 account. Without these libraries we can t decode the event emitted by the smart contract.
   ![importlibraries](docs/pictures/importlibraries.png)

2) A subgraph can listen to one smart contract. In our case, it means we would have one subgraph for each universal profile which is not relevant.

## Helpers

- If issue when connecting the subgraph to the graph node : display the logs of the container

```
docker logs --follow CONTAINER
```

- If issue when running `yarn create-local`: build step by step the mapping.ts file to understand where the issue comes from and try `yarn build` at each step.

## Resources :

<a href="https://medium.com/coinmonks/deploy-subgraphs-to-any-evm-aaaccc3559f"> deploy-subgraphs-to-any-evm</a>

<a href="https://docs.lukso.tech/tools/erc725js/classes/ERC725/#fetchdata"> fetchData</a>
