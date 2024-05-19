import Keycloak from "keycloak-connect";
import KcAdminClient from "@keycloak/keycloak-admin-client";
import {Credentials} from "@keycloak/keycloak-admin-client/lib/utils/auth";


const kcConfig = {
    clientId: process.env.KC_CLIENT_ID,
    bearerOnly: true,
    serverUrl: process.env.KC_URL,
    "ssl-required": "external",
    secret: process.env.KC_SECRET,
    realm: process.env.KC_REALM,
    "auth-server-url": process.env.KC_URL,
    "confidential-port": 0,
    resource: process.env.KC_CLIENT_ID,
};
export const keycloak = new Keycloak({}, kcConfig);

export const kcAdminClient = new KcAdminClient({
    baseUrl: process.env.KC_URL,
    realmName: process.env.KC_REALM,
});

const kcAdminClientCredentials = {
    username: process.env.KC_CLIENT_ID,
    clientSecret: process.env.KC_CLIENT_SECRET,
    grantType: "client_credentials",
    clientId: process.env.KC_CLIENT_ID,
} as Credentials;

await kcAdminClient.auth(kcAdminClientCredentials);

setInterval(() => kcAdminClient.auth(kcAdminClientCredentials), 58 * 1000);