import {
    $query, $update, Opt, nat16, StableBTreeMap, Record, match, Vec, Principal, blob
} from 'azle';

///////////////////////////
// DB schema             //
///////////////////////////

type PlantInfo = Record<{
    plantName: string;
    details: blob;
}>;

type Plant = Record<{
    info: PlantInfo;
    quantity: nat16;
}>;

type ProductsAvailable = Record<{
    productName: string;
    quantity: nat16;
}>;

type GardenerInfo = Record<{
    id: Principal;
    name: string;
    contact: string;
}>;

export type Gardener = Record<{
    info: GardenerInfo;
    plants: Vec<Plant>;
    productsAvailable: Vec<ProductsAvailable>;
    contestEntry: Vec<Plant>;
}>;

///////////////////////////
// DB and Methods        //
///////////////////////////

let gdb = new StableBTreeMap<Principal, Gardener>(0, 100, 10_000);

$update;
export function createGardener(info: GardenerInfo): void {
    if (gdb.containsKey(info.id)) {
        console.log(`Gardener with ID ${info.id} already exists.`);
    } else {
        const newGardener: Gardener = {
            info: info,
            plants: [],
            productsAvailable: [],
            contestEntry: []
        };
        gdb.insert(info.id, newGardener);
        console.log(`Gardener ${info.name} added successfully.`);
    }
}

$update;
export function deleteGardener(id: Principal): void {
    console.log(`in deleteGardener(${id})`);
    if (!gdb.containsKey(id)) {
        console.log(`Gardener with ID ${id} does not exist.`);
    } else {
        const gardener = gdb.remove(id);
        console.log(`Gardener ${gardener.Some?.info.name} deleted.`);
    }
}

$query;
export function getGardener(id: Principal): Opt<Gardener> {
    const gardener = gdb.get(id);
    return gardener;
}

$query;
export function getGardeners(): Vec<Gardener> {
    return gdb.values();
}

$update;
export function addPlant(id: Principal, info: PlantInfo, quantity: nat16): void {
    const gardenerOpt = gdb.get(id);

    match(gardenerOpt, {
        Some: (gardener) => {
            const plant: Plant = {
                info,
                quantity
            };
            gardener.plants.push(plant);
            gdb.remove(id);
            gdb.insert(id, gardener);
            console.log(`Added ${quantity} ${info.plantName}(s) to plants for Gardener ${id}`);
        },
        None: () => {
            console.error(`Gardener ${id} not found.`);
        }
    });
}

$update;
export function deletePlant(id: Principal, plantName: string): void {
    const gardenerOpt = gdb.get(id);

    match(gardenerOpt, {
        Some: (gardener) => {
            const index = gardener.plants.findIndex(plant => plant.info.plantName === plantName);
            if (index !== -1) {
                gardener.plants.splice(index, 1);
                gdb.remove(id);
                gdb.insert(id, gardener);
                console.log(`Deleted ${plantName} from plants for Gardener ${id}`);
            } else {
                console.log(`${plantName} not found in plants for Gardener ${id}`);
            }
        },
        None: () => {
            console.log(`Gardener ${id} not found.`);
        }
    });
}
