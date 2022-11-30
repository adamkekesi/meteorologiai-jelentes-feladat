import { readdirSync, readFileSync, rmdirSync } from "fs";
import { join } from "path";
import Measurement from "../Measurement";
import Solution from "../Solution";

describe("Solution tesztelése", () => {
    const solution = new Solution("tavirathu13.txt");
    const dir = join(__dirname, `output/`);

    const array = [
        {
            _city: "BP",
            _temperature: 22,
            _time: "0100",
            _windDirection: "000",
            _windSpeed: "00",
        },
        {
            _city: "DC",
            _temperature: 22,
            _time: "0215",
            _windDirection: "000",
            _windSpeed: "00",
        },
        {
            _city: "SN",
            _temperature: 21,
            _time: "0315",
            _windDirection: "000",
            _windSpeed: "00",
        },
        {
            _city: "BC",
            _temperature: 21,
            _time: "0445",
            _windDirection: "000",
            _windSpeed: "00",
        },
        {
            _city: "DC",
            _temperature: 23,
            _time: "0445",
            _windDirection: "000",
            _windSpeed: "00",
        },
        {
            _city: "SN",
            _temperature: 25,
            _time: "0515",
            _windDirection: "000",
            _windSpeed: "00",
        },
        {
            _city: "SN",
            _temperature: 26,
            _time: "0545",
            _windDirection: "000",
            _windSpeed: "00",
        },
        {
            _city: "KE",
            _temperature: 29,
            _time: "0845",
            _windDirection: "000",
            _windSpeed: "00",
        },
        {
            _city: "BC",
            _temperature: 33,
            _time: "1145",
            _windDirection: "000",
            _windSpeed: "00",
        },
    ];

    const city = "BP";

    it("2.feladat tesztelése", () => {
        expect(solution.lastMeasurement(city)).toBe("23:30");
    });

    it("3.feladat tesztelése", () => {
        expect(solution.maxTemp()).toBe("DC 13:45 35 fok");
        expect(solution.minTemp()).toBe("SM 23:45 16 fok");
    });

    it("4.feladat tesztelése", () => {
        //expect(solution.calmWind).toContain(array);
        expect(solution.calmWind).toEqual(array);
    });

    it("5. feladat tesztelése", () => {
        expect(solution.temperatureData).toEqual({
            BP: { mediumTemperature: 23, fluctuation: 8 },
            DC: { mediumTemperature: 29, fluctuation: 15 },
            SM: { mediumTemperature: 22, fluctuation: 8 },
            PA: { mediumTemperature: 21, fluctuation: 7 },
            SN: { mediumTemperature: 26, fluctuation: 13 },
            PR: { mediumTemperature: 21, fluctuation: 8 },
            BC: { mediumTemperature: null, fluctuation: 14 },
            PP: { mediumTemperature: null, fluctuation: 6 },
            KE: { mediumTemperature: null, fluctuation: 13 },
        });
    });

    it("6. feladat tesztelése", () => {
        const templateDir = join(__dirname, "../../output/");
        solution.writeWindDataToFile(dir);

        readdirSync(templateDir).forEach(file => {
            const testFile = readFileSync(join(dir, file)).toString();
            const originalFile = readFileSync(
                join(templateDir, file),
            ).toString();
            expect(testFile).toBe(originalFile);
        });
    });

    afterAll(() => {
        rmdirSync(dir, { recursive: true });
    });
});
