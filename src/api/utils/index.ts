import { QueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../constants/urls';
import { getToken } from '../../hooks/useLocalStorage';
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

let tokenVar: string | null = null;


export const prepareHeaders = async () => {

    const headers = new Headers();
    const token = tokenVar || getToken();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set('Origin', 'http://localhost:5173');

    if (token) {
        headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
}

export const call = async (params: ICallParams) => {
    const { url, params: { method, body } } = params;

    const headers = await prepareHeaders();

    const res = await fetch(`${BASE_URL}${url}`, {
        method: method || 'GET',
        body: body ? JSON.stringify(body) : null,
        headers
    });

    if (res.status !== 200) {
        throw new Error(res.statusText);
    }
    return res.json();
}