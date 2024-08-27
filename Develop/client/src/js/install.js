const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default install prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
});

// Event handler for the `butInstall` button click
butInstall.addEventListener('click', async () => {
  // Ensure the event is available
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Reset the deferred prompt variable
    deferredPrompt = null;
    // Hide the install button regardless of the outcome
    butInstall.style.display = 'none';
  }
});

// Event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Log the event or show a confirmation message
  console.log('PWA was installed successfully');
});
