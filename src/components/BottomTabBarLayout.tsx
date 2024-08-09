import React, { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface BottomTabBarLayoutProps {
    children: React.ReactNode
}
export const BottomTabBarLayout: React.FC<BottomTabBarLayoutProps> = ({ children }) => {
    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false);

    const toggleBottomSheet = () => {
        setIsOpen(!isOpen);
    };


    const tabs = useMemo(() => {
        return [
            { name: 'Today', href: '/', current: location.pathname === '/' },
            { name: 'Overview', href: '/overview', current: location.pathname === '/overview' },
        ]

    }, [location])

    const classNames = useCallback((...classes: (string)[]) => {
        return classes.filter(Boolean).join(' ')
    }, [])

    return (
        <div className="h-screen relative">
            <div className="h-full overflow-scroll px-4 pt-6 pb-32 bg-slate-100">
                {children}
            </div>

            <div className={`fixed left-0 right-0 bottom-0 z-10 bg-slate-100 justify-start items-center flex flex-col rounded-t-3xl drop-shadown-lg bottom-sheet ${isOpen ? 'open' : 'closed'}`}>
                <div className="absolute top-5 right-10" onClick={toggleBottomSheet}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"
                        className="size-6 text-indigo-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <a href="/meal/create" className="block mb-4 text-white font-bold bg-green-300 px-8 py-2 rounded">Add Meal</a>
                <a href="/symptoms/create" className="block mb-4 text-white font-bold bg-red-300 px-8 py-2 rounded">Add Symptom</a>
            </div>

            <div className="absolute w-full bottom-0 border-t z-10 bg-white">
                <div className="border-b border-gray-200">
                    <nav aria-label="Tabs" className="-mb-px flex justify-evenly relative">
                        <a
                            key={tabs[0].name}
                            href={tabs[0].href}
                            aria-current={tabs[0].current ? 'page' : undefined}
                            className={classNames(
                                tabs[0].current
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'border-t-2 block w-full pr-10 py-4 text-center text-sm font-medium items-center justify-center flex',
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                className={classNames(tabs[0].current ? 'text-indigo-600' : 'text-gray-500', 'size-6')}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </a>

                        <div
                            onClick={toggleBottomSheet}
                            className="bg-indigo-600 h-20 w-20 rounded-full absolute flex justify-center items-center -top-1/2 shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>

                        <a
                            key={tabs[1].name}
                            href={tabs[1].href}
                            aria-current={tabs[1].current ? 'page' : undefined}
                            className={classNames(
                                tabs[1].current
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'w-1/4 border-t-2 block w-full py-4 text-center text-sm font-medium justify-center items-center flex',
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={classNames(tabs[0].current ? 'text-indigo-600' : 'text-gray-500', 'size-6')}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>

                        </a>

                    </nav>
                </div>
            </div>
        </div>
    )
}

export default BottomTabBarLayout