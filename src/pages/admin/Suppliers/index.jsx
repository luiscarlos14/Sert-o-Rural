import StatusCard from "components/StatusCard";
import TableCard from "components/TableCard";

import React, { useEffect, useState } from "react";
import { deleteFornecedor, EditFornecedor,EditPhotoFornecedor, getFornecedores, postFornecedores } from "./services";
import constantes from "constantes";

import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";

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

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
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

/* const unidades = [
  {
    value: 'KG',
    label: 'KG',
  },
  {
    value: 'CAIXA',
    label: 'CX',
  },
  {
    value: 'UND',
    label: 'UND',
  },
]; */

export default function Fornecedores() {
  const [list, setList] = useState([]);

  const totalFornecedores = list.length;

  useEffect(() => {
    getFornecedores()
      .then((result) => {
        setList(result);
      })
      .catch();
  }, []);

  function refreshPage(status, request) {
    if (status === 200 && request === "adicionado") {
      alert("Fornecedor Inserido");
      document.location.reload();
    } else if (status === 200 && request === "deletado") {
      alert("Fornecedor Excluído");
      document.location.reload();
    } else if (status === 200 && request === "editado") {
      alert("Fornecedor Editado");
      document.location.reload();
    }else if (status === 200 && request === "photo") {
      alert("Foto Editada");
      document.location.reload();
    }
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("KG");
  const [cnpj, setCnpj] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("KG");
  const [cep, setCep] = useState("");
  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  function saveFornecedor() {
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      cnpj === "" ||
      description === "" ||
      street === "" ||
      neighborhood === "" ||
      city === "" ||
      cep === "" ||
      url === "" 
    ) {
      alert("Preencha todos os campos!");
    } else {
      postFornecedores(
        name,
        email,
        phone,
        cnpj,
        description,
        street,
        neighborhood,
        city,
        cep,
        url,
        selectedFile,
        refreshPage
      );
    }
  }

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openEditPhoto, setOpenEditPhoto] = React.useState(false);
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

  const handleOpenEditPhoto = () => {
    setOpenEditPhoto(true);
  };

  const handleCloseEditPhoto = () => {
    setOpenEditPhoto(false);
  };

  const handleOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  function ConfirmDelete(i) {
    setIdDel(i);
    handleOpenDel();
  }

  function ConfirmEditPhoto(i) {
    setIdEditPhoto(i);
    handleOpenEditPhoto();
  }

  function ConfirmEdit(i) {
    for (let cont = 0; cont < list.length; cont++) {

      if (list[cont].id === i) {
        setNameEdit(list[cont].name);
        setEmailEdit(list[cont].email);
        setPhoneEdit(list[cont].phone);
        setCnpjEdit(list[cont].cnpj);
        setDescriptionEdit(list[cont].description);
        setStreetEdit(list[cont].street);
        setNeighborhoodEdit(list[cont].neighborhood);
        setCityEdit(list[cont].city);
        setCepEdit(list[cont].cep);
        setUrlEdit(list[cont].url);
        setIdEdit(list[cont].id);

      }
    }

    handleOpenEdit();
  }

  function EditarFornecedor() {
    EditFornecedor(
      nameEdit,
      emailEdit,
      phoneEdit,
      cnpjEdit,
      descriptionEdit,
      streetEdit,
      neighborhoodEdit,
      cityEdit,
      cepEdit,
      urlEdit,
      idEdit,
      refreshPage
    );
  }

  const [nameEdit, setNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [phoneEdit, setPhoneEdit] = useState("");
  const [cnpjEdit, setCnpjEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [streetEdit, setStreetEdit] = useState("");
  const [neighborhoodEdit, setNeighborhoodEdit] = useState("");
  const [cityEdit, setCityEdit] = useState("");
  const [cepEdit, setCepEdit] = useState("");
  const [urlEdit, setUrlEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");

  const [photoProdutoEdit, setPhotoProdutoEdit] = useState(null);
  const [idEditPhoto, setIdEditPhoto] = useState("");

  function EditarPhotoFornecedor() {
    EditPhotoFornecedor(
      photoProdutoEdit,
      idEditPhoto,
      refreshPage
      )
  }

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
            title="Fornecedores"
            amount={`${totalFornecedores}`}
            //  percentage="3.48 %"
            // percentageIcon="arrow_upward"
            // percentageColor="green"
            //date="Mês Passado"
          />
        </div>
      </div>

      <div style={{ marginTop: "3%" }} className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <TableCard title="Fornecedores" color={constantes.colors.primary}>
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
                Novo Fornecedor
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
                      Novo Fornecedor
                    </h2>

                    <form
                      className={[classes.root]}
                      noValidate
                      autoComplete="off"
                    >
                      <div style={{ padding: 10 }}>
                      <TextField
                          id="standard-basic"
                          label="Logo"
                          type='file'
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                        />

                        <TextField
                          id="standard-basic"
                          label="Nome"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Email"
                          type="e-mail"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Telefone"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          onChange={(e) => setPhone(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="CNPJ"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setCnpj(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Descrição"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setDescription(e.target.value)}
                        />
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
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          onChange={(e) => setCep(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Site"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setUrl(e.target.value)}
                        />

                        {/*       <TextField
                        id="standard-select-currency"
                        select
                        label="Unidade"
                        value={unidade}
                        onChange={handleChange}
                        style={{width: '45%',marginRight: 32, marginBottom: 10}} 
                      >
                        {unidades.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField> */}
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
                          onClick={saveFornecedor}
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
                      Editar Fornecedor
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
                          style={{ width: "100%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setNameEdit(e.target.value)}
                          value={nameEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="Email"
                          type="e-mail"
                          style={{ width: "100%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setEmailEdit(e.target.value)}
                          value={emailEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="Telefone"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setPhoneEdit(e.target.value)}
                          value={phoneEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="CNPJ"
                          style={{ width: "45%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setCnpjEdit(e.target.value)}
                          value={cnpjEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="Descrição"
                          style={{ width: "100%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setDescriptionEdit(e.target.value)}
                          value={descriptionEdit}
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
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setCepEdit(e.target.value)}
                          value={cepEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="Site"
                          style={{ width: "45%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setUrlEdit(e.target.value)}
                          value={urlEdit}
                        />

                        {/*       <TextField
                        id="standard-select-currency"
                        select
                        label="Unidade"
                        value={unidade}
                        onChange={handleChange}
                        style={{width: '45%',marginRight: 32, marginBottom: 10}} 
                      >
                        {unidades.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField> */}
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
                          onClick={EditarFornecedor}
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
                open={openEditPhoto}
                onClose={handleCloseEditPhoto}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openEditPhoto}>
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
                      Editar Foto
                    </h2>

                    <form
                      className={[classes.root]}
                      noValidate
                      autoComplete="off"
                    >
                      <div style={{ padding: 10 }}>
                      <TextField
                          id="standard-basic"
                          label="Foto do Produto"
                          type="file"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setPhotoProdutoEdit(e.target.files[0])}
                        />
                      
                      </div>
                      <div style={{ marginRight: "12%", marginLeft: "12%" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<CancelIcon />}
                          onClick={handleCloseEditPhoto}
                        >
                          Cancelar
                        </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          endIcon={<SaveIcon />}
                          onClick={EditarPhotoFornecedor}
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
                      <TableCell align="center">NOME</TableCell>
                      <TableCell align="center">CNPJ</TableCell>
                      <TableCell align="center">TELEFONE</TableCell>
                      <TableCell align="center">EMAIL</TableCell>
                      <TableCell align="center">LOCALIDADE</TableCell>
                      <TableCell align="center">SITE</TableCell>
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
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.cnpj}</TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{`${row.city}, ${row.neighborhood}`}</TableCell>
                        <TableCell align="center">{row.url}</TableCell>

                        <TableCell align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => ConfirmEditPhoto(row.id)}
                          >
                            <AddAPhotoIcon />
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
              onClick={() => deleteFornecedor(idDel, refreshPage)}
            >
              SIM
            </Button>
          </center>
        </div>
      </Modal>

    </>
  );
}
