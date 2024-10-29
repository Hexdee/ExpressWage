/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from 'react';
import DataTable from '../../components/data-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import DashboardLayout from '../../components/layouts/dashboard-layout';
import { allPayrollColumns } from '../../config/dashboard';
import { Button } from '../../components/ui/button';
import CreatePayrolleeForm from '../../components/forms/create-payrollee';
import { DashboardContext } from '../../context/dashboard-context';
import { Loader2 } from 'lucide-react';

const AllPayrollee = () => {
  const { payrollees, isLoading } = useContext(DashboardContext);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <DashboardLayout>
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white my-2 hover:bg-primary">
              Add Payrollee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add a new Payrollee</DialogTitle>
              <DialogDescription className="font-extralight">
                Create a new payroll user here with their valid credentials.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[80vh] overflow-scroll px-2">
              <CreatePayrolleeForm setOpen={setOpen} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <div className="flex w-full h-[70vh] justify-center items-center">
          <Loader2 className="mr-2 h-20 w-20 animate-spin" />{' '}
        </div>
      ) : (
        <DataTable
          columns={allPayrollColumns || []}
          data={payrollees}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={1}
          dataLength={1}
        />
      )}
    </DashboardLayout>
  );
};

export default AllPayrollee;
