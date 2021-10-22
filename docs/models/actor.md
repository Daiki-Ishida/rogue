# Actor

```mermaid
classDiagram
  class Actor {
    <<interface>>
  }

  class Player {
    string id
  }

  class Enemy {
    string id
  }

  Player --> Actor
  Enemy --> Actor
```
