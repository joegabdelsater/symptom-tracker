import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import BottomTabBarLayout from '../../../components/BottomTabBarLayout';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactSlider from 'react-slider'
import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCore, addSymptom, addSymptomsEntry } from '../../../api/api';
import { ICreatableOption, ISymptom } from '../types';
import { MultiValue } from 'react-select';
import { useNavigate } from 'react-router-dom';

interface IForm {
    date: Date;
    symptoms: MultiValue<ISymptom>;
}


const CreateSymptomsScreen = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [form, setform] = useState<IForm>({
        date: new Date(),
        symptoms: [],
    });

    const { data, isPending } = useQuery({
        queryKey: ['core'],
        queryFn: getCore,
        staleTime: 1000 * 60 * 60,
    });

    const symptomsData = useMemo(() => {
        return data?.symptoms.map((symptom: any) => ({
            value: symptom.id,
            label: symptom.name,
        }));
    }, [data]);

    const setSeverity = (value: number, symptomId: number) => {
        console.log(value, symptomId);
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

    const { mutate: apiAddSymptomsEntry } = useMutation({
        mutationFn: (data: any) => addSymptomsEntry(data),
        onSuccess: () => {
            console.log('success');
            navigate("/today");
        },
    })




    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const dateString = form.date.toISOString().split('T')[0]; // YYYY-MM-DD format
        const timeString = form.date.toTimeString().split(' ')[0].slice(0, 5); // HH:mm format

        const data = {
            date: dateString,
            time: timeString,
            symptoms: form.symptoms.map((symptom) => ({
                symptomId: symptom.value,
                severity: symptom.severity,
            })),
        }

        if (!data.date || !data.time || !data.symptoms.length) {
            // TODO show error
            return
        }

        apiAddSymptomsEntry(data)
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

    const handleForm = (key: string, value: any) => {
        setform((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    if (isPending) return (
        <BottomTabBarLayout>
            <p>Loading...</p>
        </BottomTabBarLayout>
    )


    return (
        <BottomTabBarLayout>
            <h1 className='font-bold text-xl mb-4'>Add a symptom to your day</h1>

            <div className="mb-4">
                <p className="mb-2">Date & Time:</p>
                <div className='customDatePickerWidth z-20'>
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
                <p className="font-bold mb-4">Symptoms</p>

                <div className="mb-4">
                    <CreatableSelect
                        isMulti
                        value={form?.symptoms}
                        options={symptomsData}
                        onCreateOption={createSymptom}
                        onChange={(option: MultiValue<ICreatableOption>) => {
                            handleForm('symptoms', option);
                            setSeverity(1, option[option.length - 1].value);
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

export default CreateSymptomsScreen