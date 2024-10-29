import * as yup from 'yup';

export const createPayrollSchema = yup.object({
    payrollName: yup
    .string()
    .required('Payroll name is required')
    .min(3, 'Payroll name should be at least 2 characters')
    .max(50, 'Payroll name should not exceed 50 characters'),
    payrollDescription: yup
    .string()
    .required('Payroll description is required')
    .min(3, 'Payroll description should be at least 2 characters')
    .max(200, 'Payroll description should not exceed 200 characters'),
    payrollInterval: yup
    .string()
    .required('Payroll interval is required')
});

export const createPayrolleeSchema = yup.object({
    firstName: yup
    .string()
    .required('First name is required')
    .min(3, 'First name should be at least 2 characters')
    .max(50, 'First name should not exceed 50 characters'),
    lastName: yup
    .string()
    .required('Last name is required')
    .min(3, 'Last name should be at least 2 characters')
    .max(50, 'Last name should not exceed 50 characters'),
    walletAddress: yup
    .string()
    .required('Wallet address is required')
    .min(3, 'Wallet address should be at least 2 characters')
    .max(50, 'Wallet address should not exceed 48 characters'),
    type: yup
    .string()
    .required('Payroll type is required'),
    salary: yup
    .string()
    .required('Payroll salary is required'),
    deductions: yup
    .string()
    .required('Payroll deduction is required'),
});
