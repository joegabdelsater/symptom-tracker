import React, { useCallback } from 'react';


interface BottomTabBarLayoutProps {
    children: React.ReactNode
}
export const BottomTabBarLayout: React.FC<BottomTabBarLayoutProps> = ({ children }) => {
    const tabs = [
        { name: 'Today', href: '/', current: false },
        { name: 'Overview', href: '/overview', current: false },
    ]

    const classNames = useCallback((...classes: (string)[]) => {
        return classes.filter(Boolean).join(' ')
    }, [])

    return (
        <div className="h-screen relative">
            <div className="h-full overflow-scroll px-4 py-6 bg-slate-100">
                {children}
            </div>

            <div className="absolute w-full bottom-0 border-t z-10 bg-white">
                <div className="border-b border-gray-200">
                    <nav aria-label="Tabs" className="-mb-px flex justify-evenly">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                aria-current={tab.current ? 'page' : undefined}
                                className={classNames(
                                    tab.current
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'w-1/4 border-t-2 block w-full py-4 text-center text-sm font-medium',
                                )}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default BottomTabBarLayout