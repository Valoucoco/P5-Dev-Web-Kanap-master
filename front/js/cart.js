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

    });
}

//récuprération et traduction du JSON 
let objLinea = localStorage.getItem("orders");
let orders = JSON.parse(objLinea);
alert(orders.id)




console.log();

