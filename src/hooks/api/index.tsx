import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = `http://weread.phsartech.com/api/`;
export const IMAGE_URL = `http://image.weread.asia/`;
export const PATH_URL = `http://weread-oss.weread.asia/`;

export const MethodType = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export function getImage(uri:string){
  return IMAGE_URL + uri;
}

export function getAudio(uri:string | undefined){
  return PATH_URL + uri;
}

export function fetchAPI(
    type: string,
    alias: string,
    params: any = '',
    form_data: any = undefined,
) {
    return new Promise<any>(async (resolve, reject) => {
        let token = await AsyncStorage.getItem('@token');
        let url = form_data
            ? `${API_URL}${alias}`
            : `${API_URL}${alias}${params}`;
        const headers: any = token
            ? {
                Authorization: token ? `Bearer ${token}` : '',
            }
            : {};
        var requestOptions = {
            method: type,
            ...(form_data ? { body: form_data } : {}),
            headers,
            redirect: 'follow',
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => {
                try {
                    const data = JSON.parse(result);
                    resolve(data);
                } catch (error) {
                    console.log(result.substring(48, 400))
                    reject(error);
                }
            })
            .catch(error => reject(error));
    });
}



export function fetchBasicApi(alias: string) {
    let url = API_URL + alias;
    return new Promise<any>(async (resolve, reject) => {
        await fetch(url)
            .then(response => response.text())
            .then(result => {
                try {
                    const data = JSON.parse(result);
                    resolve(data);
                } catch (error) {
                    console.log(result.substring(48, 400))
                    resolve(null);
                }
            })
            .catch(error => reject(error));
    });
}