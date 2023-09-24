# Change the variable to "ic" to deploy the ledger on the mainnet.
export NETWORK=local

dfx identity use default
export DEFAULT_PRINCIPAL=$(dfx identity get-principal)

# Change the variable to the principal that can mint and burn tokens.
export DFX_IDENTITY=2260723
dfx identity use $DFX_IDENTITY
export MINTER_PRINCIPAL=$(dfx identity get-principal)

# Change the variable to the principal that controls archive canisters.
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)

export TOKEN_NAME="GardenVilleToken"
export TOKEN_SYMBOL=XGVT

dfx deploy --network ${NETWORK} icrc_ledger --argument '(variant { Init = 
        record {
            token_name = "'${TOKEN_NAME}'";
            token_symbol = "'${TOKEN_SYMBOL}'";
            minting_account = record { owner = principal "'${MINTER_PRINCIPAL}'";};
            max_supply = 100_000_000_000_000;
            initial_balances = vec {
                record {
                    record {
                        owner = principal "k66gq-mwaa4-arqxk-cwijt-oixji-hilid-2umca-4edmd-v2qzt-w2ezk-pae";
                        subaccount = null;
                    };
                    10_000_000
                };
                record {
                    record {
                        owner = principal "zjk53-fdisd-lq6zo-cm3tj-lmiwj-nelbq-sqvfv-tosvk-obtji-acwwt-6qe";
                        subaccount = null;
                    };
                    10_000_000
                }
            };
            metadata = vec {};
            transfer_fee = 10;
            archive_options = record {
                trigger_threshold = 2000;
                num_blocks_to_archive = 1000;
                controller_id = principal "'${ARCHIVE_CONTROLLER}'";
            }
        }
    })'
