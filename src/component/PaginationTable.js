import React, { useMemo } from "react";
import columnData from "../utils/MOCK_DATA.json";
import { tableColumns, groupHeader } from "../utils/tableUtils/columns";
import { useTable, usePagination } from "react-table";
import "./tableStyle.css";

const PaginationTable = () => {
  const columns = useMemo(() => groupHeader, []);
  const data = useMemo(() => columnData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    rows,
    page,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getHeaderGroupProps()}>
              {footerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Footer")}</th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="globalSearch">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <span>
          | Page Size:
          <select
            value={pageSize}
            className="pageSelection"
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 15, 20, 25].map((pageNumber) => {
              return <option value={pageNumber}>Show {pageNumber}</option>;
            })}
          </select>
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<First"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {"Last>>"}
        </button>
      </div>
    </>
  );
};

export default PaginationTable;
