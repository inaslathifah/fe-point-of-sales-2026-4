// import heroImg from "./assets/hero.png";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { useState } from "react";
// import DataPeserta from "./component/DataPeserta";
// import { Peserta } from "./component/Peserta";
// import FormPeserta from "./component/FormPeserta";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./pages/MainLayout";
import ListUser from "./pages/user/List";
import Category from "./pages/user/Category";
import Product from "./pages/user/Product";
import ListTransaction from "./pages/transaction/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<ListUser />} />
          <Route path="/category" element={<Category />} />
          <Route path="/products" element={<Product />} />
          <Route path="/transaction" element={<ListTransaction />} />
        </Route>
        <Route path="/login" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// const [count, setCount] = useState(0);
// // useState adalah hook yang digunakan untuk membuat state di dalam function component.
// // State adalah ngerubah data jadi dinamis dengan aksi/event, misalnya data yang bisa berubah-ubah.
// // getter itu untuk mengambil data, setter itu untuk mengubah data.
// // setCount adalah setter, count adalah getter. useState(0) itu nilai awalnya 0.
// // setCount adalah fungsi untuk mengubah nilai count, dan count adalah nilai yang akan ditampilkan di UI.
// // function component dan class component
// function Peserta({ nama, kelas, nilai }) {
//   return (
//     <div
//       style={{
//         border: "1px solid #ccc",
//         padding: "10px",
//         borderRadius: "8px",
//         margin: "10px",
//         textAlign: "center",
//       }}
//     >
//       <h3>{nama}</h3>
//       <p>{kelas}</p>
//       <p>{nilai}</p>
//     </div>
//   );
// }

// // props itu properti, adalah membuat properti yang bisa dikirim ke component lain
// // atau membuat properti menjadi lebih dinamis
// return (
//   <>
//     <Peserta nama="Inas Lathifah" kelas="Web Programming" nilai={85} />
//     <Peserta nama="John Doe" kelas="Mobile Development" nilai={90} />
//     <Peserta nama="Jane Smith" kelas="iOS Development" nilai={78} />
//     <p>Total peserta: {count}</p>
//     <button onClick={() => setCount((count) => count + 1)}>
//       Tambah Peserta
//     </button>
//     <button onClick={() => setCount((count) => count - 1)}>
//       Kurangi Peserta
//     </button>
//   </>
// );
