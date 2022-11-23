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
}
