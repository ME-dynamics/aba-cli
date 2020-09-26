import { textSync } from "figlet";



export function figlet() {
    console.log(textSync("aba-cli", { font: "Crawford" }));
}