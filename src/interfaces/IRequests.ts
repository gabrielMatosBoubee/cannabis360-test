export type Commission = {
    one: number;
  };
  
export type ProductComposition = {
    composition: number;
    quantity: number;
  };
  
export type IProduct = {
    id: number;
    companyName: string;
    commission: Commission;
    companyId: number;
    expirationDate: string;
    lot: string;
    presentation: number;
    price: number;
    productComposition: ProductComposition[];
    productImage: string;
    productName: string;
    productType: number;
    sale: number;
    weight: number;
  };
  
export interface INicialState {
    company: number,
    validate: Date | null,
    price: number
  }
  
export interface IAction {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    type: string
  }

export interface CustomInputProps {
    value?: string | null;
    onClick?: () => void;
  }