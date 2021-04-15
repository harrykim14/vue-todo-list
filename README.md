## Vue with Typescript 실전예제 (Todo-list)

<details>
<summary>1. 컴포넌트 개발하기</summary>
<div markdown="1">
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

````

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
      renderList: this.
    };
  },
}
````

(2) vue-property-decorator에서 사용하던 watch를 $watch로 사용하며 이는 create()와 같은 lifecycle 함수에서 동작한다

- 이 때 $watch는 첫번째 인자로 watch 할 파라미터를 함수의 형식으로 받고, 두 번째 인자로 바뀐 파라미터, 이전 파라미터를 매개변수로 갖는 실행 함수를 인자로 받는다

```typescript
// item-list.vue
...created() {
    (this.renderList = this.allTodoList()),
      this.$watch(
        () => this.$route.params.status,
        // eslint-disable-next-line
      (toParams: 'active'|'clear', previousParams: 'active'|'clear') => {
          this.initRenderList(toParams);
        }
      );
  },
  methods: {
    initRenderList(status?: "active" | "clear") {
      if (!status) {
        this.renderList = this.allTodoList() as ITEM[];
      } else if (status === "active" || status === "clear") {
        this.renderList =
          status === "active" ? this.activeTodoList() : this.clearTodoList();
      }
    },
  },
...
```

</div>
</details>

<details>
<summary>2. 라우터 개발하기</summary>
<div markdown="2">

(1) Vue Router 4.0.0 (21년 4월 12일 기준 beta 버전)에서는 createRouter, createWebHistory를 제공하며 RouteRecordRow 타입형식을 지원한다

- routes는 Array<RouteRecordRaw> 타입이며, createWebHistory는 해시 히스토리를 제공하는 함수이고, 나머지 설정들과 함께 createRouter로 라우터 인스턴스를 생성하면 라우터의 설정이 완료된다.

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import itemList from '@/views/item-list.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:status?',
    name: 'item-list',
    component: itemList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

(2) router-link는 기존과 동일하며 to="/경로"로 라우터를 사용할 수 있으며, 경로의 params는 2번에서 기술한 것 처럼 this.$route.params로 이용할 수 있고, 이는 바로 위의 코드에서처럼 `path: "/:status?"`와 같이 동적 경로로서 사용 할 수도 있다.

</div>
</details>

<details>
<summary>3. 스토어 개발하기</summary>
<div markdown="3">

(1) vuex 4.0.0을 사용하여 store를 구성하고자 할 때엔 key값을 Symbol 함수를 통해 고유한 값을 사용하도록 한다. createStore 함수 내에 기존 vuex처럼 state, mutation, actions, getters를 정의하여 사용할 수 있으며, 이렇게 정의된 key와 store를 main.ts에서 use() 함수 내에 인자로서 넣어주면 된다.

```typescript
// @/store/store.ts
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { ITEM } from '@/store/store.interface';

export const key: InjectionKey<Store<ITEM>> = Symbol();

export default createStore({
  state: {
    todoList: [
      { id: 0, title: 'test1', status: 'active' },
      { id: 1, title: 'test2', status: 'active' },
      { id: 2, title: 'test3', status: 'clear' },
    ] as ITEM[],
  },
  //...
  mutation: {
    // TODO added
    addItem(state, item: ITEM) {
      state.todoList.push(item);
    },
    // TODO changed status
    changeStatus(
      state,
      { id, status }: { id: number; status: 'active' | 'clear' }
    ) {
      state.todoList[id].status = status;
    },
    // TODO deleted
    removeStatus(state, id: number) {
      state.todoList.splice(
        state.todoList.findIndex((item) => item.id === id),
        1
      );
    },
  },
  actions: {
    /*...*/
  },
  getters: {
    llTodoList: (state) => state.todoList,
    activeTodoList: (state) =>
      state.todoList.filter((item: ITEM) => item.status === 'active'),
    clearTodoList: (state) =>
      state.todoList.filter((item: ITEM) => item.status === 'clear'),
  },
});

// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { key } from './store/store'; // <<< import 할 때 key 값을 같이 import 한다

createApp(App)
  .use(store, key) /* <<< 이 부분 */
  .use(router)
  .mount('#app');
```

(6) 이렇게 정의한 store를 컴포넌트에서 사용하기 위해서는 useStore 함수를 setup 함수 내에서 사용해야 한다. 기존에 this.$store로도 불러오는 방법이 있지만 useStore를 사용하여 getters를 setup 함수 내에서 지정해 주어야 undefined로 표시되지 않을 것이다.

```typescript
// item-list.vue
import { useStore } from "vuex";
import { key } from "@/store/store";

export default defineComponent({
  setup() {
    const store = useStore(key);
    return {
      allTodoList: () => store.getters[`allTodoList`],
      activeTodoList: () => store.getters[`activeTodoList`],
      clearTodoList: () => store.getters[`clearTodoList`],
    };
  },
  data() {
    return {
      renderList: [],
    };
  },
  created() {
    (this.renderList = this.allTodoList()),
  //...
  }
});
```

</div>
</details>

<details>
<summary>4. 그 외 개발 도중에 만난 vue 3.0의 변경점</summary>
<div markdown="4">

(1) 강의 내에서 `$event.target.checked`를 사용하였으나, vue3.0에서는 `$event.target.checked`를 찾을 수 없어 props로 받은 status를 기반으로 data()로 checked를 정의하여 methods에서 사용하였다.

```typescript
// item.vue
data() {
    return {
      checked: this.status === "active" ? true : false,
    };
  },
setup() {
    return { store: useStore(key) };
},
methods: {
  changeStatus() {
        if (this.checked)
          this.store.commit("changeStatus", { id: this.id, status: "clear" });
        else
          this.store.commit("changeStatus", { id: this.id, status: "active" });
  },
  removeItem() {
    this.store.commit("removeItem", this.id);
  },
}
```

(2) vue3.0 에서는 watch를 사용할 때 setup() 내에서 ref()로 지정한 레퍼런스의 변화를 감지할 수 있도록 변경되었다.

```typescript
// item-list.vue
setup() {
    const store = useStore(key);
    const todoList = ref(store.state.todoList);
    let renderList: ITEM[] = [];

    watch(todoListRef, () => {
      renderList = store.state.todoList;
    });

    return {
      store: store,
      todoList: todoList,
      allTodoList: () => store.getters[`allTodoList`],
      activeTodoList: () => store.getters[`activeTodoList`],
      clearTodoList: () => store.getters[`clearTodoList`],
    };
  },
```

- 위의 코드에서 store state에 저장된 todoList를 레퍼런스로 지정하고, 값이 변경되는 것을 watch에서 감지하여 새 값을(이전 값을 두 번째 인자로 받을 수 있음)를 받아 이용할 수 있다.

- 이 때 ref를 사용하기 위해 data()에서 지정하였던 renderList 변수를 setup()으로 옮기고 watch 함수를 사용해 이 배열이 변경되는 것을 감지하였다.

(3) 체크박스 이벤트를 핸들링하는 법

```typescript
// item-list.vue
 changeStatus(event: Event) {
      const checked: boolean = (event.target as HTMLInputElement).checked;
      if (checked) {
        this.store.commit('changeStatus', { id: this.id, status: 'clear' });
      } else {
        this.store.commit('changeStatus', { id: this.id, status: 'active' });
      }
    },
```

- `event.target`내에 체크박스 관련 이벤트 타입이 정의되어 있지 않기 때문에 HTMLInputElement로 타입 정의를 해 주어야 한다

</div>
</details>

<details>
<summary>4. Axios를 사용해 통신 해보기</summary>
<div markdown="4">
(1) Axios 인스턴스의 타입 정의하고 설정하기

```typescript
// service/axios.service.ts
import axios, { AxiosInstance } from 'axios';

export default class AxiosService {
  static readonly instance: AxiosInstance = axios.create({
    baseURL: `${process.env.axiosURL}`,
    timeout: 100000,
  });
}
```

(2) store에 axios로 통신하는 함수를 작성하기

```typescript
 actions: {
    async initData({ commit }) {
      // TODO http 통신
      const response: AxiosResponse<{
        todoList: ITEM[];
      }> = await AxiosService.instance.get("/data.json");
      commit("setTodoList", response.data.todoList);
    },
  },
```

- 이 때, AxiosResponse 타입을 지정해주는 것을 잊지말자

(3) 컴포넌트에서 Axios로 통신하기

```typescript
async created() {
    this.$store.dispatch('initData');
  },
```

- Axios 통신은 당연하지만 Promise로 반환하기 때문에 created가 비동기적으로 호출되어야 한다

</div>
<details>
