"use client";

import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { NumberInput, Stack, Select, Group, Button, Text } from '@mantine/core';
import { CalculatorValues, PaymentFrequency } from '../types/calculatorTypes';
import { calculateCompoundInterest } from '../util/calculatorService';

const initialValues = {
    depositAmount: 10000,
    interestRate: 0.25,
    investmentTermInYears: 3,
    investmentTermInMonths: 0,
    paymentFrequency: undefined,
};

const Calculator = () => {
    const form = useForm({ 
        initialValues,
        validate: {
            depositAmount: (value) => value > 0 ? null : 'Deposit amount must be greater than 0',
            interestRate: (value) => value >= 0 && value <= 15 ? null : 'Interest rate must be between 0 and 15%',
            investmentTermInYears: (value) => value >= 0 && value <= 5 ? null : 'Investment term in years must be between 0 and 5',
            investmentTermInMonths: (value) => value >= 0 && value <= 12 ? null : 'Investment term in months must be between 0 and 12',
            paymentFrequency: (value) => value ? null : 'Payment frequency is required',
        }
    });
    const [result, setResult] = useState<number | null>(null);

    const handleSubmit = (values: CalculatorValues) => {
        const result = calculateCompoundInterest(values);
        setResult(result);
    };

    return (
        <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <NumberInput 
                        withAsterisk 
                        label="Start deposit amount" 
                        thousandSeparator 
                        prefix="$" 
                        key={form.key('depositAmount')}
                        {...form.getInputProps('depositAmount')}
                    />
                    <NumberInput 
                        withAsterisk 
                        label="Interest rate" 
                        suffix="%" 
                        max={15.00} 
                        key={form.key('interestRate')}
                        {...form.getInputProps('interestRate')}
                    />
                    <Group grow>
                        <NumberInput 
                            withAsterisk 
                            label="Investment term in years" 
                            max={5}
                            key={form.key('investmentTermInYears')}
                            {...form.getInputProps('investmentTermInYears')}
                        />
                        <NumberInput 
                            withAsterisk 
                            label="Investment term in months" 
                            max={12}
                            key={form.key('investmentTermInMonths')}
                            {...form.getInputProps('investmentTermInMonths')}
                        />
                    </Group>
                    <Select
                        label="Select Payment Frequency"
                        placeholder="Choose one"
                        withAsterisk
                        data={Object.values(PaymentFrequency).map((frequency) => ({
                            value: frequency,
                            label: frequency,
                        }))}
                        key={form.key('paymentFrequency')}
                        {...form.getInputProps('paymentFrequency')}
                    />
                    <Button type="submit" color="red">
                        Calculate
                    </Button>
                </Stack>
            </form>

            {result !== null && (
                <Stack mt="lg">
                    <Text size="xl">
                        Based on our calculations, your balance will be <b>${result.toFixed(0)}</b>.
                    </Text>
                </Stack>
            )}
        </>
    );
};

export default Calculator;
