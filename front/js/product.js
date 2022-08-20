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

let button = document.getElementById("addToCart");

button.addEventListener("click", function (e) {
   // e.preventDefault()

    let colorInput = document.getElementById('colors')
    let color = colorInput.value;


    let productLocalStorage = JSON.parse(localStorage.getItem('orders'));
    let newProduct = null;

    let articles = { 
      color: color, 
       id: id, 
      };


    products = [];
    products.push(articles);

    

    if (products.some((e) => e.id === articles.id && e.color === articles.color)) {

console.log('ici')

    }else {
      console.log("non present")
    }


 




   
   // localStorage.setItem('orders', JSON.stringify(articles))

    /*
    productLocalStorage.push(articles)

    console.log(newProduct)

    /*
    // 15/08 début du localStorage
    
//je déclare ma variable orders pour assembler tous les résultats
    let orders = {
      color: color,
      quantity: quantity.value,
      id: id
    };
    //je déclare objLinea comme étant orders mais traduit en JSON
    let objLinea = JSON.stringify(orders);
    //dans le localStorage, je place créé mon tableau orders où je place objLinea
    localStorage.setItem("orders", objLinea);
    
    //------test------
    /*let valueOfName = document.getElementById("title").value;
    console.log(parentOfName)*/
    
    //alert(orders);


   // exemple Christophe localStorage.setItem('toto', JSON.stringify(productOrder));



    // JSON.stringify pour push dans le panier 
    // localstorage.getItem()
    // localstorage.setItem()
    // Créer le localstorage si il n'existe pas

    // Créer un objet pour le push dans le localstorage

    // JS push https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push

    
    

    
    


    

});

