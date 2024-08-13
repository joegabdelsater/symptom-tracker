import React, { MouseEventHandler, useMemo, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import BottomTabBarLayout from '../../../components/BottomTabBarLayout';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactSlider from 'react-slider'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCore, addMeal, addIngredient, addSymptom, addMealEntry } from '../../../api/api';
import { ICreatableOption, ISymptom } from '../types';
import { MultiValue, SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';

interface IForm {
    meal: SingleValue<ICreatableOption> | undefined;
    ingredients: MultiValue<ICreatableOption>;
    date: Date;
    symptoms: MultiValue<ISymptom>;
}
const CreateMealScreen = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [form, setform] = useState<IForm>({
        meal: null,
        ingredients: [],
        date: new Date(),
        symptoms: [],
    });

    const { mutate: apiAddMealEntry } = useMutation({
        mutationFn: (data: any) => addMealEntry(data),
        onSuccess: () => {
            console.log('success');
            navigate("/today");
        },
    })

    //TODO optimistically update all of these
    const { mutate: createMeal } = useMutation({
        mutationFn: (name: string) => addMeal(name),
        onSuccess: (data) => {
            handleForm('meal', {
                value: data.id,
                label: data.name,
            });
            queryClient.invalidateQueries({
                queryKey: ['core'],
            });
        },
    })

    const { mutate: createIngredient } = useMutation({
        mutationFn: ({ name, mealId }: { name: string, mealId: number }) => addIngredient(name, mealId),
        onSuccess: (data) => {

            setform((prev) => ({
                ...prev,
                ingredients: [
                    ...prev.ingredients,
                    {
                        value: data.id,
                        label: data.name,
                    },
                ],
            }))

            queryClient.invalidateQueries({
                queryKey: ['core'],
            });
        },
    })

    const { mutate: createSymptom } = useMutation({
        mutationFn: (name: string) => addSymptom(name),
        onSuccess: (data) => {
            setform((prev) => ({
                ...prev,
                symptoms: [
                    ...prev.symptoms,
                    {
                        value: data.id,
                        label: data.name,
                        severity: 1,
                    },
                ],
            }))

            queryClient.invalidateQueries({
                queryKey: ['core'],
            });
        },
    })

    const handleForm = (key: string, value: any) => {
        setform((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    const { data, isPending } = useQuery({
        queryKey: ['core'],
        queryFn: getCore,
        staleTime: 1000 * 60 * 60,
    });

    const mealsData = useMemo(() => {
        return data?.meals.map((meal: any) => ({
            value: meal.id,
            label: meal.name,
        }));
    }, [data]);

    const ingredientsData = useMemo(() => {
        return data?.ingredients.map((ingredient: any) => ({
            value: ingredient.id,
            label: ingredient.name,
        }));
    }, [data]);

    const symptomsData = useMemo(() => {
        return data?.symptoms.map((symptom: any) => ({
            value: symptom.id,
            label: symptom.name,
        }));
    }, [data]);

    const handleAddIngredient = (name: string) => {
        if (!form.meal) {
            // TODO show error
            return
        }
        const mealId = form.meal.value;
        createIngredient({ name, mealId });
    }

    const setSeverity = (value: number, symptomId: number) => {
        setform((prev) => ({
            ...prev,
            symptoms: prev.symptoms.map((symptom) => {
                if (symptom.value === symptomId) {
                    return {
                        ...symptom,
                        severity: value,
                    }
                }
                return symptom;
            })
        }))
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const dateString = form.date.toISOString().split('T')[0]; // YYYY-MM-DD format
        const timeString = form.date.toTimeString().split(' ')[0].slice(0, 5); // HH:mm format

        const data = {
            mealId: form.meal?.value,
            ingredients: form.ingredients.map((ingredient) => ingredient.value),
            date: dateString,
            time: timeString,
            symptoms: form.symptoms.map((symptom) => ({
                symptomId: symptom.value,
                severity: symptom.severity,
            })),
        }

        if (!data.mealId || !data.ingredients.length || !data.date || !data.time) {
            // TODO show error
            return
        }

        apiAddMealEntry(data);
    }

    const renderSymptoms = () => {
        return form.symptoms.map((symptom) => {
            return (
                <div key={symptom.value} className="mb-8">
                    <p className="mb-4">{symptom.label}</p>
                    <ReactSlider
                        className="flex items-center justify-center "
                        marks
                        value={symptom?.severity || 1}
                        markClassName="bg-green-200 h-2 text-lg"
                        onChange={(value) => { setSeverity(value, symptom.value); }}
                        min={0}
                        max={5}
                        thumbClassName="bg-indigo-600 rounded-full h-7 w-7 justify-center items-center flex lowerIndex"
                        trackClassName="bg-indigo-200 h-2 rounded-lg"
                        renderThumb={(props, state) => {
                            const { key, ...restProps } = props;

                            return <div key={key} {...restProps}>
                                <p className="text-center text-white text-sm">{state.valueNow}</p>
                            </div>
                        }}
                    />
                </div>
            )
        })
    }

    if (isPending) return (
        <BottomTabBarLayout>
            <p>Loading...</p>
        </BottomTabBarLayout>
    )




    return (
        <BottomTabBarLayout>
            <h1 className='font-bold text-xl mb-4'>Add a meal to your day</h1>

            <div className="mb-4">
                <p className="mb-2">Meal name:</p>
                <CreatableSelect
                    value={form?.meal}
                    options={mealsData}
                    className='z-40'
                    onCreateOption={(text) => {
                        createMeal(text);
                    }}
                    onChange={(option: SingleValue<ICreatableOption>) => {
                        handleForm('meal', option);
                    }}
                />
            </div>

            <div className="mb-4">
                <p className="mb-2">Ingredients:</p>
                <CreatableSelect
                    isMulti
                    value={form?.ingredients}
                    options={ingredientsData}
                    onCreateOption={handleAddIngredient}
                    onChange={(option: MultiValue<ICreatableOption>) => {
                        handleForm('ingredients', option);
                    }}
                />
            </div>

            <div className="mb-4">
                <p className="mb-2">Date & Time:</p>
                <div className='customDatePickerWidth  z-20'>
                    <DatePicker
                        calendarClassName='w-full  z-20'
                        wrapperClassName='w-full z-20'
                        className='border border-gray-300 rounded-md p-2 w-full  z-20'
                        dateFormat="MMMM dd, h:mm aa"

                        selected={form.date}
                        showTimeSelect
                        onChange={(date) => {
                            date && handleForm('date', date)
                        }} />
                </div>
            </div>

            <div className="mt-10">
                <p className="font-bold mb-4">Symptoms during meal</p>

                <div className="mb-4">
                    <CreatableSelect
                        isMulti
                        value={form?.symptoms}
                        options={symptomsData}
                        onCreateOption={createSymptom}
                        onChange={(option: MultiValue<ICreatableOption>) => {
                            handleForm('symptoms', option);
                        }}
                    />
                </div>

                {renderSymptoms()}

            </div>

            <button
                onClick={handleSubmit}
                type="button"
                className="mt-6 rounded-md bg-indigo-700 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300  w-full"
            >
                Save
            </button>
        </BottomTabBarLayout>
    )
}

export default CreateMealScreen