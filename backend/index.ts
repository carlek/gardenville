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
    createPlant,
    deletePlant,
    addGardenersPlant,
    deleteGardenersPlant,
    createProduct,
    deleteProduct,
    addGardenersProduct,
    deleteGardenersProduct,
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
