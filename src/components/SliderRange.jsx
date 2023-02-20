import { Slider } from "@mui/material"

function SliderRange({ label, value, setValue }) {

    const handleSliderValueChange = (e) => {
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