import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.scss';
import { initInputValidationEmail, initSearchButtonEmail, initInputValidationPhone, initSearchButtonPhone} from './js/form-validation';

(function init() {
  initInputValidationEmail();
  initSearchButtonEmail();
  initInputValidationPhone();
})();

document.body.style.overflow = 'hidden';
window.addEventListener('load', function() {
  document.querySelector(`.loader-container`).style.display = 'none';
  document.body.style.overflow = 'auto';
});