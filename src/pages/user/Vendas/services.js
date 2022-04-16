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


export async function postVenda(
  desc,
  date,
  comprador,
  qtd,
  valor,
  unidade,
  refreshPage
) {

  await api
    .post(
      `/sales`,
      {
        user: localStorage.getItem(ID),
        description: desc,
        date: date,
        buyer: comprador,
        quantity: qtd,
        value: valor,
        unit: unidade,
        frequency: "Recorrente",
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "adicionado");
    });
}

export async function EditVenda(
  desc,
  date,
  comprador,
  qtd,
  valor,
  unidade,
  id,
  refreshPage
) {

  await api
    .patch(
      `/sales`,
      {
        description: desc,
        date: date,
        buyer: comprador,
        quantity: qtd,
        value: valor,
        unit: unidade,
        frequency: "Recorrente",
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





export async function deleteVenda(id, refreshPage){
  await api.delete(`sales/${id}`,{
    headers: { Authorization: `token ${token}` },
  }).then(()=>{
    refreshPage(200, "deletado");
  })

}