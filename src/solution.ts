import fs from "fs";
import Measurement from "./Measurement";
import { Dictionary } from "./types";

interface PlaceData {
    mediumTemperature: number | null;
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

    public lastMeasurement(code: string) {
        const times: string[] = [];
        this._weatherMesurements.forEach(m => {
            if (m.city === code) {
                times.push(m.time.toString());
            } else {
                return "soha";
            }
        });

        const answer = times[times.length - 1];
        const hour = answer.slice(0, 2);
        const minute = answer.slice(2, 4);
        return `${hour}:${minute}`;
    }

    public get calmWind(): Measurement[] {
        const noWindCities: Measurement[] = [];
        this._weatherMesurements.forEach(e => {
            if (
                parseInt(e.windDirection) === 0 &&
                parseInt(e.windSpeed) === 0
            ) {
                noWindCities.push(e);
            }
        });
        return noWindCities;
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
            let mediumTemperature: number | null;

            if (measurementCount < 4) {
                mediumTemperature = null;
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

    public maxTemp() {
        let max = 0;
        this._weatherMesurements.forEach(m => {
            if (m.temperature > max) {
                max = m.temperature;
            }
        });

        this._weatherMesurements.forEach(m => {
            if (m.temperature === max) {
                return `${m.city} ${m.hour} ${m.temperature}`;
            }
        });
    }

    public minTemp() {
        let min = 20;
        this._weatherMesurements.forEach(m => {
            if (m.temperature < min) {
                min = m.temperature;
            }
        });

        this._weatherMesurements.forEach(m => {
            if (m.temperature === min) {
                return `${m.city} ${m.hour} ${m.temperature}`;
            }
        });
    }
}
