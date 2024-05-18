import React, { useState, useEffect, useMemo, useCallback } from "react";
import { StyledSelect } from "./StyledComponents";
import DropdownServerSearch from "../DropdownServerSearch";
import { useGetRequest } from "../../utils/hooks/useGetRequest";
import { useDebouncedEffect } from "../../utils/hooks/useDebouncedEffect";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ResponsiveTable from "../ResponsiveTable";
import { ContentWrapper } from "./StyledComponents";
import { DROPDOWN_OPTIONS_URL, getTableUrl } from "../../utils/constants";
import { sendGetRequest } from '../../utils/utils'

const ContentContainer = () => {
  const [dropdownState, setDropDownState] = useState("");
  const [ddOptions, setDdOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSearchList, setShowSearchList] = useState(false);
  const [searchResult, setSearchResult] = useState(undefined);
  const [tableData, setTableData] = useState(undefined);

  const [
    getSearchResult,
    { response: searchResponse, loading: searchingCampaigns },
  ] = useGetRequest("campaigns/searchV2", false);

  useEffect(() => {
    if (searchResponse?.searchCampaign) {
      setSearchResult(searchResponse.searchCampaign);
    }
  }, [searchResponse]);

  useEffect(() => {
    sendGetRequest(DROPDOWN_OPTIONS_URL, (response) => setDdOptions(
      response.data?.data.map((item) => {
        return { label: item, value: item };
      })
    ));
  }, []);

  useDebouncedEffect(
    () => {
      if (searchText.length > 2) {
        getSearchResult({
          params: {
            name: encodeURIComponent(searchText.toLowerCase()),
          },
        });
      }
    },
    [searchText],
    500
  );

  useEffect(() => {
    if (searchText.length > 4) {
      setShowSearchList(true);
    } else {
      setShowSearchList(false);
      setSearchResult(undefined);
    }
  }, [searchText]);

  const dropdownOptions = useMemo(() => {
    return searchResult?.map((searchedCamp) => ({
      label: <div className="search-result"></div>,
      key: searchedCamp.id,
    }));
  }, [searchResult]);

  const updateShowSearchList = useCallback(() => {
    if (searchText.length > 4) setShowSearchList(true);
  }, [searchText]);
  return (
    <ContentWrapper>
      <div className="title">
        <h1>Search App</h1>
      </div>
      <div className="controls-container">
        <StyledSelect
          height="3rem"
          placeholder="Select status"
          options={ddOptions}
          value={dropdownState}
          onChange={(value) => setDropDownState(value)}
        />
        <div className="search-dropdown-wrapper">
          <DropdownServerSearch
            visible={showSearchList}
            setVisible={updateShowSearchList}
            options={dropdownOptions}
            loading={searchingCampaigns}
            searchText={searchText}
            setSearchText={setSearchText}
            onMenuItemClick={() => {}}
            placeholder="Search 1"
            emptyStateMessage="No results found"
            emptyStateHeight="14rem"
            overlayStyle={{
              maxWidth: 0,
              zIndex: 100,
            }}
          />
        </div>
        <div className="search-dropdown-wrapper">
          <DropdownServerSearch
            visible={showSearchList}
            setVisible={updateShowSearchList}
            options={dropdownOptions}
            loading={searchingCampaigns}
            searchText={searchText}
            setSearchText={setSearchText}
            onMenuItemClick={() => {}}
            placeholder="Search 1"
            emptyStateMessage="No results found"
            emptyStateHeight="14rem"
            overlayStyle={{
              maxWidth: 0,
              zIndex: 100,
            }}
          />
        </div>
        <Button
          type="primary"
          size="large"
          styles="background-color:red;"
          icon={<SearchOutlined />}
          onClick={() => sendGetRequest(getTableUrl(), (response) => setTableData(response.data?.data))}
        >
          Search
        </Button>
      </div>
      {tableData && <div className="responsive-table">
        <ResponsiveTable tableData={tableData}/>
      </div>}
    </ContentWrapper>
  );
};

export default ContentContainer;
