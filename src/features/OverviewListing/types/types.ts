export interface IDay {
    id: number,
    date: string,
    entries: IMealEntry[] | ISymptomsEntry[]
}
export interface IEntry {
    id: string
    time: string
    type: string
    entry: IMeal | ISymptom[]
}


export interface IEntrySkeleton<T> {
    id: string
    time: string
    type: string
    entry: T
}

export interface IMealEntry extends IEntrySkeleton<IMeal>{}
export interface ISymptomsEntry extends IEntrySkeleton<ISymptom[]>{}


export interface IMeal {
    id: string
    type: string
    name: string
    symptoms: ISymptom[]
    ingredients: IIngredient[]
}

export interface IIngredient {
    id: number,
    name: string
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