# Change the variable to "ic" to deploy the ledger on the mainnet.
export NETWORK=local

# principal that can mint and burn tokens.
export DFX_IDENTITY=minter
export MINTER_PRINCIPAL=$(dfx identity get-principal)

# principal that controls archive canisters.
export DFX_IDENTITY=archiver
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)

# user principals 
export DFX_IDENTITY=wethenorth
export WETHENORTH_PRINCIPAL=$(dfx identity get-principal)
export DFX_IDENTITY=default
export DEFAULT_PRINCIPAL=$(dfx identity get-principal)
export BANK_PRINCIPAL=2vxsx-fae

export TOKEN_NAME="GardenVilleToken"
export TOKEN_SYMBOL=XGVT

dfx deploy --network ${NETWORK} icrc_ledger --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai --argument '(variant { Init = 
        record {
            token_name = "'${TOKEN_NAME}'";
            token_symbol = "'${TOKEN_SYMBOL}'";
            minting_account = record { owner = principal "'${BANK_PRINCIPAL}'";};
            max_supply = 3_000_000_000_000;
            initial_balances = vec {
                record {
                    record {
                        owner = principal "'${BANK_PRINCIPAL}'";
                        subaccount = null;
                    };
                    2_000_000_000_000
                };
                record {
                    record {
                        owner = principal "'${DEFAULT_PRINCIPAL}'";
                        subaccount = null;
                    };
                    1_000
                };
                record {
                    record {
                        owner = principal "'${WETHENORTH_PRINCIPAL}'";
                        subaccount = null;
                    };
                    1_000
                };                
                record {
                    record {
                        owner = principal "'${MINTER_PRINCIPAL}'";
                        subaccount = null;
                    };
                    0
                };
            };
            metadata = vec {};
            transfer_fee = 5;
            archive_options = record {
                trigger_threshold = 2000;
                num_blocks_to_archive = 1000;
                controller_id = principal "'${ARCHIVE_CONTROLLER}'";
            }
        }
    })'
