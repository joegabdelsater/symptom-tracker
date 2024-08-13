export interface IMeal {
    id: string
    item_type: string
    type: string
    name: string
    time: string,
    symptoms?: ISymptom[]
}

export interface ISymptoms {
    id: string,
    time: string,
    item_type: string
    symptoms: ISymptom[]
}


export interface ISymptom {
    id: number,
    name: string
    severity: number
}

export interface IAddMealEntryProps {
    meal: number;
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