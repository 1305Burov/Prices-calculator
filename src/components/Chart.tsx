import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
    isMinValue: boolean,
    paymentAmount: number,
    minColor: string,
}

function Chart({ paymentAmount, isMinValue, minColor }: Props) {
    const theme = useTheme();
    const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));
    
    const graphWidth = isNotMobile ? `${(paymentAmount / 2 * 1)}%` : '20px';
    const graphHeight = isNotMobile ? '20px' : `${(paymentAmount / 2 * 1)}%`;
    
    return (
        <>
            <Box sx={{ width: graphWidth, height: graphHeight, backgroundColor: isMinValue ? minColor : 'gray' }}></Box>
            <span>{paymentAmount}$</span>
        </>
    )
}

export default Chart