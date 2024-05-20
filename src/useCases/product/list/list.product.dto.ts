export interface InputListProductDTOs {}

type Product = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListProductDTOs {
  products: Product[];
}
