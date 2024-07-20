import {name} from './lib/1.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../public/index.css'
import '../../public/index.less'
import imgObj from '../../public/123.png'
import imgObj2 from '../../public/234.png'

const div = document.querySelector('div');
div.innerHTML = '123';


const img = document.createElement('img');
img.src = imgObj;

document.querySelector('.abc').appendChild(img);

console.log(process.env.NODE_ENV)
consolee.log(112)