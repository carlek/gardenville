export {
    getIcrcName,
    getIcrcSymbol,
    getBalance,
    mintTokens
} from "./icrc1_utils";

export {
    createGardener,
    getGardener,
    getGardeners,
    deleteGardener,
    addPlantGrowing,
    deletePlantGrowing
} from "./gvdb";

import { $query, Principal, ic } from "azle";
$query
export function principalCaller(): Principal {
    return ic.caller();
}
