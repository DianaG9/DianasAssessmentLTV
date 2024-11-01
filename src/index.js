import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.scss';
import { initInputValidationEmail, initSearchButtonEmail, initInputValidationPhone, initSearchButtonPhone} from './js/form-validation';

(function init() {
  initInputValidationEmail();
  initSearchButtonEmail();
})();

