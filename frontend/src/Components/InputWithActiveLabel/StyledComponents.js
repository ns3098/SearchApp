import styled from 'styled-components';
import { Input as AntInput } from 'antd';

export const StyledWrapper = styled.div`
  /* margin-bottom: 1rem; */
  position: relative;
  width: ${(props) => (props.width ? props.width : '100%')};
  .error-message {
    font-size: 0.75rem;
    min-height: 0.5rem;
    color: #b84930;
  }
  .success-message {
    font-size: 0.75rem;
    min-height: 0.5rem;
    color: #059669;
  }
  .tooltip {
    position: absolute;
    background: #43435f;
    color: #fff;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    right: -9.5rem;
    top: 2rem;
    border-radius: 4px;
  }
`;

export const StyledLabel = styled.div`
  font: normal normal 400 0.875rem/1.28 'Lato';
  color: ${(props) => (props.active ? '#786AFF' : '#64748B')};
  margin-bottom: 0.5rem;
  opacity: 1;
  color: #64748b;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  @media (max-width: 800px) {
    color: #64748b;
    font-family: Inter;
    font-size: 0.87rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 0.75rem;
  }
`;

export const StyledInput = styled(AntInput)`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: auto;
  background: #ffffff 0% 0% no-repeat;
  border: ${({ bottomBorder }) =>
    bottomBorder ? 0 : '0.071rem solid #e2e8f0'};
  border-bottom: ${({ bottomBorder }) =>
    bottomBorder && '0.071rem solid #e2e8f0'};
  border-radius: ${({ bottomBorder }) => (bottomBorder ? 0 : '0.286rem')};
  padding: 0.75rem 0.9375rem;
  font: normal normal 700 0.875rem/1.25 'Lato';
  color: #334155;
  background: transparent;
  /* border-color: ${(props) =>
    props.errorMessage ? '#B84930' : '#e2e8f0'}; */
  &::placeholder {
    color: #94a3b8;
  }
  &:hover,
  :focus,
  :active {
    //SET hover styling
    //Ask for design
  }
  /* .ant-input {
    font-size: 0.875rem;
    line-height: 1.25;
  } */
`;