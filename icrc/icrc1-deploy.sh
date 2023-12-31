# Change the variable to "ic" to deploy the ledger on the mainnet.
export NETWORK=local

# backend and ledger principals
export backend_principal=$(jq -r '.backend.local' .dfx/local/canister_ids.json)
export icrc_ledger_principal=$(jq -r '.icrc_ledger.local' .dfx/local/canister_ids.json)

# principals for minting, archiving, and default
export DFX_IDENTITY=minter
export MINTER_PRINCIPAL=$(dfx identity get-principal)
export DFX_IDENTITY=archiver
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)
export DFX_IDENTITY=default
export DEFAULT_PRINCIPAL=$(dfx identity get-principal)

export TOKEN_NAME="GardenVilleToken"
export TOKEN_SYMBOL=XGVT

dfx deploy --network ${NETWORK} icrc_ledger --specified-id ${icrc_ledger_principal} \
    --argument '(variant { Init = 
        record {
            token_name = "'${TOKEN_NAME}'";
            token_symbol = "'${TOKEN_SYMBOL}'";
            minting_account = record { owner = principal "'${MINTER_PRINCIPAL}'";};
            max_supply = 3_000_000_000_000;
            initial_balances = vec {
                record {
                    record {
                        owner = principal "'${backend_principal}'";
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
