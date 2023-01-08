import {AuthorLink} from "./keycloakConfigModels/AuthorLink";

export interface PublicModel {
    clientId:string,
    url:string,
    realm:string,

    _links: AuthorLink
}