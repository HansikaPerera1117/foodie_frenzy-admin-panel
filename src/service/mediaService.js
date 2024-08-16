import ApiService from "./apiService";

export async function saveMediaFile(data){
    const apiObject = {};
    apiObject.method = "POST",
    apiObject.authentication = true,
    apiObject.isWithoutPrefix = false;
    apiObject.endpoint = ``
    apiObject.multipart = true
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}