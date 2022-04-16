import api, { TOKEN_KEY, ID } from "../../../api";

const token = sessionStorage.getItem(TOKEN_KEY);
const id = localStorage.getItem(ID);

export async function getFuncionarios(){
    
    const res = (await api.get(`/functionarys/${id}`, { 
      headers: { Authorization: `token ${token}`}},
      )).data.response;
    return res;
}

export async function postFuncionarios(
  name,
  wage,
  Workeddays,
  street,
  neighborhood,
  city,
  cep,
  refreshPage
) {
  await api
    .post(
      "/functionarys",
      {
        employer: localStorage.getItem(ID),
        name: name,
        wage: wage,
        Workeddays: Workeddays,
        street: street,
        neighborhood: neighborhood,
        city: city,
        cep: cep,
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "adicionado");
    });
}

export async function editFuncionarios(
  name,
  wage,
  Workeddays,
  street,
  neighborhood,
  city,
  cep,
  id,
  refreshPage
) {
  await api
    .patch(
      "/functionarys",
      {
        name: name,
        wage: wage,
        Workeddays: Workeddays,
        street: street,
        neighborhood: neighborhood,
        city: city,
        cep: cep,
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

export async function deleteFuncionario(id, refreshPage){
  await api.delete(`functionarys/${id}`,{
    headers: { Authorization: `token ${token}` },
  }).then(()=>{
    refreshPage(200, "deletado");
  })

}
