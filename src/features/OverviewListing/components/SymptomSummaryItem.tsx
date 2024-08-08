import React, { useState, useMemo, useCallback } from 'react'
import { ISymptom } from '../types/types'

interface SymptomSummaryItemProps {
    symptom: ISymptom
}
const SymptomSummaryItem: React.FC<SymptomSummaryItemProps> = ({ symptom }) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const { name, severity } = symptom
    const handleClick = useCallback(() => {
        setShowTooltip(!showTooltip)
    }, [showTooltip])

    const config = useMemo(() => {
        let bgColor = 'bg-purple-100'

        if (severity === 2) bgColor = 'bg-purple-200'
        if (severity === 3) bgColor = 'bg-purple-400'
        if (severity === 4) bgColor = 'bg-red-400'
        if (severity === 5) bgColor = 'bg-red-500'

        let abbreviation = name.split(' ').map((word) => word[0]).join('').toUpperCase()

        return {
            bgColor,
            abbreviation
        }
    }, [severity])

    return (
        <div
            onClick={handleClick}
            className={`flex flex-row items-center ${config.bgColor} px-1 py-1 rounded h-5 relative shadow-md`}>
            {showTooltip && <div className="absolute -right-10 bg-gray-700 z-20 px-2 py-1 rounded ">
                <p className="text-xs text-white">{name} {severity}/5</p>
            </div>}

            <p className='text-xs font-semibold text-gray-900'> <span className="">{config.abbreviation} </span>{severity}</p>
        </div>
    )
}

export default SymptomSummaryItem