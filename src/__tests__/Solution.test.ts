import { readdirSync, readFileSync, rmdirSync } from "fs";
import { join } from "path";
import Solution from "../Solution";

describe("Solution tesztelése", () => {
    const solution = new Solution("tavirathu13.txt");
    const dir = join(__dirname, `output/`);

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

    afterAll(()=>{
        rmdirSync(dir, {recursive: true});
    })
});
