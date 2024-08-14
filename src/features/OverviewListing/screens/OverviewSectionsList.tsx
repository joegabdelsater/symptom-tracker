import React, { MouseEventHandler, useState } from 'react'
import BottomTabBarLayout from '../../../components/BottomTabBarLayout'
import SectionList from '../components/SectionList'
import { IDay } from '../types/types'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, QueryClient } from '@tanstack/react-query'
import { getEntriesByDate } from '../../../api/api'


const OverviewSectionsList: React.FC = () => {
    const queryClient = new QueryClient()
    const [dates, setDates] = useState<{ from: Date | null, to: Date | null }>({
        from: null,
        to: null
    });

    const [showFilters, setShowFilters] = useState(false)

    const { data, isPending, isError } = useQuery({
        queryKey: ['overview', dates],
        queryFn: async () => {
            let params = null;
            if (dates.from) {
                const date = dates.from.toISOString().split('T')[0]; // YYYY-MM-DD format
                console.log(date);
                params = { from: date }
            }

            if (dates.to) {
                const date = dates.to.toISOString().split('T')[0]; // YYYY-MM-DD format
                params = { ...params, to: date }
            }
            return await getEntriesByDate(params as { from: Date, to: Date } | null)
        }
    })

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {

        queryClient.invalidateQueries({ queryKey: ['overview'] })
        setDates({ from: null, to: null })
        event.preventDefault()

        toggleFilters()
    }

    if (isPending || isError) return (
        <BottomTabBarLayout>
            <p>Loading...</p>
        </BottomTabBarLayout>
    )

    const onChange = (date: Date | null, key: string) => {
        setDates((prev) => ({
            ...prev,
            [key]: date
        }));
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
                        selected={dates.from ?? new Date()}
                        onChange={(date) => onChange(date, 'from')}
                    />

                    <DatePicker
                        calendarClassName='w-full z-40'
                        wrapperClassName='w-full z-40'
                        className='border border-gray-300 rounded-md p-2 w-full text-center z-40'
                        selected={dates.to ?? new Date()}
                        onChange={(date) => onChange(date, 'to')}
                    />

                    <button
                        onClick={handleClear}
                        type="button"
                        className="mt-2 rounded-md bg-indigo-700 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset w-full"
                    >
                        Clear
                    </button>
                </div>
            </div>}


            {data.map((section: IDay, index: number) => {
                return (
                    <div className="mb-12" key={'day_' + index.toString()} >
                        <SectionList day={section} />

                        <div className='border-t-4 border-gray-300 rounded w-1/2 m-auto mt-8'></div>
                    </div>
                )
            })}
        </BottomTabBarLayout>)
}

export default OverviewSectionsList