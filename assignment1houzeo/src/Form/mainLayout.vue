<template>
    <!-- Render the main assignment form component -->
    <assignmentForm></assignmentForm>
</template>

<script>
// Importing the child component that contains the full form functionality
import assignmentForm from "./formSection.vue"
export default {
    name: 'mainLayout',
    components: { assignmentForm }
}
</script>
