import { Outlet } from "react-router-dom";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import DownloadOlx from "../Component/DownloadOlx/DownloadOlx";

export default function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    <DownloadOlx/>
    </>
  );
}
