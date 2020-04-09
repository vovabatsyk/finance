export default {
    install(Vue, options) {
        Vue.prototype.$message = function (html) {
            M.toast({html, classes: 'orange lighten-1 black-text'})
        },
        Vue.prototype.$error = function (html) {
            M.toast({html: `[Ошибка]: ${html}`, classes: 'red darken-4'})
        }
    }
}
