export interface ICoreData {
    id: number;
    name: string;
}

export interface ICreatableOption {
    value: number;
    label: string;
}

export interface ISymptom extends ICreatableOption {
    severity: number ;
}