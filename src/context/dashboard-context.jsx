/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { useAccount, useConnect, usePublicClient, useWalletClient } from 'wagmi';
import { fetchBalance, fetchToken } from '@wagmi/core';
import { getContract, parseEther } from 'viem';
import instance from '../lib/axios-instance';
import { useToast } from '../components/ui/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { celo } from "viem/chains";

export const DashboardContext = createContext({});
const payMultipleAddress = '0xd086dAB59F3d183b77c14E6FbbacC421adCD1634';
const cUSDMainnet = '0x765de816845861e75a25fca122bb6898b8b1282a';

export const erc20Abi = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'Transfer',
    type: 'event',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      { indexed: true, name: 'to', type: 'address' },
      {
        indexed: true,
        name: 'tokenId',
        type: 'uint256',
      },
    ],
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const DashboardProvider = ({ children }) => {
  const { toast } = useToast();
//   const [payrollees, setPayrollees] = useState(null);
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();

  const {address, isConnected} = useAccount();

  const { connect} = useConnect({
      connector: new InjectedConnector({chains: [celo], options: {shimDisconnect: false}}),
  });

  
  useEffect(() => {
    connect();
  }, []);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['allPayrollee'],
    queryFn: () => fetchData('/employees'),
    enabled: isConnected,
    keepPreviousData: true,
  });

  const { data: history, isError: isHistoryError, error: historyError, isLoading: historyLoading } = useQuery({
    queryKey: ['allTransactions'],
    queryFn: () => fetchData('/transactions'),
    enabled: isConnected,
    keepPreviousData: true,
  });

  const payrollees = data?.data?.map((payrollee) => ({
    ...payrollee,
    lastPaid:
      payrollee.lastPaid === null
        ? '-'
        : new Date(payrollee.lastPaid).toLocaleDateString('en-Gb', {
            dateStyle: 'long',
          }),
  })) || [];

  const trxHistory = history?.data;

  // useEffect(() => {
  //   if (isError) {
  //     toast({
  //       title: 'Uh oh! Error occurred',
  //       description: error?.response?.data?.message,
  //       variant: 'destructive',
  //     });
  //   }
  // }, [isError]);

  const fetchData = async (endpoint) => {
    return instance.get(`${endpoint}?signature=${address}`);
  };

  const postData = async (endpoint, data) => {
    data.signature = address;
    return instance.post(endpoint, data);
  };

  const putData = async (endpoint, data) => {
    data.signature = address;
    const response = await fetch(
      `${process.env.VITE_REACT_APP_BASE_URL}${endpoint}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('PUT Request Response:', data);
    } else {
      console.error('Error :', response.statusText);
    }
  };

  // const getPayrollees = async() => {
  //     try {
  //         const _parollees = await fetchData('/employees');
  //         // console.log({_parollee: _parollees}); //
  //         setPayrollees(
  //             _parollees.map((payrollee) => {
  //                 payrollee.lastPaid = new Date(payrollee.lastPaid).toLocaleDateString('en-Gb', {dateStyle: 'long'});
  //                 return payrollee;
  //             })
  //         );
  //     } catch (error) {
  //         console.error('Error:', error);
  //     }
  // }

  // const addPayrollee = (payrollee) => {
  //     postData('/employee', payrollee)
  // }

  const payUser = async (payrollee, setLoading, setOpen) => {
    try {
      setLoading(true);
      const balance = fetchBalance({ address: address, token: cUSDMainnet });
      if (payrollee.salary > balance) {
        toast({
          title: 'Uh oh! Error occurred',
          description: 'Not enough balance!',
          variant: 'destructive',
        });
        setLoading(false);
        return false;
      }
      const contract = getContract({
        abi: erc20Abi,
        address: cUSDMainnet,
        publicClient,
        walletClient,
      });
      const amount = parseEther(
        (payrollee.salary - payrollee.deductions).toString()
      );
      const hash = await contract.write.transfer([
        payrollee.walletAddress,
        amount,
      ]);
      payrollee.lastPaid = new Date().toISOString();
      updatePayrolleeLastPaid(payrollee);
      await publicClient.waitForTransactionReceipt({ hash });
      toast({
        title: 'Holla 🎉',
        description: `Money on it's way to ${payrollee.firstName}`,
      });
      setLoading(false);
      setOpen(false);
      return true;
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      setOpen(false);
      return false;
    }
  };

  const payAllUsers = async () => {
    try {
      // Implement
    } catch (error) {
      console.error({ error });
    }
  };

  const updatePayrolleeLastPaid = async (payrollee) => {
    try {
      await postData(`/employee/paid/${payrollee._id}`, payrollee);
      queryClient.invalidateQueries('allPayrollee');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const updatePayrollee = async(payrollee) => {
  //     try {
  //         await putData(`/employee/${payrollee._id}`, payrollee);
  //         getPayrollees();
  //     } catch (error) {
  //         console.error('Error:', error);
  //     }
  // }

  const value = { payUser, postData, fetchData, payrollees, isLoading, trxHistory, historyLoading };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
