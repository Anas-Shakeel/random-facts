// Base API URLs
const CAT_API = "https://meowfacts.herokuapp.com/"; // 'data':[0]
const DOG_API = "https://dog-api.kinduff.com/api/facts?number=1"; // 'facts':[0]
const FUN_API = "https://uselessfacts.jsph.pl/api/v2/facts/random"; // 'text'

// Get the fact element & it's ID
const fact_element = document.querySelector(".fact-text");
const fact_id = fact_element.id; // used to decide what API to call

// GENERIC Fetch API at `api_url`
async function fetch_api(api_url) {
    try {
        // Request the data promise
        const res = await fetch(api_url);

        // If status wasn't ok
        if (!res.ok) {
            throw new Error("network response was not ok.");
        }
        // Return the json of the response
        return await res.json();
    } catch (error) {
        console.error(`Error fetching data from (${api_url}): `, error);
        throw error;
    }
}

// Writes the `fact` into the fact text in DOM
function write_fact_to_DOM(fact) {
    fact_element.innerHTML = fact;
}

// Copies the `text` into clipboard
async function copy_to_clipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.log("Error occured while copying: ", error);
    }
}

// Copy fact
function copy_fact() {
    // Get the fact text and copy to clipboard
    copy_to_clipboard(fact_element.innerHTML);
}

// Load function (handles everything on auto)
async function load_fact() {
    // Display a loading message
    fact_element.innerHTML = "Loading fact...";

    try {
        // Call Appropriate API and inject the fact into DOM
        switch (fact_id) {
            // Call Fun_facts API
            case "funFact":
                const fun_fact = await fetch_api(FUN_API);
                write_fact_to_DOM(fun_fact["text"]);
                break;

            // Call Cat API
            case "catFact":
                const cat_fact = await fetch_api(CAT_API);
                write_fact_to_DOM(cat_fact["data"][0]);
                break;

            // Call Dog API
            case "dogFact":
                const dog_fact = await fetch_api(DOG_API);
                write_fact_to_DOM(dog_fact["facts"][0]);
                break;

            default:
                break;
        }
    } catch (e) {
        console.log("Facts Error: ", e);
    }
}

// Get the Random_fact button
const random_fact_button = document.querySelector("#randomFact");

// Add Load event to random button
random_fact_button.addEventListener("click", () => {
    load_fact();
});

// Get the Copy_fact button
const copy_fact_button = document.querySelector("#copyFact");
// Add Copy event to copy button
copy_fact_button.addEventListener("click", () => {
    copy_fact();
});

// Load a fact on page refresh or reload!
load_fact();
