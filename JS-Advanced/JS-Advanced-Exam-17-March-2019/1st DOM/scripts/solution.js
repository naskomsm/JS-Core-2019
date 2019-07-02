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

      checkedBoxesOperator();
      onlineFormDiscount();
      displayTheCourses();

      function checkedBoxesOperator() {
         if (jsFundamentalsCheckbox.checked) {
            price += jsFundamentalsPrice;
            courses.push('JS-Fundamentals');

            if (jsAdvancedCheckbox.checked) {
               jsAdvancedPrice -= jsAdvancedPrice * 0.1;
               price += jsAdvancedPrice;
               courses.push('JS-Advanced');

               if (jsApplicationsCheckbox.checked) {
                  price += jsApplicationsPrice;
                  price -= price * 0.06;
                  courses.push('JS-Applications');

                  if (jsWebCheckbox.checked) {
                     price += jsWebPrice;
                     courses.push('JS-Web');
                     courses.push('HTML and CSS');
                  }
               }
            }
            else if (jsApplicationsCheckbox.checked) {
               price += jsApplicationsPrice;
               courses.push('JS-Applications');
            }
            else if (jsWebCheckbox.checked) {
               price += jsWebPrice;
               courses.push('JS-Web');
            }
         }
         else {
            if (jsAdvancedCheckbox.checked) {
               price += jsAdvancedPrice;
               courses.push('JS-Advanced');
            }
            if (jsApplicationsCheckbox.checked) {
               price += jsApplicationsPrice;
               courses.push('JS-Applications');
            }
            if (jsWebCheckbox.checked) {
               price += jsWebPrice;
               courses.push('JS-Web');
            }
         }
      }

      function onlineFormDiscount() {
         if (document.getElementsByName('educationForm')[1].checked) {
            price = price - (price * 0.06);
         }

         price = Math.floor(price);
      }

      function displayTheCourses() {
         document.querySelector('.courseFoot p').textContent = `Cost: ${price}.00 BGN`;
         let ul = document.getElementsByClassName('courseBody')[1].children[0];
         courses.forEach((course) => {
            let li = document.createElement('li');
            li.textContent = course;
            ul.appendChild(li);
         });
      }
   }
}

solve();