import api, { TOKEN_KEY, ID } from "../../../api";

const token = sessionStorage.getItem(TOKEN_KEY);
const id = localStorage.getItem(ID)

export async function getVendas() {
  const res = (
    await api.get(`/sales/${id}`, {
      headers: { Authorization: `token ${token}` },
    })
  ).data.response;
  return res;
}

export async function getDespesas(){
    
    const res = (await api.get(`/expenditures/${id}`, { 
      headers: { Authorization: `token ${token}`}},
      )).data.response;
    return res;
}

export async function getPlantacao(){
    
    const res = (await api.get(`/plantations/${id}`, { 
      headers: { Authorization: `token ${token}`}},
      )).data.response;
    return res;
}


