import { useContext, useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard-layout';
import DataTable from '../../components/data-table';
import { transactionColumn } from '../../config/dashboard';
import { DashboardContext } from '../../context/dashboard-context';
import { Loader2 } from 'lucide-react';

const TransactionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { trxHistory, historyLoading } = useContext(DashboardContext);
  console.log(trxHistory, '-->');
  return (
    <DashboardLayout>
      {historyLoading ? (
        <div className="flex w-full h-[70vh] justify-center items-center">
          <Loader2 className="mr-2 h-20 w-20 animate-spin" />
        </div>
      ) : (
        <DataTable
          columns={transactionColumn}
          data={trxHistory}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={1}
          dataLength={1}
        />
      )}
    </DashboardLayout>
  );
};

export default TransactionsPage;
