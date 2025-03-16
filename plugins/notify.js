import { defineNuxtPlugin } from "#app";
import { useNotificationsStore } from "~/stores/notifications";

export default defineNuxtPlugin((nuxtApp) => {
    const store = useNotificationsStore()

    const notify = ({title, type = 'info'}) => {
        store.addNotification({ title, type })
    }

    nuxtApp.provide('notify', notify);

    nuxtApp.hook('page:finish', () => {
        store.dumpNotifications();
    })
})