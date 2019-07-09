class LineManager {
    constructor(stops) {
        this.stops = [];
        for (const stop in stops) {
            if(stops[stop].name === ''){
                throw new Error('Invalid name!');
            }
            if(stops[stop].timeToNext < 0){
                throw new Error('Needs to be positive number');
            }
            this.stops.push(stops[stop]);
        }
    }


}

const man = new LineManager([
    { name: 'Depot', timeToNext: 4 },
    { name: 'Romanian Embassy', timeToNext: 2 },
    { name: 'TV Tower', timeToNext: 3 },
    { name: 'Interpred', timeToNext: 4 },
    { name: 'Dianabad', timeToNext: 2 },
    { name: 'Depot', timeToNext: 0 },
]);

console.log(man.stops);
