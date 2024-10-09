<template>
  <div class="relative">
    <div class="flex items-center">
      <textarea
        required
        id="textarea"
        class="text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
        :rows="rows"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  placeholder: String,
  rows: {
    type: Number,
    default: 4,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style scoped></style>
