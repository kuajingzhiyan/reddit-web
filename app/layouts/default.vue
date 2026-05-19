<script setup lang="ts">
</script>

<template>
    <div>
      <header>
        <slot name="header">
          <!-- <h1>{{ headerTitle }}</h1> -->
        </slot>
      </header>
      <main>
        <slot />
      </main>
      <footer class="mt-10">
        <slot name="footer">
        </slot>
      </footer>
    </div>
  </template>
  