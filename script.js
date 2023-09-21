<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Text to Speech</title>
</head>
<body>
    <h1>Text to Speech</h1>
    <div>
        <label for="voices">Select Voice:</label>
        <select id="voices"></select>
    </div>
    <div>
        <label for="rate">Rate:</label>
        <input id="rate" type="range" min="0.1" max="10" step="0.1" value="1">
    </div>
    <div>
        <label for="pitch">Pitch:</label>
        <input id="pitch" type="range" min="0" max="2" step="0.1" value="1">
    </div>
    <textarea id="textToSpeak" rows="4" cols="50">Type your text here...</textarea>
    <div>
        <button id="start">Start</button>
        <button id="stop">Stop</button>
    </div>
    
    <script>
        const voicesSelect = document.getElementById('voices');
        const rateInput = document.getElementById('rate');
        const pitchInput = document.getElementById('pitch');
        const textToSpeak = document.getElementById('textToSpeak');
        const startButton = document.getElementById('start');
        const stopButton = document.getElementById('stop');
        let synth = window.speechSynthesis;
        let speaking = false;
        let utterance = new SpeechSynthesisUtterance();

        // Populate voices dropdown
        function populateVoices() {
            const voices = synth.getVoices();
            voicesSelect.innerHTML = voices
                .filter(voice => voice.lang.startsWith('en')) // Filter English voices
                .map(voice => `<option value="${voice.name}">${voice.name}</option>`)
                .join('');
        }

        // Initialize voices dropdown
        populateVoices();
        synth.onvoiceschanged = populateVoices;

        // Start speaking when the start button is clicked
        startButton.addEventListener('click', () => {
            if (!speaking) {
                const selectedVoice = voicesSelect.value;
                const rate = parseFloat(rateInput.value);
                const pitch = parseFloat(pitchInput.value);

                const selectedVoiceObj = synth.getVoices().find(voice => voice.name === selectedVoice);

                if (selectedVoiceObj) {
                    utterance.voice = selectedVoiceObj;
                    utterance.rate = rate;
                    utterance.pitch = pitch;
                    utterance.text = textToSpeak.value;
                    synth.speak(utterance);
                    speaking = true;
                }
            }
        });

        // Stop speaking when the stop button is clicked
        stopButton.addEventListener('click', () => {
            if (speaking) {
                synth.cancel();
                speaking = false;
            }
        });
    </script>
</body>
</html>
