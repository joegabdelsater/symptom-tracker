import React from 'react'
import { IEntry } from '../types/types'
import EntryItem from './EntryItem'

interface SectionListProps {
    date: string,
    entries: IEntry[]
}
const SectionList: React.FC<SectionListProps> = ({ date, entries }) => {
    return (
        <div className="mb-3">
            <h2 className="text-2xl font-bold mb-4">{date}</h2>
            <ul role="list" >
                {entries.map((entry: IEntry, index: number) => {
                    return <EntryItem entry={entry} key={'entry_' + index.toString()} />
                })}
            </ul>
        </div>
    )
}


export default SectionList
