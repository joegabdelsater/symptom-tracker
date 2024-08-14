import React, { useMemo } from 'react'
import { IDay, IMealEntry, ISymptomsEntry } from '../types/types'
import EntryItem from './EntryItem'

interface SectionListProps {
    day: IDay
}
const SectionList: React.FC<SectionListProps> = ({ day }) => {
    console.log(day)
    const dateDisplay = useMemo(() => {
        const today = new Date()
        const date = new Date(day.date)
        if (today.toDateString() === date.toDateString()) {
            return 'Today'
        }

        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        if (yesterday.toDateString() === date.toDateString()) {
            return 'Yesterday'
        }

        return date.toDateString()
    }, [day])
    return (
        <div className="mb-3">
            <h2 className="text-2xl font-bold mb-4">{dateDisplay}</h2>
            <ul role="list" >
                {day.entries.map((entry: (IMealEntry | ISymptomsEntry), index: number) => {
                    return <EntryItem entry={entry} key={'entry_' + index.toString()} />
                })}
            </ul>
        </div>
    )
}


export default SectionList
