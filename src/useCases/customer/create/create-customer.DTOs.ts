export interface InputCreateCustomerDTOs {
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}

export interface OutputCreateCustomerDTOs {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}
