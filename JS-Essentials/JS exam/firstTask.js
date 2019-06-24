function solve(days) {
    let sum = 0;

    for (let i = 1; i <= days; i++) {
        sum += 450 * 0.4;
        sum += 500 * 0.08;
        sum += 1050 * 0.2;

        if (i % 5 === 0) {
            sum += (1500 * 0.3);
        }

        if (i % 9 === 0) {
            sum += (1000 * 0.08) + (1000 * 0.3);
        }
    }

    console.log(`${sum} milligrams of caffeine were consumed`);
}
