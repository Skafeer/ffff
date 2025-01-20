document.querySelector('form').addEventListener('submit', function (event) {
    const price = document.querySelector('#price').value;
    if (price <= 0) {
        alert('يرجى إدخال سعر صحيح.');
        event.preventDefault();
    }
});