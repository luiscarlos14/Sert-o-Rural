/* eslint-disable no-unreachable */
import StatusCard from "components/StatusCard";
import TableCard from "components/TableCard";

import "date-fns";

import React, { useEffect, useState } from "react";
import { getVendas, postVenda, EditVenda, deleteVenda } from "./services";
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

import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

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

const unidades = [
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

function time() {
  const timer = setTimeout(() => {
    document.location.reload();
  }, 3500);
  return () => clearTimeout(timer);
}

export default function Vendas() {
  const [list, setList] = useState([]);

  const totalVendas = list.length;

  const valorT = [];

  const valorTotal = () => {
    let valor = 0;
    for (let i = list.length - 1; i >= 0; i--) {
      valor = list[i].value * list[i].quantity;
      valorT.push(valor);
    }
  };

  function getTotal(i) {
    return valorT[i];
  }

  valorTotal();

  const ganhoTotal = valorT.reduce((total, numero) => total + numero, 0);
  useEffect(() => {
    getVendas()
      .then((result) => {
        setList(result);
      })
      .catch();
  }, []);

  function refreshPage(status, request) {
    if (status === 200 && request === "adicionado") {
      toast.success("Venda Inserida");
      time();
    } else if (status === 200 && request === "deletado") {
      toast.success("Venda Excluída");
      time();
    } else if (status === 200 && request === "editado") {
      toast.success("Venda Editada");
      time();
    }
  }

  const [descVenda, setDescVenda] = useState("");
  const [dataVenda, setDataVenda] = useState("");
  const [unidade, setUnidade] = useState("KG");
  const [qtdVenda, setQtdVenda] = useState("");
  const [valorVenda, setValorVenda] = useState("");
  const [comprador, setComprador] = useState("");

  function saveVenda() {
    if (
      descVenda === "" ||
      dataVenda === "" ||
      comprador === "" ||
      qtdVenda === "" ||
      valorVenda === "" ||
      unidade === ""
    ) {
      alert("Preencha todos os campos!");
    } else {
      postVenda(
        descVenda,
        new Date(dataVenda),
        comprador,
        qtdVenda,
        valorVenda,
        unidade,
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

  const handleChange = (event) => {
    setUnidade(event.target.value);
  };

  function ConfirmDelete(i) {
    setIdDel(i);
    handleOpenDel();
  }

  function ConfirmEdit(i) {
    for (let cont = 0; cont < list.length; cont++) {
      if (list[cont].id === i) {
        setDescEdit(list[cont].description);
        setDataEdit(list[cont].date);
        setUniEdit(list[cont].unit);
        setQtdEdit(list[cont].quantity);
        setValorEdit(list[cont].value);
        setCompradorEdit(list[cont].buyer);
        setIdEdit(list[cont].id);
      }
    }

    handleOpenEdit();
  }

  function EditarVenda() {
    EditVenda(
      descEdit,
      new Date(dataEdit),
      compradorEdit,
      qtdEdit,
      valorEdit,
      uniEdit,
      idEdit,
      refreshPage
    );
  }

  const [descEdit, setDescEdit] = useState("");
  const [dataEdit, setDataEdit] = useState("");
  const [uniEdit, setUniEdit] = useState("");
  const [qtdEdit, setQtdEdit] = useState("");
  const [valorEdit, setValorEdit] = useState("");
  const [compradorEdit, setCompradorEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");

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

      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div
            style={{ marginTop: "10%" }}
            className="grid grid-cols-1 px-4 mb-16"
          >
            <TableCard title="Vendas" color={constantes.colors.primary}>
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
                Adicionar Venda
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
                      Nova Venda
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
                          onChange={(e) => setDescVenda(e.target.value)}
                        />

                        <TextField
                          id="date"
                          label="Data"
                          type="date"
                          style={{ width: "100%", marginBottom: 10 }}
                          defaultValue={new Date()}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setDataVenda(e.target.value)}
                        />

                        <TextField
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
                        </TextField>

                        <TextField
                          id="standard-basic"
                          label="Quantidade"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setQtdVenda(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Valor Unidade"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setValorVenda(e.target.value)}
                          helperText="Use o ponto invés da virgula!"
                        />

                        <TextField
                          id="standard-basic"
                          label="Comprador"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setComprador(e.target.value)}
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
                          onClick={saveVenda}
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
                      Editar Venda
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
                          onChange={(e) => setDescEdit(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={descEdit}
                        />

                        <TextField
                          id="date"
                          label="Data"
                          type="date"
                          style={{ width: "100%", marginBottom: 10 }}
                          defaultValue={new Date()}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setDataEdit(e.target.value)}
                          value={dataEdit}
                        />

                        <TextField
                          id="standard-select-currency"
                          select
                          label="Unidade"
                          value={uniEdit}
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
                        </TextField>

                        <TextField
                          id="standard-basic"
                          label="Quantidade"
                          style={{ width: "45%", marginBottom: 10 }}
                          onChange={(e) => setQtdEdit(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={qtdEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="Valor Unidade"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setValorEdit(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={valorEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="Comprador"
                          style={{ width: "100%", marginBottom: 10 }}
                          onChange={(e) => setCompradorEdit(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={compradorEdit}
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
                          onClick={EditarVenda}
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
                      <TableCell align="center">Comprador</TableCell>
                      <TableCell align="center">Quantidade</TableCell>
                      <TableCell align="center">Valor</TableCell>
                      <TableCell align="center">Unidade</TableCell>
                      <TableCell align="center">Valor Total</TableCell>
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
                            {row.description}
                          </TableCell>
                          <TableCell align="center">
                            {moment(new Date(row.date))
                              .locale("pt-br")
                              .format(`ddd, DD [de] MMMM [de] YYYY`)}
                          </TableCell>
                          <TableCell align="center">{row.buyer}</TableCell>
                          <TableCell align="center">{row.quantity}</TableCell>
                          <TableCell align="center">{row.value}</TableCell>
                          <TableCell align="center">{row.unit}</TableCell>
                          <TableCell align="center">{`R$ ${getTotal(i)}`}</TableCell>

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
              onClick={() => deleteVenda(idDel, refreshPage)}
            >
              SIM
            </Button>
          </center>
        </div>
      </Modal>
    </>
  );
}
