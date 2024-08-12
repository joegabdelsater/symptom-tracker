import React, { useState } from 'react'
import BottomTabBarLayout from '../../../components/BottomTabBarLayout'
import SectionList from '../components/SectionList'
import { IMeal, ISymptoms } from '../types/types'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const entries: (IMeal | ISymptoms)[] = [
    {
        id: '1',
        type: 'Breakfast',
        name: 'Oatmeal',
        item_type: 'meal',
        time: '8:00 AM',
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
        time: '10:00 AM',
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
        time: '1:00 PM',
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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showFilters, setShowFilters] = useState(false)

    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    return (
        <BottomTabBarLayout>
            {!showFilters && <div className="absolute top-5 right-5 bg-indigo-600 rounded-md p-2 shadow-lg" onClick={toggleFilters}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
            </div>}

            {showFilters && <div className="bg-slate-50 drop-shadow-md px-4 py-6 rounded-md z-30  mb-6">
                <div className='customDatePickerWidth'>
                    <div className="flex justify-between items-center mb-4">
                        <p className=' font-bold'>Filter date range</p>

                        <div onClick={toggleFilters}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"
                                className="size-6 text-indigo-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>

                    <DatePicker
                        calendarClassName='w-full z-40'
                        wrapperClassName='w-full z-40'
                        className='border border-gray-300 rounded-md p-2 w-full text-center z-40'
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                    />

                    <button
                        type="button"
                        className="mt-2 rounded-md bg-indigo-700 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset w-full"
                    >
                        Filter
                    </button>
                </div>
            </div>}


            {data.map((section, index) => {
                return (
                    <div className="mb-12" key={section + index.toString()} >
                        <SectionList entries={section.entries} date={section.date} />
                        <div className='border-t-2 border-gray-100 rounded w-1/2 m-auto'></div>
                    </div>
                )
            })}
        </BottomTabBarLayout>)
}

export default OverviewSectionsList