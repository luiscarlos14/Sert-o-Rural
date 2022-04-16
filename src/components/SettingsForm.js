import React, { useState, useEffect } from "react";

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import TextField from "@material-ui/core/TextField";
import { EditInfoPersonal, EditInfoAddress } from "./Services";
import api, { TOKEN_KEY, ID } from "../api";

async function getUser() {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const id = localStorage.getItem(ID);

  const res = (
    await api.get(`/users/${id}`, {
      headers: { Authorization: `token ${token}` },
    })
  ).data.response;
  return res;
}

export default function SettingsForm() {
  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cpf, setCPF] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUser()
      .then((result) => {
        setName(result[0].name);
        setSurname(result[0].surname);
        setCPF(result[0].cpf);
        setStreet(result[0].street);
        setNeighborhood(result[0].neighborhood);
        setCity(result[0].city);
        setCep(result[0].cep);
        setEmail(result[0].email);
      })
      .catch();
  }, []);

  return (
    <Card>
      <CardHeader color="green" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Meu Perfil</h2>
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            style={{ padding: 0 }}
          >
            Ajustes
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <form>
          <h6 className="text-green-500 text-sm mt-3 mb-6 font-light uppercase">
            Informações Pessoais
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
              <TextField
                id="nome"
                label="Nome"
                type="text"
                style={{ width: "100%", marginBottom: 10 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
              <TextField
                id="sobrenome"
                label="Sobrenome"
                type="text"
                style={{ width: "100%", marginBottom: 10 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
              <TextField
                id="cpf"
                label="CPF"
                type="cpf"
                style={{ width: "100%", marginBottom: 10 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={cpf}
                helperText="O CPF não pode ser modificado!"
              />
            </div>
          </div>
          <div style={{ marginTop: "1px" }}>
            <Button
              color="green"
              buttonType="default"
              ripple="dark"
              onClick={() => EditInfoPersonal(cpf, name, surname, refreshPage)}
            >
              Confirmar Alterações
            </Button>
          </div>

          <h6 className="text-green-500 text-sm my-6 font-light uppercase">
            Endereço
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-12/12 mb-10 font-light">
              <TextField
                id="endereco"
                label="Endereço"
                type="text"
                style={{ width: "100%", marginBottom: 10 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
              <TextField
                id="cidade"
                label="Cidade"
                type="text"
                style={{ width: "100%", marginBottom: 10 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
              <TextField
                id="estado"
                label="Estado"
                type="text"
                style={{ width: "100%", marginBottom: 10 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
              <TextField
                id="cep"
                label="Cep"
                type="text"
                style={{ width: "100%", marginBottom: 10 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: "1px" }}>
            <Button
              color="green"
              buttonType="default"
              ripple="dark"
              onClick={() => EditInfoAddress(street, neighborhood, city, cep)}
            >
              Confirmar Alterações
            </Button>
          </div>

          <h6 className="text-green-500 text-sm my-6 font-light uppercase">
            Informações de Acesso
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
              <TextField
                id="email"
                label="Email"
                type="e-mail"
                style={{ width: "100%", marginBottom: 10 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
              <TextField
                id="senha"
                label="Senha Atual"
                type="password"
                style={{ width: "100%", marginBottom: 10 }}
              />
            </div>

            <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
              <TextField
                id="newSenha"
                label="Nova Senha"
                type="text"
                style={{ width: "100%", marginBottom: 10 }}
              />{" "}
            </div>
          </div>
        </form>

        <div style={{ marginTop: "1px" }}>
          <Button color="green" buttonType="default" ripple="dark">
            Confirmar Alterações
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

function refreshPage(status, request) {
  if (status === 200 && request === "personal") {
    alert("Informações Pessoas Atualizadas!");
    document.location.reload();
  } else if (status === 200 && request === "address") {
    alert("Endereço atualizado");
    document.location.reload();
  }
}
