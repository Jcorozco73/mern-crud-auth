import  jwt  from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

/**
 * The `createAccessToken` function is used to generate a JSON Web Token (JWT)
 * access token. It takes in a `payload` object as a parameter, which contains the
 * data to be included in the token.
 * 
 * The function returns a Promise that resolves to the generated access token or
 * rejects with an error if there was an issue during the token generation
 * process.
 * 
 * The `jwt.sign` method is used to sign the token using a secret key
 * (`TOKEN_SECRET`) and set an expiration time of 1 hour for the token. If the
 * token signing is successful, the generated token is resolved; otherwise, the
 * error is rejected.
 * 
 * Example usage:
 * 
 * ```javascript
 * const payload = {
     * userId: 123,
     * role: 'admin'
     * };
 * 
 * createAccessToken(payload)
 * .then(token => {
     * console.log('Access token:', token);
     * })
 * .catch(error => {
     * console.error('Error generating access token:', error);
     * });
 * ```
 * 
 * Note: The `TOKEN_SECRET` variable should be defined and accessible within the
 * scope of the `createAccessToken` function for the token signing to work
 * correctly.
 */
export function createAccessToken (payload) {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                payload,
                 TOKEN_SECRET, {
                 expiresIn: '1h'
                 }, 
                 (err, token) => {
                if (err)  
                reject(err)
                resolve(token)
            })
        }
    )

}

