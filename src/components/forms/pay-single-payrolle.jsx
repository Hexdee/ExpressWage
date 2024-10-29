/* eslint-disable react/prop-types */
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPayrolleeSchema } from "../../lib/validations/payroll-validation";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { DashboardContext } from "../../context/dashboard-context";

/**
 * TODO: 
 * 
 * - Add loading state to Pay Now button
 * - Clear state and close dialog after creating payrollee
 * 
 */

const PaySinglePayrolleForm = ({ selectedPayrollee, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      firstName: selectedPayrollee.firstName,
      lastName: selectedPayrollee.lastName,
      walletAddress: selectedPayrollee.walletAddress,
      type: selectedPayrollee.type,
      deductions: selectedPayrollee.deductions,
      salary: selectedPayrollee.salary,
    },
    resolver: yupResolver(createPayrolleeSchema),
  });
  const {payUser} = useContext(DashboardContext);
  // console.log(selectedPayrollee, '');

  const onSubmit = async () => {
    const res = await payUser(selectedPayrollee, setLoading, setOpen);
    // console.log({res});
  };

  console.log(loading, '--> loading');

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
                  disabled
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
                  disabled
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
                  disabled
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
                <Select invalid={fieldState.invalid} {...field} onValueChange={field.onChange} defaultValue={field.value} disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field.value} className="font-light" />
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
              <FormLabel className="text-black">Payrollee salary (USD)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Payrollee salary"
                  invalid={fieldState.invalid}
                  type="number"
                  className="font-light"
                  disabled
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
              <FormLabel className="text-black">Payrollee Deductions (USD)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Payrollee deductions"
                  invalid={fieldState.invalid}
                  type="number"
                  className="font-light"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-extralight text-sm" />
            </FormItem>
          )}
        />

        <Button className="w-full h-[48px]" disabled={loading} loading={loading} loadingText="Initiating payment...">Pay now</Button>
      </form>
    </Form>
  );
};

export default PaySinglePayrolleForm;
