// User interface related logic

export function initPlayersForm() {
    const form = document.querySelector("#players-form");
    const playerTwoName = form.querySelector('[name="player-two"]');
    const playerTwoSymbol = form.querySelector('[name="symbol-two"]');
    
    function validatePlayersForm(event) {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);
        const playerOneName = data.get("player-one");
        const playerTwoName = data.get("player-two");
        const playerTwoNameInput = form.querySelector('[name="player-two"]');
        const playerTwoSymbolInput = form.querySelector('[name="symbol-two"]');

        // boolean check : do players have the same name ?
        const sameName = (
            playerOneName.trim().toLowerCase()
            === playerTwoName.trim().toLowerCase()
        );
        // boolean check : do players have the same symbol ?
        const sameSymbol = (data.get("symbol-one") === data.get("symbol-two"));

        // if players have the same name or symbol: pop a message
        playerTwoNameInput.setCustomValidity(
            sameName ? "This name is already taken by player 1." : ""
        );
        playerTwoSymbolInput.setCustomValidity(
            sameSymbol ? "This symbol is already taken by player 1." : ""
        );

        // if the form is invalid: do not pursue the execution
        if (!form.reportValidity()) return;

        // form is valid — start the game
        // playGame(...);
    }

    // add custom form validator to the targeted form
    form.addEventListener("submit", validatePlayersForm);

    // clear stale custom errors so a corrected field is never permanently blocked
    form.addEventListener("input", () => {
        playerTwoName.setCustomValidity("");
        playerTwoSymbol.setCustomValidity("");
    });
}