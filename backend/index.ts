import { 
    $query, $update, Opt, ic, Principal, nat16, StableBTreeMap, Record, match, Vec 
    } from 'azle';

$query
export function principalCaller(): Principal {
    return ic.caller();
}

type Plant = Record<{
    plantName: string;
}>;

type PlantGrowing = Record<{
    plantName: string;
    quantity: nat16;
}>;

type ProductsAvailable = Record<{
    productName: string;
    quantity: nat16;
}>;

type GardenerInfo = Record<{
    id: string;
    name: string;
    contact: string;
}>;

type Gardener = Record<{
    info: GardenerInfo;
    plantsGrowing: Vec<PlantGrowing>;
    productsAvailable: Vec<ProductsAvailable>;
    contestEntry: Vec<Plant>;
}>;

type Key = string;
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
export function getGardener(id: string): Opt<Gardener> {
    console.log(`in getGardener(${id})`);
    const gardener = gdb.get(id);
    return gardener;
}

$query;
export function getGardeners(): Vec<Gardener> {
    return gdb.values();
}

$update;
export function addPlantGrowing(id: string, plantName: string, quantity: nat16): void {
    const gardenerOpt = gdb.get(id);

    match(gardenerOpt, {
        Some: (gardener) => {
            const plantGrowing: PlantGrowing = {
                plantName,
                quantity
            };
            gardener.plantsGrowing.push(plantGrowing);
            gdb.remove(id);
            gdb.insert(id, gardener);
            console.log(`Added ${quantity} ${plantName}(s) to plantsGrowing for Gardener ${id}`);
        },
        None: () => {
            console.error(`Gardener ${id} not found.`);
        }
    });
}

$update;
export function deletePlantGrowing(id: string, plantName: string): void {
    const gardenerOpt = gdb.get(id);

    match(gardenerOpt, {
        Some: (gardener) => {
            const index = gardener.plantsGrowing.findIndex(plant => plant.plantName === plantName);
            if (index !== -1) {
                gardener.plantsGrowing.splice(index, 1);
                gdb.remove(id);
                gdb.insert(id, gardener);
                console.log(`Deleted ${plantName} from plantsGrowing for Gardener ${id}`);
            } else {
                console.error(`${plantName} not found in plantsGrowing for Gardener ${id}`);
            }
        },
        None: () => {
            console.error(`Gardener ${id} not found.`);
        }
    });
}