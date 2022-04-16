import api, { TOKEN_KEY, ID } from "../../../api";

const token = sessionStorage.getItem(TOKEN_KEY);
const id = localStorage.getItem(ID);

export async function getUser() {
  const res = (
    await api.get(`/users/${id}`, {
      headers: { Authorization: `token ${token}` },
    })
  ).data.response;
  return res;
}

export async function EditInfoPersonal(cpf, name, surname,email,  refreshPage) {
  await api
    .patch(
      "/users/personal",
      {
        cpf: cpf,
        name: name,
        surname: surname,
        email: email,
        id: localStorage.getItem(ID),
      },
      {
        headers: { Authorization: `token ${token}` },
      }
    )
    .then((result) => {
      refreshPage(200, "personal" , null);
      //document.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function EditInfoAddress(
  street,
  neighborhood,
  city,
  cep,
  refreshPage
) {
  await api
    .patch(
      "/users/address",
      {
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
      refreshPage(200, "address", city );
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function EditPass(
  password,
  newPassword,
  refreshPage
) {
  await api
    .patch(
      `/users/password/${id}`,
      {
        oldPassword: password,
        newPassword: newPassword,
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

export async function EditPhotoProfile(photo, refreshPage) {
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
