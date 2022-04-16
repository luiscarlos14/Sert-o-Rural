import api, { TOKEN_KEY, ID } from "../../../api";

const token = sessionStorage.getItem(TOKEN_KEY);
const id = localStorage.getItem(ID);

export async function getPlantacao(){
    
    const res = (await api.get(`/plantations/${id}`, { 
      headers: { Authorization: `token ${token}`}},
      )).data.response;
    return res;
}

export async function postPlantacao(
  description,
  date,
  refreshPage
) {
  await api
    .post(
      `/plantations`,
      {
        user: localStorage.getItem(ID),
        pests: 0,
        description: description,
        date: date,
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "adicionado");
    });
}

export async function editPlantacao(
  description,
  date,
  id,
  refreshPage
 
) {
  await api
    .patch(
      "/plantations",
      {
        pests: 0,
        description: description,
        date: date,
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


export async function deletePlantacao(id, refreshPage){
  await api.delete(`plantations/${id}`,{
    headers: { Authorization: `token ${token}` },
  }).then(()=>{
    refreshPage(200, "deletado");
  })

}


export async function postPragas(
  insecticide,
  description,
  identified,
  fought,
  refreshPage
) {
  await api
    .post(
      `/pests`,
      {
        insecticide: insecticide,
        description: description,
        identified: identified,
        fought: fought,
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "pragasAdd");
    });
}
