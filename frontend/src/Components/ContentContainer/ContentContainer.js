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
  getTotalPagesEpicUrl,
  getTotalPagesNameUrl,
} from "../../utils/constants";
import { sendGetRequest } from "../../utils/utils";
import { Pagination } from "antd";

const ContentContainer = () => {
  const [dropdownState, setDropDownState] = useState("");
  const [ddOptions, setDdOptions] = useState([]);

  const [searchEpidIdText, setSearchEpicIdText] = useState("");
  const [showEpidIdSearchList, setShowEpicIdSearchList] = useState(false);
  const [searchEpicIdResult, setSearchEpidIdResult] = useState(undefined);

  const [searchNameText, setSearchNameText] = useState("");
  const [showNameSearchList, setShowNameSearchList] = useState(false);
  const [searchNameResult, setSearchNameResult] = useState(undefined);

  const [tableData, setTableData] = useState(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(25);
  const [pageSize, setPageSize] = useState(25);
  const showTotal = (totalPages) => `Total ${totalPages} records`;

  const [
    getSearchResult,
    { response: searchResponse, loading: searchingCampaigns },
  ] = useGetRequest("campaigns/searchV2", false);

  useEffect(() => {
    if (searchResponse?.searchCampaign) {
      setSearchEpidIdResult(searchResponse.searchCampaign);
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
      if (searchEpidIdText.length > 4) {
        getSearchResult({
          params: {
            name: encodeURIComponent(searchEpidIdText.toLowerCase()),
          },
        });
      }
    },
    [searchEpidIdText],
    500
  );

  useEffect(() => {
    if (searchEpidIdText.length > 4) {
      setShowEpicIdSearchList(true);
    } else {
      setShowEpicIdSearchList(false);
      setSearchEpidIdResult(undefined);
    }
  }, [searchEpidIdText]);

  useEffect(() => {
    if (searchEpidIdText.length > 4) {
      setShowNameSearchList(true);
    } else {
      setShowNameSearchList(false);
      setSearchNameResult(undefined);
    }
  }, [searchEpidIdText]);

  const dropdownOptions = useMemo(() => {
    return searchEpicIdResult?.map((searchedCamp) => ({
      label: <div className="search-result"></div>,
      key: searchedCamp.id,
    }));
  }, [searchEpicIdResult]);

  const getSearchResultOnClick = () => {
    if (searchEpidIdText.length > 0) {
      sendGetRequest(
        getEpicTableUrl(dropdownState, searchEpidIdText, currentPage, pageSize),
        (response) => setTableData(response.data?.data)
      );
      sendGetRequest(
        getTotalPagesEpicUrl(dropdownState, searchEpidIdText),
        (response) => setTotalPages(response.data?.data)
      );
    } else if (searchNameText.length > 0) {
      sendGetRequest(
        getNameTableUrl(dropdownState, searchNameText, currentPage, pageSize),
        (response) => setTableData(response.data?.data)
      );
      sendGetRequest(
        getTotalPagesNameUrl(dropdownState, searchEpidIdText),
        (response) => setTotalPages(response.data?.data)
      );
    }
  };

  const onPaginationChange = (page, pgSize) => {
    setCurrentPage(page);
    setPageSize(pgSize);
    sendGetRequest(
      getEpicTableUrl(dropdownState, searchEpidIdText, currentPage, pageSize),
      (response) => setTableData(response.data?.data)
    );
  };

  const updateShowEpicIdSearchList = useCallback(() => {
    if (searchEpidIdText.length > 4) setShowEpicIdSearchList(true);
  }, [searchEpidIdText]);
  const updateShowNameSearchList = useCallback(() => {
    if (searchNameText.length > 4) setShowNameSearchList(true);
  }, [searchNameText]);

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
            visible={showEpidIdSearchList}
            setVisible={updateShowEpicIdSearchList}
            options={dropdownOptions}
            loading={searchingCampaigns}
            searchText={searchEpidIdText}
            setSearchText={setSearchEpicIdText}
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
            visible={showNameSearchList}
            setVisible={updateShowNameSearchList}
            options={dropdownOptions}
            loading={searchingCampaigns}
            searchText={searchNameText}
            setSearchText={setSearchNameText}
            onMenuItemClick={(cal) => {}}
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
            pageSizeOptions={[25, 50, 75, 100]}
            onChange={onPaginationChange}
            onShowSizeChange={onPaginationChange}
            showTotal={showTotal}
          />
        </>
      )}
    </ContentWrapper>
  );
};

export default ContentContainer;
