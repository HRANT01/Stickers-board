<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />

    <main class="flex-grow container mx-auto p-4">
      <slot></slot>
    </main>

    <footer class="text-white py-4 footer">
      <div class="container mx-auto text-center text-gray-700">
        <p>© 2024 Stickers-Board</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer {
  background-color: #f9f9f9;
  background-image: repeating-linear-gradient(
    130deg,
    #e0e0e0 0px,
    #e0e0e0 1px,
    #f9f9f9 1px,
    #f9f9f9 11px
  );
  border-top: 2px solid #ccc;
}
</style>
