export interface BaseResponse<T = any> {
    code: number;
    message: string;
    result: T;
}

export interface TokenResponse {
    access_token: string,
    type: string
}
