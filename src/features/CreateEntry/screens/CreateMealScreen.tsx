import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import BottomTabBarLayout from '../../../components/BottomTabBarLayout';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactSlider from 'react-slider'
import { Button } from '@headlessui/react';


export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}


export const colourOptions: readonly ColourOption[] = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];

const CreateMealScreen = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <BottomTabBarLayout>
            <h1 className='font-bold text-xl mb-4'>Add a meal to your day</h1>

            <div className="mb-4">
                <p className="mb-2">Meal name:</p>
                <CreatableSelect options={colourOptions} className='z-40'/>
            </div>

            <div className="mb-4">
                <p className="mb-2">Ingredients:</p>
                <CreatableSelect isMulti options={colourOptions} className='z-30'/>
            </div>

            <div className="mb-4">
                <p className="mb-2">Date & Time:</p>
                <div className='customDatePickerWidth'>
                    <DatePicker
                        calendarClassName='w-full'
                        wrapperClassName='w-full'
                        className='border border-gray-300 rounded-md p-2 w-full'
                        dateFormat="MMMM dd, h:mm aa"
                        selected={startDate}
                        showTimeSelect
                        onChange={(date) => {
                            date && setStartDate(date)
                        }} />
                </div>
            </div>

            <div className="mt-10">
                <p className="font-bold mb-4">Symptoms</p>

                <div className="mb-8">
                    <p className="mb-5">Chest burn while swallowing:</p>
                    <ReactSlider
                        className="flex items-center justify-center "
                        marks
                        markClassName="bg-green-200 h-2 text-lg"
                        min={0}
                        max={5}
                        thumbClassName="bg-indigo-600 rounded-full h-7 w-7 justify-center items-center flex"
                        trackClassName="bg-indigo-200 h-2 rounded-lg"
                        renderThumb={(props, state) => <div {...props}>
                            <p className="text-center text-white text-sm">{state.valueNow}</p>
                        </div>}
                    />
                </div>

                <div className="mb-8">
                    <p className="mb-5">Food stuck while swallowing:</p>
                    <ReactSlider
                        className="flex items-center justify-center "
                        marks
                        markClassName="bg-green-200 h-2 text-lg"
                        min={0}
                        max={5}
                        thumbClassName="bg-indigo-600 rounded-full h-7 w-7 justify-center items-center flex"
                        trackClassName="bg-indigo-200 h-2 rounded-lg"
                        renderThumb={(props, state) => <div {...props}>
                            <p className="text-center text-white text-sm">{state.valueNow}</p>
                        </div>}
                    />
                </div>

                <div className="mb-8">
                    <p className="mb-5">Chest burn while swallowing:</p>
                    <ReactSlider
                        className="flex items-center justify-center "
                        marks
                        markClassName="bg-green-200 h-2 text-lg"
                        min={0}
                        max={5}
                        thumbClassName="bg-indigo-600 rounded-full h-7 w-7 justify-center items-center flex"
                        trackClassName="bg-indigo-200 h-2 rounded-lg"
                        renderThumb={(props, state) => <div {...props}>
                            <p className="text-center text-white text-sm">{state.valueNow}</p>
                        </div>}
                    />
                </div>

                <div className="mb-8">
                    <p className="mb-5">Food stuck while swallowing:</p>
                    <ReactSlider
                        className="flex items-center justify-center "
                        marks
                        markClassName="bg-green-200 h-2 text-lg"
                        min={0}
                        max={5}
                        thumbClassName="bg-indigo-600 rounded-full h-7 w-7 justify-center items-center flex"
                        trackClassName="bg-indigo-200 h-2 rounded-lg"
                        renderThumb={(props, state) => <div {...props}>
                            <p className="text-center text-white text-sm">{state.valueNow}</p>
                        </div>}
                    />
                </div>

                <div className="mb-8">
                    <p className="mb-5">Chest burn while swallowing:</p>
                    <ReactSlider
                        className="flex items-center justify-center "
                        marks
                        markClassName="bg-green-200 h-2 text-lg"
                        min={0}
                        max={5}
                        thumbClassName="bg-indigo-600 rounded-full h-7 w-7 justify-center items-center flex"
                        trackClassName="bg-indigo-200 h-2 rounded-lg"
                        renderThumb={(props, state) => <div {...props}>
                            <p className="text-center text-white text-sm">{state.valueNow}</p>
                        </div>}
                    />
                </div>

                <div className="mb-8">
                    <p className="mb-5">Food stuck while swallowing:</p>
                    <ReactSlider
                        className="flex items-center justify-center "
                        marks
                        markClassName="bg-green-200 h-2 text-lg"
                        min={0}
                        max={5}
                        thumbClassName="bg-indigo-600 rounded-full h-7 w-7 justify-center items-center flex"
                        trackClassName="bg-indigo-200 h-2 rounded-lg"
                        renderThumb={(props, state) => <div {...props}>
                            <p className="text-center text-white text-sm">{state.valueNow}</p>
                        </div>}
                    />
                </div>
            </div>

            <button
                type="button"
                className="mt-6 rounded-md bg-indigo-700 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full"
            >
                Save
            </button>
        </BottomTabBarLayout>
    )
}

export default CreateMealScreen