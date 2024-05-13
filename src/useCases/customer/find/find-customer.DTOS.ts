export interface InputFindCustomerDTOs {
  id: string;
}

export interface OutputFindCustomerDTOs {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}
