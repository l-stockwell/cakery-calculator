export interface CalculatorValues {
    depositAmount: number;
    interestRate: number;
    investmentTermInYears: number;
    investmentTermInMonths: number;
    paymentFrequency: PaymentFrequency | undefined;
}

export enum PaymentFrequency {
    MONTHLY = 'Monthly',
    QUARTERLY = 'Quarterly',
    ANNUALLY = 'Annually',
    AT_MATURITY = 'At Maturity',
}