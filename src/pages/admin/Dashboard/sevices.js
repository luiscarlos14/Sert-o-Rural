import api, { TOKEN_KEY, ID } from "../../../api";

const token = sessionStorage.getItem(TOKEN_KEY);
//const id = sessionStorage.getItem(ID);

export async function getUsers() {
  const res = (
    await api.get(`/users/`, {
      headers: { Authorization: `token ${token}` },
    })
  ).data.response;
  return res;
}

export async function getFornecedores(){
    
    const res = (await api.get(`/suppliers`, { 
      headers: { Authorization: `token ${token}`}},
      )).data.response;
    return res;
}

export async function getProdutos() {
    const res = (
      await api.get(`/products/`, {
        headers: { Authorization: `token ${token}` },
      })
    ).data.response;
    return res;
  }
