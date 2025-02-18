self.addEventListener('push', (event) => {
    const payload = event.data.json();
    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };

    event.waitUntil(self.registration.showNotification(title, options));
});