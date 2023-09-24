import { ic, Service, serviceQuery, serviceUpdate, CallResult, Principal, Opt, blob, $query, match } from "azle";
import { Account, Tokens, TransferResult, TransferArgs } from "./types";

// ICRC Ledger utils 

class ICRC extends Service {
    @serviceQuery
    icrc1_name: () => CallResult<string>;
    @serviceQuery
    icrc1_symbol: () => CallResult<string>;
    @serviceQuery
    icrc1_minting_account: () => CallResult<Account>;
    @serviceQuery
    icrc1_balance_of: (account: Account) => CallResult<Tokens>;
    @serviceUpdate
    icrc1_transfer: (args: TransferArgs) => CallResult<TransferResult>;
}


$query;
export async function getIcrcName(
    icrcId: Principal): Promise<string> {
    const icrc = new ICRC(icrcId);
    const result = await icrc.icrc1_name().call();
    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => JSON.stringify(err)
    });
}

$query;
export async function getIcrcSymbol(
    icrcId: Principal): Promise<string> {
    const icrc = new ICRC(icrcId);
    const result = await icrc.icrc1_symbol().call();
    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => JSON.stringify(err)
    });
}

export async function mintTokens(icrcId: Principal, toAccount: Account, amount: Tokens): Promise<string> {

    let args: TransferArgs = {
        amount: amount,
        created_at_time: ic.time(),
        fee: null,
        from_subaccount: null,
        memo: null,
        to: toAccount
    };

    const icrc = new ICRC(icrcId);
    const result = await icrc.icrc1_transfer(args).call();
    return match(result, {
        Ok: (ok) => JSON.stringify(ok),
        Err: (err) => JSON.stringify(err)
    });
}


export async function getBalance(icrcId: Principal, account: Account): Promise<string> 
{
    const icrc = new ICRC(icrcId);
    const result = await icrc.icrc1_balance_of(account).call();
    return match(result, {
        Ok: (ok) => JSON.stringify(ok),
        Err: (err) => JSON.stringify(err)
    });
}

// // other ICRC-2 methods
// $update;
// export function icrc2_mint(mint: Mint): MintResult {
//     // Implement logic to handle gardencoin minting
// }

// $query;
// export function icrc2_balance_of(args: BalanceOfArgs): Balance {
//     // Implement logic to retrieve gardencoin balance
// }

// $update;
// export function icrc2_transfer(transferArg: TransferArg): TransferResult {
//     // Implement logic to handle gardencoin transfer
// }

// // ...other ICRC-2 methods...
