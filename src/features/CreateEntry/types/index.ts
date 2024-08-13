export interface ICoreData {
    id: number;
    name: string;
}

export interface ICreatableOption {
    value: number | string;
    label: string;
}

export interface ISymptom extends ICreatableOption {
    severity: number ;
}