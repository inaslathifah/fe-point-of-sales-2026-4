import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./pages/MainLayout";
import ListUser from "./pages/user/List";
import CategoryPage from "./pages/user/Category"; // Sesuaikan folder jika berada di luar folder user
import Products from "./pages/user/Product"; // Sesuaikan folder jika berada di luar folder user
import ListTransaction from "./pages/transaction/List";
import FormTransaction from "./pages/transaction/Form";
import PrintTransaction from "@/pages/transaction/Print";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Redirect dari root (/) ke /login atau /dashboard */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Layout utama yang dilindungi / dibungkus MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<ListUser />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/transaction" element={<ListTransaction />} />
          <Route path="/transaction/create" element={<FormTransaction />} />
          <Route path="/transaction/print" element={<PrintTransaction />} />
        </Route>

        {/* Catch-all jika rute tidak ditemukan, kembalikan ke login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// // useState adalah hook yang digunakan untuk membuat state di dalam function component.
// // State adalah ngerubah data jadi dinamis dengan aksi/event, misalnya data yang bisa berubah-ubah.
// // getter itu untuk mengambil data, setter itu untuk mengubah data.
// // setCount adalah setter, count adalah getter. useState(0) itu nilai awalnya 0.
// // setCount adalah fungsi untuk mengubah nilai count, dan count adalah nilai yang akan ditampilkan di UI.
// // function component dan class component

// // props itu properti, adalah membuat properti yang bisa dikirim ke component lain
// // atau membuat properti menjadi lebih dinamis
