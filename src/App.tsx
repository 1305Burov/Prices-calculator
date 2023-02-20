import { Stack, Container, RadioGroup, Radio, FormControl, FormControlLabel } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SliderRange from './components/SliderRange';

import backblazeIcon from './assets/backblaze_icon.png';
import bunnyIcon from './assets/bunny.png';
import vultrIcon from './assets/vultr.png';
import scalewayIcon from './assets/scaleway.svg';
import Chart from './components/Chart';

function App() {
    const theme = useTheme();
    const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));
    
    const [storageValue, setStorageValue] = useState<number>(50);
    const [transferValue, setTransferValue] = useState<number>(50);
    const [minValue, setMinValue] = useState<number | null>(null);
    
    const [bunnyRadio, setBunnyRadio] = useState('hdd');
    const [scalewayRadio, setScalewayRadio] = useState('multi');

    const pricesList = [
        {
            name: 'backblaze',
            storagePrice: 0.005,
            transferPrice: 0.01,
            minPayment: 7,
            maxPayment: 0,
        },
        {
            name: 'bunny',
            storagePrice: bunnyRadio === 'hdd' ? 0.01 : 0.02,
            transferPrice: 0.01,
            minPayment: 0,
            maxPayment: 10,
        },
        {
            name: 'scaleway',
            storagePrice: storageValue > 75 ? scalewayRadio === 'multi' ? 0.06 : 0.03 : 0,
            transferPrice: transferValue > 75 ? 0.02 : 0,
            minPayment: 0,
            maxPayment: 0,
            valueDec: 75
        },
        {
            name: 'vultr',
            storagePrice: 0.01,
            transferPrice: 0.01,
            minPayment: 5,
            maxPayment: 0,
        }
    ]
    
    const getPaymentsAmounts = (pricesList: any) => {
        const amounts: Array<number> = [];
        
        pricesList.map((item: any) => {
            let sum = ((storageValue) * item.storagePrice) + (transferValue * item.transferPrice);
            item.valueDec ? sum = sum - (( (item.valueDec) * item.storagePrice) + (item.valueDec * item.transferPrice) ) : sum;

            const amount = sum < item.minPayment ? item.minPayment : sum > item.maxPayment && item.maxPayment !== 0 ? item.maxPayment : sum;
            amounts.push(+amount.toFixed(2));
        })

        return amounts;
    }
    
    const prices = useMemo(() => (
        getPaymentsAmounts(pricesList)
    ), [storageValue, transferValue, bunnyRadio, scalewayRadio]) 

    useEffect(() => {
        setMinValue(Math.min(...prices))      
    }, [prices])
    
    return (
        <Container >
            <Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} mt={4} spacing={4} justifyContent="center" alignItems='center' >
                    <Box width={'40%'}>
                        Storage = {storageValue} GB
                        <SliderRange label='Storage' value={storageValue} setValue={setStorageValue} />
                    </Box>
                    <Box width={'40%'}>
                        Transfer = {transferValue} GB   
                        <SliderRange label='Transfer' value={transferValue} setValue={setTransferValue} />
                    </Box>
                </Stack>

                <Stack spacing={1} direction={{ xs: 'row', sm: 'column' }} height='400px' mt={2} mb={4} justifyContent={'center'} order={isNotMobile ? '1' : '-1'} >
                    <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent='flex-start' alignItems='center' spacing={2}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent='end' spacing={1} height={isNotMobile ? 'auto' : '120px'} minWidth={isNotMobile ? '200px' : 'auto'}>
                            <span>backblaze</span>
                            <img src={backblazeIcon} alt="backblaze icon" style={{ width: '32px' }} />
                        </Stack>
                            
                        <Chart paymentAmount={prices.length && prices[0]} isMinValue={minValue === prices[0]}  minColor='#D31A2B' />
                    </Stack>

                    <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent='flex-start' alignItems='center' spacing={2} >
                        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent='end' spacing={1} height={isNotMobile ? 'auto' : '120px'} minWidth={isNotMobile ? '200px' : 'auto'}>
                            <Stack alignItems={{ xs: 'center', sm: 'end' }}>
                                <div>bunny</div>
                                <FormControl>
                                    <RadioGroup
                                        defaultValue="hdd"
                                        name="row-radio-buttons-group"
                                        row
                                        onChange={ (e) => setBunnyRadio((e.target as HTMLInputElement).value) }
                                    >
                                        <FormControlLabel value="hdd" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 12, }, }} />} label="hdd" />
                                        <FormControlLabel value="ssd" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 12, }, }} />} label="sdd" />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                            <img src={bunnyIcon} alt="bunny icon" style={{ width: '32px' }} />
                        </Stack>
                    
                        <Chart paymentAmount={prices.length && prices[1]} isMinValue={minValue === prices[1]} minColor='#FFA927' />
                    </Stack>
                    
                    <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent='flex-start' alignItems='center' spacing={2}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent='end' spacing={1} height={isNotMobile ? 'auto' : '120px'} minWidth={isNotMobile ? '200px' : 'auto'}>
                            <Stack alignItems={{ xs: 'center', sm: 'end' }} >
                                <div>scaleway</div>
                                <FormControl>
                                    <RadioGroup
                                        defaultValue="multi"
                                        name="row-radio-buttons-group"
                                        row
                                        onChange={ (e) => setScalewayRadio((e.target as HTMLInputElement).value) }
                                    >
                                        <FormControlLabel value="multi" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 12, }, }} />} label="Multi" />
                                        <FormControlLabel value="Single" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 12, }, }} />} label="Single" />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                            <img src={scalewayIcon} alt="scaleway icon" style={{ width: '32px' }} />
                        </Stack>
                        
                        <Chart paymentAmount={prices.length && prices[2]} isMinValue={minValue === prices[2]} minColor='#4f0599' />
                    </Stack>

                    <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent='flex-start' alignItems='center' spacing={2}> 
                        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent='end' spacing={1} height={isNotMobile ? 'auto' : '120px'} minWidth={isNotMobile ? '200px' : 'auto'}>
                            <span>vultr</span>
                            <img src={vultrIcon} alt="vultr icon" style={{ width: '32px' }} />
                        </Stack>
                        
                        <Chart paymentAmount={prices.length && prices[3]} isMinValue={minValue === prices[3]} minColor='#1668BA' />
                    </Stack>

                </Stack>
            </Stack>
        </Container>
    )
}

export default App
