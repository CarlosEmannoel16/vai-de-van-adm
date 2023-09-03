import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const Paginations = ({ pageCurrent, totalPages, callback }) => {
  const getNextPage = (page) => {
    callback(page);
  };

  const generatePagination = () => {
    for (let i = 1; i <= totalPages; i++) {
      return (
        <PaginationItem onClick={getNextPage(i)}>
          <PaginationLink first={pageCurrent === i} href="#">
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  };

  return (
    <>
      <Pagination>
        <PaginationItem>
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" previous />
        </PaginationItem>
        {generatePagination()}
        <PaginationItem>
          <PaginationLink href="#" next />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" last />
        </PaginationItem>
      </Pagination>
    </>
  );
};
