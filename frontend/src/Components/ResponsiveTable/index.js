import React, { useEffect, useState } from "react";
import { TableWrapper } from "./StyledComponents";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export default function ResponsiveTable({ tableData }) {
  const [headers, setHeaders] = useState([]);
  console.log(tableData);
  useEffect(() => {
    setHeaders(Object.keys(tableData[0]));
  }, []);
  return (
    <TableWrapper>
      <thead>
        <tr>
          {headers.map((header) => (
            <th className="desktop">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {tableData.map((row, rowIndex) => (
          <tr>
            {headers.map((header) => (
              <td className="mobile-flex" data-header={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}
