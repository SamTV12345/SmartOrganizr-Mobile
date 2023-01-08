import { authorize } from 'react-native-app-auth';
import {store} from "../store/store";
import {setAccessToken} from "../slices/CommonSlice";

export const login = async (issuerURL:string) => {
  // use the client to make the auth request and receive the authState
  console.log("login");
  try {
    const result = await authorize({
      issuer: issuerURL,
      clientId: 'website',
      redirectUrl: 'https://smartorganizr.schwanzer.online/ui',
      scopes: ['openid', 'profile', 'email'],
    });
    store.dispatch(setAccessToken(result.accessToken))
    // result includes accessToken, accessTokenExpirationDate and refreshToken
  } catch (error) {
    console.log(error);
  }
}
