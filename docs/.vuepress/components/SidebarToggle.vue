<template>
  <button class="sidebar-toggle" @click="toggleSidebar">
    {{ isOpen ? 'Hide Sidebar' : 'Show Sidebar' }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(true)

function toggleSidebar() {
  isOpen.value = !isOpen.value
  const sidebar = document.querySelector('.sidebar')
  if (sidebar) {
    sidebar.style.display = isOpen.value ? 'block' : 'none'
  }
}
</script>

<style>
.sidebar-toggle {
  position: fixed;
  top: 10px;
  left: 10px;
  background: #3eaf7c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  z-index: 9999;
  font-size: 14px;
  font-weight: bold;
}

.sidebar-toggle:hover {
  background: #369568;
}
</style>
