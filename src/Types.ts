export type Products = {

    id: number;
    name: string;
    desc: string;
    price: number;
    image: string;
    date: Date;
}

export type InititalFetch = {
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

export type InitialModal = {
    isOpen: boolean;
}


export type InitialPayment = {
    isOpen: boolean;
    accepted: boolean;
    declined: boolean;
}

export type PhoneCard = {
    value: string;
    range: [number, number];
    paginationCount: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
