import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import { join } from "path";
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Solution from "./Solution";

export default class Content {
    public static content(
        req: http.IncomingMessage,
        res: http.ServerResponse,
    ): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<meta charset='utf-8'>");
        res.write(
            "<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>",
        );
        res.write(
            "<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
        );
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = new url.URL(
            req.url as string,
            `http://${req.headers.host}/`,
        ).searchParams;

        // Kezd a kódolást innen -->
        const s: Solution = new Solution("tavirathu13.txt");

        let inputCity: string = params.get("cityCode") as string;
        if (!inputCity) inputCity = "BP";
        res.write("2. feladat\n");
        res.write(`<label>Kérem a város kódját: <input type='text' name='cityCode' value='${inputCity}' style='max-width:150px;' onChange='this.form.submit();'></label>\n`);
        res.write(`A(z) ${inputCity} kódú városból utoljára ${s.lastMeasurement(inputCity)} kor érkezett mérés.\n`);

        res.write("4. feladat: \n");
        if (s.calmWind.length != 0) {
            s.calmWind.forEach(e => {
                res.write(`${e.city} ${e.time.slice(0, 2)}:${e.time.slice(2, 4)}\n`);
            });
        } else {
            res.write("Nem volt szélcsend a mérések idején.");
        }
        
        res.write("5. feladat\n");
        for (const key in s.cityData) {
            const { fluctuation, mediumTemperature } = s.cityData[key];

            if (mediumTemperature !== null) {
                res.write(
                    `${key} Középhőmérséklet: ${mediumTemperature}; Hőmérséklet-ingadozás: ${fluctuation}\n`,
                );
            } else {
                res.write(`${key} NA; Hőmérséklet-ingadozás: ${fluctuation}\n`);
            }
        }

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
