import React, { useState, useEffect } from "react";
import StoreCard from "../../../components/StoreCard";
import { getProdutos, getFornecedores } from "./services";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { IDPRODUTO, CITY, SERVER } from "../../../api";
import Image from "@material-tailwind/react/Image";

import padrao from '../../../assets/padrao.jpg'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

export default function Produtos() {
  const classes = useStyles();

  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const cidadeUser = localStorage.getItem(CITY);

  function refreshPage() {
    document.location.reload();
  }

  useEffect(() => {
    getFornecedores()
      .then((result) => {
        setFornecedores(result);
      })
      .catch();
  }, []);

  useEffect(() => {
    getProdutos()
      .then((result) => {
        setProdutos(result);
      })
      .catch();
  }, []);

  function getName(id) {
    for (let i = 0; i < fornecedores.length; i++) {
      if (fornecedores[i].id === id) {
        return fornecedores[i].name;
      }
    }
  }
  function getPhone(id) {
    for (let i = 0; i < fornecedores.length; i++) {
      if (fornecedores[i].id === id) {
        return fornecedores[i].phone;
      }
    }
  }
  function getLogo(id) {
    for (let i = 0; i < fornecedores.length; i++) {
      if (fornecedores[i].id === id) {
        return fornecedores[i].logo === null ? padrao : `${SERVER}/${fornecedores[i].logo}`;
      }
    }
  }
  function getDescricao(id) {
    for (let i = 0; i < fornecedores.length; i++) {
      if (fornecedores[i].id === id) {
        return fornecedores[i].description;
      }
    }
  }
  function getEmail(id) {
    for (let i = 0; i < fornecedores.length; i++) {
      if (fornecedores[i].id === id) {
        return fornecedores[i].email;
      }
    }
  }
  function getSite(id) {
    for (let i = 0; i < fornecedores.length; i++) {
      if (fornecedores[i].id === id) {
        return fornecedores[i].url;
      }
    }
  }

  function units() {
    const fornecedoresList = [];
    for (let i = 0; i < fornecedores.length; i++) {
      fornecedoresList.push({
        value: fornecedores[i].id,
        label: fornecedores[i].city,
      });
    }
    return fornecedoresList;
  }

  const [unidade, setUnidade] = useState(14);

  const handleChange = (event) => {
    setUnidade(event.target.value);
   
    /*  localStorage.setItem(IDPRODUTO, unidade);
    refreshPage(); */
  };

  function filtrar() {
    localStorage.setItem(IDPRODUTO, unidade);
    refreshPage();
  }

  return (
    <>
      <div>
        <div style={{ padding: "3%" }}>
          <TextField
            id="standard-select-currency"
            select
            label="Cidades Atendidas"
            value={unidade}
            onChange={handleChange}
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
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#287C43",
            padding: 15,
          }}
        >
          <Image src={getLogo(unidade)} />

          <div style={{ fontSize: 30, color: "#fff", paddingTop: 20 }}>
            {getName(unidade)}
          </div>

            <div style={{flex: 1, fontSize: 20, color: "#fff" }}>
              {getDescricao(unidade)}
            </div>

            <div style={{ flex: 1, fontSize: 20, color: "#fff" }}>
              {getPhone(unidade)} | {getEmail(unidade)} | {getSite(unidade)}
            </div>

         
        </div>
      </div>
      <div>
        <div className={classes.container}>
          {produtos.map((row) => {
            return row.supplier === unidade ? (
              <StoreCard
                name={row.name}
                describe={row.description}
                category={row.category}
                value={row.value}
                unit={row.unit}
                supplier={row.supplier}
                photo={row.photo}
              />
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </>
  );
}
