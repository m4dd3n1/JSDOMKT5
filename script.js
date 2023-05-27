const formBank = document.forms.cardForm
const card = document.querySelector('.card')
const logo = document.querySelector('.bank')
const system = document.querySelector('.system')
const number = document.querySelector('.number')
const monthRes = document.querySelector('.monthRes')
const yearRes = document.querySelector('.yearRes')
const nameRes = document.querySelector('.name')
const codeRes = document.querySelector('.cvv')
const resultsContainer = document.querySelector('.results')

const selectBank = formBank.children.bank
const selectSystem = formBank.children.type
const numberInput = formBank.children.number
const month = formBank.children.month
const year = formBank.children.year
const name1 = formBank.children.name
const code = formBank.children.cvv
const arrData = []

function swithBank(){
    switch (selectBank.value) {
        case 'СБЕР':
            card.style.backgroundColor = '#17FF55'
            logo.src = 'https://toplogos.ru/images/logo-sber.png'
            return 'https://toplogos.ru/images/logo-sber.png'
            break
        case 'Тинькофф':
            card.style.backgroundColor = '#FFDF00'
            logo.src = 'https://toplogos.ru/images/logo-tinkoff-bank.png'
            return 'https://toplogos.ru/images/logo-tinkoff-bank.png'
            break
        default:
            break
    }
}

function switchSystem(){
    switch (selectSystem.value) {
        case 'VISA':
            system.src = 'https://www.svgrepo.com/show/473823/visa.svg'
            return 'https://www.svgrepo.com/show/473823/visa.svg'
            break
        case 'master card':
            system.src = 'https://www.pngplay.com/wp-content/uploads/13/Mastercard-Logo-Free-PNG.png'
            return 'https://www.pngplay.com/wp-content/uploads/13/Mastercard-Logo-Free-PNG.png'
            break
        case 'maestro':
            system.src = 'https://www.nicepng.com/png/full/951-9513657_mastercard-logo-vector-mastercard-maestro-logo-png-maestro.png'
            return 'https://www.nicepng.com/png/full/951-9513657_mastercard-logo-vector-mastercard-maestro-logo-png-maestro.png'
            break
        default:
            break
    }
}

function checkNum(str){
    if (str.length > 0){
        let a = str.slice(str.length - 1, str.length)
        if (isNaN(parseInt(a))){
            alert('вы ввесли букву вместо цифры')
            return str.slice(0, str.length - 1)
        } else {
            return str
        }
    } else {
        return str
    }
}

swithBank()
switchSystem()
selectBank.addEventListener('change', () => {
    swithBank()
})

selectSystem.addEventListener('change', () => {
    switchSystem()
})

numberInput.addEventListener('input', function() {
    let newNum = ''
    let num = this.value.slice(0,16)
    this.value = this.value.slice(0,16)
    let res = checkNum(num)
    for (let i = 0; i < res.length; i++){
        newNum += res[i]
        if (i == 3 || i == 7 || i == 11){
            newNum += ' '
        }
    }
    number.innerText = newNum
    this.value = res
})

month.addEventListener('input', function() {
    let num = this.value.slice(0, 2)
    let newNum = checkNum(num)
    monthRes.innerText = newNum
    this.value = newNum
})

year.addEventListener('input', function() {
    let num = this.value.slice(0, 2)
    let newNum = checkNum(num)
    yearRes.innerText = newNum
    this.value = newNum
})

name1.addEventListener('input', function() {
    nameRes.innerText = this.value
})

code.addEventListener('input', function() {
    let num = this.value.slice(0, 3)
    let newNum = checkNum(num)
    codeRes.innerText = newNum
    this.value = newNum
})

let num = 1
formBank.addEventListener('submit', function(e) {
    e.preventDefault()
    let newNum = ''
    for (let i = 0; i < this.number.value.length; i++){
        newNum += this.number.value[i]
        if (i == 3 || i == 7 || i == 11){
            newNum += ' '
        }
    }
    if (this.number.value.length == 16 && this.cvv.value.length == 3 && parseInt(this.month.value) <= 12 && this.year.value.length == 2){
        resultsContainer.innerHTML += `
        <div class='flex_res'>
            <div class='res_item'>${num++}</div>
            <div class='res_item'><img src='${swithBank()}' alt='bank' class='res_img'></div>
            <div class='res_item'><img src='${switchSystem()}' alt='bank' class='res_img'></div>
            <div class='res_item'>CARD NUMBER<br>${newNum}</div>
            <div class='res_item'>VALID THRU<br>${this.month.value}/${this.year.value}</div>
            <div class='res_item'>CVV/CVC<br>${this.cvv.value}</div>
            <div class='res_item'>CARDHOLDER<br>${this.name.value.toUpperCase()}</div>
        </div>
        `
    } else {
        alert('Ошибка')
    }
    this.reset()
    swithBank()
    switchSystem()
    number.innerText = '0000 0000 0000 0000'
    monthRes.innerText = '00'
    yearRes.innerText = '00'
    nameRes.innerText = 'NAME SURNAME'
    codeRes.innerText = '000'
})