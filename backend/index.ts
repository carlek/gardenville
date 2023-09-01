import { $query, $update, Opt, ic, Principal, nat16, StableBTreeMap, Record, Vec } from 'azle';

$query
export function principalCaller(): Principal {
    return ic.caller();
}

type Plant = Record<{
    plantName: string;
}>;

type PlantsGrowing = Record<{
    plantName: string;
    quantity: nat16;
}>;

type ProductsAvailable = Record<{
    productName: string;
    quantity: nat16;
}>;

type GardenerInfo = Record<{
    id: nat16;
    name: string;
    contact: string;
}>;

type Gardener = Record<{
    info: GardenerInfo;
    plantsGrowing: Vec<PlantsGrowing>;
    productsAvailable: Vec<ProductsAvailable>;
    contestEntry: Vec<Plant>;
}>;

type Key = nat16;
type Value = Gardener;

let gdb = new StableBTreeMap<Key, Value>(0, 100, 10_000);

$update;
export function createGardener(info: GardenerInfo): void {
    if (gdb.containsKey(info.id)) {
        console.log(`Gardener with ID ${info.id} already exists.`);
    } else {
        const newGardener: Gardener = {
            info: info,
            plantsGrowing: [],
            productsAvailable: [],
            contestEntry: []
        };
        gdb.insert(info.id, newGardener);
        console.log(`Gardener ${info.name} added successfully.`);
    }
}

$query;
export function getGardener(id: nat16): Opt<Gardener>  {
    return gdb.get(id);
}
