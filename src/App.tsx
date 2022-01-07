import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { QueryClientProvider } from "react-query";

import queryClient from "./queryClient";

import Home from "./pages/home";
import Products from "./pages/products";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles.css";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

const App: React.FC = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Layout />}>
              <Route path="products" element={<Products />} />
              <Route path="*" element={<p>There's nothing here!</p>}></Route>
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
