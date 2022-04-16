import StatusCard from "components/StatusCard";
import TableCard from "components/TableCard";

import React, { useEffect, useState } from "react";
import { getUsers, postUser, EditUser, deleteUser, EditPhotoPerfil, EditPass } from "./services";
import constantes from "constantes";

import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import LockIcon from '@material-ui/icons/Lock';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import ButtonT from "@material-tailwind/react/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #287C43",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  paperTwo: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const tipo = [
  {
    value: 0,
    label: "Padrão",
  },
  {
    value: 1,
    label: "Administrador",
  },
];

const atividade = [
  {
    value: 0,
    label: "Desativado",
  },
  {
    value: 1,
    label: "Ativo",
  },
];

export default function Users() {
  const [list, setList] = useState([]);

  const totalUsers = list.length;

  

  const valorTotal = () => {
    let ativos = 0;
    for (let i = 0; i < list.length; i++) {
      if(list[i].active === '1'){
        ativos = ativos +1;
      }
    }
    return ativos
  };



  valorTotal();


  useEffect(() => {
    getUsers()
      .then((result) => {
        setList(result);
      })
      .catch();
  }, []);

  function refreshPage(status, request) {
    if (status === 200 && request === "adicionado") {
      alert("Usuário Inserido");
      document.location.reload();
    } else if (status === 200 && request === "deletado") {
      alert("Usuário Excluído");
      document.location.reload();
    } else if (status === 200 && request === "editado") {
      alert("Usuário Editado");
      document.location.reload();
    }
    else if (status === 200 && request === "photo") {
      alert("Foto de Perfil Alterada");
      document.location.reload();
    }else if (status === 200 && request === "senha") {
      alert("Senha Alterada!");
      document.location.reload();
    }
  }

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

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openSenha, setOpenSenha] = React.useState(false);
  const [openPhoto, setOpenPhoto] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [openDel, setOpenDel] = React.useState(false);
  const [idDel, setIdDel] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenSenha = () => {
    setOpenSenha(true);
  };

  const handleCloseSenha = () => {
    setOpenSenha(false);
  };

  const handleOpenPhoto = () => {
    setOpenPhoto(true);
  };

  const handleClosePhoto = () => {
    setOpenPhoto(false);
  };

  const handleOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleChange = (event) => {
    setAdmin(event.target.value);
  };

  const handleChangeEdit = (event) => {
    setAdminEdit(event.target.value);
  };

  const handleChangeEditSituacao = (event) => {
    setActiveEdit(event.target.value);
  };

  function ConfirmDelete(i) {
    setIdDel(i);
    handleOpenDel();
  }
  const [idPhoto, setIdPhoto] = useState("");

  function ConfirmPhoto(i) {
    setIdPhoto(i);
    handleOpenPhoto();
  }

  function EditarPhotoPerfil() {
    EditPhotoPerfil(
      profileEdit,
      idPhoto,
      refreshPage
      )
  }

  const [idSenha, setIdSenha] = useState("");

  function ConfirmarSenhaEdit(i) {
    setIdSenha(i);
    handleOpenSenha();
  }

  function EditarSenhaUser() {
    EditPass(
      confirmPasswordEdit,
      idSenha,
      refreshPage
      )
  }

  function ConfirmEdit(i) {
    for (let cont = 0; cont < list.length; cont++) {
      if (list[cont].id === i) {
        setAdminEdit(list[cont].admin);
        setCpfEdit(list[cont].cpf);
        setNameEdit(list[cont].name);
        setSurnameEdit(list[cont].surname);
        setEmailEdit(list[cont].email);
        setActiveEdit(list[cont].active);
        setStreetEdit(list[cont].street);
        setNeighborhoodEdit(list[cont].neighborhood);
        setCityEdit(list[cont].city);
        setCepEdit(list[cont].cep);
        setIdEdit(list[cont].id);
      }
    }

    handleOpenEdit();
  }

  function EditarUsuario() {
    EditUser(
      adminEdit,
      cpfEdit,
      nameEdit,
      surnameEdit,
      emailEdit,
      activeEdit,
      streetEdit,
      neighborhoodEdit,
      cityEdit,
      cepEdit,
      idEdit,
      refreshPage
    );
  }

  const [adminEdit, setAdminEdit] = useState(0);
  const [cpfEdit, setCpfEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [surnameEdit, setSurnameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [activeEdit, setActiveEdit] = useState(1);
  const [streetEdit, setStreetEdit] = useState("");
  const [neighborhoodEdit, setNeighborhoodEdit] = useState("");
  const [cityEdit, setCityEdit] = useState("");
  const [cepEdit, setCepEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [profileEdit, setProfileEdit] = useState(null);

  const [confirmPasswordEdit, setConfirmPasswordEdit] = useState("");

  const classes = useStyles();

  return (
    <>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingLeft: "5%",
          paddingRight: "5%",
          marginTop: "3%",
        }}
      >
        <div style={{ flex: 1 }}>
          <StatusCard
            color="pink"
            icon="trending_up"
            title="Total de Usuários"
            amount={`${totalUsers}`}
            //  percentage="3.48 %"
            // percentageIcon="arrow_upward"
            // percentageColor="green"
            //date="Mês Passado"
          />
        </div>

        <div style={{ flex: 1 }}>
          <StatusCard
            color="purple"
            icon="group"
            title="Usuários Ativos"
            amount={valorTotal()}
            //percentage="3.48"
            //percentageIcon="arrow_downward"
            //percentageColor="red"
            //date="Since last week"
          />
        </div>
      </div>

      <div style={{ marginTop: "3%" }} className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <TableCard title="Usuários" color={constantes.colors.primary}>
              <ButtonT
                color={"teal"}
                buttonType="filled"
                size="regular"
                style={{ marginBottom: 20 }}
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                onClick={handleOpen}
              >
                Novo Usuário
              </ButtonT>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2
                      style={{
                        fontSize: 30,
                        fontFamily: "monospace",
                        textAlign: "center",
                        backgroundColor: "#287C43",
                        color: "#fff",
                        borderRadius: 10,
                      }}
                      id="transition-modal-title"
                    >
                      Novo Usuário
                    </h2>

                    <form
                      className={[classes.root]}
                      noValidate
                      autoComplete="off"
                    >
                      <div style={{ padding: 10 }}>
                        <TextField
                          id="standard-basic"
                          label="Foto de Perfil"
                          type="file"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setProfile(e.target.files[0])}
                        />

                        <TextField
                          id="standard-basic"
                          label="Nome"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                          id="standard-basic"
                          label="Sobrenome"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setSurname(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="CPF"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          onChange={(e) => setCpf(e.target.value)}
                        />

                        <TextField
                          id="standard-select-currency"
                          select
                          label="Tipo de Usuário"
                          value={admin}
                          onChange={handleChange}
                          style={{
                            width: "45%",
                            marginBottom: 10,
                          }}
                        >
                          {tipo.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          id="standard-basic"
                          label="Endereço"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setStreet(e.target.value)}
                        />
                        <TextField
                          id="standard-basic"
                          label="Cidade"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <TextField
                          id="standard-basic"
                          label="Estado"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setNeighborhood(e.target.value)}
                        />
                        <TextField
                          id="standard-basic"
                          label="CEP"
                          style={{
                            width: "35%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          onChange={(e) => setCep(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Email"
                          style={{ width: "55%", marginBottom: 10 }}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Senha"
                          type="password"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                          id="standard-basic"
                          label="Confirmar Senha"
                          type="password"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div style={{ marginRight: "12%", marginLeft: "12%" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<CancelIcon />}
                          onClick={handleClose}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          endIcon={<SaveIcon />}
                          onClick={saveUsuario}
                        >
                          Salvar
                        </Button>
                      </div>
                    </form>
                  </div>
                </Fade>
              </Modal>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openEdit}
                onClose={handleCloseEdit}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openEdit}>
                  <div className={classes.paper}>
                    <h2
                      style={{
                        fontSize: 30,
                        fontFamily: "monospace",
                        textAlign: "center",
                        backgroundColor: "#287C43",
                        color: "#fff",
                        borderRadius: 10,
                      }}
                      id="transition-modal-title"
                    >
                      Editar Usuário
                    </h2>

                    <form
                      className={[classes.root]}
                      noValidate
                      autoComplete="off"
                    >
                      <div style={{ padding: 10 }}>
                        <TextField
                          id="standard-basic"
                          label="Nome"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setNameEdit(e.target.value)}
                          value={nameEdit}
                        />
                        <TextField
                          id="standard-basic"
                          label="Sobrenome"
                          style={{ width: "45%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setSurnameEdit(e.target.value)}
                          value={surnameEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="CPF"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setCpfEdit(e.target.value)}
                          value={cpfEdit}
                        />

                        <TextField
                          id="standard-select-currency"
                          select
                          label="Situação"
                          value={activeEdit}
                          onChange={handleChangeEditSituacao}
                          style={{
                            width: "45%",
                            marginBottom: 10,
                          }}
                        >
                          {atividade.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          id="standard-select-currency"
                          select
                          label="Tipo de Usuário"
                          value={adminEdit}
                          onChange={handleChangeEdit}
                          style={{
                            width: "35%",
                            marginBottom: 10,
                          }}
                        >
                          {tipo.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          id="standard-basic"
                          label="Email"
                          style={{
                            width: "55%",
                            marginLeft: "10%",
                            marginBottom: 10,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setEmailEdit(e.target.value)}
                          value={emailEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="Endereço"
                          style={{ width: "100%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setStreetEdit(e.target.value)}
                          value={streetEdit}
                        />
                        <TextField
                          id="standard-basic"
                          label="Cidade"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setCityEdit(e.target.value)}
                          value={cityEdit}
                        />
                        <TextField
                          id="standard-basic"
                          label="Estado"
                          style={{ width: "45%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setNeighborhoodEdit(e.target.value)}
                          value={neighborhoodEdit}
                        />
                        <TextField
                          id="standard-basic"
                          label="CEP"
                          style={{
                            width: "35%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setCepEdit(e.target.value)}
                          value={cepEdit}
                        />
                      </div>
                      <div style={{ marginRight: "12%", marginLeft: "12%" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<CancelIcon />}
                          onClick={handleCloseEdit}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          endIcon={<SaveIcon />}
                          onClick={EditarUsuario}
                        >
                          Salvar
                        </Button>
                      </div>
                    </form>
                  </div>
                </Fade>
              </Modal>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openPhoto}
                onClose={handleClosePhoto}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openPhoto}>
                  <div className={classes.paper}>
                    <h2
                      style={{
                        fontSize: 30,
                        fontFamily: "monospace",
                        textAlign: "center",
                        backgroundColor: "#287C43",
                        color: "#fff",
                        borderRadius: 10,
                      }}
                      id="transition-modal-title"
                    >
                      Editar Foto do Perfil
                    </h2>

                    <form
                      className={[classes.root]}
                      noValidate
                      autoComplete="off"
                    >
                      <div style={{ padding: 10 }}>
                        <TextField
                          id="standard-basic"
                          label="Foto de Perfil"
                          type="file"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setProfileEdit(e.target.files[0])}
                        />

              
                      </div>
                      <div style={{ marginRight: "12%", marginLeft: "12%" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<CancelIcon />}
                          onClick={handleClosePhoto}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          endIcon={<SaveIcon />}
                          onClick={EditarPhotoPerfil}
                        >
                          Salvar
                        </Button>
                      </div>
                    </form>
                  </div>
                </Fade>
              </Modal>

{/* modal senha */}
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openSenha}
                onClose={handleCloseSenha}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openSenha}>
                  <div className={classes.paper}>
                    <h2
                      style={{
                        fontSize: 30,
                        fontFamily: "monospace",
                        textAlign: "center",
                        backgroundColor: "#287C43",
                        color: "#fff",
                        borderRadius: 10,
                      }}
                      id="transition-modal-title"
                    >
                      Nova Senha
                    </h2>

                    <form
                      className={[classes.root]}
                      noValidate
                      autoComplete="off"
                    >
                      <div style={{ padding: 10 }}>
                        
                        <TextField
                          id="standard-basic"
                          label="Nova Senha"
                          type="password"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setConfirmPasswordEdit(e.target.value)}
                        />
                      </div>
                      <div style={{ marginRight: "12%", marginLeft: "12%" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<CancelIcon />}
                          onClick={handleCloseSenha}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          endIcon={<SaveIcon />}
                          onClick={EditarSenhaUser}
                        >
                          Salvar
                        </Button>
                      </div>
                    </form>
                  </div>
                </Fade>
              </Modal>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">TIPO</TableCell>
                      <TableCell align="center">CPF</TableCell>
                      <TableCell align="center">NOME</TableCell>
                      <TableCell align="center">EMAIL</TableCell>
                      <TableCell align="center">LOCALIDADE</TableCell>
                      <TableCell align="center">SITUAÇÃO</TableCell>
                      <TableCell align="center">OPÇÕES</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list.slice(0)
                      .reverse().map((row, i) => (
                      <TableRow key={row.id}>
                        <TableCell align="center" component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="center">
                          {row.admin === 0 ? "Padrão" : "Adm"}
                        </TableCell>
                        <TableCell align="center">{row.cpf}</TableCell>
                        <TableCell align="center">{`${row.name}  ${
                          row.surname === null ? "" : row.surname
                        }`}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{`${row.city}, ${row.neighborhood}`}</TableCell>
                        <TableCell align="center">
                          {row.active === '0' ? "Desativada" : "Ativa"}
                        </TableCell>
                     

                        <TableCell align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => ConfirmPhoto(row.id)}
                          >
                            <PhotoCameraIcon />
                            
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => ConfirmarSenhaEdit(row.id)}
                          >
                            <LockIcon />
                          </Button>
                          
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => ConfirmEdit(row.id)}
                          >
                            <CreateIcon />
                          </Button>
                          <Button
                            style={{ margin: "5px" }}
                            variant="contained"
                            color="secondary"
                            onClick={() => ConfirmDelete(row.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCard>
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openDel}
        onClose={handleCloseDel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* </Modal> <Modal open={openDel} onClose={handleCloseDel}> */}
        <div style={modalStyle} className={classes.paperTwo}>
          <center>
            <h1 style={{ fontSize: 25, margin: 15 }}>
              Deseja Realmente Excluir?
            </h1>

            <Button
              style={{ margin: "5px" }}
              variant="contained"
              color="secondary"
              onClick={handleCloseDel}
            >
              NÃO
            </Button>

            <Button
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
              onClick={() => deleteUser(idDel, refreshPage)}
            >
              SIM
            </Button>
          </center>
        </div>
      </Modal>
    </>
  );
}
