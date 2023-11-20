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
    deleteGardener,
    getGardener,
    getGardeners,
    getPlants,
    getProducts,
    getContest,
    createPlant,
    deletePlant,
    addGardenerPlant,
    deleteGardenerPlant,
    createProduct,
    deleteProduct,
    addGardenerProduct,
    deleteGardenerProduct,
    createContestEntry,
    addGardenerContestEntry
} from "./gvdb";

export type {
    Plant,
    Product,
    Gardener
} from "./gvdb";

import { $query, Principal, ic } from "azle";
$query
export function principalCaller(): Principal {
    return ic.caller();
}
