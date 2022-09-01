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
    // TODO :: Afficher un h2 avec panier vide
  } else {
    for (let product of products) {
      for (let data of api) {
        if (product.id === data._id) {
          createProductCard(data, product);
          lootTotalQty(products);
        }
      }
    }
  }
  loopTotalPrice(api, products);
  changeQty(api, products);
}

//j'ai été déconnecté comme normalement(ces temps -ci) mais impossible de me connecter à nouveau
// TODO :: Function prix total
// Quantité panier

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
  function totalPriceCalcul() {
    let totalPrice = data.price * product.quantity;
    cartItemPrice.innerText = totalPrice + " €";
    //let stringInside = cartItemPrice.innerText;
    //let stringToNumber = (parseFloatstringInside);
    //console.log(stringToNumber);
  }
  totalPriceCalcul();
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
      lootTotalQty(JSON.parse(productJson));
      loopTotalPrice(api, JSON.parse(productJson));

      // TODO :: Recalculer le prix total (lancer function prix total)
      // TODO :: Recalculer la quantité de produit dans le panier avec dans l'écoute de l'input la fonction de calcul
    });
  });
}

function lootTotalQty(products) {
  let sum = 0;
  for (let product of products) {
    sum = sum + product.quantity;
  }
  document.getElementById("totalQuantity").innerText = sum;
}

function loopTotalPrice(api, products) {
  let sumPrice = 0;
  if (products !== null) {
    api.forEach((data) => {
      if (products.some((e) => e.id === data._id)) {
        let objIndex = products.findIndex((product) => product.id === data._id);
        sumPrice = sumPrice + data.price * products[objIndex].quantity;
      }
      document.getElementById("totalPrice").innerText = sumPrice;
    });
  }
}

//récupération du formulaire

let inputEmail = document.getElementById("email");
email.addEventListener("change", function () {
  validEmail(this);
});

function validEmail(inputEmail) {
  let emailRegex = new RegExp("^[A-Za-z-_]+@[A-Za-z]+.[A-Za-z]+$");

  if (!emailRegex.test(inputEmail.value)) {
    console.log("email non valide");
    return false;
  } else {
    console.log("email valide");
    return true;
  }
}

let order = document.getElementById("order");
order.addEventListener("click", function (e) {
  e.preventDefault();

  let products = JSON.parse(localStorage.getItem("products"));

  if (products === null || products.length < 1) {
    alert("JE SUIS VIDE");
  } else if (validEmail(inputEmail)) {
    const productsId = [];
    products.forEach((product) => {
      productsId.push(product.id);
    });

    const order = {
      contact: {
        firstName: "toto",
        lastName: "tutu",
        address: "grd",
        city: "grdg",
        email: inputEmail.value,
      },
      products: productsId,
    };
    orderProducts(order)

  }
});


const orderProducts = (order) => {
  console.log(order)
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

    })
};
