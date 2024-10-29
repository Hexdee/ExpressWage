/* eslint-disable react/prop-types */
import { DOTS, usePagination } from '../hooks/usePagination';

import { Button } from './ui/button';

import { cn } from '../lib/utils';

const CustomPagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 1) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <div className="flex items-center justify-between space-x-2 py-4 px-4 border-t w-full">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="text-sm lg:text-base font-extralight"
      >
        Previous
      </Button>

      <div className="flex items-center">
        {paginationRange.map((pageNumber) => {
          // Render our Page Pills
          return (
            <button
              key={pageNumber}
              className={cn(
                'px-1 lg:px-4 lg:py-2 text-[12px] lg:text-sm',
                pageNumber === currentPage
                  ? 'active bg-[#FEF2C0] rounded-sm lg:rounded-lg'
                  : 'text-grey-500'
              )}
              onClick={() =>
                pageNumber === DOTS ? null : onPageChange(pageNumber)
              }
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={currentPage === lastPage}
        className="text-sm lg:text-base font-extralight"
      >
        Next
      </Button>
    </div>
  );
};

export default CustomPagination;
