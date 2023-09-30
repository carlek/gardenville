import { Principal } from "azle";
import { Tokens } from "../icrc/types";

export interface Config {
    icrcPrincipal: Principal;
    initialMint: Tokens;
    backendPrincipal: Principal;
    // other config values
}

let config: Config = {
    icrcPrincipal: Principal.fromText('bw4dl-smaaa-aaaaa-qaacq-cai'),
    initialMint: 100n,
    backendPrincipal: Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai")
};

export function getIcrcPrincipal(): Principal {
    return config.icrcPrincipal;
}

export function getInitialMint(): Tokens {
    return config.initialMint;
}

export function getBackendPrincipal(): Principal {
    return config.backendPrincipal;
}
