import KeycloakConnect from 'keycloak-connect'

declare module 'express' {
    interface Request {
        kauth?: {
            grant?: KeycloakConnect.Grant & {
                access_token?: {
                    content?: {
                        sub: string
                    }
                }
            }
        }
        userId?: number
    }
}
