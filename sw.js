self.addEventListener("message", (event) => {
    self.registration.showNotification(event.data, {
        body: "This is a scheduled notification.",
        icon: "icon.png",
        badge: "badge.png"
    });
});
