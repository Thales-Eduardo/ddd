import { Request, Response, Router } from "express";
import { CreateCustomerUseCase } from "../../../useCases/customer/create/create.customer.usecase";
import { ListCustomerUseCase } from "../../../useCases/customer/list/list.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";
import { CustomerPresenter } from "../presenters/customer.presenter";

export const CustomerRouter = Router();

CustomerRouter.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

CustomerRouter.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(CustomerPresenter.listXML(output)),
  });
});
