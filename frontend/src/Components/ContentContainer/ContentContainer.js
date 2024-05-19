import React, { useState, useEffect, useMemo, useCallback } from "react";
import { StyledSelect } from "./StyledComponents";
import DropdownServerSearch from "../DropdownServerSearch";
import { useGetRequest } from "../../utils/hooks/useGetRequest";
import { useDebouncedEffect } from "../../utils/hooks/useDebouncedEffect";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ResponsiveTable from "../ResponsiveTable";
import { ContentWrapper } from "./StyledComponents";
import {
  DROPDOWN_OPTIONS_URL,
  getNameTableUrl,
  getEpicTableUrl,
} from "../../utils/constants";
import { sendGetRequest } from "../../utils/utils";
import { Pagination } from "antd";

const ContentContainer = () => {
  const [dropdownState, setDropDownState] = useState("");
  const [ddOptions, setDdOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchText1, setSearchText1] = useState("");
  const [showSearchList, setShowSearchList] = useState(false);
  const [searchResult, setSearchResult] = useState(undefined);
  const [tableData, setTableData] = useState(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(15);
  const [pageSize, setPageSize] = useState(5);

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
    sendGetRequest(DROPDOWN_OPTIONS_URL, (response) => {
      const r = response.data?.data[0];
      setDdOptions(
        response.data?.data.map((item) => {
          return { label: item, value: item };
        })
      );
      setDropDownState(r);
    });
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

  const getSearchResultOnClick = () => {
    sendGetRequest(
      "https://searchapp-kyye.onrender.com/api/v1/fetch_epic_details/?assembly=Thane&text=xce&page=3&page_size=10",
      (response) => setTableData(response.data?.data)
    );
    // if (searchText.length > 0) {
    //   sendGetRequest(
    //     getEpicTableUrl(dropdownState, searchText, currentPage, pageSize),
    //     (response) => setTableData(response.data?.data)
    //   );
    // } else if (searchText1.length > 0) {
    //   sendGetRequest(
    //     getNameTableUrl(dropdownState, searchText1, currentPage, pageSize),
    //     (response) => setTableData(response.data?.data)
    //   );
    // }
  };

  const onPaginationChange = (page, pgSize) => {
    setCurrentPage(page);
    setPageSize(pgSize);
  };

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
            placeholder="Enter EPIC ID"
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
            searchText={searchText1}
            setSearchText={setSearchText1}
            onMenuItemClick={() => {}}
            placeholder="Enter Name"
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
          onClick={() => getSearchResultOnClick()}
        >
          Search
        </Button>
      </div>
      {tableData && (
        <>
          <div className="responsive-table">
            <ResponsiveTable tableData={tableData} />
          </div>
          <Pagination
            style={{ margin: "10px auto 30px auto" }}
            current={currentPage}
            defaultCurrent={currentPage}
            total={totalPages}
            pageSize={pageSize}
            pageSizeOptions={[15, 30, 40]}
            onChange={onPaginationChange}
            onShowSizeChange={onPaginationChange}
          />
        </>
      )}
    </ContentWrapper>
  );
};

export default ContentContainer;
