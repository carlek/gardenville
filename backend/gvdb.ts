import {
    $query, $update, Opt, nat16, StableBTreeMap, Record, match, Vec, Principal, blob, Tuple, 
} from 'azle';

///////////////////////////
// DB schema             //
///////////////////////////

type ProductInfo = Record<{
}>;

type Plant = Record<{
    id: nat16
    name: string;
    details: blob;
}>;

type Product = Record<{
    id: nat16
    name: string;
    details: blob;
}>;

type GardenerInfo = Record<{
    id: Principal;
    name: string;
    contact: string;
}>;

type NatTuple = Tuple<[nat16, nat16]>;

export type Gardener = Record<{
    info: GardenerInfo;
    plants: Vec<NatTuple>;  // (plant id, quantity)
    productsAvailable: Vec<NatTuple>; // (product id, quantity)
    contestEntry: Vec<Plant>;
}>;

///////////////////////////
// DB and Methods        //
///////////////////////////

let gardeners = new StableBTreeMap<Principal, Gardener>(0, 100, 10_000);
let plants = new StableBTreeMap<nat16, Plant>(1, 100, 10_000);
// let products = new StableBTreeMap<nat16, Product>(2, 100, 10_000);   


$update;
export function createGardener(info: GardenerInfo): void {
    if (gardeners.containsKey(info.id)) {
        console.log(`Gardener with ID ${info.id} already exists.`);
    } else {
        const newGardener: Gardener = {
            info: info,
            plants: [],
            productsAvailable: [],
            contestEntry: []
        };
        gardeners.insert(info.id, newGardener);
        console.log(`Gardener ${info.name} added successfully.`);
    }
}

$update;
export function deleteGardener(id: Principal): void {
    console.log(`in deleteGardener(${id})`);
    if (!gardeners.containsKey(id)) {
        console.log(`Gardener with ID ${id} does not exist.`);
    } else {
        const gardener = gardeners.remove(id);
        console.log(`Gardener ${gardener.Some?.info.name} deleted.`);
    }
}

$query;
export function getGardener(id: Principal): Opt<Gardener> {
    const gardener = gardeners.get(id);
    return gardener;
}

$query;
export function getGardeners(): Vec<Gardener> {
    return gardeners.values();
}

$query;
export function getPlants(): Vec<Plant> {
    return plants.values();
}

$update;
export function addPlant(principal: Principal, plant: Plant, quantity: nat16): void {
    const gardenerOpt = gardeners.get(principal);
    match(gardenerOpt, {
        Some: (gardener) => {

            // check if plant exists or is new
            const plantOpt = plants.get(plant.id);
            var p_id: nat16;
            var p_name: string;
            var p_details: blob;
            match(plantOpt, {
                Some: (p) => {
                    p_id = p.id;
                    p_name = p.name;
                    p_details = p.details;
                },
                None: () => {
                    const keys: nat16[] = plants.keys();
                    if (keys) p_id = Math.max(...keys) + 1;
                    else p_id = 1;
                    p_name = plant.name;
                    p_details = plant.details
                    plants.insert(p_id, {id: p_id, name: p_name, details: p_details});
                }
            });
            const new_plant: Plant = {
                id: p_id,
                name: p_name,
                details: p_details
            };
            gardener.plants.push([new_plant.id, quantity]);
            gardeners.remove(principal);
            gardeners.insert(principal, gardener);
            console.log(`Added ${quantity} ${plant.name}(s) to plants for Gardener ${principal}`);
        },
        None: () => {
            console.error(`Gardener ${principal} not found.`);
        }
    });
}

$update;
export function deleteGardenersPlant(id: Principal, plantId: nat16): void {
    const gardenerOpt = gardeners.get(id);

    match(gardenerOpt, {
        Some: (gardener) => {
            const index = gardener.plants.findIndex(plant => plant[0] === plantId);
            if (index !== -1) {
                gardener.plants.splice(index, 1);
                gardeners.remove(id);
                gardeners.insert(id, gardener);
                console.log(`Deleted ${plantId} from plants for Gardener ${id}`);
            } else {
                console.log(`${plantId} not found in plants for Gardener ${id}`);
            }
        },
        None: () => {
            console.log(`Gardener ${id} not found.`);
        }
    });
}
