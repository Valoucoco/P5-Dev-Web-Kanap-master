//je récupère les informations de l'API
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function getKanapData(kanapData) {
    let products = JSON.parse(localStorage.getItem("products"));
    loopSearchId(kanapData, products);
  })
  .catch(function (error) {
    console.log(error);
  });
//je comprare mon localStorage à l'API products, se qui est similaire s'affiche
function loopSearchId(api, products) {
  if (products === null || products.length === 0) {
    //je modifie le h1 avec 'Votre panier est vide'
    let cartAndFormContainer = document.querySelector(
      "#cartAndFormContainer > h1"
    );
    cartAndFormContainer.innerHTML = "Votre panier est vide";
  } else {
    for (let product of products) {
      for (let data of api) {
        if (product.id === data._id) {
          createProductCard(data, product);
          loopTotalQty(products);
        }
      }
    }
  }
  loopTotalPrice(api, products);
  changeQty(api, products);
  deleteItemSelect(api, products);
}

//je créé les balises et le contenu du DOM
function createProductCard(data, product) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  cart__items.appendChild(article);
  article.setAttribute("data-id", product.id);
  article.setAttribute("data-color", product.color);

  let cartItemImg = document.createElement("div");
  cartItemImg.classList.add("cart__item__img");
  article.appendChild(cartItemImg);

  let imgProduct = document.createElement("img");
  cartItemImg.appendChild(imgProduct);
  imgProduct.src = product.srcImage;

  let cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  article.appendChild(cartItemContent);

  let cartItemDescription = document.createElement("div");
  cartItemDescription.classList.add("cart__item__content__description");
  article.appendChild(cartItemDescription);

  let cartItemH2 = document.createElement("h2");
  cartItemH2.innerHTML = product.nameProduct;
  cartItemDescription.appendChild(cartItemH2);

  let cartItemColor = document.createElement("p");
  cartItemColor.innerHTML = product.color;
  cartItemDescription.appendChild(cartItemColor);

  let cartItemPrice = document.createElement("p");
  cartItemPrice.innerText = data.price + " €";
  cartItemDescription.appendChild(cartItemPrice);

  let contentSettings = document.createElement("div");
  contentSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(contentSettings);

  let contentSettingsQuantity = document.createElement("div");
  contentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  contentSettings.appendChild(contentSettingsQuantity);

  let quantity = document.createElement("p");
  quantity.innetHTML = "Qté : ";
  contentSettingsQuantity.appendChild(quantity);

  let input = document.createElement("input");
  contentSettingsQuantity.appendChild(input);
  input.id = "itemQuantity";
  input.type = "number";
  input.name = "itemQuantity";
  input.classList.add("itemQuantity");
  input.min = "1";
  input.max = "100";
  input.value = product.quantity;

  let contentSettingsDelete = document.createElement("div");
  contentSettingsDelete.classList.add("cart__item__content__settings__delete");
  contentSettings.appendChild(contentSettingsDelete);

  let suppr = document.createElement("p");
  suppr.classList.add("deleteItem");
  suppr.setAttribute("id", "deleteItem");
  contentSettingsDelete.appendChild(suppr);
  suppr.innerHTML = "Supprimer";
}

//change quantity
function changeQty(api, products) {
  const inputs = document.querySelectorAll(".itemQuantity");
  inputs.forEach((input) => {
    input.addEventListener("change", function () {
      const product = input.closest("article");
      const productId = product.dataset.id;
      const productColor = product.dataset.color;

      if (
        products.some((e) => e.id === productId && e.color === productColor)
      ) {
        let objIndex = products.findIndex(
          (product) =>
            product.id === productId && product.color === productColor
        );
        products[objIndex].quantity = input.valueAsNumber;
      }
      let productJson = JSON.stringify(products);
      localStorage.setItem("products", productJson);
      loopTotalQty(JSON.parse(productJson));
      loopTotalPrice(api, JSON.parse(productJson));
    });
  });
}
//boucle pour chaque produit la quantité s'ajoute à sum
function loopTotalQty(products) {
  let sum = 0;
  for (let product of products) {
    sum = sum + product.quantity;
  }
  document.getElementById("totalQuantity").innerText = sum;
}
//boucle pour chaque produit identique entre le panier et le localhost
function loopTotalPrice(api, products) {
  let sumPrice = 0;
  if (products !== null) {
    api.forEach((data) => {
      if (products.some((e) => e.id === data._id)) {
        let objIndex = products.findIndex((product) => product.id === data._id);
        sumPrice = sumPrice + data.price * products[objIndex].quantity;
      }
      document.getElementById("totalPrice").innerText = sumPrice;
      console.log(sumPrice)
    });
  }
}
// supprimer
function deleteItemSelect(api, products) {
  // Ces deux variables permettent de supprimer un objet via son ID et sa couleur.
  const itemDelete = document.querySelectorAll(".deleteItem");
  itemDelete.forEach((item) => {
    item.addEventListener("click", function () {
      const product = item.closest("article");
      product.remove();
      const productId = product.dataset.id;
      const productColor = product.dataset.color;
      if (
        products.some((e) => e.id === productId && e.color === productColor)
      ) {
        let objIndex = products.findIndex(
          (product) =>
            product.id === productId && product.color === productColor
        );
        products.splice(objIndex, 1);
        let productsJson = JSON.stringify(products);
        localStorage.setItem("products", productsJson);
        loopTotalPrice(api, products);
      }
    });
  });
}

//récupération du formulaire
//-----------E-mail-----------
let inputEmail = document.getElementById("email");
inputEmail.addEventListener("change", function () {
  validEmail(this);
});
function validEmail(inputEmail) {
  let emailRegex = new RegExp("^[A-Za-z-_](?.[A-Za-z])+@[A-Za-z]+.[A-Za-z]+$");

  if (!emailRegex.test(inputEmail.value)) {
    let errorMessageEmail = document.getElementById("emailErrorMsg");
    errorMessageEmail.innerHTML = "Merci d'ajouter un Email valide";
    return false;
  } else {
    console.log("email valide");
    return true;
  }
}
//-----------fin/E-mail-----------
//-----------firstName-----------
let inputFirstName = document.getElementById("firstName");

inputFirstName.addEventListener("change", function () {
  validfirstName(this);
});
function validfirstName(inputFirstName) {
  let firstNameRegex = new RegExp("^[A-Z+.+-+a-z-_]+$");

  if (!firstNameRegex.test(inputFirstName.value)) {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    firstNameErrorMsg.innerHTML = "Merci d'ajouter un prénom valide";
    return false;
  } else {
    console.log("first name valide");
    return true;
  }
}
//-----------fin/firstName-----------
//-----------lastName-----------
let inputLastName = document.getElementById("lastName");

inputLastName.addEventListener("change", function () {
  validLastName(this);
});
function validLastName(inputLastName) {
  let lastNameRegex = new RegExp("^[A-Z+.++-+a-z-_]+$");

  if (!lastNameRegex.test(inputLastName.value)) {
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    lastNameErrorMsg.innerHTML = "Merci d'ajouter un nom valide";
    return false;
  } else {
    console.log("last name valide");
    return true;
  }
}
//-----------fin/lastName-----------
//-----------adress-----------
let inputAddress = document.getElementById("address");

inputAddress.addEventListener("change", function () {
  validAddress(this);
});
function validAddress(inputAddress) {
  if (inputAddress == null) {
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    addressErrorMsg.innerHTML = "Merci d'ajouter une adresse postale";
    return false;
  } else {
    console.log("address valide");
    return true;
  }
}
//-----------fin/adress-----------
//-----------city-----------
let inputCity = document.getElementById("city");

inputCity.addEventListener("change", function () {
  validCity(this);
});
function validCity(inputCity) {
  let cityRegex = new RegExp("^[A-Z+.++-+a-z-_]+$");

  if (!cityRegex.test(inputCity.value)) {
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    cityErrorMsg.innerHTML = "Merci d'ajouter une ville valide";
    return false;
  } else {
    console.log("city valide");
    return true;
  }
}
//-----------fin/city-----------

let order = document.getElementById("order");
order.addEventListener("click", function (e) {
  e.preventDefault();

  let products = JSON.parse(localStorage.getItem("products"));

  if (products === null || products.length < 1) {
    alert("VOTRE PANIER EST VIDE");
  } else if (validEmail(inputEmail)) {
    const productsId = [];
    products.forEach((product) => {
      productsId.push(product.id);
    });

    const order = {
      contact: {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products: productsId,
    };
    orderProducts(order);
  }
});

const orderProducts = (order) => {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/JSON",
    },
    body: JSON.stringify(order),
  })
    .then((data) => data.json())
    .then((data) => {
      const orderId = data.orderId;
      finalisation(orderId);
    });
  function finalisation(orderId) {
    localStorage.clear();
    document.location.href = `confirmation.html?id=${orderId}`;
  }
};
