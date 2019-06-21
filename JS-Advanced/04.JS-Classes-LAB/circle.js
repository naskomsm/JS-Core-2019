class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get area(){
        return Math.PI * this.radius * this.radius;
    }

    get diameter(){
        return 2 * this.radius;
    }

    set diameter(diameter){
        this.radius = diameter / 2;
    }
}