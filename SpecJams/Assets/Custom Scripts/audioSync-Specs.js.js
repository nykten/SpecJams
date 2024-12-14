// @input Asset.AudioTrackAsset audioTrack

// Create a network event for triggering audio playback
var audioEvent = script.createEvent("SyncEvent");
audioEvent.data = { playAudio: false };

// Function to trigger audio playback
function triggerAudioPlayback() {
    audioEvent.data.playAudio = true;
    audioEvent.send();
}

// Event handler for receiving audio playback trigger
audioEvent.onReceived = function(eventData) {
    var receivedData = eventData.data;
    if (receivedData && receivedData.playAudio) {
        playAudioLocally();
    }
};

// Function to play audio locally
function playAudioLocally() {
    if (script.audioTrack) {
        var audioComponent = script.getSceneObject().createComponent("Component.AudioComponent");
        audioComponent.audioTrack = script.audioTrack;
        audioComponent.play(1);
        print("Audio playback triggered locally.");
    } else {
        print("No audio track assigned.");
    }
}

// Example usage: Trigger audio playback when a user taps the screen
var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(triggerAudioPlayback);