import fs from "fs";
import Measurements from "./Measurements";

export default class Solution {
    private _weatherMesurement: Measurements[] = [];

    constructor(source: string) {
        fs.readFileSync(source)
            .toString()
            .trim()
            .split("\n")
            .forEach(line => {
                const curLine = line.trim();
                this._weatherMesurement.push(new Measurements(curLine));
            });
    }

    public get calmWind(): Measurements[] {
        const noWindCities: Measurements[] = [];
        this._weatherMesurement.forEach(e => {
            if (parseInt(e.windDirection) === 0 && parseInt(e.windSpeed) === 0) {
                noWindCities.push(e);
            }
        });
        return noWindCities;
    }
}
