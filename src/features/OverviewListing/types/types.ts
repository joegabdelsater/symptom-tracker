export interface IMeal {
    id: string
    item_type: string
    type: string
    name: string
    symptoms?: ISymptom[]
}

export interface ISymptoms {
    id: string,
    item_type: string
    symptoms: ISymptom[]
}



export interface ISymptom {
    id: number,
    name: string
    severity: number
}

