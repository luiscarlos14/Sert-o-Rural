import api, { TOKEN_KEY, ID } from "../../../api";

const token = sessionStorage.getItem(TOKEN_KEY);

export async function getProdutos() {
  const res = (
    await api.get(`/products/`, {
      headers: { Authorization: `token ${token}` },
    })
  ).data.response;
  return res;
}

export async function getFornecedor() {
  const res = (
    await api.get(`/suppliers/`, {
      headers: { Authorization: `token ${token}` },
    })
  ).data.response;
  return res;
}

export async function postProduto(
  supplierProduto,
  descProduto,
  valueProduto,
  unitProduto,
  categoryProduto,
  nameProduto,
  photoProduto,
  refreshPage
) {
  var produto = new FormData();

  produto.append("supplier", supplierProduto);
  produto.append("description", descProduto);
  produto.append("value", valueProduto);
  produto.append("available", 4);
  produto.append("unit", unitProduto);
  produto.append("category", categoryProduto);
  produto.append("name", nameProduto);
  produto.append("photo", photoProduto);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `token ${token}`,
    },
  };

  await api.post("/products", produto, config).then(() => {
    refreshPage(200, "adicionado");
  });
}

export async function EditPhotoProduto(photo, id, refreshPage) {
  var photoEdit = new FormData();

  photoEdit.append("photo", photo);
  photoEdit.append("id", id);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `token ${token}`,
    },
  };

  await api.patch("/products/photo", photoEdit, config).then(() => {
    refreshPage(200, "photo");
  });
}

export async function EditProduto(
  supplier,
  desc,
  value,
  unit,
  category,
  name,
  id,
  refreshPage
) {
  await api
    .patch(
      `/products`,
      {
        supplier: supplier,
        description: desc,
        value: value,
        available: 4,
        unit: unit,
        category: category,
        name: name,
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

export async function deleteProduto(id, refreshPage) {
  await api
    .delete(`products/${id}`, {
      headers: { Authorization: `token ${token}` },
    })
    .then(() => {
      refreshPage(200, "deletado");
    });
}
