/* eslint-disable react/prop-types */
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPayrolleeSchema } from '../../lib/validations/payroll-validation';
import { Button } from '../ui/button';
import { useContext } from 'react';
import { DashboardContext } from '../../context/dashboard-context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../ui/use-toast';

/**
 * TODO:
 *
 * - Add loading state to Create button
 * - Clear state and close dialog after creating payrollee
 *
 */

const CreatePayrolleeForm = ({ setOpen }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      walletAddress: '',
      type: '',
      deductions: '',
      salary: '',
    },
    resolver: yupResolver(createPayrolleeSchema),
  });
  const { postData } = useContext(DashboardContext);

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => postData('/employee', payload),
    onSuccess: () => {
      queryClient.invalidateQueries('allPayrollee');
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: 'Uh oh! Error occurred',
        description: error?.response?.data?.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (payrollee) => {
    mutate(payrollee);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Payrollee First Name"
                  invalid={fieldState.invalid}
                  className="font-light"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-extralight text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Payrollee Last Name"
                  invalid={fieldState.invalid}
                  className="font-light"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-extralight text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">Wallet Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Payrollee Wallet Address"
                  invalid={fieldState.invalid}
                  className="font-light"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-extralight text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">Type</FormLabel>
              <FormControl>
                <Select
                  invalid={fieldState.invalid}
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Payroll type"
                      className="font-light"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employees">Employees</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="family">Family & Friends</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="font-extralight text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">
                Payrollee salary (USD)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Payrollee salary"
                  invalid={fieldState.invalid}
                  type="number"
                  disabled={isLoading}
                  className="font-light"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-extralight text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deductions"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">
                Payrollee Deductions (USD)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Payrollee deductions"
                  invalid={fieldState.invalid}
                  type="number"
                  className="font-light"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-extralight text-sm" />
            </FormItem>
          )}
        />

        <Button
          className="w-full h-[48px]"
          loading={isLoading}
          disabled={isLoading}
        >
          Create Payrollee
        </Button>
      </form>
    </Form>
  );
};

export default CreatePayrolleeForm;
