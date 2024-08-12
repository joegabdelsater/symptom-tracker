import { call } from './utils';

export const login = async (data: { email: string, password: string }) => {
    return call({
        url: 'auth/login',
        params: {
            method: 'POST',
            body: data,
        },
        authenticate: false,
    });
}

export const getTodayEntries = async () => {
    return call({
        url: 'entries',
        params: {
            method: 'GET',
            body: null,
        },
        authenticate: false,
    });
}

export const getEntriesByDate = async (min: string, max: string) => {
    return call({
        url: 'entries',
        params: {
            method: 'GET',
            body: { min, max },
        },
        authenticate: false,
    });
}

export const addMealEntry = async (data: any) => {
    return call({
        url: 'entries/meal',
        params: {
            method: 'POST',
            body: data,
        },
        authenticate: false,
    });
}

export const addSymptomsEntry = async (data: any) => {
    return call({
        url: 'entries/symptoms',
        params: {
            method: 'POST',
            body: data,
        },
        authenticate: false,
    });
}
