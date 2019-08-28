const widtt = window.innerWidth;
const height = window.innerHeight;

export default function findTypeFigure(pageX,pageY){
  if(pageY <= height/2 && pageX <= widtt/2){
    return 'square'
  } else if (pageY <= height/2 && pageX > widtt/2){
    return 'circle'
  } else if (pageY > height/2 && pageX <= widtt/2){
    return 'rhombus'
  } return 'parallelogram'
}