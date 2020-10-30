export interface User {
    username: string
    password: string
}

export interface ProductApi {
    manufacturerName: string,
    modelName: string,
    price: number,
}

export interface Product {
    id: bigint,
    manufacturerName: string,
    modelName: string,
    price: number,
    quantity: number
}

export interface JwtToken {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiry: Date
}
