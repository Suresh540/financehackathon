import React, { useState } from 'react';
import { useTable } from "react-table";
import "./Table.css";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <td key={col.Header}>{col.Header}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          console.log(item)
        ))
        }
      </tbody>
    </table>
  );
};

export default Table;