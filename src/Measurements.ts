export default class Measurements {
    public _city: string;
    public _time: string;
    public _windDirection: string;
    public _windSpeed: string;
    public _temperature: number;

    constructor(line: string) {
        const m: string[] = line.split(" ");
        this._city = m[0];
        this._time = m[1];
        this._windDirection = m[2].slice(0, 3);
        this._windSpeed = m[2].slice(3, 5);
        this._temperature = +m[3];
    }
}
