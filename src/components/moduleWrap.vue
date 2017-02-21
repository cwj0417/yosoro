<template>
    <div class="module-wrap">
        <section class="module-title">
            <span>{{title}}</span>
        </section>
        <section class="module-body">
            <slot></slot>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: ['title']
    }
</script>