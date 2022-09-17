let url = window.location.href;
url = new URL(url);
let id = url.searchParams.get("id");

function getProduct(id) {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (data) {
      if (data.ok) {
        return data.json();
      }
    })
    .then(function (product) {
      let image = document.getElementsByClassName("item__img");
      let colorInput = document.getElementById("colors");
      let title = document.getElementById("title");
      let description = document.getElementById("description");
      let price = document.getElementById("price");
      let imageElement = document.createElement("img");
      imageElement.setAttribute("id", "item__img")
      imageElement.src = product.imageUrl;
      image[0].appendChild(imageElement);

      title.innerText = product.name;
      description.innerText = product.description;
      price.innerText = product.price;

      // Ici on boucle sur le tableau car on dispose de plusieurs couleurs
      for (let color of product.colors) {
        // On créer une variable color qui change à chaque tour de boucle

        // On créer un élement option  + on lui attribut la données
        let option = document.createElement("option");
        option.value = color;
        option.innerText = color;

        // On l'ajoute au DOM
        colorInput.appendChild(option);
      }
    });
}

getProduct(id);
let button = document.getElementById("addToCart")
//j'écoute le clic pour lancer la fonction
button.addEventListener('click', function (e) {
  e.preventDefault()
  //j'ajoute une variable color quantityValue et productOrder avec l'id la quantité et la couleur
  let colorInput = document.getElementById('colors')
  let color = colorInput.value;
  let quantityValue = parseInt(quantity.value);
  let titleProduct = document.getElementById('title').innerHTML;
  let imageProduct = document.getElementById('item__img');
  let srcImage = imageProduct.getAttribute('src');


  //je déclare ma variable avec les informations du produit séléctionné
  let productOrder = {
      id: id,
      quantity: quantityValue,
      color: color,
      nameProduct: titleProduct,
      srcImage: srcImage,
  };
let validator = true
  if (color == 0 || quantityValue == 0){
    alert("Merci de choisir votre couleur ET votre nombre d'article");
    validator = false;
  }

//je déclare ma variable cart le contenu de l'objet products
  let cart = localStorage.getItem('products');

  //si la cart n'existe pas, je la créé
  if (cart === null)  {
      cart = [];
  //sinon je l'ajoute en JSON à la cart
  } else {
      cart = JSON.parse(cart);productOrder
  }
  //jusqu'à preuve du contraire, c'est un nouvel item,
  let newItem = true;

  //je boucle la variable produit avec le nombre de cart créé
  for (let produit of cart) {
      //si le titre du produit est strictement égal au produit déjà ajouté, et si c'est la même couleur
      if (productOrder.title === produit.title && productOrder.color === produit.color) {
          //donc il faut ajouter la quantité des deux commandes
          produit.quantity += productOrder.quantity;
          //dans ce cas, ça n'est plus un nouvel objet
          newItem = false;
      }
  }

  //si nexItem est déclaré strictement vraie
  if (newItem === true) {
      //j'ajoute l'élément productOrder
      cart.push(productOrder);
  }
  if (validator === true){
  localStorage.setItem('products', JSON.stringify(cart));
  alert('Un produit a été ajouté à votre panier')
  }
});