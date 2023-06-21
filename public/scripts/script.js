function submitForm(buttonId) {
    const form = document.getElementById('menu_items');
    const amountField = document.getElementById('amount');
    const menuNameField = document.getElementById('menu_name');
    const priceField = document.getElementById('price');
    const descField = document.getElementById('desc');
    const orderTypeField = document.getElementById('order_type');

    switch (buttonId) {
        case "chickensandwich":
            amountField.value = 1;
            menuNameField.value = "Classic Chicken Sandwich";
            priceField.value = 8.43;
            descField.value = "Truly a classic. Fried chicken, american cheese, lettuce, tomato, red onion, pickles & IHOP® sauce.";
            orderTypeField.value = "Fried Chicken";
            break;
        case "pancake":
            amountField.value = 1;
            menuNameField.value = "Pancakes";
            priceField.value = 9.29;
            descField.value = "A true breakfast classic that started it all. Get five of our fluffy, world-famous buttermilk pancakes topped with whipped real butter.";
            orderTypeField.value = "Souffle";
            break;
        case "cola":
            amountField.value = 1;
            menuNameField.value = "Coke";
            priceField.value = 0.99;
            descField.value = "Classic Coca Cola with optional ice or swap with qualifying fountain drink.";
            orderTypeField.value = null;
            break;
        case "water":
            amountField.value = 1;
            menuNameField.value = "Water";
            priceField.value = 0.99;
            descField.value = "Simplicity is best. Can come with ice or no ice along with lemon. ";
            orderTypeField.value = null;
            break;
        case "omelette":
            amountField.value = 1;
            menuNameField.value = "Omelette";
            priceField.value = 13.37;
            descField.value = "Our fluffy omelette served with your choice of vegetables.";
            orderTypeField.value = null;
            break;  
    }
    
    console.log(amountField);
    console.log(menuNameField);
    console.log(priceField);
    console.log(descField);
    console.log(orderTypeField);

    form.submit();
}