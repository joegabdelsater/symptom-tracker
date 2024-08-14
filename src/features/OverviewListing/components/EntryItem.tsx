import React, { useMemo } from 'react'
import { IMealEntry, ISymptom, ISymptomsEntry } from '../types/types'
import MealItem from './MealItem'
import SymptomsItem from './SymptomsItem'

interface EntryItemProps {
    entry: IMealEntry | ISymptomsEntry
}

const EntryItem: React.FC<EntryItemProps> = ({ entry }) => {

    const EntryComponent: React.ReactNode = useMemo(() => {

        if (entry.type === 'meal') {
            return (<MealItem meal={entry as IMealEntry} />)
        }
        if (entry.type === 'symptoms') {
            return (<SymptomsItem symptoms={entry.entry as ISymptom[]} time={entry.time} />)
        }
        return null;
    }, [entry])

    return EntryComponent

}

export default EntryItem