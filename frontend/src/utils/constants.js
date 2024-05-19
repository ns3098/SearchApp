export const DROPDOWN_OPTIONS_URL = 'https://searchapp-kyye.onrender.com/api/v1/get_assembly';

export const getEpicTableUrl = ( assembly, text, page, page_size) => `https://searchapp-kyye.onrender.com/api/v1/fetch_epic_details/?assembly=${assembly}&text=${text}&page=${page}&page_size=${page_size}`;

export const getNameTableUrl = ( assembly, text, page, page_size) => `https://searchapp-kyye.onrender.com/api/v1/fetch_name_details/?assembly=${assembly}&text=${text}&page=${page}&page_size=${page_size}`;