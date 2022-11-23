export default class Measurements {
    protected _city: string;
    protected _time: string;
    protected _windDirection: string;
    protected _windSpeed: string;
    protected _temperature: string;

    constructor(line: string) {
        const m: string[] = line.split(" ");
        this._city = m[0];
        this._time = m[1];
        this._windDirection = m[3].slice(0, 2);
        this._windSpeed = m[3].slice(3, 4);
        this._temperature = m[4];
    }
}
