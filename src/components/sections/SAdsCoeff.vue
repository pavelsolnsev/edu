<template>
  <section class="s-ads-coeff container-scrollable">
    <div class="s-ads-coeff__wrapper">
      <div class="s-ads-coeff__content">
        <p class="text-semibold-m a-mb-16">
          Сезонный коэффициент
        </p>
        <table>
          <thead>
            <tr>
              <th class="text-medium-xs">
                Январь
              </th>
              <th class="text-medium-xs">
                Февраль
              </th>
              <th class="text-medium-xs">
                Март
              </th>
              <th class="text-medium-xs">
                Апрель
              </th>
              <th class="text-medium-xs">
                Май
              </th>
              <th class="text-medium-xs">
                Июнь
              </th>
              <th class="text-medium-xs">
                Июль
              </th>
              <th class="text-medium-xs">
                Август
              </th>
              <th class="text-medium-xs">
                Сентябрь
              </th>
              <th class="text-medium-xs">
                Октябрь
              </th>
              <th class="text-medium-xs">
                Ноябрь
              </th>
              <th class="text-medium-xs">
                Декабрь
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-medium-m">
                1,0
              </td>
              <td class="text-medium-m">
                1,0
              </td>
              <td class="text-medium-m">
                1,0
              </td>
              <td class="text-medium-m">
                1,0
              </td>
              <td class="text-medium-m">
                1,25
              </td>
              <td class="text-medium-m">
                1,5
              </td>
              <td class="text-medium-m">
                1,5
              </td>
              <td class="text-medium-m">
                1,25
              </td>
              <td class="text-medium-m">
                1,25
              </td>
              <td class="text-medium-m">
                1,0
              </td>
              <td class="text-medium-m">
                0,75
              </td>
              <td class="text-medium-m">
                0,75
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.s-ads-coeff {
  margin-bottom: margin(72);

  &__wrapper {
    @media(max-width: $breakpoint-sm) {
      padding: padding2(0, 28);
    }

    @media(max-width: $breakpoint-xs) {
      padding: padding2(0, 20);
    }
  }

  &__content {
    padding: padding2(24, 16);
    background-color: color(blue-gray);
  }

  table {
    border-collapse: collapse;
  }

  th, td {
    min-width: rem(72);
    padding: padding(8);
    text-align: center;
  }

  thead tr {
    border-bottom: 1px solid color(dark-bluer);
  }
}
</style>
