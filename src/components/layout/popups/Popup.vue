<template>
    <div class="popup">
        <div class="closer" @click="$emit('dismiss')"></div>
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
   export default {
      name: 'ElmPopup',
      emits: ['dismiss'],
   }
</script>


