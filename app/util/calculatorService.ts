import { CalculatorValues, PaymentFrequency } from "../types/calculatorTypes";

/**
 * Calculates compound interest based on input values.
 * 
 * Formula: A = P(1 + r/n)^(nt)
 * Where:
 * - P is the deposit amount (principal)
 * - r is the interest rate (decimal)
 * - n is the number of compounding periods per year
 * - t is the time in years
 *
 * @param {CalculatorValues} values - Input values include interest rate, investment term, frequency, and deposit amount.
 * @returns {number} - The calculated compound interest.
 */
export function calculateCompoundInterest(values: CalculatorValues): number {
    const { interestRate, investmentTermInYears, investmentTermInMonths, paymentFrequency, depositAmount } = values;

    const rate = interestRate / 100; // Convert interest rate to decimal
    const totalMonths = (investmentTermInYears * 12) + investmentTermInMonths; // Total term in months
    const periodsPerYear = getCompoundingPeriods(paymentFrequency); // Compounding periods per year
    const totalPeriods = totalMonths * (periodsPerYear / 12); // Total compounding periods

    return depositAmount * Math.pow((1 + (rate / periodsPerYear)), totalPeriods); // Apply compound interest formula
}

/**
 * Determines the number of compounding periods per year based on payment frequency.
 * 
 * @param {PaymentFrequency} [paymentFrequency] - Monthly, quarterly, annually or at maturity.
 * @returns {number} - The number of compounding periods per year.
 */
function getCompoundingPeriods(paymentFrequency?: PaymentFrequency): number {
    switch (paymentFrequency) {
        case PaymentFrequency.MONTHLY:
            return 12;
        case PaymentFrequency.QUARTERLY:
            return 4;
        case PaymentFrequency.ANNUALLY:
        case PaymentFrequency.AT_MATURITY:
            return 1;
        default:
            throw new Error('Invalid payment frequency');
    }
}
