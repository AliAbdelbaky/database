import {
    defineStore
} from 'pinia'
export default defineStore('userStore', {
    state: () => ({
        name: 'Ali Abdelbaky',
        id: 1234
    })
})