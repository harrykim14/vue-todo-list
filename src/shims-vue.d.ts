declare module "*.vue" {
  import { defineComponent, ComponentCustomProperties } from "vue";
  import { Store } from "veux";
  import { STATE } from "@/store/store.interface";
  declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
      $store: Store<STATE>;
    }
  }
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
