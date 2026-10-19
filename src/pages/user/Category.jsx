import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { Label } from "@/component/ui/label";
import { Input } from "@/component/ui/input";
import AppModal from "@/component/AppModal";
import api from "@/services/api.js";

const CategoryPage = () => {
  const _initForm = {
    id: null,
    name: "",
  };
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(_initForm);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
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

  const handleEditModal = (category) => {
    console.log(category);
    setFormData(category);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
      };
      if (isEdit) {
        // update data
        await api.put(`/category/${formData.id}`, payload);
      } else {
        // insert data
        await api.post("/category", payload);
      }
      setFormData(_initForm);
      setShowModal(false);
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
      // delete
      await api.delete(`/category/${id}`);
      fetchCategories();
    }
  };

  return (
    <>
      <Card className="shadow-sm p-6 border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Category</CardTitle>
          </div>
          <Button
            onClick={handleShowModal}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Create New Category
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse align-middle mb-0">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 font-medium">No</th>
                <th className="px-6 py-3 font-medium">Nama</th>
                <th className="px-6 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-muted-foreground"
                  >
                    Belum ada kategori
                  </td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <tr
                    key={category.name || index}
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4">{category.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <Button
                        onClick={() => handleEditModal(category)}
                        variant="outline"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(category.id)}
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
        title={isEdit ? "Edit Category" : "Create New Category"}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Save Changes" : "Save"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter category name"
            />
          </div>
        </div>
      </AppModal>
    </>
  );
};

export default CategoryPage;
