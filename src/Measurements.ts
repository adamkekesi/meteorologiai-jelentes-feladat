export default class Measurements {
    protected _city: string;
    protected _time: string;
    protected _windDirection: string;
    protected _windSpeed: string;
    protected _temperature: number;

    constructor(line: string) {
        const m: string[] = line.split(" ");
        this._city = m[0];
        this._time = m[1];
        this._windDirection = m[2].slice(0, 3);
        this._windSpeed = m[2].slice(3, 5);
        this._temperature = +m[3];
    }
}
