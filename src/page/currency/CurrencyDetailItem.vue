<template>
  <div
    :class="isIncome ? 'in' : 'out'"
    class="c-currency-detail-item"
    @click.stop="showDetail">
    <div class="info">
      <div class="title" >{{ detail.body }}</div>
      <div class="time">{{ '2018-07-23 13:46:27' | formatDate('MM-dd hh:mm') }}</div>
    </div>
    <div class="amount">
      {{ isIncome ? '+' : '-' }}{{ detail.amount }}
    </div>

  </div>
</template>

<script>
export default {
  name: "CurrencyDetailItem",
  props: {
    detail: { type: Object, required: true }
  },
  data() {
    return {};
  },
  computed: {
    isIncome() {
      return this.detail.type > 0;
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.c-currency-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ededed;
  color: #b3b3b3;
  padding: 30px;
  font-size: 30px;

  .time {
    color: #b3b3b3;
    font-size: 24px;
  }
  .title {
    font-size: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
  .amount {
    font-size: 32px;
  }

  &.in {
    .title {
      color: #333;
    }

    .amount {
      color: #ff9400;
    }
  }
}
</style>
