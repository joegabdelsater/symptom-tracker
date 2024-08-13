import React, { useMemo } from 'react'
import { IEntry } from '../types/types'
import MealItem from './MealItem'
import SymptomsItem from './SymptomsItem'

interface EntryItemProps {
    entry: IEntry
}

const EntryItem: React.FC<EntryItemProps> = ({ entry }) => {
    const entryType = entry.entry.entry;

    const EntryComponent: React.ReactNode = useMemo(() => {

        if (entryType === 'meal') {
            return (<MealItem meal={entry} />)
        }
        if (entryType === 'symptoms') {
            return (<SymptomsItem entry={entry} />)
        }
        return null;
    }, [entryType, entry])

    return EntryComponent

}

export default EntryItem