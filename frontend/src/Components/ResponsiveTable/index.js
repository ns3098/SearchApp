import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export default function ResponsiveTable({ tableData }) {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  console.log(tableData);
  useEffect(() => {
    console.log(Object.keys(tableData[0]), "uoo");
    setHeaders(Object.keys(tableData[0]));
  }, []);
  return (
    <Table>
      <Thead>
        <Tr>
          {headers.map((header) => (
            <Th>{header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {tableData.map((row, rowIndex) => (
          <Tr>
            {headers.map((header) => (
              <Td>{row[header]}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
