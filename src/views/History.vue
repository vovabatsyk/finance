<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>
    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!records.length" class="center">
      Записей пока нет.
      <router-link to="/record">Добавить запись?</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        class="center"
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixins from "@/mixins/pagination.mixin";
export default {
  name: "history",
  mixins: [paginationMixins],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.setupPagination(
      this.records.map(record => {
        //додаєм нові поля
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type === "income" ? "Доход" : "Расход"
        };
      }).reverse()
    );
    // this.records.reverse();
    this.loading = false;
  },
  components: { HistoryTable }
};
</script>