class Organization {

    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
        this.employees = [];

        this.deparments = {
            marketing: 0.4 * this.budget,
            finance: 0.25 * this.budget,
            production: 0.35 * this.budget
        }
    }

    get departmentsBudget() {
        return {
            marketing: this.deparments['marketing'],
            finance: this.deparments['finance'],
            production: this.deparments['production']
        }
    }

    add(employeeName, department, salary) {
        let departmentBudget = this.departmentsBudget[department];
        if (departmentBudget < salary) {
            return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${departmentBudget}.`;
        }

        let object = {
            employeeName: employeeName,
            department: department,
            salary: salary
        }

        this.employees.push(object);
        this.deparments[department] -= salary;

        return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`
    }

    employeeExists(employeeName) {
        let searchedEmployee = this.employees.find(x => x.employeeName === employeeName);

        if (!searchedEmployee) {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }

        return `Mr./Mrs. ${searchedEmployee.employeeName} is part of the ${searchedEmployee.department} department.`;
    }

    leaveOrganization(employeeName) {
        let searchedEmployee = this.employees.find(x => x.employeeName === employeeName);

        if (!searchedEmployee) {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }

        let index = this.employees.indexOf(searchedEmployee);
        this.employees.splice(index, 1);
        this.deparments[searchedEmployee.department] += searchedEmployee.salary;
        return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`;
    }

    status() {
        let result = '';
        result += `${this.name.toUpperCase()} DEPARTMENTS:`;

        //marketing
        let marketingEmployeesNames = [];
        this.employees.filter(x => x.department === 'marketing')
            .sort((a, b) => b.salary - a.salary)
            .forEach((employee) => marketingEmployeesNames.push(employee.employeeName));
        result += `\nMarketing | Employees: ${marketingEmployeesNames.length}: ${marketingEmployeesNames.join(', ')} | Remaining Budget: ${this.departmentsBudget['marketing']}`;

        //finance
        let finaceEmployeesNames = [];
        this.employees.filter(x => x.department === 'finance')
            .sort((a, b) => b.salary - a.salary)
            .forEach((employee) => finaceEmployeesNames.push(employee.employeeName));
        result += `\nFinance | Employees: ${finaceEmployeesNames.length}: ${finaceEmployeesNames.join(', ')} | Remaining Budget: ${this.departmentsBudget['finance']}`;

        //production
        let productionEmployeesNames = [];
        this.employees.filter(x => x.department === 'production')
            .sort((a, b) => b.salary - a.salary)
            .forEach((employee) => productionEmployeesNames.push(employee.employeeName));
        result += `\nProduction | Employees: ${productionEmployeesNames.length}: ${productionEmployeesNames.join(', ')} | Remaining Budget: ${this.departmentsBudget['production']}`;

        return result;
    }
}

let organization = new Organization('SoftUni', 100110);
console.log(organization.add('Peter', 'marketing', 4001));
console.log(organization.add('Gosho', 'production', 4001));
console.log(organization.add('Stoqn', 'finance', 400));
console.log(organization.status());



