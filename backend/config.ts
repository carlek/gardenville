import { Principal, ic } from "azle";
import { Tokens } from "../icrc/types";

export interface Config {
    icrcPrincipal: Principal;
    initialMint: Tokens;
    backendPrincipal: Principal;
    currentUser: Principal | null;
}

let config: Config = {
    icrcPrincipal: Principal.fromText("bd3sg-teaaa-aaaaa-qaaba-cai"),
    initialMint: 100n,
    backendPrincipal: Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai"),
    currentUser: null
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

export function setUserPrincipal(principal: Principal) {
    config.currentUser = principal;
}

export function getUserPrincipal(): Principal {
    return config.currentUser;
}