import {
    $query, $update, Opt, nat16, StableBTreeMap, Record, match, Vec, Principal, Tuple,
} from 'azle';

///////////////////////////
// DB schema             //
///////////////////////////

export type Plant = Record<{
    id: nat16
    name: string;
    details: string;
}>;

export type Product = Record<{
    id: nat16
    name: string;
    details: string;
}>;

export type GardenerInfo = Record<{
    id: Principal;
    name: string;
    contact: string;
}>;

type NatTuple = Tuple<[id: nat16, quantity: nat16]>;

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
export function createPlant(name: string, details: string): Tuple<[nat16,string]> {
    const n = name.toLowerCase().trim();
    const d = details.toLowerCase().trim();
    const existingPlant = plants.values().find(plant => plant.name.toLowerCase().trim() === n && plant.details.toLowerCase().trim() === d);
    if (existingPlant) {
        return [0, 'That plant and details already exists.'];
    }
    const keys: nat16[] = plants.keys();
    try {
        const p_id: nat16 = keys ? Math.max(...keys) + 1 : 1;
        const newPlant: Plant = { id: p_id, name: name.trim(), details: details.trim() };
        plants.insert(p_id, newPlant);
        return [p_id, `${name} | ${details} created successfully`];
    } catch (error) {
        return [0, "Failed to create plant: " + error.message];
    }
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
export function addGardenersPlant(principal: Principal, plantId: nat16, quantity: nat16): Tuple<[nat16, string]> {
    var result: Tuple<[nat16, string]>;
    var p_id: nat16;
    var p_name: string;
    const gardenerOpt = gardeners.get(principal);
    match(gardenerOpt, {
        Some: (gardener) => {
            const plantOpt = plants.get(plantId);
            match(plantOpt, {
                Some: (p) => {
                    p_id = p.id;
                    p_name = p.name;
                },
                None: () => {
                    result = [0, `Plant ${plantId} does not exist`];
                }
            });
            if (p_id) {
                const existingPlantIndex = gardener.plants.findIndex((t) => t[0] === p_id);
                if (existingPlantIndex !== -1) {
                    var t = gardener.plants[existingPlantIndex];
                    gardener.plants[existingPlantIndex] = [t[0], t[1]+quantity];
                } else {
                    gardener.plants.push([p_id, quantity]);
                }
                gardeners.remove(principal);
                gardeners.insert(principal, gardener);
                result = [plantId, `Added ${quantity} ${p_name}(s)`];
            }
        },
        None: () => {
            result = [0, `Gardener ${principal} not found.`];
        }
    });
    return result;
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
export function createProduct(name: string, details: string): Tuple<[nat16,string]> {
    const n = name.toLowerCase().trim();
    const d = details.toLowerCase().trim();
    const existingProduct = products.values().find(product => product.name.toLowerCase().trim() === n && product.details.toLowerCase().trim() === d);
    if (existingProduct) {
        return [0, 'That product and details already exists.'];
    }
    const keys: nat16[] = products.keys();
    try {
        const p_id: nat16 = keys ? Math.max(...keys) + 1 : 1;
        const newProduct: Product = { id: p_id, name: name.trim(), details: details.trim() };
        products.insert(p_id, newProduct);
        return [p_id, `${name} | ${details} created successfully`];
    } catch (error) {
        return [0, "Failed to create product: " + error.message];
    }
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
export function addGardenersProduct(principal: Principal, productId: nat16, quantity: nat16): Tuple<[nat16, string]> {
    var result: Tuple<[nat16, string]>;
    var p_id: nat16;
    var p_name: string;
    const gardenerOpt = gardeners.get(principal);
    match(gardenerOpt, {
        Some: (gardener) => {
            const productOpt = plants.get(productId);
            match(productOpt, {
                Some: (p) => {
                    p_id = p.id;
                    p_name = p.name;
                },
                None: () => {
                    result = [0, `Product ${productId} does not exist`];
                }
            });
            if (p_id) {
                const existingProductIndex = gardener.products.findIndex((t) => t[0] === p_id);
                if (existingProductIndex !== -1) {
                    var t = gardener.plants[existingProductIndex];
                    gardener.plants[existingProductIndex] = [t[0], t[1]+quantity];
                } else {
                    gardener.plants.push([p_id, quantity]);
                }
                gardeners.remove(principal);
                gardeners.insert(principal, gardener);
                result = [productId, `Added ${quantity} ${p_name}(s)`];
            }
        },
        None: () => {
            result = [0, `Gardener ${principal} not found.`];
        }
    });
    return result;
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
