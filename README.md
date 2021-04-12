## Learn Vue 3.0 with Vue JS Crash Course 2021

[영상 링크](https://www.youtube.com/watch?v=qZXt1Aom3Cs)

- 원래 듣고 있던 강의(Typescript with Vue)가 Vue 2.0 버전으로 작성되어서 최신 버전의 Vue로 적용해 보던 중에 막힘
- Vue 3.0의 흐름을 파악하고자 위 링크의 영상을 정주행 하기로 함
- Typescript가 아닌 Javascript로만 이루어진 강의여서 추후 Typescript를 적용하는 방법을 찾아보아야 할 것

### 이 강의에서 구현한 것들

<image src="https://user-images.githubusercontent.com/67398691/114279923-eb9f4e00-9a71-11eb-8853-31bad058e7de.png" width="300px" alt="vuejs example 1"/>

- Todo list, reminder가 필요할 경우 더블클릭 이벤트(@dblclick)로 좌측에 표시

<image src="https://user-images.githubusercontent.com/67398691/114279981-2a350880-9a72-11eb-9e7a-14c83157d554.png" width="300px" alt="vuejs example 2"/>

- Add Task를 통해 토글되는 form을 구현

<image src="https://user-images.githubusercontent.com/67398691/114280021-5cdf0100-9a72-11eb-9a8e-f4721f12a3e4.png" width="300px" alt="json-server image"/>

- json-server를 이용해 간단한 api를 구현하고 이를 통해 GET, PUT, DELETE와 같은 CRD를 구현

```javascript
async addTask(task) {
      const res = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      this.tasks = [...this.tasks, data];
    },
    
async fetchTasks() {
      const res = await fetch(`api/tasks`);
      const data = await res.json();

      return data;
    },
    
async deleteTask(id) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`api/tasks/${id}`, {
          method: "DELETE",
        });

        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("Error deleting task");
      }
    },
```

<image src="https://user-images.githubusercontent.com/67398691/114280131-e2fb4780-9a72-11eb-9532-fec0f5095bf6.png" width="300px" alt="vuejs example 3" />
- vue-route를 구현하여 Home, About의 경로 설정 및 $route.path를 이용한 버튼 동적 구현

