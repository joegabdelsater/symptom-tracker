import React from 'react'
import { IMeal, ISymptom, ISymptoms } from '../types/types'
import SymptomSummaryItem from './SymptomSummaryItem'

interface EntryItemProps {
    entry: IMeal | ISymptoms
}


const SymptomsItem: React.FC<EntryItemProps> = ({ entry }) => {
    return (
        <div className="bg-red-50 pb-4 mb-4 shadow-lg rounded-md">
            <div className="w-full bg-red-100 px-4 py-1 rounded-t-md  mb-4">
                <p className="text-center text-xs leading-5 text-gray-500">
                    At {entry.time}
                </p>
            </div>
            <div className="flex gap-x-2  px-4">
                {entry?.symptoms?.map((entry: ISymptom, index) => (
                    <SymptomSummaryItem symptom={entry as ISymptom} key={'symptom_' + index.toString() + '_' + entry.id.toString()} />
                ))}
            </div>
        </div>

    )
}

export default SymptomsItem