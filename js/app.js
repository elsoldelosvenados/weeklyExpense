const  USER_BUDGET  = prompt('Insert your budget for this week')
const FORM = document.getElementById('agregar-gasto')
let quantityBudget


class Budget {
     constructor(budget){
          this.budget = Number(budget)
          this.remaining = Number(budget)
     }

     remainingBudget(quantity = 0){
          return this.remaining -=Number(quantity)
     }
}

class Interface {
    insertBudget(quantity){
         const BUDGET_SPAN = document.querySelector('span#total')
         const REMAINING_SPAN = document.querySelector('span#restante')

         BUDGET_SPAN.innerHTML = `${quantity}`
         REMAINING_SPAN.innerHTML = `${quantity}`
    }
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
    remainingBudget(quantity){
         const REMAINING = document.querySelector('span#restante')
         const REMAINING_BUDGET_USER = quantityBudget.remainingBudget(quantity)

         REMAINING.innerHTML = `${REMAINING_BUDGET_USER}`
         this.checkBudget()
    }
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

document.addEventListener('DOMContentLoaded', function(){
    if(USER_BUDGET === null || USER_BUDGET === ''){
        window.location.reload()
    } else {
        quantityBudget = new Budget(USER_BUDGET)
        const UI = new Interface()
        UI.insertBudget(quantityBudget.budget)
    }
})

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
