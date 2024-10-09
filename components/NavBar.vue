<template>
  <header class="header-bg text-gray-600 py-4">
    <div class="container mx-auto flex justify-between w-[80%] items-center">
      <div class="flex gap-3 items-center">
        <div class="w-[4vw] text-gray-700">
          <UI-Icon name="Logo" />
        </div>
        <h1 class="text-[2.5vw] font-bold">Sticker Board</h1>
      </div>
      <nav>
        <ul class="flex space-x-6">
          <li>
            <NuxtLink to="/" class="hover:text-blue-300 text-[1.8vw]"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/settings" class="hover:text-blue-300 text-[1.8vw]"
              >Settings</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-bg {
  background-color: #f9f9f9;
  background-image: repeating-linear-gradient(
    130deg,
    #e0e0e0 0px,
    #e0e0e0 1px,
    #f9f9f9 1px,
    #f9f9f9 11px
  );
  border-bottom: 2px solid #ccc;
}
</style>
