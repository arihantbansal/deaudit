# deaudit - A decentralized Audit marketplace on Polygon

## Inspiration

Owing to the immutable nature of blockchain technology, it is impossible to update the code after its deployment. Placing smart contracts without conducting adequate audits could lead to undesirable situations like differences in the contract's intended performance, gas leakage, and more.

- 47% of the web3 hacks in the first half of 2022 were due to contract vulnerabilities.
- Only 52% of the exploited web3 projects were audited.
- Helps earn users/investors trust for the product and the idea.

Auditing isn't an easy process. Auditing wait times on top audit firms are 9-12 months and expensive. We need something that is more participative and allows for new and yet-unproven security auditors. This is the motivation behind building DeAudit, a decentralized audit marketplace that turns the auditing process into a prediction marketplace.

## How DeAudit works

#### 1. Select a jury

A jury is usually reputed security engineers. This jury doesn’t do the audit itself, but only signs off a reported vulnerability as a real bug. There are 5 jury members selected for every audit. They control a 3/5 multisig that approves a detected bug once it is reported by an auditor. They receive 5% of the total audit spend.

#### 2. The contract is deployed for auditing

The contract must be deployed onchain so as to make the code immutable.

#### 3. Pools are created

Once the contract is deployed, 2 betting pools are created. Called _NoBugs_ and _YesBugs_ - representing a betting pool that says there are no severe bugs in this contract v/s yese there are bugs in this contract.

#### 4. Pools are equally funded

The person requesting the audit must fund both the pools equally to kick start the marketplace.

#### 5. Auditors audit and fund pools

A security auditor looks at the deployed contract and judges whether there are bugs in this contract or not.

If they’re confident there are no severe bugs, they may add money to the _NoBugs_ pool.

#### 6. Money starts streaming from YesBugs to NoBugs

Till the time a bug has been reported, the money from the _YesBugs_ pool starts streaming to _NoBugs_ pool, such that the _YesBugs_ pool will be exhausted in 30 days.

#### 7a. Bug report

If a security engineer finds a bug, they may report the bug to the jury.

The jury will vote with their signature on whether the bug is a severe bug. If the jury accepts the bug to be a severe bug, the NoBugs pool is liquidated and all the money from _NoBugs_ pool is distributed to the people who funded the _YesBugs_ pool. This distribution happens proportional to

- When the funder put money in the _YesBugs_ pool (earlier you make the bet, more is your reward if true)

- Amount put in as the bet (larger your bet that there are bugs, more is the reward)

- 5% goes to the jury members equally

#### 7b. No bugs reported

If the size of _NoBugs_ pool is greater than 95% of the summation of the pools, the _NoBugs_ pool can be liquidated. All the people who bet that there are no bugs get rewarded by the same ratios as presented in 7a.

## Tools we used to build it

Smart contracts were written in [Solidity](https://soliditylang.org/), using [Hardhat](https://hardhat.org/) as the dev environment. Frontend dApp uses [Next.js](https://nextjs.org/), [ChakraUI](https://chakra-ui.com/), [Sass](https://sass-lang.com/), [RainbowKit](https://www.rainbowkit.com/) and [wagmi.sh](https://wagmi.sh/). The backend is an [express](https://expressjs.com/) server using [Supabase](https://supabase.io/) to store data.

## Challenges we ran into

We faced a number of hurdles, while designing and writing the smart contract, integrating it with our frontend, and striking a balance between decentralization and centralized server.

In the end, we chose to keep critical data on-chain, while entrusting an off-chain server to store additional data.

We faced a lot of compile time errors with Solidity while dealing with in-memory arrays and returning data from mappings.

## What we learned

In the process of building DeAudit, we learnt a lot. Smart contract design, Solidity, dealing with Oracles (Chainlink VRF and Keepers), decentralized infrastructure (Spheron). We had a lot of fun building it.

## What's next for DeAudit

We've planned a lot of changes, and improvements to DeAudit.

1. If the no bugs reported is the pool that won, an NFT is created with the amount of money that was liquidated and the ENS of people on the jury.
2. Create a DAO which votes on approving Jury members based on their security profiles.
3. Migrate our frontend dApp to [TypeScript](https://www.typescriptlang.org/).
4. Explore storing additional data (which is being stored in a centralized server for now), to be kept on IPFS.
5. Migrate to [foundry](http://getfoundry.sh/) for our dev environment.

Built @ Polygon Buidl It Summer 2022, by @ameya-deshmukh, @priyansh71 & @arihantbansal.

Idea Credits [madhavanmalolan.eth](https://mirror.xyz/madhavanmalolan.eth/Ux7mG5x5t7Ar6im-zseeVD6DQ1cAR1cztZovmr8_kG0)
