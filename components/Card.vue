<template>
  <div
    class="card relative w-full h-auto rounded-2xl bg-gray-100 border-2 border-gray-300 transition duration-500 ease-out hover:border-blue-500 hover:shadow-lg p-7 group"
  >
    <button
      class="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 focus:outline-none"
      @click="deleteSticker(props.sticker.id)"
    >
      X
    </button>

    <div class="flex flex-col items-center justify-center gap-2">
      <p class="text-xl font-bold text-black">{{ props.sticker.title }}</p>
      <div class="text-gray-500 whitespace-normal max-w-[100%] truncate">
        {{ props.sticker.description }}
      </div>
    </div>

    <button
      class="relative top-12 left-1/2 bottom-5 transform -translate-x-1/2 w-3/5 rounded-lg border-none bg-blue-600 text-white text-base p-2 transition duration-300 ease-out opacity-0 group-hover:opacity-100"
      @click="editSticker(props.sticker.id)"
    >
      Edit Sticker
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  sticker: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["delete-sticker", "edit-sticker"]);

const deleteSticker = (id) => {
  emits("delete-sticker", id);
};

const editSticker = (id) => {
  emits("edit-sticker", id);
};
</script>

<style scoped>
.card {
  background-color: #f9f9f9;
  background-image: repeating-linear-gradient(
    130deg,
    #e0e0e0 0px,
    #e0e0e0 1px,
    #f9f9f9 1px,
    #f9f9f9 11px
  );
}
</style>
