import _ from 'lodash'

export default {
  data() {
    return {
      page: +this.$route.query.page || 1, //default привязав query параметр page
      pageSize: 3, //к-сть записів на сторінці
      pageCount: 0, //к-сть сторінок
      allItems: [], //всі записи
      items: [], //записи які треба показувати
    }
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`) // додаю query
      this.items = this.allItems[page - 1] || this.allItems[0] 
    },
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
  },
}
