<template>
    <div class="card">
        <div class="card-title">
            <slot name="title">{{ title }}</slot>
        </div>
        <div class="card-content">
            <slot/>
        </div>
    </div>
</template>

<script>
   export default {
      name: 'Card',
      props: {
         /**
          * Заголовок слоя.
          * Обязательно для заполнения.
          * */
         title: {
            type: String,
            required: true,
         },
      },
   }
</script>
