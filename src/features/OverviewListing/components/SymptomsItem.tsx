import React from 'react'
import { ISymptom } from '../types/types'
import SymptomSummaryItem from './SymptomSummaryItem'

interface EntryItemProps {
    symptoms: ISymptom[]
    time?: string;
}


const SymptomsItem: React.FC<EntryItemProps> = ({ symptoms, time }) => {
    return (
        <div className="bg-red-50  mb-4 shadow-lg rounded-md">
            {time !== undefined && <div className="w-full bg-red-100 px-4 py-1 rounded-t-md ">
                <p className="text-center text-xs leading-5 text-gray-500">
                    At {time}
                </p>
            </div>}
            <div className="flex gap-x-2  px-4  py-4 items-center">
                {symptoms.map((symptom: ISymptom, index) => (
                    <SymptomSummaryItem
                        symptom={symptom as ISymptom}
                        key={'symptom_' + index.toString() + '_' + symptom.id.toString()} />
                ))}
            </div>
        </div>

    )
}

export default SymptomsItem