document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const productList = document.getElementById('product-list');
    const sortSelect = document.getElementById('sort');

    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();
            return products;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <p>Email: ${product.email}</p>
                <p>Phone: ${product.phone}</p>
                <p>Company: ${product.company.name}</p>
            `;
            productList.appendChild(productElement);
        });
    }

    function sortProducts(products, criteria) {
        return products.sort((a, b) => {
            if (a[criteria] < b[criteria]) return -1;
            if (a[criteria] > b[criteria]) return 1;
            return 0;
        });
    }

    sortSelect.addEventListener('change', async () => {
        const products = await fetchProducts();
        const sortedProducts = sortProducts(products, sortSelect.value);
        displayProducts(sortedProducts);
    });

    async function init() {
        const products = await fetchProducts();
        displayProducts(products);
    }

    init();
});
