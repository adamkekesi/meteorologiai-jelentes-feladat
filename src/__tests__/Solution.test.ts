import Solution from "../Solution";

describe("Solution tesztelése", () => {
    const solution = new Solution("tavirathu13.txt");
    const city = "BP";
   it("2.feladat tesztelése", () =>{
    expect(solution.lastMeasurement(city)).toBe("23:30");
   });
   
   it("3.feladat tesztelése", () =>{
    expect(solution.maxTemp()).toBe("DC 13:45 35 fok");
    expect(solution.minTemp()).toBe("SM 23:45 16 fok");
   });
});
