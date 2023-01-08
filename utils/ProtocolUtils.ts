import {store} from "../store/store";

export const fixProtocol = (link:string) => {
    const loginURL = store.getState().commonReducer.loginURL
    if(loginURL.includes('https')){
        return link.replace('http','https')
    }
    return link
}
