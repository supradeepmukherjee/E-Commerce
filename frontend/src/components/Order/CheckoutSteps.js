import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import LocalShipping from "@mui/icons-material/LocalShipping";
import Check from "@mui/icons-material/LibraryAddCheck";
import Payment from "@mui/icons-material/Payment";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShipping />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <Check />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <Payment />
        },
    ]
    return (
        <>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                style={{
                    boxSizing: 'border-box',
                    marginTop: '20vh'
                }}
            >
                {steps.map((step, index) => {
                    return (
                        <Step
                            key={index}
                            active={activeStep === index}
                            completed={activeStep >= index}
                        >
                            <StepLabel
                                icon={step.icon}
                                style={{ color: activeStep >= index ? 'tomato' : 'rgba(0,0,0,.65)' }}
                            >
                                {step.label}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </>
    )
}

export default CheckoutSteps