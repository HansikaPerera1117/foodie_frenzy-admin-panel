import ApiService from "./apiService";

export async function getAllReservations(currentPage) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = `api/admin/order/find-all?perPage=${15}&page=${currentPage}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}

export async function updateReservationsStatus(orderId, status) {
  const apiObject = {};
  (apiObject.method = "PATCH"),
    (apiObject.authentication = true),
    (apiObject.isWithoutPrefix = false);
  apiObject.endpoint = `api/order/update-status/${orderId}?status=${status}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}

export async function reservationsFiltration(data, currentPage) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = `api/admin/reservation/find-all?reservationCode=${
    data?.reservationCode
  }&contactNo=${data?.contact}&branchId=${data?.branch}&email=${
    data?.email
  }&orderStartDate=${data?.startDate}&orderEndDate=${data?.endDate}&status=${
    data?.status
  }&perPage=${15}&page=${currentPage}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
