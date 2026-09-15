![Banner](./banner.png)

# Template Web App

This is a set of templates for creating web applications with:
  * [React](https://react.dev/) (with [TypeScript](https://www.typescriptlang.org/) and [SCSS](https://sass-lang.com/)): Library used for building components.
  * [FastAPI](https://fastapi.tiangolo.com/): Framework for building API REST.
  * [Socket.IO](https://socket.io): Event-driven library for real-time communication.
  * [SQLAlchemy](https://www.sqlalchemy.org/): SQL toolkit and Object Relational Mapper.
  * [Redis](https://redis.io/): In-memory data structure store used as a database.

It uses the [Fast](https://github.com/TheRake66/python-fast) file generator.

## Create an application

Use the following commands to create and initialize a new application:

```sh
fast create project my-app
cd my-app
fast start install
code .
```

## Run application

Use the following commands to run the application:

```sh
fast start frontend
fast start backend
```

## Use routing

You do not need to register each route in `main.tsx`. Routes are automatically loaded based on filenames.

With the command:
```sh
fast create page user-$id-stats
```

You will get the files:
```
└─pages/
  └─user/
    └─$id/
      ├─stats.module.scss
      └─stats.tsx
```

That creates the route:
```tsx
// @/main.tsx
<Route path="/user/:id/stats" element={<Stats />} />
```

## Use store

Same as routing, you do not need to register each store in `provider.ts`. Stores are automatically loaded based on filenames.

With the command:
```sh
fast create store counter
```

You will get the files:
```
└─stores/
  └─counter.ts
```

That creates the store:
```ts
// @/services/provider.tsx
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

## Use WebSocket casting

You have three classes for managing broadcast lists with regular data delivery over WebSockets:
  * `UniCast`: Each user receives unique data.
  * `MultiCast`: A group of users receives shared data.
  * `BroadCast`: All users receive shared data.

`Unicast` is intended for specific use cases. It consumes more resources than `Multicast`, as each user has their own coroutine.

### Example using UniCast

```py
# backend/routes/hello.py
from libraries.response import Response
from libraries.unicast import UniCast

async def say_hello(sid: str) -> Response:
  return Response(message=f"Hello user with with id {sid}!")

# User will receive a message every 3 seconds.
UniCast("hello", say_hello, 3)
```

```tsx
// frontend/sources/pages/hello.tsx
import { socket } from '@/services/backend.ts';

useEffect(() => {
  socket.emit('hello#follow');
  socket.on('hello#receive', data => console.log(data.message));
  return () => {
    socket.emit('hello#unfollow');
    socket.off('hello#receive');
  };
}, []);
```

### Example using MultiCast

```py
# backend/routes/hello.py
from libraries.response import Response
from libraries.multicast import MultiCast

async def say_hello(sids: Tuple[str]) -> Response:
  return Response(message=f"Hello to {len(sids)} users in this loop!")

# Users in group will receive a message every 3 seconds.
MultiCast("hello", say_hello, 3)
```

```tsx
// frontend/sources/pages/hello.tsx
import { socket } from '@/services/backend.ts';

useEffect(() => {
  socket.emit('hello#follow');
  socket.on('hello#receive', data => console.log(data.message));
  return () => {
    socket.emit('hello#unfollow');
    socket.off('hello#receive');
  };
}, []);
```

### Example using BroadCast

```py
# backend/routes/hello.py
from libraries.response import Response
from libraries.broadcast import BroadCast

async def say_hello(sids: Tuple[str]) -> Response:
  return Response(message=f"Hello to {len(sids)} users in this server pool!")

# All users will receive a message every 3 seconds.
BroadCast("hello", say_hello, 3)
```

```tsx
// frontend/sources/pages/hello.tsx
import { socket } from '@/services/backend.ts';

useEffect(() => {
  socket.on('hello#broadcast', data => console.log(data.message));
  return () => socket.off('hello#broadcast');
}, []);
```

## Service hierarchy

![Services](./services.png)