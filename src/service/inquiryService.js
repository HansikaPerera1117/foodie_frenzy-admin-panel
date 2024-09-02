import ApiService from "./apiService";

export async function getAllInquiries(currentPage) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = `api/inquirie/find-all`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}

export async function sendInquiryResponse(data) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.urlencoded = false;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = ``;
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}

export async function inquiriesFiltration(data, currentPage) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = ``;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
