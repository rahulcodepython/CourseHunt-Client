export interface AccessTokenUserType {
    "token_type": 'access' | 'refresh'
    "exp": number
    "iat": number,
    "jti": string
    "username": string
    "email": string
    "first_name": string
    "last_name": string
    "image": string
    "is_superuser": boolean
}

export interface UserType {
    "username": string
    "email": string
    "first_name": string
    "last_name": string
    "image": string
    "is_superuser": boolean
}

export interface SignInFormType {
    email: string
}

export interface SignInFormCredentialsType {
    email: string
    password: string
}

export interface SignUpFormType {
    first_name: string
    last_name: string
    email: string
    password: string
    confirmpassword: string
}

export interface AuthStoreState {
    isAuthenticated: boolean;
    accessToken: string | undefined;
    refreshToken: string | undefined;
    user: UserType | undefined;
}

export interface AuthStoreActions {
    LoggedInUser: (access: string | undefined, refresh: string | undefined) => void;
    LogoutUser: () => void;
}

export interface CommentStoreState {
    comments: DetailBlogsType['comment']
    totalComments: number
}

export interface CommentStoreActions {
    setComments: (comments: DetailBlogsType['comment']) => void;
    setTotalComments: (totalComments: number) => void;
    createComment: (content: DetailBlogsCommentType) => void;
    createReply: (parent: string, content: DetailBlogsCommentType) => void;
    deleteComment: (parent: string) => void;
    deleteReply: (parent: string, child: string) => void;
    editComment: (parent: string, content: string) => void;
    editReply: (parent: string, child: string, content: string) => void;
}

export interface CheckoutStoreState {
    price: number,
    tax: number,
    offer: number,
    discount: number,
    is_discount: boolean,
    total: number,
    coupon_code: string
}

export interface CheckoutStoreActions {
    setValue: (price: number, tax: number, offer: number) => void;
    updateDiscount: (discount: number, is_discount: boolean) => void;
    updateTotal: (total: number) => void;
    setCouponCode: (coupon_code: string) => void;
}

export interface DurationTimeState {
    hours: number;
    minutes: number;
    seconds: number;
}

export interface ReferralType {
    id: string;
    user: string;
    email: string;
    date: string;
    status: "Active" | "Inactive" | "Purchased";
    reward: number;
}

export interface AllCourseType {
    id: string
    name: string
    short_description: string
    long_description?: string
    created_at: string
    duration: string
    price: number
    offer: number
    status: 'published' | 'draft'
    thumbnail: string
    videoURL?: string
    notesURL?: string
    presentationURL?: string
    codeURL?: string
    content?: string
}

export interface StudyCourseType {
    id: string
    name: string
    thumbnail: string
    videoURL: string
    notesURL: string
    presentationURL: string
    codeURL: string
    content: string
}

export interface ListCourseType {
    id: string
    name: string
    short_description: string
    created_at: string
    duration: string
    price: number
    offer: number
    thumbnail: string
    enrolled: boolean
}

export interface ListCourseDashboardType {
    id: string
    name: string
}

export interface ListCourseAdminDashboardType {
    id: string
    name: string
    created_at: string
    price: number
    offer: number
    status: 'published' | 'draft'
}

export interface DetailSingleCourseType {
    id: string
    name: string
    short_description: string
    long_description: string
    created_at: string
    duration: string
    price: number
    offer: number
    thumbnail: string
    enrolled: boolean
    language: string[]
    rating: number
    learners: number
    tags: string[]
    includes: string[]
    requirements: string[]
    created_by: string
}

export interface ListCouponCodeType {
    id: string,
    created_at: string,
    expiry: string,
    code: string,
    discount: number,
    quantity: null | number,
    used: number,
    is_unlimited: boolean,
    is_active: boolean
}

export interface CoursePriceResponseType {
    price: number,
    tax: number,
    offer: number,
    total: number,
    name: string,
    email: string,
    country: string
    city: string
    phone: string
    address: string
}

export interface PaginationType<T> {
    count: number,
    next: string,
    results: T[]
}

export interface SelfTransactionType {
    id: string
    course: string
    amount: number
    razorpay_order_id: string
    is_paid: boolean
    created_at: string
}

export interface TransactionType {
    id: string
    course: string
    user: string
    amount: number
    razorpay_order_id: string
    is_paid: boolean
    created_at: string
}

export interface FeedbackType {
    id: string
    user: string
    created_at: string
    feedback: string
    rating: number
}

export interface ListBlogsType {
    id: string
    title: string
    created_at: string
    image: string
}

export interface DetailBlogsCommentType {
    id: string
    user: string
    content: string
    created_at: string
    children: DetailBlogsCommentType[]
}
export interface DetailBlogsType {
    id: string
    title: string
    created_at: string
    updated_at: string
    image: string
    content: string
    likes: number
    liked: boolean
    read: number
    comments: number
    comment: DetailBlogsCommentType[]
}

export interface AdminListBlogsType {
    id: string
    title: string
    created_at: string
    updated_at: string
    likes: number
    read: number
    comments: number
}