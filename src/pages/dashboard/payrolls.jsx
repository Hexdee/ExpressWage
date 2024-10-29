import { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard-layout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { payrolls } from '../../config/dashboard';
import CreatePayrollForm from '../../components/forms/create-payroll';
import { useNavigate } from 'react-router-dom';

const Payrolls = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="w-full flex gap-6 md:gap-16 flex-wrap px-6 md:py-8">
        {payrolls({ setOpen, navigate }).map((payroll) => (
          <div
            className="border bg-[#FAFAFA] rounded-lg w-[45%] md:w-[29%] md:h-fit py-12 md:py-28 justify-center flex cursor-pointer hover:bg-white"
            key={payroll.name}
            onClick={payroll.onclick}
          >
            <div className="mx-auto w-full text-center px-3 md:px-0">
              <div className="w-full flex justify-center">{payroll.icon}</div>
              <p className="md:mt-1 text-sm md:text-base mt-4">{payroll.name}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add a New Payroll Type</DialogTitle>
            <DialogDescription className="font-extralight">
              Create a new payroll type here.
            </DialogDescription>
          </DialogHeader>
          <CreatePayrollForm />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Payrolls;
