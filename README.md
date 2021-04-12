## Vue with Typescript 실전예제 (Todo-list)

1. 컴포넌트 개발하기

```vue
<!-- Header.vue -->
...
<script lang="ts">
// 강의 내에선 vue-property-decorator를 사용하였으나
// Vue 3.0에서는 defineComponent로 옮겨짐에 따라 이를 사용
import { defineComponent } from "vue";

export default defineComponent({
  name: "appHeader",
});
</script>
...

<!-- App.vue -->
<script lang="ts">
import { defineComponent } from "vue";
import appHeader from "@/components/header.vue";

export default defineComponent({
  name: "App",
  components: {
    appHeader,
  },
});
</script>
```

- vue 3에서 달라진 것들을 적용하기 위해 아래 자료를 참고하였다

  [defineComponent로 컴포넌트 만들기](https://labs.thisdot.co/blog/your-first-vue-3-app-using-typescript)

  [Vue.js 공식 문서 내 data() 타입 설정](https://v3.vuejs.org/guide/typescript-support.html#using-with-options-api)

  [Vue Router 공식 문서의 $watch 설명](https://next.router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes)

  (1) vue 3.0에서는 data()로 데이터를 지정할 수 있고 이 때 as TYPE으로 데이터의 타입을 지정할 수 있다.

```typescript
interface DATA {
  id: string;
  title: string;
  status: string;
}

export default defineComponent({
  name: "item-list",
  data() {
    return {
      data: [
        { id: "0", title: "test1", status: "active" },
        { id: "1", title: "test2", status: "active" },
        { id: "2", title: "test3", status: "clear" },
      ] as DATA[],
      renderList: [] as DATA[],
    };
  },
}
```

(2) vue-property-decorator에서 사용하던 watch를 $watch로 사용하며 이는 create()와 같은 lifecycle 함수에서 동작한다

- 이 때 $watch는 첫번째 인자로 watch 할 파라미터를 함수의 형식으로 받고, 두 번째 인자로 바뀐 파라미터, 이전 파라미터를 매개변수로 갖는 실행 함수를 인자로 받는다

```typescript
// item-list.vue
...
created() {
    this.renderList = this.data;

    this.$watch(
      () => this.$route.params.status,
      // eslint-disable-next-line
      (toParams: string, previousParams: string) => {
        console.log(toParams);
        if (!toParams) {
          this.renderList = this.data;
        } else if (toParams === "active" || toParams === "clear") {
          this.renderList = this.data.slice().filter((item) => {
            return item.status === toParams;
          });
        }
      }
    );
  },
...
```

(3) Vue Router 4.0.0 (21년 4월 12일 기준 beta 버전)에서는 createRouter, createWebHistory를 제공하며 RouteRecordRow 타입형식을 지원한다

- routes는 Array<RouteRecordRaw> 타입이며, createWebHistory는 해시 히스토리를 제공하는 함수이고, 나머지 설정들과 함께 createRouter로 라우터 인스턴스를 생성하면 라우터의 설정이 완료된다.

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import itemList from "@/views/item-list.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:status?",
    name: "item-list",
    component: itemList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

(4) router-link는 기존과 동일하며 to="/경로"로 라우터를 사용할 수 있으며, 경로의 params는 2번에서 기술한 것 처럼 this.$route.params로 이용할 수 있고, 이는 바로 위의 코드에서처럼 `path: "/:status?"`와 같이 동적 경로로서 사용 할 수도 있다.
