//je déclare itemsContainer comme étant l'id items du DOM
let itemsContainer = document.getElementById('items');

//permet de récupérer tous les produits de l'api
function getProductList() {
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(products) {
            for (let product of products) { 
                let i = 0; i < product.length; i++;
                document.getElementById('items').innerHTML += `<a href="./product.html?id=${product._id}">
                <article>
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                </article>
              </a>`
            }
        });
}
getProductList();