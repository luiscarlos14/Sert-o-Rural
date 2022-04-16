import api, { TOKEN_KEY, ID } from "../../../api";

const token = sessionStorage.getItem(TOKEN_KEY);
const id = localStorage.getItem(ID);

export async function getDespesas(){
    
    const res = (await api.get(`/expenditures/${id}`, { 
      headers: { Authorization: `token ${token}`}},
      )).data.response;
    return res;
}

export async function postDespesa(
  desc,
  date,
  valor,
  status,
  vencimento,
  refreshPage
) {

  await api
    .post(
      "/expenditures",
      {
        user: localStorage.getItem(ID),
        description: desc,
        date: date,
        value: valor,
        pay: status,
        frequency: "Recorrente",
        dueDate: vencimento
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "despesa");
    }).catch((e)=>{
      console.log(e);
    })
}

export async function EditDespesa(
  desc,
  date,
  valor,
  status,
  id,
  vencimento,
  refreshPage
) {
  await api
    .patch(
      `/expenditures`,
      {
        description: desc,
        date: date,
        value: valor,
        pay: status,
        frequency: "Recorrente",
        dueDate: vencimento,
        id: id,
       
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "edit");
    });
}


export async function deleteDespesa(id, refreshPage){
  await api.delete(`expenditures/${id}`,{
    headers: { Authorization: `token ${token}` },
  }).then(()=>{
    refreshPage(200, "delete");
  })

}