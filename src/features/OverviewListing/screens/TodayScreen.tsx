import React from 'react'
import BottomTabBarLayout from '../../../components/BottomTabBarLayout'
import SectionList from '../components/SectionList'
import { useQuery } from '@tanstack/react-query'
import { getTodayEntries } from '../../../api/api'


const TodayScreen: React.FC = () => {
    const { data, isPending } = useQuery({
        queryKey: ['today'],
        queryFn: getTodayEntries
    })

    if (isPending) return (
        <BottomTabBarLayout>
            <p>Loading...</p>
        </BottomTabBarLayout>
    )

    if(data.length === 0) return (  
        <BottomTabBarLayout>
            <p className="font-sm text-center py-8">No data for today</p>
        </BottomTabBarLayout>
    )

    return (
        <BottomTabBarLayout>
            <div className="mb-12">
                <SectionList day={data}/>
                <div className='border-t-2 border-gray-100 rounded w-1/2 m-auto'></div>
            </div>

        </BottomTabBarLayout>)
}

export default TodayScreen