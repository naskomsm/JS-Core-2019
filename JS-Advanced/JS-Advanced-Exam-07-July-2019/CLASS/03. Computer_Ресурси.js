class Computer {
    constructor(ramMemory, cpuGHz, hddMemory) {
        this.ramMemory = ramMemory;
        this.cpuGHz = cpuGHz;
        this.hddMemory = hddMemory;
        this.taskManager = [];
        this.installedPrograms = [];
    }

    installAProgram(name, requiredSpace) {
        if (this.hddMemory < requiredSpace || this.hddMemory <= 0) {
            throw new Error('There is not enough space on the hard drive');
        }

        let program = {
            name,
            requiredSpace
        }

        this.installedPrograms.push(program);
        this.hddMemory -= requiredSpace;

        return program;
    }

    uninstallAProgram(name) {
        let searchedProgram = this.installedPrograms.find(x => x.name === name);

        if (!searchedProgram) {
            throw new Error('Control panel is not responding');
        }

        let index = this.installedPrograms.indexOf(searchedProgram);
        this.installedPrograms.splice(index, 1);
        this.hddMemory += searchedProgram.requiredSpace;

        return this.installedPrograms;
    }

    openAProgram(name) {
        let searchedProgram = this.installedPrograms.find(x => x.name === name);
        if (!searchedProgram) {
            throw new Error(`The ${name} is not recognized`);
        }


        let isOpen = this.taskManager.find(x => x.name === name);
        if (isOpen) {
            throw new Error(`The ${name} is already open`);
        }

        let ramUsage = ((searchedProgram.requiredSpace / this.ramMemory) * 1.5);
        let cpuUsage = (((searchedProgram.requiredSpace / this.cpuGHz) / 500) * 1.5);

        if (this.ramMemory - ((ramUsage / 100) * this.ramMemory) <= 0 && this.cpuGHz - ((cpuUsage / 100) * this.cpuGHz) <= 0) {
            throw new Error(`${name} caused out of memory exception`);
        }

        if (this.ramMemory - ((ramUsage / 100) * this.ramMemory) <= 0) {
            throw new Error(`${name} caused out of memory exception`);
        }

        if (this.cpuGHz - ((cpuUsage / 100) * this.cpuGHz) <= 0) {
            throw new Error(`${name} caused out of cpu exception`);
        }

        let object = {
            name,
            ramUsage: ramUsage,
            cpuUsage: cpuUsage
        }

        this.taskManager.push(object);

        return object;
    }

    taskManagerView() {
        if (this.taskManager.length === 0) {
            return `All running smooth so far`;
        }

        let result = [];
        for (const program of this.taskManager) {
            result.push(`Name - ${program.name} | Usage - CPU: ${program.cpuUsage.toFixed(0)}%, RAM: ${program.ramUsage.toFixed(0)}%`);
        }

        return result.join('\n');
    }
}

let computer = new Computer(4096, 7.5, 250000);

computer.installAProgram('Word', 7300);
computer.installAProgram('Excel', 10240);
computer.installAProgram('PowerPoint', 12288);
computer.uninstallAProgram('Word');
computer.installAProgram('Solitare', 1500);

computer.openAProgram('Excel');
computer.openAProgram('Excel');

console.log(computer.installedPrograms);
console.log(('-').repeat(50)) // Separator
console.log(computer.taskManager);


