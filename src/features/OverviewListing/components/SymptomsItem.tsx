import React, { useMemo } from 'react'
import { IEntry, IMeal, ISymptom, ISymptoms } from '../types/types'
import SymptomSummaryItem from './SymptomSummaryItem'

interface EntryItemProps {
    entry: IEntry
}


const SymptomsItem: React.FC<EntryItemProps> = ({ entry }) => {

    const entryDetails = useMemo(() => {
        const _entry = entry.entry as ISymptoms

        return {
            time: entry.time,
            symptoms: _entry.symptoms as ISymptom[]
        }
    }, [entry])

    return (
        <div className="bg-red-50 pb-4 mb-4 shadow-lg rounded-md">
            <div className="w-full bg-red-100 px-4 py-1 rounded-t-md  mb-4">
                <p className="text-center text-xs leading-5 text-gray-500">
                    At {entryDetails.time}
                </p>
            </div>
            <div className="flex gap-x-2  px-4">
                {entryDetails.symptoms?.map((entry: ISymptom, index) => (
                    <SymptomSummaryItem symptom={entry as ISymptom} key={'symptom_' + index.toString() + '_' + entry.id.toString()} />
                ))}
            </div>
        </div>

    )
}

export default SymptomsItem