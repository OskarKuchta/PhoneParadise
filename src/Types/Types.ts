export interface Products {

    id: number;
    name: string;
    desc: string;
    price: number;
    image: string;
    date: Date;
}

export interface InititalFetch {
    items: unknown;
    status: null | string;
    isLoading: boolean;
    error: null | unknown;
}

export interface CartItems {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface InitialCart {
    cartItems: CartItems[];
    amount: number;
    total: number;
    discount: number;
    isDiscount: boolean;
}

export interface InitialModal {
    isOpen: boolean;
}


export interface InitialPayment {
    isOpen: boolean;
    accepted: boolean;
    declined: boolean;
}

export interface PhoneCard {
    value: string;
    range: [number, number];
    paginationCount: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export interface FirebaseConfig {
    apiKey: "AIzaSyDxloi2QFu7gcImAbsCz_wqjcQYhAfiPaA"
    authDomain: "phone-paradise.firebaseapp.com",
    projectId: "phone-paradise",
    storageBucket: "phone-paradise.appspot.com",
    messagingSenderId: "342601028672",
    appId: "1:342601028672:web:4ca8b36533ed7fe6237ba5",
    measurementId: "G-9LX4PNP9DC",
}

export interface RatingBody {
    rate?: number;
    timestamp?: Date;
}
export interface RatingData extends RatingBody {
    id: string;
}

export interface isPhone {
    windowWidth: number;
    isPhone: boolean;
    setIsPhone: React.Dispatch<React.SetStateAction<boolean>>;
}