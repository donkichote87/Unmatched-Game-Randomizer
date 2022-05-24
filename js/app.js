const buttonGroup = document.querySelector(".btn-group");
const form = document.querySelector("form");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const mainContainer = document.querySelector("#maincontainer");

fetch(`https://unmatched-games-api.herokuapp.com/games`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Connection problem");
    }).then(games => {
        games.forEach((game, index) => {
            const input = document.createElement("input");
            input.className = "btn-check";
            input.setAttribute("type", "checkbox");
            input.setAttribute("checked", "");
            input.setAttribute("autocomplete", "off");
            input.setAttribute("id", index);
            input.setAttribute("name", "box")

            const label = document.createElement("label");
            label.className = "btn btn-lg btn-secondary";
            label.setAttribute("for", index);
            label.innerHTML = game.title;

            buttonGroup.appendChild(input);
            buttonGroup.appendChild(label);

        });

    })


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let selectedWarriors = [];
    const boxes = document.getElementsByName("box");
    fetch(`https://unmatched-games-api.herokuapp.com/games`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Connection problem");
        }).then(games => {
            boxes.forEach(box => {

                if (box.checked) {
                    selectedWarriors = [...selectedWarriors, ...games[box.id].fighters];
                }
            })
            
            const first = {
                name: `${player1.value === "" ? "Player 1" : player1.value}`,
                fighter: `${selectedWarriors.splice(Math.floor(Math.random() * selectedWarriors.length), 1)}`
            }
            const second = {
                name: `${player2.value === "" ? "Player 2" : player2.value}`,
                fighter: `${selectedWarriors[Math.floor(Math.random() * selectedWarriors.length)]}`
            }
            
            const badge = document.createElement("span");
            badge.className = "badge rounded-pill bg-warning";
            badge.innerHTML = "First Player";


            const row = document.createElement("div");
            row.className = "row justify-content-around";

            const colFirst = document.createElement("div");
            colFirst.className = "col-3"
            
            const cardFirst = document.createElement("div");
            cardFirst.className = "card border-secondary mb-3";
            cardFirst.setAttribute("style", "max-width: 25rem; height: 12rem")
            const headFirst = document.createElement("div");
            headFirst.className = "card-header text-body";
            headFirst.innerHTML = first.name;
            const bodyFirst = document.createElement("div");
            bodyFirst.className = "card-body text-success";
            bodyFirst.innerHTML = `<h2>${first.fighter}</h2>`;
            cardFirst.appendChild(headFirst);
            cardFirst.appendChild(bodyFirst);
            colFirst.appendChild(cardFirst);
            row.appendChild(colFirst);

            const rowButton = document.createElement("div");
            rowButton.className = "row justify-content-around";
            const reset = document.createElement("button");
            reset.className = "btn btn-sm btn-danger";
            reset.setAttribute("type", "button");
            reset.setAttribute("style", "width: 5rem; ")
            reset.setAttribute("onClick", "window.location.reload();");
            reset.innerHTML = "Reset!";
            rowButton.appendChild(reset);
        

            const colSecond = document.createElement("div");
            colSecond.className = "col-3"
            const cardSecond = document.createElement("div");
            cardSecond.className = "card border-secondary mb-3";
            cardSecond.setAttribute("style", "max-width: 25rem; height: 12rem")
            const headSecond = document.createElement("div");
            headSecond.className = "card-header text-body";
            headSecond.innerHTML = second.name;
            const bodySecond = document.createElement("div");
            bodySecond.className = "card-body text-success";
            bodySecond.innerHTML = `<h2>${second.fighter}</h2>`;
            cardSecond.appendChild(headSecond);
            cardSecond.appendChild(bodySecond);
            colSecond.appendChild(cardSecond);
            row.appendChild(colSecond);

            const bodies = [bodyFirst, bodySecond];
            bodies[Math.floor(Math.random() * bodies.length)].appendChild(badge);

            mainContainer.replaceChildren(row, rowButton);
        
        })
})