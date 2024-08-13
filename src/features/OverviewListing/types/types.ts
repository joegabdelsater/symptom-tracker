export interface IEntry {
    id: string
    entry: IMeal | ISymptoms
    time: string
    date: string
}

export interface IMeal {
    id: string
    entry: string
    type: string
    name: string
    symptoms: ISymptoms
    ingredients: IIngredient[]
}

export interface IIngredient { 
    id: number,
    name: string
}

export interface ISymptoms {
    entry: string
    symptoms: ISymptom[]
}


export interface ISymptom {
    id: number,
    name: string
    severity: number
}

export interface IAddMealEntryProps {
    meal: number;
    type: string;
    ingredients: number[];
    date: string;
    time: string;
    symptoms: { symptomId: number, severity: number }[];
}


export interface IAddSymptomsEntryProps {
    date: string;
    time: string;
    symptoms: { symptomId: number, severity: number }[];
}