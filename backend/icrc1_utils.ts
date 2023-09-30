import { ic, Service, serviceQuery, serviceUpdate, CallResult, Result, Opt, $query, $update, match } from "azle";
import { Account, Tokens, TransferResult, TransferArg } from "../icrc/types";
import { getIcrcPrincipal } from "./config";

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
    icrc1_transfer: (args: TransferArg) => CallResult<TransferResult>;
}


$query;
export async function getIcrcName(): Promise<string> {
    const icrc = new ICRC(getIcrcPrincipal());
    const result = await icrc.icrc1_name().call();
    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => err
    });
}

$query;
export async function getIcrcSymbol(): Promise<string> {
    const icrc = new ICRC(getIcrcPrincipal());
    const result = await icrc.icrc1_symbol().call();
    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => err
    });
}

$query;
export async function getBalance(account: Account): Promise<Result<bigint, string>>{
    const icrc = new ICRC(getIcrcPrincipal());
    const result = await icrc.icrc1_balance_of(account).call();
    return match(result, {
        Ok: (ok) => ({ Ok: ok }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function mintTokens(toAccount: Account, amount: Tokens):
    Promise<Result<TransferResult, string>> {
    let args: TransferArg = {
        amount: amount,
        to: toAccount,
        from_subaccount: Opt.None,
        fee: Opt.None,
        memo: Opt.None,
        created_at_time: Opt.Some(ic.time())
    };

    const icrc = new ICRC(getIcrcPrincipal());
    const result = await icrc.icrc1_transfer(args).call();
    return result
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
