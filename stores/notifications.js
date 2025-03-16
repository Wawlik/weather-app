import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        notifications: [],
        //todo: to enum
        // typesNames: {
        //     'info': '',
        //     'error': 'Error',
        //     'warn': 'Warning',
        // }
    }),
    actions: {
        addNotification({ type = 'info', title, timeout = 3000 }) {
            const id = Date.now();
            this.notifications.push({ id, type, title })
            setTimeout(() => {
                this.removeNotification(id);
            }, timeout);
        },
        removeNotification(id) {
            const ind = this.notifications.findIndex(not => not.id === id)
            if (~ind) {
                this.notifications = this.notifications.filter(not => not.id !== id)
            }
        },
        dumpNotifications() {
            // keeping link, upd sended
            this.notifications.length = 0
        }
    }
})
