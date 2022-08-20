let itemsContainer = document.getElementById('items');

function getProductList() {
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(products) {
            for (let product of products) { 
                insertProductInHtml(product);
            }
        });
}
getProductList();

function insertProductInHtml(product) {
    let anchor = document.createElement('a');
    anchor.href = "./product.html?id=" + product._id;

    let article = document.createElement('article');
    let image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.altTxt;

    let title = document.createElement('h3');
    title.classList.add("productName");
    title.innerText = product.name;

    let paragraph = document.createElement('p');
    paragraph.classList.add("productDescription");
    paragraph.innerText = product.description;

    let price = document.createElement('p');
    price.classList.add("price");
    price.innerText = "Prix = " + product.price + "€";

    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(paragraph);
    article.appendChild(price);
    anchor.appendChild(article);

    itemsContainer.appendChild(anchor);
}

