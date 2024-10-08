import ProductService from "../../services/products.js";
import httpResponse from "../../utils/httpResponse.js";

const ProductController = {
  addProduct: async (req, res) => {
    const addResponse = await ProductService.addProduct(req.body);
    if (addResponse.message === "success") {
      return httpResponse.CREATED(res, addResponse.data);
    } else if (addResponse.message === "failed") {
      return httpResponse.CONFLICT(res, addResponse.data);
    } else {
      return httpResponse.INTERNAL_SERVER(res, addResponse.data);
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const addResponse = await ProductService.getAllProducts();
      
      if (addResponse.success) {
        res.status(200).json(addResponse.data);
      } else {
        res.status(500).json({ error: addResponse.error });
      }
    } catch (error) {
      console.error("Error in getAllProducts controller:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  },
  delete: async (req, res) => {
    const deleteResponse = await ProductService.removeById(req.params.id);
    if (deleteResponse.message === "success") {
      return httpResponse.SUCCESS(res, deleteResponse.data);
    } else if (deleteResponse.message === "error") {
      return httpResponse.NOT_FOUND(res, deleteResponse.data);
    } else {
      return httpResponse.INTERNAL_SERVER(res, deleteResponse.data);
    }
  }
}

export default ProductController;
