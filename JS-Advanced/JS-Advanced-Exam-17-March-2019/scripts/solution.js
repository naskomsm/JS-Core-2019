function solve() {
   let signMeButton = document.getElementsByTagName('button')[0];
   signMeButton.addEventListener('click', onclick);

   function onclick() {
      let jsFundamentalsCheckbox = document.getElementsByName('js-fundamentals')[0];
      let jsAdvancedCheckbox = document.getElementsByName('js-advanced')[0];
      let jsApplicationsCheckbox = document.getElementsByName('js-applications')[0];
      let jsWebCheckbox = document.getElementsByName('js-web')[0];

      let price = 0;
      let courses = [];

      let jsFundamentalsPrice = 170;
      let jsAdvancedPrice = 180;
      let jsApplicationsPrice = 190;
      let jsWebPrice = 490;

      if (jsFundamentalsCheckbox.checked) {
         courses.push('JS-Fundamentals');
         price += jsFundamentalsPrice;
      }

      if (jsAdvancedCheckbox.checked) {
         courses.push('JS-Advanced');
         price += jsAdvancedPrice;
      }

      if (jsApplicationsCheckbox.checked) {
         courses.push('JS-Applications');
         price += jsApplicationsPrice;
      }

      if (jsWebCheckbox.checked) {
         courses.push('JS-Web')
         price += jsWebPrice;
      }

      if (courses.includes('JS-Fundamentals') && courses.includes('JS-Advanced')) {
         price -= jsAdvancedPrice;
         jsAdvancedPrice = jsAdvancedPrice - (jsAdvancedPrice * 0.1);
         price += jsAdvancedPrice;

         if (courses.includes('JS-Applications')) {
            price = price - (price * 0.06);
         }

         if (courses.includes('JS-Web')) {
            courses.push('HTML and CSS');
         }
      }

      if(document.getElementsByName('educationForm')[1].checked){
         price = price - (price * 0.06);
      }

      price = Math.floor(price);

      document.querySelector('.courseFoot p').textContent = `Cost: ${price}.00 BGN`;
      let ul = document.getElementsByClassName('courseBody')[1].children[0];
      courses.forEach((course) =>{
         let li = document.createElement('li');
         li.textContent = course;
         ul.appendChild(li);
      });
   }
}

solve();