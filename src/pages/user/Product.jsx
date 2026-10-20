import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";
import { Button } from "@/component/ui/button";
import { Label } from "@/component/ui/label";
import { Input } from "@/component/ui/input";
import AppModal from "@/component/AppModal";
import api from "@/services/api.js";

const _initForm = {
  id: null,
  category_id: "",
  name: "",
  price: "",
  stock: "",
  description: "",
  is_active: "1", // Sesuaikan dengan tipe data status Anda (misal: "1" atau "0" / true atau false)
};

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(_initForm);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product");
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setFormData(_initForm);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEditModal = (product) => {
    console.log(product);
    setFormData({
      id: product.id,
      name: product.name || "",
      category_id: product.category_id || product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      description: product.description || "",
      is_active: product.is_active ?? product.status ?? "1",
    });
    setIsEdit(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler khusus untuk Shadcn Select
  const handleSelectChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        category_id: formData.category_id,
        price: formData.price,
        stock: formData.stock,
        status: formData.status,
        is_active: parseInt(formData.is_active),
      };

      if (isEdit) {
        await api.put(`/product/${formData.id}`, payload);
      } else {
        await api.post("/product", payload);
      }
      setFormData(_initForm);
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      console.log(errMsg);
    }
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you sure want to delete this data?",
    );
    if (confirmation) {
      await api.delete(`/product/${id}`);
      fetchProducts();
    }
  };

  return (
    <>
      <Card className="shadow-sm p-3 border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Product</CardTitle>
          </div>
          <Button
            onClick={handleShowModal}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Create New Product
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse align-middle mb-0">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 font-medium">No</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-4 text-muted-foreground"
                  >
                    Belum ada produk
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{product.name}</td>
                    <td className="px-6 py-3">
                      {product.category_name || product.category}
                    </td>
                    <td className="px-6 py-3">{formatRupiah(product.price)}</td>
                    <td
                      className={`px-6 py-3 ${Number(product.stock) === 0 ? "text-red-500 font-semibold" : ""}`}
                    >
                      {Number(product.stock) === 0 ? "Habis" : product.stock}
                    </td>
                    <td className="px-6 py-3">
                      {String(product.is_active ?? product.status) === "1" ||
                      product.is_active === true
                        ? "Active"
                        : "Inactive"}
                    </td>
                    <td className="px-6 py-3 space-x-2">
                      <Button
                        onClick={() => handleEditModal(product)}
                        variant="outline"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(product.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AppModal
        show={showModal}
        onclose={handleCloseModal}
        title={isEdit ? "Edit Product" : "Create New Product"}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Save Changes" : "Save"}
      >
        <div className="space-y-4 py-2">
          {/* Input Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          {/* Select Category */}
          <div className="space-y-2">
            <Label htmlFor="category_id">Category</Label>
            <Select
              value={formData.category_id ? String(formData.category_id) : ""}
              onValueChange={(value) =>
                handleSelectChange("category_id", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.name || cat}
                      value={String(cat.name || cat)}
                    >
                      {cat.name || cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Input Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
            />
          </div>

          {/* Input Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Select Status */}
          <div className="space-y-2">
            <Label htmlFor="is_active">Status</Label>
            <Select
              id="is_active"
              name="is_active"
              value={String(formData.is_active)}
              onValueChange={(value) => handleSelectChange("is_active", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="In-Active">In-Active</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </AppModal>
    </>
  );
};

export default Product;
