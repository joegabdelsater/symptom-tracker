import { call } from './utils';
import { IAddMealEntryProps, IAddSymptomsEntryProps } from '../features/OverviewListing/types/types';


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

export const getCore = async () => {
    return call({
        url: 'core',
        params: {
            method: 'GET',
            body: null,
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

export const addMeal = async (name: string) => {
    return call({
        url: 'meal',
        params: {
            method: 'POST',
            body: {
                name
            },
        },
        authenticate: false,
    });
}

export const addIngredient = async (name: string, mealId: number) => {
    return call({
        url: `ingredient/${mealId}`,
        params: {
            method: 'POST',
            body: {
                ingredient: name
            },
        },
        authenticate: false,
    });
}

export const addSymptom = async (name: string) => {
    return call({
        url: 'symptom',
        params: {
            method: 'POST',
            body: {
                name
            },
        },
        authenticate: false,
    });
}

export const addMealEntry = async (data: IAddMealEntryProps) => {
    return call({
        url: 'entries/meal',
        params: {
            method: 'POST',
            body: data,
        },
        authenticate: false,
    });
}


export const addSymptomsEntry = async (data: IAddSymptomsEntryProps) => {
    return call({
        url: 'entries/symptoms',
        params: {
            method: 'POST',
            body: data,
        },
        authenticate: false,
    });
}
