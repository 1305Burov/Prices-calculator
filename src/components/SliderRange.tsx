import { Slider } from "@mui/material"

type Props = {
    label: string,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
}

function SliderRange({ label, value, setValue }: Props) {

    const handleSliderValueChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
      };

    return (
        <Slider
            defaultValue={0}
            color="primary"
            step={1} 
            min={0} 
            max={1000}
            value={value}
            onChange={handleSliderValueChange}
        />  
    )
}

export default SliderRange