import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Icon from "@material-tailwind/react/Icon";

import LogoRural from "../assets/img/ruralD.png";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import SpaIcon from "@material-ui/icons/Spa";
import StorefrontIcon from "@material-ui/icons/Storefront";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  return (
    <>
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <img className="LogImg" src={LogoRural} alt="Logo Sertão Rural" />

          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              <li className="rounded-lg mb-4">
                <NavLink
                  to="/"
                  exact
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-green-500 to-green-700 text-white shadow-md"
                >
                  <Icon name="dashboard" size="2xl" />
                  Dashboard
                </NavLink>
              </li>

              <li className="rounded-lg mb-2">
                <NavLink
                  to="/vendas"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-green-500 to-green-700 text-white shadow-md"
                >
                  <AttachMoneyIcon />
                  Vendas
                </NavLink>
              </li>

              <li className="rounded-lg mb-2">
                <NavLink
                  to="/despesas"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-green-500 to-green-700 text-white shadow-md"
                >
                  <MoneyOffIcon />
                  Despesas
                </NavLink>
              </li>

              <li className="rounded-lg mb-2">
                <NavLink
                  to="/insumos"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-green-500 to-green-700 text-white shadow-md"
                >
                  <ListAltIcon />
                  Insumos em Estoque
                </NavLink>
              </li>

              <li className="rounded-lg mb-2">
                <NavLink
                  to="/funcionarios"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-green-500 to-green-700 text-white shadow-md"
                >
                  <PeopleIcon />
                  Funcionários
                </NavLink>
              </li>

              <li className="rounded-lg mb-2">
                <NavLink
                  to="/plantacoes"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-green-500 to-green-700 text-white shadow-md"
                >
                  <SpaIcon />
                  Plantações
                </NavLink>
              </li>

              

              <li className="rounded-lg mb-2">
                <NavLink
                  to="/produtos"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-green-500 to-green-700 text-white shadow-md"
                >
                  <StorefrontIcon />
                  Produtos
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
