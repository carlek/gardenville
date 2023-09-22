import { Service, serviceQuery, CallResult, Principal, $query, match } from "azle";

///////////////////////////
// ICRC Ledger utils     //
// ///////////////////////////

class ICRC extends Service {
    @serviceQuery
    icrc1_name: () => CallResult<string>;
    @serviceQuery
    icrc1_symbol: () => CallResult<string>;
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
