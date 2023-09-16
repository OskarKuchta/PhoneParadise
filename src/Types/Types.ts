export type Products = {

    id: number;
    name: string;
    desc: string;
    price: number;
    image: string;
}

export type InititalState = {
    items: unknown;
    status: null | string;
    isLoading: boolean;
    error: null | unknown;
}

type CartItems = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export type InitialCart = {
    cartItems: CartItems[];
    amount: number;
    total: number;
}