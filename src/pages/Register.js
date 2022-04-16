import React, { useState } from "react";

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-ui/core/Button";
import Page from "components/login/Page";
import Container from "components/login/Container";
import style from "../assets/styles/index.css";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";

import api, { TOKEN_KEY, ID } from "../api";

const token = sessionStorage.getItem(TOKEN_KEY);
const id = localStorage.getItem(ID);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Register() {
  const classes = useStyles();

  const [admin, setAdmin] = useState(0);
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [active, setActive] = useState(1);
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [profile, setProfile] = useState(null);

  function saveUsuario() {
    if (
      cpf === "" ||
      name === "" ||
      surname === "" ||
      email === "" ||
      street === "" ||
      neighborhood === "" ||
      city === "" ||
      cep === ""
    ) {
      alert("Preencha todos os campos obrigatórios!");
    } else if (password !== confirmPassword) {
      alert("Senhas diferentes!");
    } else {
      postUser(
        admin,
        cpf,
        name,
        surname,
        email,
        password,
        active,
        street,
        neighborhood,
        city,
        cep,
        profile,
        refreshPage
      );
    }
  }

  return (
    <Page>
      <Container>
        <Card>
          {/* <CardHeader color="green">
            <H5 color="white" style={{ marginBottom: 0 }}>
              Register
            </H5>
          </CardHeader> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#287C43",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <h3
              style={{
                fontSize: 25,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Novo Usuário
            </h3>
          </div>

          <CardBody>
            <TextField
              id="perfil"
              label="Foto de Perfil"
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ width: "100%", marginBottom: 10 }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
            <TextField
              id="name"
              label="Nome"
              type="text"
              style={{ width: "45%", marginRight: "10%", marginBottom: 10 }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="surname"
              label="Sobrenome"
              type="text"
              style={{ width: "45%", marginBottom: 10 }}
              onChange={(e) => setSurname(e.target.value)}
            />

            <TextField
              id="cpf"
              label="CPF"
              type="text"
              style={{ width: "45%", marginRight: "10%", marginBottom: 10 }}
              onChange={(e) => setCpf(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              type="text"
              style={{ width: "45%", marginBottom: 10 }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="street"
              label="Endereço"
              type="text"
              style={{ width: "60%", marginRight: "10%", marginBottom: 10 }}
              onChange={(e) => setStreet(e.target.value)}
            />
            <TextField
              id="cep"
              label="CEP"
              type="text"
              style={{ width: "30%", marginBottom: 10 }}
              onChange={(e) => setCep(e.target.value)}
            />
            <TextField
              id="city"
              label="Cidade"
              type="text"
              style={{ width: "45%", marginRight: "10%", marginBottom: 10 }}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              id="state"
              label="Estado"
              type="text"
              style={{ width: "45%", marginBottom: 10 }}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
            <TextField
              id="senha"
              label="Senha"
              type="password"
              style={{ width: "45%", marginRight: "10%" }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="confirmSenha"
              label="Confirmar Senha"
              type="password"
              style={{ width: "45%" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </CardBody>
          <CardFooter>
            <div className="flex justify-center">
              <Button
                variant="contained"
                className={classes.button}
                endIcon={<SaveIcon />}
                onClick={saveUsuario}
              >
                Criar Usuário
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </Page>
  );
}

function refreshPage(status, request) {
  if (status === 200 && request === "adicionado") {
    alert("Usuário Criado!");
    window.location.href = "/login";
  }
}

async function postUser(
    admin,
  cpf,
  name,
  surname,
  email,
  password,
  active,
  street,
  neighborhood,
  city,
  cep,
  profile,
  refreshPage
) {
  var usuario = new FormData();

  usuario.append("admin", admin);
  usuario.append("cpf", cpf);
  usuario.append("name", name);
  usuario.append("surname", surname);
  usuario.append("email", email);
  usuario.append("password", password);
  usuario.append("active", active);
  usuario.append("street", street);
  usuario.append("neighborhood", neighborhood);
  usuario.append("city", city);
  usuario.append("cep", cep);
  usuario.append("profile", profile);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `token ${token}`,
    },
  };

  await api.post("/users", usuario, config).then(() => {
    refreshPage(200, "adicionado");
  });
}
