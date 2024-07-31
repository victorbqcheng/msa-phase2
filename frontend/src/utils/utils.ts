import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError):string => {
    let message = 'An error occurred, please try again later.';
    if (error.response) {
        // The request has been sent, but the server responded with a non-2xx status code
        message = error.message || error.response.statusText;
    } else if (error.request) {
        // The request has been sent, but no response has been received
        message = 'No response received from the server. Please try again later.';
    } else {
        // Other errors
        message = error.message || message;
    }
    return message;
};

export const formatDateTime = (datetime?:string):string=>{
    if(!datetime) return '';
    datetime = datetime.replace('T',' ');
    let parts = datetime.split(':');
    let result = parts.slice(0, -1).join(":"); 
    return result;
};
