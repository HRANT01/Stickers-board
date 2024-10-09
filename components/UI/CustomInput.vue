<template>
  <div class="relative">
    <div class="flex items-center">
      <input
        required
        type="text"
        id="phone"
        class="text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
        :maxlength="props.maxlength"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  placeholder: String,
  maxlength: Number,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style scoped></style>
