const  USER_BUDGET  = prompt('Insert your budget for this week')
const FORM = document.getElementById('agregar-gasto')
let quantityBudget

/**
    * @description  This class will take care to control the budget
    * remainingBudget()
    * @author Andres Acosta
*/
class Budget {
      /**
        * @description create a new budget
        * @param {number} budget the budget weekly that user has
        * @author Andres Acosta
      */
     constructor(budget){
          this.budget = Number(budget)
          this.remaining = Number(budget)
     }

     remainingBudget(quantity = 0){
          return this.remaining -=Number(quantity)
     }
}
/**
    * @description This class contains all the methods to drive the DOM.
    * insertBudget()
    * printMessage()
    * addExpenseToList()
    * remainingBudget()
    * checkBudget()
    * @author Andres Acosta
*/
class Interface {
    /**
    * @author Andres Acosta
    * @description This method assign the values inserted for the user in the DOM
    * @param {number} quantity the quantity that in the beginning will be the same
    * to both, however during execution the remaining value will be subtracted
    * @return {void}
    */
    insertBudget(quantity){
         const BUDGET_SPAN = document.querySelector('span#total')
         const REMAINING_SPAN = document.querySelector('span#restante')

         BUDGET_SPAN.innerHTML = `${quantity}`
         REMAINING_SPAN.innerHTML = `${quantity}`
    }
    /**
    * @author Andres Acosta
    * @description This method will drive the messages success or error of the form,
    * after showing the message it'll 3 seconds and then it will hidde
    * @param {string} menssaege contains the text with the message to be printed
    * @param {string} type there are two types <<success>> in case of completing the
    * form  or <<error>> if the user didn't complet the form.
    * @return {void}
    */
    printMessage(message, type){
         const DIV_MESSAGE = document.createElement('div')
         DIV_MESSAGE.classList.add('text-center', 'alert')
         if(type==='error'){
            DIV_MESSAGE.classList.add('alert-danger')
         }else{
            DIV_MESSAGE.classList.add('alert-success')
         }
         DIV_MESSAGE.appendChild(document.createTextNode(message))
         document.querySelector('.primario').insertBefore(DIV_MESSAGE, FORM)

         setTimeout(function(){
              document.querySelector('.primario .alert').remove()
              FORM.reset()
         },3000)
    }
    /**
    * @author Andres Acosta
    * @description This method will take care to add the expense to list
    * assigning the neccessary CSS class and HTML code.
    * @param {string} name the name to expense for exmaple 'food' or maybe 'clothes'
    * @param {number} quantity the amount of the expense
    * @return {void}
    */
    addExpenseToList(name, quantity){
         const EXPENSES_LIST = document.querySelector('#gastos ul')
         const LI = document.createElement('li')
         LI.className = 'list-group-item d-flex justify-content-between align-items-center'

         LI.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill"> $ ${quantity} </span>
         `
         EXPENSES_LIST.appendChild(LI)
    }
    /**
    * @author Andres Acosta
    * @description This method will take care to update the value of budget
    * @param {number} quantity the quantity to be subtracted
    * @return {void}
    */
    remainingBudget(quantity){
         const REMAINING = document.querySelector('span#restante')
         const REMAINING_BUDGET_USER = quantityBudget.remainingBudget(quantity)

         REMAINING.innerHTML = `${REMAINING_BUDGET_USER}`
         this.checkBudget()
    }
    /**
    * @author Andres Acosta
    * @description This method will take care to assign the respective class
    * acording with the remaining budget being the values under 25% an alert
    * and in the half a warning.
    * @return {void}
    */
    checkBudget(){
         const totalBudget = quantityBudget.budget
         const remainigBudget = quantityBudget.remaining
         console.log(totalBudget)
         if((totalBudget / 4)> remainigBudget){
            const remaining = document.querySelector('.restante');
            remaining.classList.remove('alert-success', 'alert-warning');
            remaining.classList.add('alert-danger');
         }else if((totalBudget / 2)> remainigBudget){
            const remaining = document.querySelector('.restante');
            remaining.classList.remove('alert-success');
            remaining.classList.add('alert-warning');
         }
    }
}
/**
  * An event listener to be launched when page is ready
*/
document.addEventListener('DOMContentLoaded', function(){
    if(USER_BUDGET === null || USER_BUDGET === ''){
        window.location.reload()
    } else {
        quantityBudget = new Budget(USER_BUDGET)
        const UI = new Interface()
        UI.insertBudget(quantityBudget.budget)
    }
})
/**
  * An even listener to be execute in the submit event of the form
*/
FORM.addEventListener('submit', function(e){
    e.preventDefault()
    const NAME_EXPENSE = document.querySelector('#gasto').value
    const QUANTITY_EXPENSE = document.querySelector('#cantidad').value

    const UI = new Interface()

    if(NAME_EXPENSE === '' || QUANTITY_EXPENSE === '' ){
        UI.printMessage('An error has ocurred', 'error')
    } else {
        UI.printMessage('Event added successfuly', 'success')
        UI.addExpenseToList(NAME_EXPENSE, QUANTITY_EXPENSE)
        UI.remainingBudget(QUANTITY_EXPENSE)
    }
})
