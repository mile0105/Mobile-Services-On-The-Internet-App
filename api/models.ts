export interface User {
    username: string
    password: string
}

export interface ProductApi {
    manufacturerName: string,
    modelName: string,
    price: number,
    lastUpdate: Date | undefined
}

export interface Product {
    id: number,
    manufacturerName: string,
    modelName: string,
    price: number,
    quantity: number,
    lastUpdate: Date | undefined
}

export interface JwtToken {
    accessToken: string
    refreshToken: string
    hasDeletePermission: boolean
}

export interface AccessToken {
    access_token: string,
    refresh_token: string,
    token_type: string,
    expires_in: number
}

export interface ProductDelta {
    productId: number,
    quantity: number
}
