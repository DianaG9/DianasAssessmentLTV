import { populateResultsData } from './results';

function showResultsSection() {
  const mainFormSection = document.getElementById('main-form');
  const searchAgainSection = document.getElementById('search-again');
  const featuresSection = document.getElementById('features');
  const resultsSection = document.getElementById('results');

  populateResultsData();

  mainFormSection.classList.add('d-none');
  featuresSection.classList.add('d-none');
  searchAgainSection.classList.remove('d-none');
  resultsSection.classList.remove('d-none');
}

//Created the function to switch between tabs
const tabEmailButton = document.getElementById('tab-button-email');
const tabPhoneButton = document.getElementById('tab-button-phone');
const tabEmailContent = document.getElementById('tab-email');
const tabPhoneContent = document.getElementById('tab-phone');

function switchTab(selectedTab) { 
  if (selectedTab === 'tab-email') {
    tabEmailButton.classList.add('active');
    tabPhoneButton.classList.remove('active');
    tabEmailContent.style.display = 'flex';
    tabPhoneContent.style.display = 'none';
    initInputValidationEmail();
    initSearchButtonEmail();

  } else {
    tabPhoneButton.classList.add('active');
    tabEmailButton.classList.remove('active');
    tabPhoneContent.style.display = 'flex';
    tabEmailContent.style.display = 'none';
    initInputValidationPhone();
    initSearchButtonPhone();
  }
}

tabEmailButton.addEventListener('click', () => switchTab('tab-email'));
tabPhoneButton.addEventListener('click', () => switchTab('tab-phone'));

function initInputValidationEmail() {
  document.querySelectorAll('input[type="text"]').forEach(function (input) {
    input.addEventListener('keypress', function (event) {
      const email = input.value.toLowerCase();
      const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(regEx)) {
        var x = true;
        input.parentNode.classList.remove('error');
      } else {
        var x = false;
      }
      const keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode == '13') {
        event.preventDefault();
        localStorage.clear();
        if (x === true) {
          const proxyurl = '';
          const url = 'https://ltvdataapi.devltv.co/api/v1/records?email=' + email;
          fetch(proxyurl + url)
            .then(function (response) {
              return response.text();
            })
            .then(function (contents) {
              localStorage.setItem('userObject', contents);
              showResultsSection();
            })
            .catch(function (e) {
              console.log(e);
            });
        } else if (x !== true) {
          input.parentNode.classList.add('error');
        }
      }
    });
  });
}

function initInputValidationPhone() {
document.querySelectorAll('input[type="number"]').forEach(function (input) {
  input.addEventListener('keypress', function (event) {
    const phone = input.value;
    const regEx = /^[0-9]{10}$/; 
    const keycode = event.keyCode ? event.keyCode : event.which;

    if (!/[0-9]/.test(String.fromCharCode(keycode)) && keycode !== 8) {
      event.preventDefault(); 
    }

    if (keycode == '13') {
      event.preventDefault();

      if (phone.match(regEx)) {
        input.parentNode.classList.remove('error');
        const proxyurl = '';
        const url = 'https://ltvdataapi.devltv.co/api/v1/records?phone=' + phone; 
        fetch(proxyurl + url)
          .then(function (response) {
            return response.text();
          })
          .then(function (contents) {
            localStorage.setItem('userObject', contents);
            showResultsSection();
          })
          .catch(function (e) {
            console.log(e);
          });
      } else {
        input.parentNode.classList.add('error'); 
      }
    }
  });
});
}

function initSearchButtonEmail() {
  document.querySelectorAll('.js-btn-search').forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.clear(); // Clears storage for next request
      const selector = e.currentTarget.dataset.form;
      const emailInput = document.getElementById(`email-${selector}-input`);
      const email = emailInput.value.toLowerCase();

      let x;
      const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(regEx)) {
        x = true;
      } else {
        x = false;
      }

      if (x === true) {
        emailInput.parentNode.classList.remove('error');
        const proxyurl = '';
        const url = 'https://ltvdataapi.devltv.co/api/v1/records?email=' + email;

        toggleLoading(true); //Show the loading page

        fetch(proxyurl + url)
          .then(function (response) {
            return response.text();
          })
          .then(function (contents) {
            localStorage.setItem('userObject', contents);
            toggleLoading(false); //Hides the loading page
            showResultsSection();
          })
          .catch(function (e) {
            toggleLoading(false); //Hides the loading page
            console.log(e);
          });


      } else if (x !== true) {
        emailInput.parentNode.classList.add('error');
      }
      
    });
  });
}

function initSearchButtonPhone() {
    document.querySelectorAll('.js-btn-search').forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.clear(); 
        const selector = e.currentTarget.dataset.form;
        const phoneInput = document.getElementById(`phone-${selector}-input`); 
        const phone = phoneInput.value; 
  
        let isValidPhone;
        const regEx = /^[0-9]{10}$/; 
        if (phone.match(regEx)) {
          isValidPhone = true;
        } else {
          isValidPhone = false;
        }
  
        if (isValidPhone) {
          phoneInput.parentNode.classList.remove('error');
          const proxyurl = '';
          const url = 'https://ltvdataapi.devltv.co/api/v1/records?phone=' + phone; 
  
          toggleLoading(true); 
  
          fetch(proxyurl + url)
            .then(function (response) {
              return response.text();
            })
            .then(function (contents) {
              localStorage.setItem('userObject', contents);
              toggleLoading(false); 
              showResultsSection();
            })
            .catch(function (e) {
              toggleLoading(false); 
              console.log(e);
            });
  
        } else {
          phoneInput.parentNode.classList.add('error'); 
        }
      });
    });
  }



export { initInputValidationEmail , initSearchButtonEmail, initInputValidationPhone, initSearchButtonPhone};

//Created a function to determine to show the loading function and hidde all of the sections
function toggleLoading(isLoading) { 
  const loadingContainer = document.getElementById('loading-content');
  loadingContainer.classList.toggle('visible', isLoading);
  
  document.querySelectorAll('section').forEach((element) => {
    element.classList.toggle('hidden', isLoading);
  });
}
