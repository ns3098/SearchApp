import styled from "styled-components";

export const TableWrapper = styled.table`
  border-collapse: collapse;
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 10px;
  }
  thead {
    background-color: #dbdde0;
  }
  @media (max-width: 640px) {
    /* display th for desktop only, hide on mobile */
    .desktop {
      display: none;
    }

    /* arranges td as column in the tr */
    .mobile-flex {
      display: flex;
      width: 90%;
    }

    td {
        margin: auto;
    }

    td:first-child {
        border-top: 1px solid black; 
        border-bottom-width: 0px;
    }
    td:last-child {
        border-top-width: 0px;
        border-bottom: 1px solid black;
    }
    td:not(:first-child):not(:last-child) {
        border-top-width: 0px;
        border-bottom-width: 0px;
    }

    /* adds faux-headers on each td by reading "data-header" attribute of the td*/
    td:before {
      content: attr(data-header);
      display: block;
      font-weight: bold;
      margin-right: 40px;
      max-width: 170px;
      min-width: 170px;
      word-break: break-word;
    }
  }
`;
