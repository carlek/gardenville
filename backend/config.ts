import { Principal } from "azle";
import { Tokens } from "../icrc/types";

export interface Config {
    icrcPrincipal: Principal;
    initialMint: Tokens;
    // other config values
}

let config: Config = {
    icrcPrincipal: Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
    initialMint: 100n,
};

export function getIcrcPrincipal(): Principal {
    return config.icrcPrincipal;
}

export function getInitialMint(): Tokens {
    return config.initialMint;
}