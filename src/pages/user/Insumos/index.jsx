import StatusCard from "components/StatusCard";
import TableCard from "components/TableCard";

import constantes from "constantes";

import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";

import {
  getInsumos,
  postInsumos,
  editInsumos,
  deleteInsumos,
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

export default function Insumos() {
  const [list, setList] = useState([]);

  const totalInsumos = list.length;

  const valorT = [];

  const valorTotal = () => {
    let valor = 0;
    for (let i = list.length - 1; i >= 0; i--) {
      valor = list[i].stock * list[i].value;
      valorT.push(valor);
    }
  };

  function getTotal(i) {
    return valorT[i];
  }

  valorTotal();

  const valorEstoque = valorT.reduce((total, numero) => total + numero, 0);

  useEffect(() => {
    getInsumos()
      .then((result) => {
        setList(result);
      })
      .catch();
  }, []);

 


  function refreshPage(status, request) {
    if (status === 200 && request === "adicionado") {
      alert("Insumo Inserida");
      document.location.reload();
    } else if (status === 200 && request === "deletado") {
      alert("Insumo Excluída");
      document.location.reload();
    } else if (status === 200 && request === "editado") {
      alert("Insumo Editada");
      document.location.reload();
    }
  }

  const [descInsumos, setDescInsumos] = useState("");
  const [unidade, setUnidade] = useState("KG");
  const [dataCompraInsumo, setDataCompraInsumo] = useState("");
  const [validadeInsumo, setValidadeInsumo] = useState("");
  const [estoqueInsumo, setEstoqueInsumo] = useState("");
  const [valueInsumo, setValueInsumo] = useState("");

  function saveInsumo() {
    postInsumos(
      estoqueInsumo,
      valueInsumo,
      descInsumos,
      dataCompraInsumo,
      validadeInsumo,
      unidade,
      refreshPage
    );
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
        setDescInsumosEdit(list[cont].description);
        setDataCompraInsumoEdit(list[cont].purchase);
        setValidadeInsumoEdit(list[cont].validity);
        setEstoqueInsumoEdit(list[cont].stock);
        setValueInsumoEdit(list[cont].value);
        setIdEdit(list[cont].id);
      }
    }

    handleOpenEdit();
  }

  function EditarInsumo() {
    editInsumos(
      estoqueInsumoEdit,
      valueInsumoEdit,
      descInsumosEdit,
      new Date(dataCompraInsumoEdit),
      new Date(validadeInsumoEdit),
      unidade,
      idEdit,
      refreshPage
    );
  }

  const [descInsumosEdit, setDescInsumosEdit] = useState("");
  const [dataCompraInsumoEdit, setDataCompraInsumoEdit] = useState("");
  const [validadeInsumoEdit, setValidadeInsumoEdit] = useState("");
  const [estoqueInsumoEdit, setEstoqueInsumoEdit] = useState("");
  const [valueInsumoEdit, setValueInsumoEdit] = useState("");
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
            title="Total de Insumos"
            amount={`${totalInsumos}`}
           // percentage="3.48 %"
           // percentageIcon="arrow_upward"
            //percentageColor="green"
           /// date="Mês Passado"
          />
        </div>
        <div style={{ flex: 1 }}>
          <StatusCard
            color="purple"
            icon="paid"
            title="Valor em Estoque"
            // eslint-disable-next-line no-useless-concat
            amount={"R$ " + `${valorEstoque}`}
          ///  percentage="3.48"
          ///  percentageIcon="arrow_downward"
           //// percentageColor="red"
           /// date="Since last week"
          />
        </div>
      
      </div>

      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div
            style={{ marginTop: "10%" }}
            className="grid grid-cols-1 px-4 mb-16"
          >
            <TableCard title="Insumos" color={constantes.colors.insumos}>
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
                Adicionar Insumo
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
                      Novo Insumo
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
                          label="Data da Compra"
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
                          id="date"
                          label="Data de Validade"
                          type="date"
                          style={{ width: "45%", marginBottom: 10 }}
                          defaultValue={new Date()}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setValidadeInsumo(e.target.value)}
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
                          style={{ width: "40%", marginBottom: 10 }}
                          onChange={(e) => setEstoqueInsumo(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Valor"
                          style={{
                            width: "40%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          onChange={(e) => setValueInsumo(e.target.value)}
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
                          onClick={saveInsumo}
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
                        backgroundColor: constantes.colors.insumos,
                        color: "#fff",
                        borderRadius: 10,
                      }}
                      id="transition-modal-title"
                    >
                      Editar Insumo
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
                          onChange={(e) => setDescInsumosEdit(e.target.value)}
                          value={descInsumosEdit}
                        />

                        <TextField
                          id="date"
                          label="Data da Compra"
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
                          onChange={(e) =>
                            setDataCompraInsumoEdit(e.target.value)
                          }
                          value={dataCompraInsumoEdit}
                        />

                        <TextField
                          id="date"
                          label="Data de Validade"
                          type="date"
                          style={{ width: "45%", marginBottom: 10 }}
                          defaultValue={new Date()}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) =>
                            setValidadeInsumoEdit(e.target.value)
                          }
                          value={validadeInsumoEdit}
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
                          style={{ width: "40%", marginBottom: 10 }}
                          onChange={(e) => setEstoqueInsumoEdit(e.target.value)}
                          value={estoqueInsumoEdit}
                        />

                        <TextField
                          id="standard-basic"
                          label="Valor"
                          style={{
                            width: "40%",
                            marginRight: "10%",
                            marginBottom: 10,
                          }}
                          onChange={(e) => setValueInsumoEdit(e.target.value)}
                          value={valueInsumoEdit}
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
                          onClick={EditarInsumo}
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
                      <TableCell align="center">Data da Compra</TableCell>

                      <TableCell align="center">Validade</TableCell>
                      <TableCell align="center">Em Estoque</TableCell>
                      <TableCell align="center">Valor Unitário</TableCell>
                      <TableCell align="center">Valor Total</TableCell>
                      <TableCell align="center">Unidade</TableCell>
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
                          {moment(new Date(row.purchase))
                            .locale("pt-br")
                            .format("ddd, D [de] MMMM [de] YYYY")}
                        </TableCell>

                        <TableCell align="center">
                          {moment(new Date(row.validity))
                            .locale("pt-br")
                            .format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row.stock}
                        </TableCell>
                        <TableCell align="center">{row.value}</TableCell>
                        <TableCell align="center">{getTotal(i)}</TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row.unit}
                        </TableCell>

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
              onClick={() => deleteInsumos(idDel, refreshPage)}
            >
              SIM
            </Button>
          </center>
        </div>
      </Modal>
    </>
  );
}
