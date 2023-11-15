import {
    $query, $update, Opt, nat16, StableBTreeMap, Record, match, Vec, Principal, blob, Tuple,
} from 'azle';

///////////////////////////
// DB schema             //
///////////////////////////

type Plant = Record<{
    id: nat16
    name: string;
    details: string;
}>;

type Product = Record<{
    id: nat16
    name: string;
    details: string;
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
    products: Vec<NatTuple>; // (product id, quantity)
    contestEntry: Vec<Plant>;
}>;

///////////////////////////
// DB and Methods        //
///////////////////////////

let gardeners = new StableBTreeMap<Principal, Gardener>(0, 100, 10_000);
let plants = new StableBTreeMap<nat16, Plant>(1, 100, 10_000);
let products = new StableBTreeMap<nat16, Product>(2, 100, 10_000);

$update;
export function createGardener(info: GardenerInfo): void {
    if (gardeners.containsKey(info.id)) {
        console.log(`Gardener with ID ${info.id} already exists.`);
    } else {
        const newGardener: Gardener = {
            info: info,
            plants: [],
            products: [],
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
export function createPlant(name: string, details: string): nat16 {
    var p_id: nat16;
    const keys: nat16[] = plants.keys();
    if (keys) p_id = Math.max(...keys) + 1;
    else p_id = 1;
    plants.insert(p_id, { id: p_id, name: name, details: details });
    return (p_id);
}

$update;
export function deletePlant(plantId: nat16): void {
    const plantOpt = plants.get(plantId);
    match(plantOpt, {
        Some: (p) => {
            plants.remove(p.id);
        },
        None: () => {
            console.log(`Plant ${plantId} does not exist.`);
        }
    });
}

$update;
export function addGardenersPlant(principal: Principal, plantId: nat16, quantity: nat16): void {
    const gardenerOpt = gardeners.get(principal);
    match(gardenerOpt, {
        Some: (gardener) => {
            // check if plant exists or is new
            const plantOpt = plants.get(plantId);
            var p_id: nat16;
            var p_name: string;
            match(plantOpt, {
                Some: (p) => {
                    p_id = p.id;
                    p_name = p.name;
                },
                None: () => {
                    console.log(`Plant ${plantId} does not exist`);
                }
            });
            gardener.plants.push([p_id, quantity]);
            gardeners.remove(principal);
            gardeners.insert(principal, gardener);
            console.log(`Added ${quantity} ${p_name}(s) to plants for Gardener ${principal}`);
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

$query;
export function getProducts(): Vec<Product> {
    return products.values();
}

$update;
export function createProduct(name: string, details: string): nat16 {
    var p_id: nat16;
    const keys: nat16[] = products.keys();
    if (keys) p_id = Math.max(...keys) + 1;
    else p_id = 1;
    products.insert(p_id, { id: p_id, name: name, details: details });
    return (p_id);
}

$update;
export function deleteProduct(productId: nat16): void {
    const productOpt = plants.get(productId);
    match(productOpt, {
        Some: (p) => {
            products.remove(p.id);
        },
        None: () => {
            console.log(`Plant ${productId} does not exist.`);
        }
    });
}

$update;
export function addGardenersProduct(principal: Principal, productId: nat16, quantity: nat16): void {
    const gardenerOpt = gardeners.get(principal);
    match(gardenerOpt, {
        Some: (gardener) => {
            // check if plant exists or is new
            const productOpt = products.get(productId);
            var p_id: nat16;
            var p_name: string;
            match(productOpt, {
                Some: (p) => {
                    p_id = p.id;
                    p_name = p.name;
                },
                None: () => {
                    console.log(`Product ${productId} does not exist`);
                }
            });
            gardener.products.push([p_id, quantity]);
            gardeners.remove(principal);
            gardeners.insert(principal, gardener);
            console.log(`Added ${quantity} ${p_name}(s) to products for Gardener ${principal}`);
        },
        None: () => {
            console.error(`Gardener ${principal} not found.`);
        }
    });
}

$update;
export function deleteGardenersProduct(id: Principal, productId: nat16): void {
    const gardenerOpt = gardeners.get(id);
    match(gardenerOpt, {
        Some: (gardener) => {
            const index = gardener.products.findIndex(product => product[0] === productId);
            if (index !== -1) {
                gardener.products.splice(index, 1);
                gardeners.remove(id);
                gardeners.insert(id, gardener);
                console.log(`Deleted ${productId} from products for Gardener ${id}`);
            } else {
                console.log(`${productId} not found in products for Gardener ${id}`);
            }
        },
        None: () => {
            console.log(`Gardener ${id} not found.`);
        }
    });
}
