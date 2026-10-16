import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { Label } from "@/component/ui/label";
import { Input } from "@/component/ui/input";
import AppModal from "@/component/AppModal";
import api from "@/services/api.js";

// const dataUsers = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     email: "bob.johnson@example.com",
//   },
// ];

const ListUser = () => {
  const _initForm = {
    id: null,
    name: "",
    email: "",
    password: "",
    is_active: 1,
  };
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);
  const fetchUser = async () => {
    try {
      const response = await api.get("/user");
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  };

  const handleEditModal = (user) => {
    setShowModal(true);
    setIsEdit(true);
    setFormData({ ...user, password: "" });
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Apa kamu yakin ingin menghapusnya?");
    if (confirmation) {
      await api.delete(`/user/${id}`);
      fetchUser();
      // setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_active: parseInt(formData.is_active),
      };
      if (isEdit) {
        await api.put(`/user/${formData.id}`, payload);
      } else {
        await api.post("/user", payload);
      }
      setFormData(_initForm);
    } catch (error) {
      const errMsg = error.message;
      console.log(errMsg);
    } finally {
      fetchUser();
      setShowModal(false);
    }
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="">
            <CardTitle className="text-xl font-bold">Data User</CardTitle>
          </div>
          <Button
            variant="primary"
            onClick={handleShowModal}
            className="bg-blue-200"
          >
            Create New User
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {/* <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Data User</h4>
            </div>
          </div> */}
          <table
            striped
            bordered
            hover
            responsive
            className="w-full text-left text-sm align-middle mb-0"
          >
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">No</th>
                <th className="px-6 py-3 font-medium">Nama</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-300/50 transition-colors"
                  >
                    <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`border p-2 rounded-sm ${user.is_active === 1 ? "bg-slate-600" : "bg-red-300"} text-white `}
                      >
                        {user.is_active === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-6 text-right whitespace-nowrap">
                      <Button
                        onClick={() => handleEditModal(user)}
                        variant="warning"
                        size="sm"
                        className="rounded-md me-2 bg-yellow-100 text-orange-600"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(user.id)}
                        variant="destructive"
                        size="sm"
                        className="rounded-md me-2"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    Belum ada data user
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <div className="table-responsive"></div> */}
        </CardContent>
      </Card>

      <AppModal
        show={showModal}
        onclose={handleCloseModal}
        title={isEdit ? "Edit User" : "Create New User"}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Save Changes" : "Save"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter Your Name"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter Your Email"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required={isEdit ? false : true}
              placeholder="Enter Your Name"
            />
          </div>

          {isEdit ? (
            <div className="mb-3">
              <label>Status</label>
              <select
                name="status"
                value={String(formData.is_active)}
                onValueChange={(val) =>
                  setFormData({ ...formData, is_active: parseInt(val) })
                }
              >
                <option value="1" id="active">
                  Active
                </option>
                <option value="0" id="inactive">
                  Inactive
                </option>
              </select>
            </div>
          ) : (
            <div className="mb-3"></div>
          )}
        </div>
      </AppModal>
    </>
  );
};

export default ListUser;
