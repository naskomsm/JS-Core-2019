function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);
    // Write your code here

    let productInput = document.getElementsByClassName('custom-select')[0];
    let product = productInput.value;

    let priceInput = document.getElementById('price');
    let price = priceInput.value;

    let quantityInput = document.getElementById('quantity');
    let quantity = quantityInput.value;

    let submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', submit);

    if (product === '') {
        document.getElementById('submit').disabled = true;
    }
    else {
        document.getElementById('submit').disabled = false;
    }

    function submit() {
        //todo
    }
}
