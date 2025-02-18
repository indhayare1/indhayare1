self.addEventListener("message", (event) => {
    if (event.data === "showNotification") {
        self.registration.showNotification("Test Notification", {
            body: "This is a test notification after 10 seconds!",
            icon: "icon.png",
            badge: "badge.png"
        });
    }
});
