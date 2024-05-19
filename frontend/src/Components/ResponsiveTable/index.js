import React, { useEffect, useState } from "react";
import { TableWrapper } from "./StyledComponents";

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
          {headers.map((header, index) => (
            <th className="desktop" key={`header${index}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {tableData.map((row, rowIndex) => (
          <tr key={`table_row${rowIndex}`}>
            {headers.map((header, index) => (
              <td key={`table_data${rowIndex}${index}`} className="mobile-flex" data-header={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}
