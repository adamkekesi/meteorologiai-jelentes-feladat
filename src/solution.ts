import fs from "fs";
import Measurement from "./Measurement";
import { Dictionary } from "./types";

interface PlaceData {
    mediumTemperature: number|null;
    fluctuation: number;
}

export default class Solution {
    private _weatherMesurements: Measurement[] = [];
    constructor(source: string) {
        fs.readFileSync(source)
            .toString()
            .trim()
            .split("\n")
            .forEach(line => {
                const curLine = line.trim();
                this._weatherMesurements.push(new Measurement(curLine));
            });
    }

    public get cityData() {
        const dict: Dictionary<{
            min: number;
            max: number;
            measurements: Measurement[];
        }> = {};

        for (const measurement of this._weatherMesurements) {
            if (!dict[measurement.city]) {
                dict[measurement.city] = {
                    min: measurement.temperature,
                    max: measurement.temperature,
                    measurements: [1, 7, 13, 19].includes(measurement.hour)
                        ? [measurement]
                        : [],
                };
            } else {
                if (measurement.temperature < dict[measurement.city].min) {
                    dict[measurement.city].min = measurement.temperature;
                }
                if (measurement.temperature > dict[measurement.city].max) {
                    dict[measurement.city].max = measurement.temperature;
                }
                if ([1, 7, 13, 19].includes(measurement.hour)) {
                    dict[measurement.city].measurements[measurement.hour] =
                        measurement;
                }
            }
        }

        const result: Dictionary<PlaceData> = {};

        for (const city in dict) {
            const data = dict[city];
            const measurementCount = data.measurements.reduce(
                (acc, cur) => acc + (cur ? 1 : 0),
                0,
            );
            let mediumTemperature: number|null;

            if (measurementCount < 4) {
                mediumTemperature =null;
            } else {
                const sum = data.measurements.reduce(
                    (acc, cur) => acc + cur.temperature,
                    0,
                );
                mediumTemperature = Math.round(sum / 4);
            }

            const fluctuation = data.max - data.min;

            result[city] = {
                mediumTemperature,
                fluctuation,
            };
        }
        return result;
    }
}
