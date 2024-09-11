import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const API_URL = "https://official-joke-api.appspot.com";

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/random", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "/jokes/random");
        console.log(response.data);
        res.render("index.ejs", {
            setup:     response.data.setup,
            punchline: response.data.punchline,
        });
    }
    catch (error) {
        console.log("Error:", error.message);
        res.render("index.ejs", {
            error: "Something went wrong... Try again later."
        });
    }
});

const jokeTypes = ["general", "knock-knock", "programming", "dad"];
for (const jokeType of jokeTypes) {
    app.get("/" + jokeType, async (req, res) => {
        try {
            const url = API_URL + "/jokes/" + jokeType + "/random";
            const response = await axios.get(url);
            console.log(response.data);

            res.render("index.ejs", {
                joke: {
                    setup: response.data[0].setup,
                    punchline: response.data[0].punchline,
                    type: jokeType,
                }
            });
        }
        catch (error) {
            console.log("Error:", error.message);
            res.render("index.ejs", {
                error: "Something went wrong... Try again later."
            });
        }
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
