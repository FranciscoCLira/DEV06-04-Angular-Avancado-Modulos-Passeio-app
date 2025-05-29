import { AuthConfig } from "angular-oauth2-oidc"; 

export const auth: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: '140948122380-jp8mfikbild4oplfp5qsh3v59fjkad13.apps.googleusercontent.com',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false
}