function submitForm(buttonId) {
    const form = document.getElementById('menu_items');
    const amountField = document.getElementById('amount');
    const menuNameField = document.getElementById('menu_name');
    const priceField = document.getElementById('price');
    //const descField = document.getElementById('desc');
    //const orderTypeField = document.getElementById('order_type');

    switch (buttonId) {
        case "chickensandwich":
            amountField.value = 1;
            menuNameField.value = "Classic Chicken Sandwich";
            priceField.value = 8.43;
            //descField = "Truly a classic. Fried chicken, american cheese, lettuce, tomato, red onion, pickles & IHOP® sauce.";
            //orderTypeField = "Fried Chicken";
            break;
        case "pancake":
            amountField.value = 1;
            menuNameField.value = "Pancakes";
            priceField.value = 9.29;
            //descField = "A true breakfast classic that started it all. Get five of our fluffy, world-famous buttermilk pancakes topped with whipped real butter.";
            //orderTypeField = "Buttermilk";
            break;
        case "cola":
            amountField.value = 1;
            menuNameField.value = "Coke";
            priceField.value = 0.99;
            //descField = ' Classic Coca Cola with optional ice or swap with qualifying fountain drink. ';
            //orderTypeField = null;
            break;
        case "water":
            amountField.value = 1;
            menuNameField.value = "Water";
            priceField.value = 0.99;
            //descField = "Simplicity is best. Can come with ice or no ice along with lemon. ";
            //orderTypeField = null;
            break;
        case "omelette":
            amountField.value = 1;
            menuNameField.value = "Omelette";
            priceField.value = 13.37;
            //descField = "Our fluffy omelette served with your choice of vegetables.";
            //orderTypeField = null;
            break;  
    }

    form.submit();
}