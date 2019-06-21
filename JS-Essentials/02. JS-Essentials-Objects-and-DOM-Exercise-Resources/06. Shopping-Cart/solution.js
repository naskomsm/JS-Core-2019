function solve() {
   let addButtons = Array.from(document.getElementsByClassName('add-product'));
   addButtons.forEach((addButton)=>{
      addButton.addEventListener('click',addProduct);
   });

   let productsBought = [];
   let productsPrice = 0;

   function addProduct(){
      let parentOfAddButton = this.parentNode;
      let overallParent = parentOfAddButton.parentNode;
      let overallParentChildren = Array.from(overallParent.children);

      let productName = overallParentChildren[1].children[0].textContent;
      let productPrice = +overallParentChildren[3].textContent;
      
      productsBought.push(productName);
      productsPrice += productPrice;

      document.getElementsByTagName('textarea')[0].textContent += `Added ${productName} for ${productPrice} to the cart.\n`;
   };

   let checkoutButton = document.getElementsByClassName('checkout')[0];
   checkoutButton.addEventListener('click',checkout);

   function checkout(){
      document.getElementsByTagName('textarea')[0].textContent += `You bought ${productsBought.join(', ')} for ${productsPrice}.`
   }
}