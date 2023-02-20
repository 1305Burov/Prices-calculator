import { useState } from 'react';
import { Slider } from "@mui/material"

type Props = {
    label: string,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
}

function SliderRange({ label, value, setValue }: Props) {

    const handleSliderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value === '' ? 0 : Number(e.target.value));
    };

    return (
        <Slider
            label={label}
            defaultValue={0}
            value={value}
            onChange={handleSliderValueChange}
            color="primary"
            step={1} 
            min={0} 
            max={1000}
        />  
    )
}

export default SliderRange