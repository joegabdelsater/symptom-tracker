import React from 'react'
import BottomTabBarLayout from '../../../components/BottomTabBarLayout'
import SectionList from '../components/SectionList'
import { IMeal, ISymptoms } from '../types/types'

const entries: (IMeal | ISymptoms)[] = [
    {
        id: '1',
        type: 'Breakfast',
        name: 'Oatmeal',
        item_type: 'meal',
        symptoms: [
            {   
                id: 1,
                name: 'Difficulty swallowing',
                severity: 1
            },
            {   
                id: 2,
                name: 'Chest Burn',
                severity: 2
            },
            {   
                id: 3,
                name: 'Food Stuck',
                severity: 3
            },
            {
                id: 4,
                name: 'Food Stuck',
                severity: 4
            },
            {
                id: 5,
                name: 'Food Stuck',
                severity: 5
            }
        ]
    },
    {
        id: '2',
        item_type: 'symptoms',
        symptoms: [
            {   
                id: 1,
                name: 'Difficulty swallowing',
                severity: 1
            },
            {
                id: 2,
                name: 'Chest Burn',
                severity: 2
            },
            {
                id: 3,
                name: 'Food Stuck',
                severity: 3
            },
            {
                id: 4,
                name: 'Food Stuck',
                severity: 4
            },
            {
                id: 5,
                name: 'Food Stuck',
                severity: 5
            }
        ]
    },
    {
        id: '2',
        type: 'Lunch',
        name: 'Oatmeal',
        item_type: 'meal',
    }
]



const data = [
    {
        date: 'Today',
        entries: entries
    },
    {
        date: 'Yesterday',
        entries: entries
    },
    {
        date: '10/10/2024',
        entries: entries
    },
]

const OverviewSectionsList: React.FC = () => {
    return (
        <BottomTabBarLayout>
            {data.map((section, index) => {
                return (
                    <div className="mb-12">
                        <SectionList entries={section.entries} date={section.date} key={section + index.toString()} />
                        <div className='border-t-2 border-gray-100 rounded w-1/2 m-auto'></div>
                    </div>
                )
            })}
        </BottomTabBarLayout>)
}

export default OverviewSectionsList