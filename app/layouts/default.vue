<template>
  <div class="min-h-screen bg-background text-foreground antialiased flex flex-col">
    <AppHeader />
    <main class="flex-1 overflow-x-hidden text-left">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
