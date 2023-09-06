export interface Products {

    id: number;
    name: string;
    desc: string;
    price: number;
    image: string;
}

export interface InititalState {
    items: unknown;
    status: null | string;
    isLoading: boolean;
    error: null | unknown;
}

