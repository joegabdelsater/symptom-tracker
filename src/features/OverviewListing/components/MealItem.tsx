import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { IMeal } from '../types/types'
import SymptomSummaryItem from './SymptomSummaryItem'

interface MealItemProp {
    meal: IMeal
}
const MealItem: React.FC<MealItemProp> = ({ meal }) => {
    return (
        <li className="flex justify-between gap-x-6 py-5 shadow-lg rounded-md px-4 py-2 mb-4 bg-slate-50">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        <a href={meal.id} className="hover:underline">
                            {meal.type}
                        </a>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <p className="truncate hover:underline">
                            {meal.name}
                        </p>
                    </p>
                </div>
            </div>

            {meal?.symptoms && <div className="flex gap-x-2 gap-y-2 flex-wrap">
                {meal.symptoms.map((symptom, index) => (
                    <SymptomSummaryItem key={index} symptom={symptom} />
                ))}
            </div>}


            {meal?.symptoms?.length === 0 || !meal.symptoms && (
                <div className="flex items-center justify-end flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 fill-green-200">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clipRule="evenodd" />
                    </svg>
                </div>
            )}


            <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                    </MenuButton>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <MenuItem>
                            <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                                View {meal.type}<span className="sr-only">, {meal.name}</span>
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                                Edit {meal.type}<span className="sr-only">, {meal.name}</span>
                            </a>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </li >
    )
}

export default MealItem