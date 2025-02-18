self.addEventListener("push", (event) => {
    const options = {
        body: "New post available! Check it now.",
        icon: "icon.png",
        badge: "badge.png"
    };
    event.waitUntil(
        self.registration.showNotification("New Update!", options)
    );
});
