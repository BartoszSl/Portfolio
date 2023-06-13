const product = document.querySelector('.item-product')
const amount = document.querySelector('.item-amount')
const color = document.querySelector('.js-color')
const size = document.querySelector('.js-size')
const itemPrize = document.querySelector('.item-prize')

const tax = document.querySelector('.tax-prize')
const procent = document.querySelector('.js-procent')
const rabat = document.querySelector('.rabat-prize')

const finallyPrize = document.querySelector('.js-finallyPrize')

clickToPageCount = 1 ;

const storedData = localStorage.getItem('myData')
const parsedData = JSON.parse(storedData)
console.log(parsedData);


