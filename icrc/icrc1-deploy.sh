# Change the variable to "ic" to deploy the ledger on the mainnet.
export NETWORK=local

export DFX_IDENTITY=default
export DEFAULT_PRINCIPAL=$(dfx identity get-principal)
export DFX_IDENTITY=wethenorth
export WETHENORTH_PRINCIPAL=$(dfx identity get-principal)

# Change the variable to the principal that can mint and burn tokens.
export DFX_IDENTITY=2260723
export MINTER_PRINCIPAL=$(dfx identity get-principal)

# Change the variable to the principal that controls archive canisters.
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)

export TOKEN_NAME="GardenVilleToken"
export TOKEN_SYMBOL=XGVT

echo "default:    $DEFAULT_PRINCIPAL"
echo "wethenorth: $WETHENORTH_PRINCIPAL"
echo "minter:     $MINTER_PRINCIPAL"

dfx deploy --network ${NETWORK} icrc_ledger --argument '(variant { Init = 
        record {
            token_name = "'${TOKEN_NAME}'";
            token_symbol = "'${TOKEN_SYMBOL}'";
            minting_account = record { owner = principal "'${MINTER_PRINCIPAL}'";};
            max_supply = 3_000_000_000_000;
            initial_balances = vec {
                record {
                    record {
                        owner = principal "'${DEFAULT_PRINCIPAL}'";
                        subaccount = null;
                    };
                    10_000_000
                };
                record {
                    record {
                        owner = principal "'${WETHENORTH_PRINCIPAL}'";
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
