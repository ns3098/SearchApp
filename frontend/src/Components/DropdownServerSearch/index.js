import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Empty, Menu } from 'antd';
import React from 'react';
import InputWithActiveLabel from '../InputWithActiveLabel/InputWithActiveLabel';
import { LoadingContainer } from './StyledComponents';

/**
 *
 * @param {{
 *  options: any,
 *  onMenuItemClick: (obj: object) => void,
 *  visible: boolean,
 *  setVisible: Function,
 *  searchText: string,
 *  setSearchText: Function,
 *  loading: boolean,
 *  onBlur?: Function,
 *  placeholder?: string,
 *  onFocus?: Function,
 *  emptyStateHeight?: string,
 *  emptyStateMessage?: string,
 *  emptyStateSubtext?: *,
 *  overlayStyle?: object
 * }} param0
 * @returns
 */
const DropdownServerSearch = ({
  options,
  onMenuItemClick,
  visible,
  setVisible,
  searchText,
  setSearchText,
  loading,
  onBlur,
  placeholder = '',
  onFocus,
  emptyStateHeight,
  emptyStateMessage,
  emptyStateSubtext,
  overlayStyle,
}) => {
  const menu =
    (loading && !(options?.length > 0)) || !options ? (
      <LoadingContainer>
        <LoadingOutlined />
      </LoadingContainer>
    ) : options?.length === 0 ? (
      <LoadingContainer height={emptyStateHeight}>
        <Empty description={emptyStateMessage || 'No search results'}>
          {emptyStateSubtext}
        </Empty>
      </LoadingContainer>
    ) : (
      <Menu onClick={onMenuItemClick}>
        {options.map((option) => (
          <Menu.Item key={option.key}>{option.label}</Menu.Item>
        ))}
      </Menu>
    );
  return (
    <Dropdown
      menu={menu}
      trigger={['click']}
      // @ts-ignore
      destroyPopupOnHide={true}
      open={visible}
      onOpenChange={(value) => setVisible(value)}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      overlayStyle={overlayStyle}
    >
      <InputWithActiveLabel
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        hideErrorMessage
        prefix={<SearchOutlined style={{ color: '#94A3B8' }} />}
        onBlur={onBlur}
        onFocus={onFocus}
        allowClear
      />
    </Dropdown>
  );
};

export default DropdownServerSearch;
