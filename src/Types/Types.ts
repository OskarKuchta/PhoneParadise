export interface Products {
    id: number;
    name: string;
    desc: string;
    price: number;
    image: string;
    inStock: number;
    date: Date | { seconds: number };
}
export interface SetProductsPayload {
    items: { id: string }[];
    isLoading: boolean;
    error: null;
}


export interface InititalFetch {
    items: any[];
    status: null | string;
    isLoading: boolean;
    error: null | unknown;
}

export interface CartItems {
    id: number;
    name: string;
    image: string;
    price: number;
    inStock: number;
    quantity: number;
}

export interface InitialCart {
    cartItems: CartItems[];
    amount: number;
    total: number;
    discount: number;
    withDiscount: number;
    percentage: number;
    isDiscount: boolean;
    codeName: string;
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

export interface UserData {
    id?: string;
    name?: string;
    email: string;
    password: string;
    shopHistory?: any[];
    confirmPassword?: string;
    avatarColor?: string;
}

export interface UserDataError {
    name: boolean;
    nameTaken: boolean;
    emailTaken: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
}

export interface UserDataChceck {
    isEmailExist: boolean,
    isPasswordCorrect: boolean,
}
export interface LoginState {
    isLoggedIn: boolean;
    userData: UserData | null;

}
export interface AnimationObject {
    hidden: {
        opacity: number;
        x?: number;
        y?: number;
    };
    visible: {
        opacity: number;
        x?: number;
        y?: number;
    };
    [key: string]: {
        opacity: number;
        x?: number;
        y?: number;
    };
}

export interface UseInViewWithRefReturnType {
    ref: React.MutableRefObject<any>;
    inView: boolean;
};

export interface PasswordVisibleRegister {
    password: boolean;
    confirmPassword: boolean;
}