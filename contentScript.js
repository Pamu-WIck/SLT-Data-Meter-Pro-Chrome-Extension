let checkInterval = setInterval(function() {
    const peakElement = document.querySelector('li.slide.selected .used-of');
    const fullElement = document.querySelector('li.slide:not(.selected) .used-of');

    if (!peakElement || !fullElement) {
        console.log('One or more elements could not be found, retrying...');
    } else {
        clearInterval(checkInterval);  // Stop checking when the elements are found

        let peakText = peakElement.textContent;
        let [peakUsed, peakTotal] = peakText.split(" USED OF ").map(parseFloat);

        let fullText = fullElement.textContent;
        let [fullUsed, fullTotal] = fullText.split(" USED OF ").map(parseFloat);

        console.log(peakUsed, peakTotal, fullUsed, fullTotal);
    }
}, 1000);  // Check every 1000 milliseconds = 1 second
 