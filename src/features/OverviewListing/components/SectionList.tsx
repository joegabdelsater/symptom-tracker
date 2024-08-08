import React from 'react'
import { IMeal, ISymptom, ISymptoms } from '../types/types'
import MealItem from './MealItem'
import SymptomSummaryItem from './SymptomSummaryItem'

interface SectionListProps {
    date: string,
    entries: (IMeal | ISymptoms)[]
}
const SectionList: React.FC<SectionListProps> = ({ date, entries }) => {
    return (
        <div className="mb-3">
            <h2 className="text-2xl font-bold mb-4">{date}</h2>
            <ul role="list" >
                {entries.map((entry: IMeal | ISymptoms) => {
                    if (entry.item_type === 'meal') {
                        return (<MealItem meal={entry as IMeal} key={entry.id} />)
                    }
                    if (entry.item_type === 'symptoms') {
                        return (<div className="flex gap-x-2 bg-purple-50 px-4 py-4 mb-4 shadow-lg rounded-md">
                            {entry?.symptoms?.map((entry: ISymptom, index) => (
                                <SymptomSummaryItem symptom={entry as ISymptom} key={'symptom_' + index.toString() + '_' + entry.id.toString()} />
                            ))}
                        </div>)
                    }
                })}
            </ul>
        </div>
    )
}


export default SectionList
