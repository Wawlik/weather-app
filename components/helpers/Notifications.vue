<template>
  <div class="notifications-container">
    <transition-group name="list" tag="div">
      <div
        v-for="msg in notifications"
        :key="msg.id"
        :class="['notification', msg.type]"
      >
        <div class="notification-content">
          <p v-if="msg.type" class="notification-type">{{ msg.type }}:</p>
          <p class="notification-title">
            {{ msg.title }}
          </p>
        </div>
        <button class="notification-remove" @click="remove(msg.id)">✖</button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNotificationsStore } from "~/stores/notifications";

const notificationsStore = useNotificationsStore();
const { notifications } = storeToRefs(notificationsStore);

const typeVisibility = computed(() => {
  return;
});

function remove(id) {
  notificationsStore.removeNotification(id);
}
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-flow: column-reverse nowrap;
}
.notification {
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px 14px;
  margin-bottom: 8px;
  border-radius: 4px;
  justify-content: space-between;
  width: clamp(250px, 300px, 400px);
}
.notification-content {
  display: flex;
  flex-flow: column nowrap;
  gap: 4px;
}
.notification.error {
  background-color: #ffe5e5;
  color: #fb2f62;
}
.notification.success {
  background-color: #e5ffe5;
}
.notification.info {
  background-color: #e5e5ff;
}
.notification-type {
  display: v-bind(typeVisibility);
}
.notification-remove {
  background-color: unset;
  cursor: pointer;
  border: none;
  padding: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
