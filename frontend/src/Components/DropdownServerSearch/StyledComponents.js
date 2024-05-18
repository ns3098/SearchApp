import { Menu } from 'antd';
import styled from 'styled-components';

export const LoadingContainer = styled(Menu)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height || '10rem'};
  font-size: 2rem;
  background: #fff;
  .ant-empty-footer {
    margin-top: 0.8rem;
    font: normal 400 0.875rem/1.125rem 'Lato';
    color: #64748b;
  }
`;
