import axios from 'axios';

export default axios.create({
 baseURL: "https://sertaorural.herokuapp.com",
 //baseURL: 'http://localhost:3001'
});

export const TOKEN_KEY = 'SertaoRural';
export const ADMIN = 'administrador';
export const ID = "identificador";
export const IDPRODUTO = "fornecedorProduto";
export const CITY = "cidadeUsuario";
export const SERVER = "https://sertaorural.herokuapp.com";
//export const SERVER = "http://localhost:3001";

