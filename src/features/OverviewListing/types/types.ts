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

