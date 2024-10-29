/* eslint-disable react-hooks/rules-of-hooks */
import { Briefcase, Contact2, Factory, PlusSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import { ALL_PAYROLLEE_URL, BUSINESS_URL, EMPLOYEE_URL, FAMILY_URL, PAYROLL_URL, TRANSACTIONS_URL } from "./paths";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import PaySinglePayrolleForm from "../components/forms/pay-single-payrolle";
import { useState } from "react";

export const dashboardConfig = {
    sidebarNav: [
      {
        title: 'Payrolls',
        url: PAYROLL_URL,
      },
      {
        title: 'My Payrollees',
        url: ALL_PAYROLLEE_URL,
      },
      {
        title: 'Business Payroll',
        url: BUSINESS_URL,
      },
      {
        title: 'Family & Friends',
        url: FAMILY_URL,
      },  
      {
        title: 'Employees Payroll',
        url: EMPLOYEE_URL,
      },
      {
        title: 'Transaction History',
        url: TRANSACTIONS_URL,
      },
    ],
  };

  export const transactionColumn = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'walletAddress',
      header: 'Wallet Address',
      cell: ({ row }) => `${row.getValue('walletAddress').substring(0, 12)}...`,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        return (
          <Button className={`capitalize text-sm ${status === 'SUCCESS' ? 'bg-background border border-[#16A34A] text-[#16A34A]' : 'bg-background border border-[#B91C1C] text-[#B91C1C]'}`} disabled>{status}</Button>
        )
      }
    },
  ]

  export const allPayrollColumns = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'walletAddress',
      header: 'Wallet Address',
      cell: ({ row }) => `${row.getValue('walletAddress').substring(0, 12)}...`,
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'salary',
      header: 'Salary'
    },
    {
      accessorKey: 'deductions',
      header: 'Deductions',
    },
    {
      accessorKey: 'lastPaid',
      header: 'Last Paid',
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button className="bg-background text-primary text-sm font-light border border-slate-200 hover:bg-slate-50">Pay user</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Pay Individual User</DialogTitle>
            <DialogDescription className="font-extralight">
              Confirm how much you want to pay {`${row.getValue("firstName")} ${row.getValue("lastName")}`}
            </DialogDescription>
          </DialogHeader>
           <PaySinglePayrolleForm selectedPayrollee={row.original} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
      )
      }
    },
  ];

  export const allPayrolls = [
    {
      firstName: 'Temitope',
      lastName: 'Moses',
      walletAddress: 'xv023hjslsowndkdo332mndkd',
      type: 'Business',
      deductions: '5 USDC',
      interval: 'Monthly',
      salary: '10 USDC'
    },
    {
      firstName: 'Hexdee',
      lastName: 'Hex',
      walletAddress: 'xv023hjslsowndkdo332mndkd',
      type: 'Business',
      deductions: '2 USDC',
      interval: 'Weekly',
      salary: '10 USDC'
    },
    {
      firstName: 'Papi',
      lastName: 'Chuks',
      walletAddress: 'xv023hjslsowndkdo332mndkd',
      type: 'Business',
      deductions: '2 USDC',
      interval: 'Fortnight',
      salary: '10 USDC'
    },
    {
      firstName: 'Temitope',
      lastName: 'Moses',
      walletAddress: 'xv023hjslsowndkdo332mndkd',
      type: 'Business',
      deductions: '5 USDC',
      interval: 'Monthly',
      salary: '10 USDC'
    },
    {
      firstName: 'Hexdee',
      lastName: 'Hex',
      walletAddress: 'xv023hjslsowndkdo332mndkd',
      type: 'Business',
      deductions: '2 USDC',
      interval: 'Weekly',
      salary: '10 USDC'
    },
    {
      firstName: 'Papi',
      lastName: 'Chuks',
      walletAddress: 'xv023hjslsowndkdo332mndkd',
      type: 'Business',
      deductions: '2 USDC',
      interval: 'Fortnight',
      salary: '10 USDC'
    },
    {
      firstName: 'Temitope',
      lastName: 'Moses',
      walletAddress: 'xv023hjslsowndkdo332mndkd',
      type: 'Business',
      deductions: '5 USDC',
      interval: 'Monthly',
      salary: '10 USDC'
    }
  ]

  export const payrolls = ({ setOpen, navigate }) => [
    {
        id: 0,
        name: 'Business Payroll',
        href: BUSINESS_URL,
        icon: <Factory />,
        onclick: () => navigate(BUSINESS_URL),
    },
    {
        id: 1,
        name: 'Family & Friends Payroll',
        href: FAMILY_URL,
        icon: <Contact2 />,
        onclick: () => navigate(FAMILY_URL),
    },
    {
        id: 2,
        name: 'Employees Payroll',
        href: EMPLOYEE_URL,
        icon: <Briefcase />,
        onclick: () => navigate(EMPLOYEE_URL),
    },
    {
        id: 3,
        name: 'Add New payroll',
        href: setOpen,
        icon: <PlusSquare />,
        onclick: () => setOpen(true),
    },
];

export const transactions = [
  {
    firstName: 'Temitope',
    lastName: 'Moses',
    walletAddress: 'xv023hjslsowndkdo332mndkd',
    amount: '5000',
    status: 'success'
  },
  {
    firstName: 'Jaguar',
    lastName: 'jag',
    walletAddress: 'xv023hjslsowndkdo332mndkd',
    amount: '3500',
    status: 'fail'
  },
  {
    firstName: 'Hexdee',
    lastName: 'Papi',
    walletAddress: 'xv023hjslsowndkdo332mndkd',
    amount: '5000',
    status: 'success'
  },
]