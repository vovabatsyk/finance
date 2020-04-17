<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">{{record.recordText}}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.recordClass]">
            <div class="card-content white-text">
              <p>
                <strong>Описание:</strong>
                {{record.description}}
              </p>
              <p>
                <strong>Сумма:</strong>
                {{record.amount | currency}}
              </p>
              <p>
                <strong>Категория:</strong>
                {{record.categoryName}}
              </p>
              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">Такой записи нет</p>
  </div>
</template>

<script>
export default {
  name: "detail",
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    const id = this.$route.params.id;

    const record = await this.$store.dispatch("fetchRecordById", id);

    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );
    this.record = {
      ...record,
      categoryName: category.title,
      recordClass: record.type === "income" ? "green" : "red",
      recordText: record.type === "income" ? "Доход" : "Росход"
    };
    this.loading = false;
  }
};
</script>
