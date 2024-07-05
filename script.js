let budget = 0;
let totalExpenses = 0;
let expenses = [];
let expenseChart = null;

const budgetElement = document.getElementById('total-budget');
const expensesElement = document.getElementById('total-expenses');
const budgetLeftElement = document.getElementById('budget-left');

function setBudget() {
    budget = parseFloat(document.getElementById('budget').value);
    if (isNaN(budget) || budget <= 0) {
        alert('Please enter a valid budget.');
        return;
    }
    updateSummary();
}

function addExpense() {
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;

    if (isNaN(amount) || amount <= 0 || category === '') {
        alert('Please enter a valid expense amount and select a category.');
        return;
    }

    if (totalExpenses + amount > budget) {
        alert('Expense exceeds the remaining budget.');
        return;
    }

    expenses.push({ amount, category });
    totalExpenses += amount;

    updateSummary();
    updateChart();

    if (budget - totalExpenses < 0.1 * budget) {
        alert('Warning: Budget remaining is less than 10% of the original budget.');
    }
}

function updateSummary() {
    const budgetLeft = budget - totalExpenses;

    budgetElement.textContent = budget.toFixed(2);
    expensesElement.textContent = totalExpenses.toFixed(2);
    budgetLeftElement.textContent = budgetLeft.toFixed(2);
}

function updateChart() {
    const categories = {};
    expenses.forEach(expense => {
        if (!categories[expense.category]) {
            categories[expense.category] = 0;
        }
        categories[expense.category] += expense.amount;
    });

    const ctx = document.getElementById('expense-chart').getContext('2d');
    const data = {
        labels: Object.keys(categories),
        datasets: [{
            data: Object.values(categories),
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#28a745'],
        }]
    };

    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: data
    });
}

