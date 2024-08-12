import { QueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../constants/urls';

const queryClient = new QueryClient();
export { queryClient };

interface ICallParams {
    url: string;
    params: {
        method: string | null,
        body: any,
    },
    authenticate: boolean;
}

let token: string | null = null;

// export const prepareHeaders = async (authenticate = false) => {


//     const storeToken = state.auth.token

//     const headers = new Headers();

//     headers.set('Content-Type', 'application/json');
//     headers.set('Accept', 'application/json');

//     if (authenticate) {
//         if (storeToken === null && token === null) {
//             token = await AsyncStorage.getItem('token');
//         }

//         token = storeToken || token;

//         if (token) {
//             headers.set('authorization', `Bearer ${token}`);
//         }
//         return headers
//     }
// }

export const call = async (params: ICallParams) => {
    const { url, params: { method, body }, authenticate } = params;

    // const headers = await prepareHeaders(authenticate);

    const res = await fetch(`${BASE_URL}${url}`, {
        method: method || 'GET',
        body,
        // headers
    });

    return res.json();
}