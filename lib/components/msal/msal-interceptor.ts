import {AxiosStatic} from 'axios'
import {InteractionRequiredAuthError, PublicClientApplication} from '@azure/msal-browser'

export function setupMsalInterceptor(
    axios: AxiosStatic,
    msalInstance: PublicClientApplication,
    clientId: string,
    runWhenUrl: string
) {
    axios.interceptors.request.use(
        async (request) => {
            const at = await msalInstance.acquireTokenSilent({
                account: msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0],
                scopes: [
                    `${clientId}/.default`
                ]
            }).catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                    return msalInstance.acquireTokenRedirect({
                        scopes: [
                            `${clientId}/.default`
                        ]
                    })
                }
            })
            request.headers.Authorization = `Bearer ${at?.accessToken}`
            return request
        },
        () => {
        },
        {
            runWhen: (request) => !!request.url?.includes(runWhenUrl)
        }
    )
}