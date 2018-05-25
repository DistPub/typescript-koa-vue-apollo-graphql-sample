<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
        <h1>GraphQL</h1>
        <textarea>{{result}}</textarea>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AllUsers from '../graphql/AllUsers.gql';

console.log(AllUsers);

export default Vue.extend({
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
            result: '',
        };
    },
    apollo: {
        result: {
            query: AllUsers
        }
    },
    methods: {
        increment() { this.enthusiasm++ },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
</script>

<style lang="scss">
.greeting {
    font-size: 20px;
}
</style>
