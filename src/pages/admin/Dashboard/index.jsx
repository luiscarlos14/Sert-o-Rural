import StatusCard from "components/StatusCard";
import React, { useEffect, useState } from "react";

import { getFornecedores, getProdutos, getUsers } from "./sevices";

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [produtos, setProdutos] = useState("");

  useEffect(() => {
    getProdutos()
      .then((result) => {
        setProdutos(result);
      })
      .catch();
  }, []);

  useEffect(() => {
    getFornecedores()
      .then((result) => {
        setFornecedor(result);
      })
      .catch();
  }, []);

  useEffect(() => {
    getUsers()
      .then((result) => {
        setUser(result);
      })
      .catch();
  }, []);

  return (
    <>
      <div style={{ marginTop: "3%" }} className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div style={{ display: "flex", flex: 1, flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <StatusCard
                color="pink"
                icon="trending_up"
                title="Total de Fornecedores"
                amount={fornecedor.length}
                /*   percentage="3.48"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month" */
              />
            </div>
            <div style={{ flex: 1 }}>
              <StatusCard
                color="orange"
                icon="groups"
                title="Total de Usuários"
                amount={user.length}
                /*   percentage="3.48"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week" */
              />
            </div>
            <div style={{ flex: 1 }}>
              <StatusCard
                color="purple"
                icon="storage"
                title="Total de Produtos"
                amount={produtos.length}
                /*    percentage="1.10"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since yesterday" */
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
