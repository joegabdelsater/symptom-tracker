import React, { useMemo } from 'react'
import { IMeal, ISymptoms } from '../types/types'
import MealItem from './MealItem'
import SymptomsItem from './SymptomsItem'

interface EntryItemProps {
    entry: IMeal | ISymptoms
}

const EntryItem: React.FC<EntryItemProps> = ({ entry }) => {

    const EntryComponent: React.ReactNode = useMemo(() => {
        if (entry.item_type === 'meal') {
            return (<MealItem meal={entry as IMeal} />)
        }
        if (entry.item_type === 'symptoms') {
            return (<SymptomsItem entry={entry as ISymptoms} />)
        }
        return null;
    }, [entry])

    return EntryComponent

}

export default EntryItem