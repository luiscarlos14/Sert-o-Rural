import React, { useState, useEffect } from "react";
import StatusCard from "components/StatusCard";
import ChartLine from "components/ChartLine";
import ChartBar from "components/ChartBar";
import PageVisitsCard from "components/PageVisitsCard";
import TrafficCard from "components/TrafficCard";
import { makeStyles } from "@material-ui/core/styles";
import constantes from "../../../constantes";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableCard from "components/TableCard";

import { getVendas, getDespesas, getPlantacao } from "./services";

import culturas from '../../../melhoresPlantacoes';

import moment from "moment";
import "moment/locale/pt-br";

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
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  
  const mesAtual = new Date().getMonth() + 1;

  const [list, setList] = useState([]);
  const [despesas, setDespesas] = useState([]);
  
  const despesasPendentes = [];

  const [plantacao, setPlantacao] = useState([]);

  const valorT = [];

  const valorTotal = () => {
    let valor = 0;
    for (let i = list.length - 1; i >= 0; i--) {
      if (new Date(list[i].date).getMonth() + 1 === mesAtual) {
        valor = list[i].value * list[i].quantity;
        valorT.push(valor);
      }
    }
  };

  valorTotal();

  const valorDes = [];

  const valorTotalDes = () => {
    let valor = 0;
    for (let i = despesas.length - 1; i >= 0; i--) {
      if (new Date(despesas[i].date).getMonth() + 1 === mesAtual) {
        valor = despesas[i].value;
        valorDes.push(valor);
      }
    }
  };

  valorTotalDes();

  const ganhoTotal = valorT.reduce((total, numero) => total + numero, 0);

  const DespesaTotal = valorDes.reduce((total, numero) => total + numero, 0);

  console.log(DespesaTotal);

  useEffect(() => {
    getVendas()
      .then((result) => {
        setList(result);
      })
      .catch();
  }, []);

  useEffect(() => {
    getDespesas()
      .then((result) => {
        setDespesas(result);
      })
      .catch();
  }, []);

  useEffect(() => {
    for (let i = 0; i < despesas.length; i++) {
      if (despesas[i].pay === 0) {
        despesasPendentes.push(despesas[i]);
      }
    }
  }, [despesas, despesasPendentes]);

  return (
    <>
      <div className="bg-white-500 px-3 md:px-8 h-40" />

      <div style={{ marginTop: "5%" }} className="px-3 md:px-8 -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
              <ChartLine />
            </div>
            {/*  <div style={{marginTop: '3%'}}  className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <ChartBar />
                        </div> */}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "3%" }} className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <StatusCard
                color="green"
                icon="trending_up"
                title="Ganhos do Mês"
                amount={`R$ ${ganhoTotal}`}
                percentage="Ganhos em"
                percentageIcon="arrow_upward"
                percentageColor="green"
                date={moment(new Date())
                  .locale("pt-br")
                  .format(` MMMM [de] YYYY`)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <StatusCard
                color="red"
                icon="money_off"
                title="Despesas do Mês"
                amount={`R$ ${DespesaTotal}`}
                percentage="Despesas em "
                percentageIcon="arrow_downward"
                percentageColor="red"
                date={moment(new Date())
                  .locale("pt-br")
                  .format(` MMMM [de] YYYY`)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <StatusCard
                color="purple"
                icon="paid"
                title="Saldo do Mês"
                amount={`R$ ${ganhoTotal - DespesaTotal}`}
                percentage="Saldo do mês de"
                percentageIcon="account_balance_wallet"
                percentageColor="purple"
                date={moment(new Date())
                  .locale("pt-br")
                  .format(` MMMM [de] YYYY`)}
              />
            </div>

            {/*   <StatusCard
                            color="blue"
                            icon="poll"
                            title="Performance"
                            amount="49,65%"
                            percentage="12"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        /> */}
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div
            style={{ marginTop: "10%" }}
            className="grid grid-cols-1 px-4 mb-16"
          >
            <TableCard
              title="Despesas Pendentes"
              color={constantes.colors.despesas}
            >
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
                      <TableCell align="center">Valor</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Vencimento</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {despesas
                      .slice(0)
                      .reverse()
                      .map((row, i) =>
                        row.pay === 0 ? (
                          <TableRow key={row.id}>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {row.description}
                            </TableCell>

                            <TableCell align="center">
                              {moment(new Date(row.date))
                                .locale("pt-br")
                                .format("ddd, D [de] MMMM [de] YYYY")}
                            </TableCell>
                            <TableCell align="center">{row.value}</TableCell>

                            <TableCell align="center">
                              {row.pay === 1 ? "Paga" : "Pendente"}
                            </TableCell>
                            <TableCell align="center">
                              {row.pay === 1
                                ? "Despesa Paga"
                                : moment(new Date(row.dueDate))
                                    .locale("pt-br")
                                    .format("ddd, D [de] MMMM [de] YYYY")}
                            </TableCell>
                          </TableRow>
                        ) : (
                          ""
                        )
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCard>
          </div>
          <div
            style={{ marginTop: "3%" }}
            className="xl:col-start-4 xl:col-end-6 px-4 mb-14"
          >
                        <TableCard
              title= {`Sugestão de Plantações para ${moment(new Date()).locale("pt-br").format("MMMM") }` }
              color={constantes.colors.primary}
            >
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Cultura</TableCell>
                      <TableCell align="center">Plantio</TableCell>
                      <TableCell align="center">Colheita</TableCell>
                
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {culturas
                      .slice(0)
                      .reverse()
                      .map((row, i) =>(
                          row.Key === moment(new Date()).locale("pt-br").format("MMMM") ? (
                       
                          <TableRow key={row.id}>

                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {row.Cultura}
                            </TableCell>

                      
                            <TableCell align="center">{row.Plantio}</TableCell>

                            <TableCell align="center">
                              {row.Colheita}
                            </TableCell>
                            
                          </TableRow>) : ''
                        )
                     
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCard>
          </div>
        </div>
      </div>
    </>
  );
}
