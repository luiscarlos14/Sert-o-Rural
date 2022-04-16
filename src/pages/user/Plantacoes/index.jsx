import StatusCard from "components/StatusCard";
import TableCard from "components/TableCard";

import constantes from "constantes";

import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import BugReportIcon from "@material-ui/icons/BugReport";
import Button from "@material-ui/core/Button";

import {
  getPlantacao,
  postPlantacao,
  editPlantacao,
  deletePlantacao,
} from "./services";

import React, { useEffect, useState } from "react";
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
}));

/* const unidades = [
  {
    value: "KG",
    label: "KG",
  },
  {
    value: "CAIXA",
    label: "CX",
  },
  {
    value: "UND",
    label: "UND",
  },
  {
    value: "SACO",
    label: "SACO",
  },
];
 */
export default function Plantacoes() {
  const [list, setList] = useState([]);

  const totalInsumos = list.length;

  const valorT = [];

  const valorTotal = () => {
    let valor = 0;
    for (let i = 0; i < list.length; i++) {
      valor = list[i].value;
      valorT.push(valor);
    }
  };

  valorTotal();

  const valorEstoque = valorT.reduce((total, numero) => total + numero, 0);

  useEffect(() => {
    getPlantacao()
      .then((result) => {
        setList(result);
      })
      .catch();
  }, []);

  console.log(list);

  function refreshPage(status, request) {
    if (status === 200 && request === "adicionado") {
      alert("Plantação Inserida");
      document.location.reload();
    } else if (status === 200 && request === "deletado") {
      alert("Plantação Excluída");
      document.location.reload();
    } else if (status === 200 && request === "editado") {
      alert("Plantação Editada");
      document.location.reload();
    }
  }

  const [descPlantacao, setDescPlantacao] = useState("");
  //const [pests, setPests] = useState("KG");
  const [date, setDate] = useState("");

  function savePlantacao() {
    postPlantacao(descPlantacao, new Date(date), refreshPage);
  }

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openBug, setOpenBug] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [openDel, setOpenDel] = React.useState(false);
  const [idDel, setIdDel] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /*  const handleOpenBug = () => {
    setOpenBug(true);
  }; */

  const handleCloseBug = () => {
    setOpenBug(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  /*  const handleChange = (event) => {
    setUnidade(event.target.value);
  }; */

  function ConfirmDelete(i) {
    setIdDel(i);
    handleOpenDel();
  }

  function ConfirmEdit(i) {
    for (let cont = 0; cont < list.length; cont++) {
      if (list[cont].id === i) {
        setDescPlantacaoEdit(list[cont].description);
        setDateEdit(list[cont].date);
        setIdEdit(list[cont].id);
      }
    }

    handleOpenEdit();
  }

  /* function AddBug(i) {
    for (let cont = 0; cont < list.length; cont++) {
      if (list[cont].id === i) {
        setDescInsumosEdit(list[cont].description);
        setDataCompraInsumoEdit(list[cont].purchase);
        setValidadeInsumoEdit(list[cont].validity);
        setEstoqueInsumoEdit(list[cont].stock);
        setValueInsumoEdit(list[cont].value);
        setIdEdit(list[cont].id);
      }
    }

    handleOpenBug();
  } */

  function EditarPlantacao() {
    editPlantacao(descPlantacaoEdit, new Date(dateEdit), idEdit, refreshPage);
  }

  const [descPlantacaoEdit, setDescPlantacaoEdit] = useState("");
  const [dateEdit, setDateEdit] = useState("");

  const [idEdit, setIdEdit] = useState("");

  const classes = useStyles();

  return (
    <>
 

      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div
            style={{ marginTop: "15%" }}
            className="grid grid-cols-1 px-4 mb-16"
          >
            <TableCard title="Plantações" color={constantes.colors.insumos}>
              <ButtonT
                color={"purple"}
                buttonType="filled"
                size="regular"
                style={{ marginBottom: 20 }}
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                onClick={handleOpen}
              >
                Adicionar Plantação
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
                        backgroundColor: constantes.colors.insumos,
                        color: "#fff",
                        borderRadius: 10,
                      }}
                      id="transition-modal-title"
                    >
                      Nova Plantação
                    </h2>

                    <form
                      className={[classes.root]}
                      noValidate
                      autoComplete="off"
                    >
                      <div style={{ padding: 10 }}>
                        <TextField
                          id="standard-basic"
                          label="Descrição"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setDescPlantacao(e.target.value)}
                        />

                        <TextField
                          id="date"
                          label="Data da Plantação"
                          type="date"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          defaultValue={new Date()}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setDate(e.target.value)}
                        />

                        {/* 
                        <TextField
                          id="standard-select-currency"
                          select
                          label="Unidade"
                          value={unidade}
                          onChange={handleChange}
                          style={{
                            width: "45%",
                           
                            marginBottom: 10,
                          }}
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
                          onClick={savePlantacao}
                        >
                          Salvar
                        </Button>
                      </div>
                    </form>
                  </div>
                </Fade>
              </Modal>

              {/* Modal Bug */}
              {/* <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openBug}
                onClose={handleCloseBug}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openBug}>
                  <div className={classes.paper}>
                    <h2
                      style={{
                        fontSize: 30,
                        fontFamily: "monospace",
                        textAlign: "center",
                        backgroundColor: constantes.colors.insumos,
                        color: "#fff",
                        borderRadius: 10,
                      }}
                      id="transition-modal-title"
                    >
                      Nova Praga
                    </h2>

                    <form
                      className={[classes.root]}
                      noValidate
                      autoComplete="off"
                    >
                      <div style={{ padding: 10 }}>
                        <TextField
                          id="standard-basic"
                          label="Descrição"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setDescInsumos(e.target.value)}
                        />

                        <TextField
                          id="date"
                          label="Data da Plantação"
                          type="date"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          defaultValue={new Date()}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setDataCompraInsumo(e.target.value)}
                        />





                        <TextField
                          id="standard-select-currency"
                          select
                          label="Unidade"
                          value={unidade}
                          onChange={handleChange}
                          style={{
                            width: "45%",
                           
                            marginBottom: 10,
                          }}
                        >
                          {unidades.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                     
                      </div>
                      <div style={{ marginRight: "12%", marginLeft: "12%" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<CancelIcon />}
                          onClick={handleCloseBug}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          endIcon={<SaveIcon />}
                          onClick={saveInsumo}
                        >
                          Salvar
                        </Button>
                      </div>
                    </form>
                  </div>
                </Fade>
              </Modal>
 */}
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
                        backgroundColor: constantes.colors.insumos,
                        color: "#fff",
                        borderRadius: 10,
                      }}
                      id="transition-modal-title"
                    >
                      Editar Plantação
                    </h2>

                    <form
                      className={[classes.root]}
                      noValidate
                      autoComplete="off"
                    >
                      <div style={{ padding: 10 }}>
                        <TextField
                          id="standard-basic"
                          label="Descrição"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setDescPlantacaoEdit(e.target.value)}
                          value={descPlantacaoEdit}
                        />

                        <TextField
                          id="date"
                          label="Data da Plantação"
                          type="date"
                          style={{
                            width: "45%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          defaultValue={new Date()}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setDateEdit(e.target.value)}
                          value={dateEdit}
                        />

                        {/* 
                        <TextField
                          id="standard-select-currency"
                          select
                          label="Unidade"
                          value={unidade}
                          onChange={handleChange}
                          style={{
                            width: "45%",
                           
                            marginBottom: 10,
                          }}
                        >
                          {unidades.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
 */}
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
                          onClick={EditarPlantacao}
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
                      <TableCell align="center">Descrição</TableCell>
                      <TableCell align="center">Data</TableCell>

                      <TableCell align="center">Pragas Encontradas</TableCell>

                      <TableCell align="center">Opções</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list.map((row, i) => (
                      <TableRow key={row.id}>
                        <TableCell align="center" component="th" scope="row">
                          {row.description}
                        </TableCell>

                        <TableCell align="center">
                          {moment(new Date(row.date))
                            .locale("pt-br")
                            .format("ddd, D [de] MMMM [de] YYYY")}
                        </TableCell>

                        <TableCell align="center" component="th" scope="row">
                          {row.pests}
                        </TableCell>

                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => {}}
                          >
                            <BugReportIcon />
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
              onClick={() => deletePlantacao(idDel, refreshPage)}
            >
              SIM
            </Button>
          </center>
        </div>
      </Modal>
    </>
  );
}
