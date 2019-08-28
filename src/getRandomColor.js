import getRandomNumber from './getRandomNumber'

export default function getRandomColor (min,max) {
  var numbers = [];
  for (var i = 0; i < 3; i++){
    var a = (getRandomNumber(0,256))
    numbers.push(a)
  }
  return `rgb(${numbers[0]},${numbers[1]},${numbers[2]})`
}


