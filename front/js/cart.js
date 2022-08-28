//je récupère les informations de l'API
fetch("http://localhost:3000/api/products") //${id} ?
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

function loopSearchId(api, products) {
  if (products === null || products.length === 0) {
    // TODO :: Afficher un h2 avec panier vide
    console.log("Je suis vide");
  } else {
    for (let product of products) {
      for (let data of api) {
        if (product.id === data._id) {
         createProductCard(data, product);

         // TODO :: Function prix total 
         // Quantité panier
        }
      }
    }
    changeQty(api, products)
  }
}

function createProductCard(data, product) {

  const article = document.createElement("article");
  article.classList.add("cart__item");
  cart__items.appendChild(article);
  article.setAttribute("data-id", product.id);
  article.setAttribute("data-color", product.color);

  let cartItemImg = document.createElement("div");
  cartItemImg.classList.add("cart__item__img");
  article.appendChild(cartItemImg)

  let imgProduct = document.createElement("img");
  cartItemImg.appendChild(imgProduct)
  imgProduct.src = product.srcImage;

  let cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  article.appendChild(cartItemContent);

  let cartItemDescription = document.createElement("div");
  cartItemDescription.classList.add("cart__item__content__description");
  article.appendChild(cartItemDescription);

  let cartItemH2 = document.createElement("h2");
  cartItemH2.innerHTML = product.nameProduct;
  cartItemDescription.appendChild(cartItemH2)

  let cartItemColor = document.createElement("p");
  cartItemColor.innerHTML = product.color;
  cartItemDescription.appendChild(cartItemColor)

  let cartItemPrice = document.createElement("p");
  cartItemPrice.innerText = data.price + " €";
  cartItemDescription.appendChild(cartItemPrice)


  let contentSettings = document.createElement("div");
  contentSettings.classList.add('cart__item__content__settings');
  cartItemContent.appendChild(contentSettings);

let contentSettingsQuantity = document.createElement('div');
contentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
contentSettings.appendChild(contentSettingsQuantity);

let quantity = document.createElement('p');
quantity.innetHTML = "Qté : "
contentSettingsQuantity.appendChild(quantity);

let input = document.createElement('input');
contentSettingsQuantity.appendChild(input);
input.type = "number";
input.name = "itemQuantity"
input.classList.add('itemQuantity');
input.min = "1";
input.max = "100";
input.value = product.quantity


let contentSettingsDelete = document.createElement("div");
contentSettingsDelete.classList.add('cart__item__content__settings__delete');
contentSettings.appendChild(contentSettingsDelete);

let suppr = document.createElement('p');
suppr.classList.add('deleteItem');
contentSettingsDelete.appendChild(suppr)
suppr.innerHTML = "Supprimer"

}

function changeQty(api, products){
  const inputs = document.querySelectorAll('.itemQuantity');
  inputs.forEach((input) =>{
    input.addEventListener('change', function () {
      const product = input.closest('article');
      const productId = product.dataset.id;
      const productColor = product.dataset.color;

      if(products.some((e) => e.id === productId && e.color === productColor)){
        let objIndex = products.findIndex((product) => product.id === productId && product.color === productColor)
          products[objIndex].quantity = input.valueAsNumber        
      }

      let productJson = JSON.stringify(products);
      localStorage.setItem('products' , productJson)

      // TODO :: Recalculer le prix total
      // TODO :: Recalculer la quantité de produit dans le panier
   
 
    })
  })
}


/*
//récupération et traduction du JSON
let cart = localStorage.getItem("products");
let products = JSON.parse(cart);

if (cart === null) {
  alert("Votre panier est vide");
} else {
  console.log("j'ai des articles dans le panier");

  let articleNumber = 0;

  let productCompteur = products.length;
  console.log("j'ai " + productCompteur + " produit(s) dans le panier");
  //je créé une boucle pour chaque product dans products
  function getProductList() {
    for (var boucle = 0; boucle < products.length; boucle++) {
      insertProductInHtml();
    }
  }
  getProductList();

  function insertProductInHtml() {
    //je récupère l'id OK
    let productId = products[articleNumber].id;
    //je récupère la quantité OK
    let quantity = products[articleNumber].quantity;
    //je récupère la couleur OK
    let productColor = products[articleNumber].color;
    //je récupère le nom OK
    let nameProduct = products[articleNumber].nameProduct;
    let srcImage = products[articleNumber].srcImage;
    //je récupère le prix
    let productprice = products[articleNumber].productprice;

    articleNumber++;

    //je déclare la section avec l'id="cart__items" comme cartItems
  
  }
}

/*
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">

                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
              */
