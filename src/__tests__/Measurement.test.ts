import Measurement from "../Measurement";

describe("Measurement", () => {
    const m1 = new Measurement("BP 0000 VRB02 23");
    const m2 = new Measurement("SM 0015 01013 21");
    /*     const m3 = new Measurement("BP 0000 VRB02 23"); */

    it("Measurement osztálypéldány ellenőrzése", () => {
        expect(m1).toBeInstanceOf(Measurement);
        expect(m2).toBeInstanceOf(Measurement);
    });

    it("city", () => {
        expect(m1.city).toBe("BP");
        expect(m2.city).toBe("SM");
    });

    it("time", () => {
        expect(m1.time).toBe("0000");
        expect(m2.time).toBe("0015");
    });

    it("hour", () => {
        expect(m1.hour).toBe(0);
        expect(m2.hour).toBe(0);
    });

    it("minute", () => {
        expect(m1.minute).toBe(0);
        expect(m2.minute).toBe(15);
    });

    it("timeDisplay", () => {
        expect(m1.timeDisplay).toBe("00:00");
        expect(m2.timeDisplay).toBe("00:15");
    });

    it("windDirection", () => {
        expect(m1.windDirection).toBe("VRB");
        expect(m2.windDirection).toBe("010");
    });

    it("windSpeed", () => {
        expect(m1.windSpeed).toBe("02");
        expect(m2.windSpeed).toBe("13");
    });

    it("windSpeedDisplay", () => {
        expect(m1.windSpeedDisplay).toBe("##");
        expect(m2.windSpeedDisplay).toBe("#############");
    });

    it("temperature", () => {
        expect(m1.temperature).toBe(23);
        expect(m2.temperature).toBe(21);
    });
});
