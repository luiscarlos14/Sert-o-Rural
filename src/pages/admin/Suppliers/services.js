import api, { TOKEN_KEY } from "../../../api";
import axios from 'axios';

const token = sessionStorage.getItem(TOKEN_KEY);
//const id = sessionStorage.getItem(ID);

export async function getFornecedores(){
    
    const res = (await api.get(`/suppliers`, { 
      headers: { Authorization: `token ${token}`}},
      )).data.response;
    return res;
}

export async function postFornecedores(
  name,
  email,
  phone,
  cnpj,
  description,
  street,
  neighborhood,
  city,
  cep,
  url,
  logo,
  refreshPage
) {

  var fornecedor = new FormData();

  fornecedor.append('name', name);
  fornecedor.append('email', email);
  fornecedor.append('phone', phone);
  fornecedor.append('cnpj', cnpj);
  fornecedor.append('description', description);
  fornecedor.append('street', street);
  fornecedor.append('neighborhood', neighborhood);
  fornecedor.append('city', city);
  fornecedor.append('cep', cep);
  fornecedor.append('url', url);
  fornecedor.append('logo', logo);
  
  const config = {     
    headers: { 'content-type': 'multipart/form-data', Authorization: `token ${token}`  },
}

await api.post('/suppliers', fornecedor, config).then(() => {
  refreshPage(200, "adicionado");
});
 
}

export async function EditPhotoFornecedor(photo, id, refreshPage) {
  var photoEdit = new FormData();

  photoEdit.append("logo", photo);
  photoEdit.append("id", id);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `token ${token}`,
    },
  };

  await api.patch("/suppliers/photo", photoEdit, config).then(() => {
    refreshPage(200, "photo");
  });
}


export async function EditFornecedor(
  name,
  email,
  phone,
  cnpj,
  description,
  street,
  neighborhood,
  city,
  cep,
  url,
  id,
  refreshPage
) {

  await api
  .patch(
    `/suppliers`,
    {
      name: name,
      email: email,
      phone: phone,
      cnpj: cnpj,
      description: description,
      street: street,
      neighborhood: neighborhood,
      city: city,
      cep: cep,
      url: url,
      id: id
    },
    {
      headers: { Authorization: `token ${token}` },
    }
  )
  .then(() => {
    refreshPage(200, "editado");
  });

  /* await api
    .patch(
      `/suppliers`,
      {
        name: name,
        email: email,
        phone: phone,
        cnpj: cnpj,
        description: description,
        street: street,
        neighborhood: neighborhood,
        city: city,
        cep: cep,
        url: url,
        logo: logo,
        id: id
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "editado");
    }); */
}


export async function deleteFornecedor(id, refreshPage){
  await api.delete(`suppliers/${id}`,{
    headers: { Authorization: `token ${token}` },
  }).then(()=>{
    refreshPage(200, "deletado");
  })

}
