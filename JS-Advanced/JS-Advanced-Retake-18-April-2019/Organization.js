class Organization {

    constructor(name, budget) {
        this.name = name;
        this.employees = [];
        this.budget = budget;
    }

    get departmentsBudget() {
        return {
            marketing: 0.4 * this.budget,
            finance: 0.25 * this.budget,
            production: 0.35 * this.budget
        }
    }

    add(employeeName, department, salary) {
        let requestedDepartmentBudget = this.departmentsBudget[department];
        if (requestedDepartmentBudget < salary) {
            return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is ${requestedDepartmentBudget}.`;
        }

        let object = {
            employeeName: employeeName,
            department: department,
            salary: salary
        }

        this.employees.push(object);

        this.departmentsBudget[department] -= salary; // problem
        return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`
    }

    employeeExists(employeeName) {
        let searchedEmployee = this.employees.find(x => x.employeeName === employeeName);

        if(!searchedEmployee){
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }

        return `Mr./Mrs. ${searchedEmployee.employeeName} is part of the ${searchedEmployee.department} department.`;
    }

    leaveOrganisation(employeeName){
        let searchedEmployee = this.employees.find(x => x.employeeName === employeeName);

        if(!searchedEmployee){
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }

        let index = this.employees.indexOf(searchedEmployee);
        this.employees.splice(index,1);
        this.departmentsBudget[searchedEmployee.department] += searchedEmployee.salary; // problem
        return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`;
    }

    status(){
        let result = '';
        result += `${this.name.toUpperCase()} DEPARTMENTS:\n`;

        //marketing
        let marketingEmployeesNames = [];
        this.employees.filter(x=>x.department === 'marketing')
        .sort((a,b) => b.salary - a.salary)
        .forEach((employee) => marketingEmployeesNames.push(employee.employeeName));
        result += `Marketing | Employees: ${marketingEmployeesNames.length}: ${marketingEmployeesNames.join(', ')} |  Remaining Budget: ${this.departmentsBudget['marketing']}`;
       
        //finance
        let finaceEmployeesNames = [];
        this.employees.filter(x=>x.department === 'fiance')
        .sort((a,b) => b.salary - a.salary)
        .forEach((employee) => finaceEmployeesNames.push(employee.employeeName));
        result += `\nFinance | Employees: ${finaceEmployeesNames.length}: ${finaceEmployeesNames.join(', ')} |  Remaining Budget: ${this.departmentsBudget['finance']}`;
        
        //production
        let productionEmployeesNames = [];
        this.employees.filter(x=>x.department === 'production')
        .sort((a,b) => b.salary - a.salary)
        .forEach((employee) => productionEmployeesNames.push(employee.employeeName));
        result += `\nProduction | Employees: ${productionEmployeesNames.length}: ${productionEmployeesNames.join(', ')} |  Remaining Budget: ${this.departmentsBudget['production']}`;
        
        return result;
    }
}

let organization = new Organization('SoftUni', 20000);

organization.add('Peter', 'marketing', 1000);
organization.add('Gosho', 'marketing', 900);
organization.add('Atanas', 'marketing', 1100);
organization.add('Robert', 'production', 2000);

console.log(organization.status());
