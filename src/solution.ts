import { time } from "console";
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

    public lastMeasurement(code: string) {
        const times: string[] = [];
        this._weatherMesurement.forEach(m => {
            if (m._city === code) {
                times.push(m._time.toString());
            } else {
                return "soha";
            }
        });

        const answer = times[times.length - 1];
        const hour = answer.slice(0, 2);
        const minute = answer.slice(2, 4);
        return `${hour}:${minute}`;
    }
}
