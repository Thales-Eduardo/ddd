import { Request, Response, Router } from "express";
import { CreateProductUseCase } from "../../../useCases/product/create/create-product.usecase";
import { ListProductUseCase } from "../../../useCases/product/list/list.product.usecase";
import { ProductRepository } from "../../product/repository/sequelize/product.repository";

export const ProductRouter = Router();

ProductRouter.post("/", async (req: Request, res: Response) => {
  const product = new CreateProductUseCase(new ProductRepository());

  try {
    const productDTOs = {
      type: "a",
      name: req.body.name,
      price: req.body.price,
    };
    const output = await product.execute(productDTOs);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

ProductRouter.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
  });
});
