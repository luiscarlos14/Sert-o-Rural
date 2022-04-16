import api, { TOKEN_KEY, ID } from "../../../api";

const token = sessionStorage.getItem(TOKEN_KEY);
const id = localStorage.getItem(ID);

export async function getInsumos(){
    
    const res = (await api.get(`/inputs/${id}`, { 
      headers: { Authorization: `token ${token}`}},
      )).data.response;
    return res;
}

export async function postInsumos(
  stock,
  value,
  description,
  purchase,
  validity,
  unit,
  refreshPage
) {
  await api
    .post(
      `/inputs`,
      {
        user: localStorage.getItem(ID),
        stock: stock,
        value: value,
        description: description,
        purchase: purchase,
        validity: validity,
        unit: unit
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "adicionado");
    });
}

export async function editInsumos(
  stock,
  value,
  description,
  purchase,
  validity,
  unit,
  id,
  refreshPage
 
) {
  await api
    .patch(
      "/inputs",
      {
        stock: stock,
        value: value,
        description: description,
        purchase: purchase,
        validity: validity,
        unit: unit,
        id: id
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "editado");
    });
}


export async function deleteInsumos(id, refreshPage){
  await api.delete(`inputs/${id}`,{
    headers: { Authorization: `token ${token}` },
  }).then(()=>{
    refreshPage(200, "deletado");
  })

}