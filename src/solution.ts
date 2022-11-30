import fs, { writeFileSync } from "fs";
import Measurement from "./Measurement";
import { Dictionary } from "./types";

interface TemperatureData {
    mediumTemperature: number | null;
    fluctuation: number;
}

interface WindData {
    time: string;
    windSpeed: string;
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

    public get temperatureData() {
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
                    dict[measurement.city].measurements.push(measurement);
                }
            }
        }

        const result: Dictionary<TemperatureData> = {};

        for (const city in dict) {
            const data = dict[city];
            let mediumTemperature: number | null;

            const requiredHours = [1, 7, 13, 19];
            for (const m of data.measurements) {
                const index = requiredHours.indexOf(m.hour);
                if (index !== -1) {
                    requiredHours.splice(index, 1);
                }
            }

            if (requiredHours.length !== 0) {
                mediumTemperature = null;
            } else {
                const sum = data.measurements.reduce(
                    (acc, cur) => acc + cur.temperature,
                    0,
                );
                mediumTemperature = Math.round(sum / data.measurements.length);
            }

            const fluctuation = data.max - data.min;

            result[city] = {
                mediumTemperature,
                fluctuation,
            };
        }
        return result;
    }

    public get windData() {
        const result: Dictionary<WindData[]> = {};

        for (const measurement of this._weatherMesurements) {
            if (result[measurement.city]) {
                result[measurement.city].push({
                    time: measurement.timeDisplay,
                    windSpeed: measurement.windSpeedDisplay,
                });
            } else {
                result[measurement.city] = [
                    {
                        time: measurement.timeDisplay,
                        windSpeed: measurement.windSpeedDisplay,
                    },
                ];
            }
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

        let answer = "";

        this._weatherMesurements.forEach(m => {
            if (m.temperature === max) {
                answer = `${m.city} ${m.hour}:${m.minute} ${m.temperature} fok`;
            }
        });
        return answer;
    }

    public minTemp() {
        let min = 20;
        this._weatherMesurements.forEach(m => {
            if (m.temperature < min) {
                min = m.temperature;
            }
        });

        let answer = "";

        this._weatherMesurements.forEach(m => {
            if (m.temperature === min) {
                answer = `${m.city} ${m.hour}:${m.minute} ${m.temperature} fok`;
            }
        });
        return answer;
    }

    public writeWindDataToFile(dir: string) {
        for (const key in this.windData) {
            const windDatas = this.windData[key];
            let content = key + "\n";
            for (const data of windDatas) {
                content += `${data.time} ${data.windSpeed}\n`;
            }
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            writeFileSync(dir + key + ".txt", content);
        }
    }
}
