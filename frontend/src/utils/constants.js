export const DROPDOWN_OPTIONS_URL = 'http://127.0.0.1:8000/api/v1/get_assembly';

export const getEpicTableUrl = ( assembly, text, page, page_size) => `http://localhost:8000/api/v1/fetch_epic_details/?assembly=${assembly}&text=${text}&page=${page}&page_size=${page_size}`;

export const getNameTableUrl = ( assembly, text, page, page_size) => `http://localhost:8000/api/v1/fetch_name_details/?assembly=${assembly}&text=${text}&page=${page}&page_size=${page_size}`;