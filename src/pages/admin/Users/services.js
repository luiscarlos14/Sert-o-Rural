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

export async function postUser(
  admin,
  cpf,
  name,
  surname,
  email,
  password,
  active,
  street,
  neighborhood,
  city,
  cep,
  profile,
  refreshPage
) {
  var fornecedor = new FormData();

  fornecedor.append("admin", admin);
  fornecedor.append("cpf", cpf);
  fornecedor.append("name", name);
  fornecedor.append("surname", surname);
  fornecedor.append("email", email);
  fornecedor.append("password", password);
  fornecedor.append("active", active);
  fornecedor.append("street", street);
  fornecedor.append("neighborhood", neighborhood);
  fornecedor.append("city", city);
  fornecedor.append("cep", cep);
  fornecedor.append("profile", profile);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `token ${token}`,
    },
  };

  await api.post("/users", fornecedor, config).then(() => {
    refreshPage(200, "adicionado");
  });
}

export async function EditUser(
  admin,
  cpf,
  name,
  surname,
  email,
  active,
  street,
  neighborhood,
  city,
  cep,
  id,
  refreshPage
) {
  await api
    .put(
      `/users`,
      {
        admin: admin, //
        cpf: cpf,
        name: name,
        surname: surname,
        email: email,
        active: active,
        street: street,
        neighborhood: neighborhood,
        city: city,
        cep: cep,
        id: id,

      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "editado");
    });
}

export async function EditPhotoPerfil(photo, id, refreshPage) {
  if (photo === null) {
    alert("Selecione uma imagem!");
  } else {
    var photoEdit = new FormData();

    photoEdit.append("profile", photo);
    photoEdit.append("id", id);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `token ${token}`,
      },
    };

    await api.patch("/users/photo", photoEdit, config).then(() => {
      refreshPage(200, "photo", null);
    });
  }
}

export async function EditPass(
  password,
  id,
  refreshPage
) {
  await api
    .patch(
      `/users/admin/password/`,
      {
        password: password,
        id: id,
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then(() => {
      refreshPage(200, "senha", null );
    })
    .catch((error) => {
      console.log(error);
    });
}




export async function deleteUser(id, refreshPage) {
  await api
    .delete(`users/${id}`, {
      headers: { Authorization: `token ${token}` },
    })
    .then(() => {
      refreshPage(200, "deletado");
    });
}
