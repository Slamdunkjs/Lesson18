var board = document.getElementById('board');
var button = document.getElementById('button')
var buttonSecond = document.getElementById('buttonSecond')
var figuresArr = [];

import getRandomColor from './getRandomColor';
import getRandomNumber from './getRandomNumber';
import findTypeFigure from './findTypeFigure';

const widtt = window.innerWidth;
const height = window.innerHeight;

if(localStorage.getItem('figures')){
  figuresArr = JSON.parse(localStorage.getItem('figures'))
}

function Figure(x,y,figure){
  this.x = x;
  this.y = y;
  this.color = getRandomColor(0,256);
  this.type = figure;
  this.colorClub = false;
}

var deltaX;
var deltaY;
var dragFigure;
var dragObj;

window.onclick = function (e){
  figuresArr.push(new Figure(e.pageX,e.pageY,findTypeFigure(e.pageX,e.pageY)))
  localStorage.setItem('figures',JSON.stringify(figuresArr));
  render()
}

function render(){
  board.innerHTML = '';
  figuresArr.map(function(figure,index){
    var newFigure = createOneFigure(figure,index);

    newFigure.onclick = function(e){
      e.stopPropagation()
    }
    
    newFigure.onmousedown = function(){
      window.addEventListener('mousemove', stickToMouse);
      deltaX = e.pageX - newFigure.offsetLeft;
      deltaY = e.pageY - newFigure.offsetTop;
      dragFigure = newFigure;
      dragObj = figure;
    }

    newFigure.onmouseup = function(){
      window.removeEventListener('mousemove', stickToMouse);
      localStorage.setItem('figures',JSON.stringify(figuresArr));
    }


    // браузер зависает при двойном щелчке по фигуре
    if (figure.colorClub === true){
      setInterval(colorClub,1000,figure);
    }
    //      
    newFigure.ondblclick = function(){
      figure.colorClub = !figure.colorClub;
    }

    board.appendChild(newFigure)
  })
}
//
function colorClub(figure){
  figure.color = getRandomColor(0,256);
  localStorage.setItem('figures',JSON.stringify(figuresArr));
  render()
}

function createOneFigure(figure,index){
  let tagDiv = document.createElement('div');
  tagDiv.classList.add(figure.type);
  tagDiv.style.borderColor = figure.color;
  tagDiv.style.left = figure.x + 'px';
  tagDiv.style.top = figure.y + 'px';
  var tagDivText = document.createElement('div');
  tagDivText.textContent = 1 + index;
  if (figure.type === 'rhombus'){
    tagDivText.classList.add('rhombusText')
  } else if(figure.type === 'parallelogram') {
    tagDivText.classList.add('parallelogramText')
  };
  tagDiv.appendChild(tagDivText)
  return tagDiv;
}
;
function stickToMouse(e){
  dragFigure.style.left = (e.pageX - deltaX) + 'px';
  dragFigure.style.top = (e.pageY - deltaY) + 'px';

  dragObj.y = e.pageY - deltaY;
  dragObj.x = e.pageX - deltaX;
}

button.onclick = function(e){
  e.stopPropagation()
  figuresArr=[];
  render()
}

let timerId;
var autoShootDefault = false;

buttonSecond.onclick = function(e){
  e.stopPropagation()
  autoShootDefault = !autoShootDefault;
  if (autoShootDefault === true){
    timerId = setInterval(autoShoot,100);

  }  else {
    clearInterval(timerId) 
  }

  localStorage.setItem('figures',JSON.stringify(figuresArr));
  render();
}

function autoShoot(){
  var randomX = getRandomNumber(0,widtt);
  var randomY = getRandomNumber(0,height);
  figuresArr.push(new Figure(randomX,randomY,findTypeFigure(randomX,randomY))); // не получается сделать 
  // новый модуль, так как конструктор new Figure находится здесь
  render();
}

render()