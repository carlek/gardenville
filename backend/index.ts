export {
    getIcrcName,
    getIcrcSymbol,
    getBalance,
    mintTokens
} from "./icrc1_utils";

export {
    getIcrcPrincipal
} from "./config";

export {
    createGardener,
    getGardener,
    getGardeners,
    getPlants,
    deleteGardener,
    addPlant,
    deleteGardenersPlant,
} from "./gvdb";

import { $query, Principal, ic } from "azle";
$query
export function principalCaller(): Principal {
    return ic.caller();
}
