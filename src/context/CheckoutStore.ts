import { CheckoutStoreActions, CheckoutStoreState } from '@/types';
import { create } from 'zustand';

export const useCheckoutStore = create<CheckoutStoreState & CheckoutStoreActions>((set) => ({
    price: 0,
    tax: 0,
    offer: 0,
    discount: 0,
    is_discount: false,
    total: 0,
    coupon_code: '',
    setValue: (price: number, tax: number, offer: number) => set({ price, tax, offer }),
    updateDiscount: (discount: number, is_discount: boolean) => set({ discount, is_discount }),
    updateTotal: (total: number) => set({ total }),
    setCouponCode: (coupon_code: string) => set({ coupon_code })
}))