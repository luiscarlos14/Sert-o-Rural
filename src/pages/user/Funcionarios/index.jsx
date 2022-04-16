/* eslint-disable no-unreachable */
import TableCard from "components/TableCard";

import "date-fns";

import React, { useEffect, useState } from "react";
import { getFuncionarios, postFuncionarios, editFuncionarios, deleteFuncionario } from "./services";
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
  alerta: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    date: {},
  },
}));



export default function Funcionarios() {
  const [list, setList] = useState([]);


  const valorT = [];

  const valorTotal = () => {
    let valor = 0;
    for (let i = list.length - 1; i >= 0; i--) {
      valor = list[i].Workeddays * list[i].wage;
      valorT.push(valor);
    }
  };

  function getTotal(i) {
    return valorT[i];
  }

  valorTotal();



  function refreshPage(status, request) {
    if (status === 200 && request === "adicionado") {
      alert("Funcionário Inserido");
      document.location.reload();
    } else if (status === 200 && request === "deletado") {
      alert("Funcionário Excluído");
      document.location.reload();
    } else if (status === 200 && request === "editado") {
      alert("Funcionário Editado");
      document.location.reload();
    }
  }

  const [name, setName] = useState("");
  const [diaria, setDiaria] = useState("");
  const [diasTrabalhados, setDiasTrabalhados] = useState("KG");
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  function saveFuncionario() {
    if (
        name === "" ||
        diaria === "" ||
        diasTrabalhados === "" ||
        rua === "" ||
        estado === "" ||
        cidade === "" ||
        cep === ""
    ) {
      alert("Preencha todos os campos!");
    } else {
      postFuncionarios(
        name,
        diaria,
        diasTrabalhados,
        rua,
        estado,
        cidade,
        cep,
        refreshPage
      );
    }
  }

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
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
        setNameEdit(list[cont].name);
        setDiariaEdit(list[cont].wage);
        setDiasTrabalhadosEdit(list[cont].Workeddays);
        setRuaEdit(list[cont].street);
        setCidadeEdit(list[cont].city);
        setEstadoEdit(list[cont].neighborhood);
        setCepEdit(list[cont].cep);
        setIdEdit(i);
      }
    }

    handleOpenEdit();
  }

  function EditarFuncionario() {
    editFuncionarios(
      nameEdit,
      diariaEdit,
      diasTrabalhadosEdit,
      ruaEdit,
      estadoEdit,
      cidadeEdit,
      cepEdit,
      idEdit,
      refreshPage
    );
  }

  const [nameEdit, setNameEdit] = useState("");
  const [diariaEdit, setDiariaEdit] = useState("");
  const [diasTrabalhadosEdit, setDiasTrabalhadosEdit] = useState("KG");
  const [ruaEdit, setRuaEdit] = useState("");
  const [cidadeEdit, setCidadeEdit] = useState("");
  const [estadoEdit, setEstadoEdit] = useState("");
  const [cepEdit, setCepEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");
  

  const classes = useStyles();

  return (
    <>
      {/* <div
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
            title="Vendas Realizadas"
            amount={`${totalVendas}`}
          //  percentage="3.48 %"
           // percentageIcon="arrow_upward"
           // percentageColor="green"
            //date="Mês Passado"
          />
        </div>

        <div style={{ flex: 1 }}>
          <StatusCard
            color="purple"
            icon="paid"
            title="Ganho Total"
            // eslint-disable-next-line no-useless-concat
            amount={"R$ " + `${ganhoTotal}`}
            //percentage="3.48"
            //percentageIcon="arrow_downward"
            //percentageColor="red"
            //date="Since last week"
          />
        </div>
      </div>
 */}
      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div
            style={{ marginTop: "10%" }}
            className="grid grid-cols-1 px-4 mb-16"
          >
            <TableCard title="Funcionários" color={constantes.colors.primary}>
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
                Novo Funcionário
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
                      Novo Funcionário
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
                          onChange={(e) => setName(e.target.value)}
                        />


                        <TextField
                          id="standard-basic"
                          label="Diária"
                          style={{ width: "45%", marginRight: "10%", marginBottom: 10 }}
                          onChange={(e) => setDiaria(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Dias Trabalhados"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setDiasTrabalhados(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Endereço"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setRua(e.target.value)}
                        />

                          <TextField
                          id="standard-basic"
                          label="Cidade"
                          style={{ width: "45%", marginRight: "10%", marginBottom: 10 }}
                          onChange={(e) => setCidade(e.target.value)}
                        />
                          <TextField
                          id="standard-basic"
                          label="Estado"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setEstado(e.target.value)}
                        />
                          <TextField
                          id="standard-basic"
                          label="Cep"
                          style={{ width: "30%", marginBottom: 10 }}
                          onChange={(e) => setCep(e.target.value)}
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
                          onClick={saveFuncionario}
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
                onClose={handleClose}
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
                      Editar Funcionário
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
                          onChange={(e) => setNameEdit(e.target.value)}
                          value={nameEdit}
                        />

                     {/*    <TextField
                          id="date"
                          label="Data"
                          type="date"
                          style={{ width: "100%", marginBottom: 10 }}
                          defaultValue={new Date()}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setDataVenda(e.target.value)}
                        /> */}

                   {/*      <TextField
                          id="standard-select-currency"
                          select
                          label="Unidade"
                          value={unidade}
                          onChange={handleChange}
                          style={{
                            width: "45%",
                            marginRight: 32,
                            marginBottom: 10,
                          }}
                        >
                          {unidades.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField> */}

                        <TextField
                          id="standard-basic"
                          label="Diária"
                          style={{ width: "45%", marginRight: "10%", marginBottom: 10 }}
                          onChange={(e) => setDiariaEdit(e.target.value)}
                          value={diariaEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="Dias Trabalhados"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setDiasTrabalhadosEdit(e.target.value)}
                          value={diasTrabalhadosEdit}

                        />

                        <TextField
                          id="standard-basic"
                          label="Endereço"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setRuaEdit(e.target.value)}
                          value={ruaEdit}
                        />

                          <TextField
                          id="standard-basic"
                          label="Cidade"
                          style={{ width: "45%", marginRight: "10%", marginBottom: 10 }}
                          onChange={(e) => setCidadeEdit(e.target.value)}
                          value={cidadeEdit}
                        />
                          <TextField
                          id="standard-basic"
                          label="Estado"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setEstadoEdit(e.target.value)}
                          value={estadoEdit}
                        />
                          <TextField
                          id="standard-basic"
                          label="Cep"
                          style={{ width: "30%", marginBottom: 10 }}
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
                          onClick={EditarFuncionario}
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
                      <TableCell align="center">Nome</TableCell>
                      <TableCell align="center">Diária</TableCell>
                      <TableCell align="center">Dias Trabalhados</TableCell>
                      <TableCell align="center">Total Pago</TableCell>
                      <TableCell align="center">Endereço</TableCell>
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
                            {row.name}
                          </TableCell>
                          <TableCell align="center">{row.wage}</TableCell>
                          <TableCell align="center">{row.Workeddays}</TableCell>
                          <TableCell align="center">{getTotal(i)}</TableCell>
                          <TableCell align="center">{`${row.street}, ${row.city}`}</TableCell>

                          <TableCell align="center">
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
              onClick={() => deleteFuncionario(idDel, refreshPage)}
            >
              SIM
            </Button>
          </center>
        </div>
      </Modal>
    </>
  );
}
