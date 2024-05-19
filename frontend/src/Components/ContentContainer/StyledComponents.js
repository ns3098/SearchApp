import styled from "styled-components";
import { Select } from "antd";

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: auto;
  margin: 0;

  .title {
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 40 0;
  }

  .controls-container {
    display: flex;
    width: 100%;
    gap: 20px;
  }

  .responsive-table {
    display: flex;
  }

  .ant-btn {
    height: auto !important;
    width: 10%;
  }

  .search-dropdown-wrapper {
    width: 30%;
  }

  @media screen and (max-width: 640px) {
    .controls-container {
      flex-direction: column;
    }
    .ant-btn,
    .search-dropdown-wrapper {
      width: 100%;
    }
  }
`;

export const StyledSelect =
  /** @type {import('styled-components').ThemedStyledFunction<Select, any, {height?:string, borderColor?:string, disabled?: boolean, small?:boolean, inputHeight?: string }>} */
  (styled(Select))`
    width: 25%;
    height: ${(props) => props.height ?? "auto"};
    .ant-select-selector {
      height: ${(props) => props.height || "2.75rem"} !important;
      padding: ${(props) =>
        props.small ? "0.625rem 0.9375rem" : "0.75rem 0.9375rem "} !important;
      line-height: 1.25rem !important;
      border: 0.071rem solid ${(props) => props.borderColor || "#e2e8f0"} !important;
      border-radius: 4px !important;
      ${(props) => !props.disabled && "background: transparent !important;"}
    }
    .ant-select-arrow {
      color: black;
    }
    .ant-select-selection-search,
    .ant-select-selection-search-input {
      padding: ${(props) =>
        props.inputPadding ?? "0.75rem 0.9375rem"} !important;
    }

    .ant-select-selector .ant-select-selection-search,
    .ant-select-selector
      .ant-select-selection-search
      input.ant-select-selection-search-input {
      ${({ inputHeight }) => inputHeight && `height: ${inputHeight};`}
    }

    .ant-select-selection-item {
      line-height: 1.45 !important;
      color: #334155;
      font-size: 0.875rem;
    }
    .ant-select-selection-placeholder {
      line-height: 1.45 !important;
      font-size: 0.875rem;
    }

    *::after {
      content: "" !important;
    }

    .ant-select-item {
      padding: 0.525rem 0.9375rem !important;
      font-size: 0.875rem;
    }
    .ant-select-arrow {
      right: 1rem;
    }
    &[disabled],
    &[disabled]:hover,
    &[disabled]:focus,
    &[disabled]:active {
      background: #000;
    }
    .ant-select-item-option-grouped {
      ${({ groupedItemPaddingLeft }) =>
        groupedItemPaddingLeft && `padding-left: ${groupedItemPaddingLeft};`}
    }
    @media screen and (max-width: 640px) {
      width: 100%;
    }
  `;
