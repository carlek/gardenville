
![Alt text](src/assets/pre-garden.png)

# GardenVille  🌐  🌿 <img src=src/assets/icp-logo.png style="width:50px; vertical-align: middle;">

plant - grow - share

### Cultivate Your Green Dreams on the Internet Computer!

Greetings, Green Thumbs and Digital Plant Enthusiasts! 🌿 Step into the future of gardening with GardenVille, the groundbreaking app sprouting on the Internet Computer. Seamlessly blending nature’s wonders with cutting-edge decentralization, GardenVille empowers gardeners worldwide to cultivate, connect, and celebrate their verdant passions like never before.

### From Soil to Screen: Your Gardening Oasis Goes Decentralized!

With GardenVille, your gardening journey transcends physical boundaries. Join a thriving community of fellow horticulturalists on the Internet Computer, where you'll plan, nurture, and flaunt your botanical marvels. Showcase your prize-winning produce and revel in the green-thumb triumphs of others, all within this flourishing digital ecosystem.

### Marketplace of Green Innovation: Where Ideas Bloom into Reality!

GardenVille isn't just a garden—it's a marketplace of innovation. Whether you're after rare seeds, eco-friendly tools, or ingenious cultivation tips, our decentralized platform connects you with like-minded green pioneers. It's where ideas sprout, and where gardeners, as true stewards of the Earth, come together to shape the future of cultivation.

Join us in this digital Eden where your green dreams thrive in a decentralized, gardener-owned ecosystem. Let's plant the seeds for a green tomorrow, today! 🌷🚀

Stay tuned for updates, and get ready to embark on a new era of gardening with GardenVille on the Internet Computer!

#GardenVilleLaunch #GreenThumbRevolution #DecentralizedGardening

## 🚧 GardenVille Is Under Construction 🚧

TODO:
- current:
1. token distribution
1. contest voting
1. tests
1. ongoing: UI for crud operations

- future
1. better UI (yeah I'm awful at that!)
1. photo upload
1. garden map: personal & community
1. plant API integration

## GardenVille App
### Developers 

Getting started 

Make sure that [Node.js](https://nodejs.org/en/) `>= 16.x` and [`dfx`](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `>= 0.14.x` are installed on your system.

Run the following commands in a new, empty project directory:

```sh
dfx start --clean --background # Run dfx in the background
npm run setup # Install packages, deploy canisters, and generate type bindings
npm start # Start the development server
```

**Example calls to ledger and backend canisters:**

```sh
% dfx canister call icrc_ledger icrc1_balance_of '(record {owner=principal "k66gq-mwaa4-arqxk-cwijt-oixji-hilid-2umca-4edmd-v2qzt-w2ezk-pae"; subaccount=null})'

(100 : nat)

% dfx canister call backend getBalance '(principal "ryjl3-tyaaa-aaaaa-aaaba-cai", record{owner=principal "k66gq-mwaa4-arqxk-cwijt-oixji-hilid-2umca-4edmd-v2qzt-w2ezk-pae"; subaccount=null})'

(variant { Ok = 100 : int })
```
```sh
% dfx canister call icrc_ledger icrc1_metadata
(
  vec {
    record { "icrc1:decimals"; variant { Nat = 8 : nat } };
    record { "icrc1:name"; variant { Text = "GardenVilleToken" } };
    record { "icrc1:symbol"; variant { Text = "XGVT" } };
    record { "icrc1:fee"; variant { Nat = 0 : nat } };
    record { "icrc1:max_memo_length"; variant { Nat = 32 : nat } };
  },
)
```
Burn: transfer to minter:
```sh
% dfx identity use minter
% dfx canister call icrc_ledger icrc1_transfer '(record {to=record {owner=principal "xo4dp-vrysm-ccbiv-4vjrp-pvkw2-buqld-4sjp5-trjzx-cmh4p-i5pex-gqe"; subaccount=null}; fee=null; memo=null; from_subaccount=null; created_at_time=null; amount=100})'

(variant { Ok = 4 : nat })
```
## Technology Stack

- [Vite](https://vitejs.dev/): high-performance tooling for front-end web development
- [Svelte](https://svelte.dev/): a radical and innovative JavaScript framework for building user interfaces
- [TypeScript](https://www.typescriptlang.org/): JavaScript extended with syntax for types
- [Sass](https://sass-lang.com/): an extended syntax for CSS stylesheets
- [Prettier](https://prettier.io/): code formatting for a wide range of supported languages
- [Azle](https://github.com/demergent-labs/azle): a TypeScript CDK for the Internet Computer

## Documentation

- [Vite developer docs](https://vitejs.dev/guide/)
- [Learn Svelte](https://learn.svelte.dev/tutorial/welcome-to-svelte)
- [Internet Computer docs](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [Azle Book](https://demergent-labs.github.io/azle/)
- [`dfx.json` reference schema](https://internetcomputer.org/docs/current/references/dfx-json-reference/)

## Tips and Tricks

- Customize your project's code style by editing the `.prettierrc` file and then running `npm run format`.
- Reduce the latency of update calls by passing the `--emulator` flag to `dfx start`.
- Split your frontend and backend console output by running `npm run frontend` and `npm run backend` in separate terminals.

