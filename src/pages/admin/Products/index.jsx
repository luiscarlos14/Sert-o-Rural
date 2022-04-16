/* eslint-disable no-unreachable */
import StatusCard from "components/StatusCard";
import TableCard from "components/TableCard";

import "date-fns";

import React, { useEffect, useState } from "react";
import { getProdutos, getFornecedor, EditPhotoProduto, postProduto, EditProduto, deleteProduto } from "./services";
import constantes from "constantes";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

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

import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";

import moment from "moment";
import "moment/locale/pt-br";

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
  alerta: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    date: {},
  },
}));



 const categorias = [
  {
    value: "Adubos",
    label: "Adubos",
  },
  {
    value: "Fertilizantes",
    label: "Fertilizantes",
  },
  {
    value: "Acessorios",
    label: "Acessórios",
  },
]; 

export default function Produtos() {
  const [list, setList] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const totalProdutos = list.length;

  useEffect(() => {
    getProdutos()
      .then((result) => {
        setList(result);
      })
      .catch();
  }, []);

  useEffect(() => {
    getFornecedor()
      .then((result) => {
        setFornecedores(result);
      })
      .catch();
  }, []);

 // useEffect(()=>{units()}, [])

function units(){
  const fornecedoresList = [];
  for(let i = 0; i < fornecedores.length; i++){
    fornecedoresList.push( 
    
      {value: fornecedores[i].id,
      label: fornecedores[i].name,}
    )
  }
  return fornecedoresList;
}

  function refreshPage(status, request) {
    if (status === 200 && request === "adicionado") {
      alert("Produto Inserido");
      document.location.reload();
    } else if (status === 200 && request === "deletado") {
      alert("Produto Excluído");
      document.location.reload();
    } else if (status === 200 && request === "editado") {
      alert("Produto Editado");
      document.location.reload();
    }else if (status === 200 && request === "photo") {
      alert("Foto Editada");
      document.location.reload();
    }
  }

  const [descProduto, setDescProduto] = useState("");
  const [nameProduto, setNameProduto] = useState("");
  const [categoryProduto, setCategoryProduto] = useState("Adubos");
  const [supplierProduto, setSupplierProduto] = useState();
  const [valueProduto, setValueProduto] = useState("");
  const [unitProduto, setUnitProduto] = useState("");
  const [photoProduto, setPhotoProduto] = useState(null);

  function saveFornecedor() {
    if (
      descProduto === "" ||
      nameProduto === "" ||
      categoryProduto === "" ||
      supplierProduto === "" ||
      valueProduto === "" ||
      unitProduto === "" 
    ) {
      alert("Preencha todos os campos!");
    } else {
      postProduto(
        supplierProduto,
        descProduto,
        valueProduto,
        unitProduto,
        categoryProduto,
        nameProduto,
        photoProduto,
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

  const handleChangeCategory = (event) => {
    setCategoryProduto(event.target.value);
  };
  const handleChangeSupplier = (event) => {
    setSupplierProduto(event.target.value);
  };

  const handleChangeCategoryEdit = (event) => {
    setCategoryProdutoEdit(event.target.value);
  };
  const handleChangeSupplierEdit = (event) => {
    setSupplierProdutoEdit(event.target.value);
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
        setDescProdutoEdit(list[cont].description);
        setNameProdutoEdit(list[cont].name);
        setCategoryProdutoEdit(list[cont].category);
        setSupplierProdutoEdit(list[cont].supplier);
        setValueProdutoEdit(list[cont].value);
        setUnitProdutoEdit(list[cont].unit);
        setIdEdit(list[cont].id);
      }
    }

    handleOpenEdit();
  }

  function EditarProduto() {
    EditProduto(
      supplierProdutoEdit,
      descProdutoEdit,
      valueProdutoEdit,
      unitProdutoEdit,
      categoryProdutoEdit,
      nameProdutoEdit,
      idEdit,
      refreshPage
    );
  }

  const [descProdutoEdit, setDescProdutoEdit] = useState("");
  const [nameProdutoEdit, setNameProdutoEdit] = useState("");
  const [categoryProdutoEdit, setCategoryProdutoEdit] = useState("");
  const [supplierProdutoEdit, setSupplierProdutoEdit] = useState();
  const [valueProdutoEdit, setValueProdutoEdit] = useState("");
  const [unitProdutoEdit, setUnitProdutoEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");

  const [photoProdutoEdit, setPhotoProdutoEdit] = useState(null);
  const [idEditPhoto, setIdEditPhoto] = useState("");

  function EditarPhotoProduto() {
    EditPhotoProduto(
      photoProdutoEdit,
      idEditPhoto,
      refreshPage
      )
  }

  const classes = useStyles();

  return (
    <>
    <div className="container mx-auto max-w-full"></div>
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
            title="Total de Produtos"
            amount={totalProdutos}
          //  percentage="3.48 %"
           // percentageIcon="arrow_upward"
           // percentageColor="green"
            //date="Mês Passado"
          />
        </div>

        </div>
      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div
            style={{ marginTop: "10%" }}
            className="grid grid-cols-1 px-4 mb-16"
          >
            <TableCard title="Produtos" color={constantes.colors.primary}>
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
                Adicionar Produto
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
                      Novo Produto
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
                          style={{ width: "45%", marginRight: '10%', marginBottom: 10 }}
                          onChange={(e) => setNameProduto(e.target.value)}
                        />

                          <TextField
                          id="standard-select-currency"
                          select
                          label="Categoria"
                          value={categoryProduto}
                          onChange={handleChangeCategory}
                          style={{
                            width: "45%",
                
                            marginBottom: 10,
                          }}
                        >
                          {categorias.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>



                         <TextField
                          id="standard-basic"
                          label="Descrição"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setDescProduto(e.target.value)}
                        />

                    
                        <TextField
                          id="standard-select-currency"
                          select
                          label="Fornecedor"
                          value={supplierProduto}
                          onChange={handleChangeSupplier}
                          style={{
                            width: "45%",
                            marginRight: 32,
                            marginBottom: 10,
                          }}
                        >
                          {units().map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          id="standard-basic"
                          label="Unidade"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setUnitProduto(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Valor do Produto"
                          style={{ width: "50%", marginBottom: 10 }}
                          onChange={(e) => setValueProduto(e.target.value)}
                          helperText="Use o ponto invés da virgula!"
                        />

                        <TextField
                          id="standard-basic"
                          label="Foto do Produto"
                          type="file"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setPhotoProduto(e.target.files[0])}
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
                      Editar Produto
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
                          style={{ width: "45%", marginRight: '10%', marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setNameProdutoEdit(e.target.value)}
                          value={nameProdutoEdit}
                        />

                          <TextField
                          id="standard-select-currency"
                          select
                          label="Categoria"
                          value={categoryProdutoEdit}
                          onChange={handleChangeCategoryEdit}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{
                            width: "45%",
                
                            marginBottom: 10,
                          }}
                        >
                          {categorias.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>



                         <TextField
                          id="standard-basic"
                          label="Descrição"
                          style={{ width: "100%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setDescProdutoEdit(e.target.value)}
                          value={descProdutoEdit}
                        />

                    
                        <TextField
                          id="standard-select-currency"
                          select
                          label="Fornecedor"
                          value={supplierProdutoEdit}
                          onChange={handleChangeSupplierEdit}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{
                            width: "45%",
                            marginRight: 32,
                            marginBottom: 10,
                          }}
                        >
                          {units().map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          id="standard-basic"
                          label="Unidade"
                          style={{ width: "45%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setUnitProdutoEdit(e.target.value)}
                          value={unitProdutoEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="Valor do Produto"
                          style={{ width: "50%", marginBottom: 10 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setValueProdutoEdit(e.target.value)}
                          value={valueProdutoEdit}
                          helperText="Use o ponto invés da virgula!"
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
                          onClick={EditarProduto}
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
                          onClick={EditarPhotoProduto}
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
                      <TableCell align="center">Fornecedor</TableCell>
                      <TableCell align="center">Categoria</TableCell>
                      <TableCell align="center">Nome</TableCell>
                      <TableCell align="center">Descrição</TableCell>
                      <TableCell align="center">Unidade</TableCell>
                      <TableCell align="center">Valor</TableCell>
                      <TableCell align="center">Opções</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list
                      .slice(0)
                      .reverse()
                      .map((row, i) => (
                        <TableRow key={row.id}>

                          <TableCell align="center" component="th" scope="row">

                            {

                            fornecedores.map((forn) => {
                              return forn.id === row.supplier ? forn.name : ''
                            })
                            
                            }

                          </TableCell>
                          
                          <TableCell align="center">{row.category}</TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.description}</TableCell>
                          <TableCell align="center">{row.unit}</TableCell>
                          <TableCell align="center">{row.value}</TableCell>

                          <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => ConfirmEditPhoto(row.id)}
                          >
                            <PhotoCameraIcon />
                            
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
              onClick={() => deleteProduto(idDel, refreshPage)}
            >
              SIM
            </Button>
          </center>
        </div>
      </Modal>
    </>
  );
}
