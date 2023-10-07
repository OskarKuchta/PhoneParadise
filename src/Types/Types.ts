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

export type CartItems = {
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

export type FirebaseConfig = {
    apiKey: "AIzaSyDxloi2QFu7gcImAbsCz_wqjcQYhAfiPaA"
    authDomain: "phone-paradise.firebaseapp.com",
    projectId: "phone-paradise",
    storageBucket: "phone-paradise.appspot.com",
    messagingSenderId: "342601028672",
    appId: "1:342601028672:web:4ca8b36533ed7fe6237ba5",
    measurementId: "G-9LX4PNP9DC",
}

export type RatingBody = {
    rate?: number;
    timestamp?: Date;
}
export type RatingData = RatingBody & {
    id: string;
}