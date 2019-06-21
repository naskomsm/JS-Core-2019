function solve() {
    let keyWorkInput = document.getElementById('string');
    let textInput = document.getElementById('text');

    let keyword = keyWorkInput.value;
    let text = textInput.value;

    // message settings
    let messageRegexPattern = `${keyword}(.*)${keyword}`;
    let messageRegex = new RegExp(messageRegexPattern, "g");
    let messageMatch = messageRegex.exec(text);
    let message = messageMatch[1];

    // location settings
    let locationRegexPattern = /(north|east).*?(\d{2})[^,]*?,[^,]*?(\d{6})/gmi;
    let eastMatch;
    let northMatch;
    let match = locationRegexPattern.exec(text);

    while (match !== null) {
        if (match[1].toLowerCase() === "north") {
            northMatch = match;
        }
        else {
            eastMatch = match;
        }

        match = locationRegexPattern.exec(text);
    }

    let spanResult = document.getElementById('result');

    let p1 = document.createElement('p');
    p1.textContent = `${northMatch[2]}.${northMatch[3]} N`;

    let p2 = document.createElement('p');
    p2.textContent = `${eastMatch[2]}.${eastMatch[3]} E`;

    let p3 = document.createElement('p');
    p3.textContent = `Message: ${message}`;

    spanResult.appendChild(p1);
    spanResult.appendChild(p2);
    spanResult.appendChild(p3);
}