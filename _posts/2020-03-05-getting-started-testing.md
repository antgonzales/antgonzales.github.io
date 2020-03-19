# Getting started testing: culture and practice

Across all of my professional projects, I insist on testing and more
specifically Test Driven Development. I always come away from the process with a
strong understanding of the problems I solved, a clear sense of the expected
behavior, and confidence that what I wrote will give me and my team
documentation in the future. Not all developers share my enthusiasm.  Some see
testing is a chore or an afterthought. In this post, I want to provide some
insight into why testing is largely a cultural issue and less of a skills issue
and then give some practical application examples in React.

Last fall, my wife took me to visit Philip Johnson's Glass House in New Caanan,
CT. Beautiful and simple, the Glass House rests on a property filled with
several other experimental creations including a bunker that houses art by Andy
Warhol and Jasper Johns. The house itself is indeed four walls of glass with 360
degree views of the surrounding woods where coyotes howl at night. On the
property, there's a perilously large staircase that extends to nowhere, a
footbridge that intentionally bounces as you cross a dry creek, and a highly
toxic cactus that rests on his desk. One of Mr. Johnson's guiding principles in
architecture is the concept of "Safe Danger"; the idea that we are most engaged
when we can take risks in a safe environment.

Testing provides an environment for developers to take risks safely. I want my
team members to try new things without the fear that a change will utterly
cripple an application after a deploy. Nobody wants to feel setup for failure or
responsible for loss of revenue due to an outtage. Over time, outtages and
failures cause a lapse in trust with customers and management and adds stress to
what should be routine development cycles.

## Confidence and Trust

At the heart of any team is the ability for members to trust one another to make
choices. Teams with low levels of trust inevitably create systems to prevent
people from making choices. Beauracy takes hold and the innovative spark is lost
as people begin to feel like they're cogs in a machine. In web development, we
prize our ability to make choices and we thrive on learning. By taking away a
developer's ability to think, you take away their ability to make an impact on a
technology stack. Your junior developer today could become the person that
creates something that fundamentally changes the business tomorrow but you need
to give that person the room to make mistakes and learn.

By building a culture that insists on testing as a priority, you build trust
between team members and stakeholders. Bugs and unintended side effects are
minimized. Silly mistakes are removed and handled before they reach a
staging environment. Customers experience less downtime, management doesn't feel
the need to create beauracratic systems, and developers get to try new things.
Nobody loses sleep over a deploy, features are shipped, and the team feels
confident that they are moving fast without causing damage.

## Red, Green, Refactor

Test Driven Development provides a framework for developers to confidently trust
one another.  Tests are written first, enough code is written to satisfy the
test, the original code is refactored. Continue that process until you've
completed your work. It's dead simple and effective.

I adhere to Uncle Bob's rules:

1. You are not allowed to write any production code unless it is to make a
   failing unit test pass.
2. You are not allowed to write any more of a unit test than is sufficient to
   fail; and compilation failures are failures.
3. You are not allowed to write any more production code than is sufficient to
   pass the one failing unit test.

People are usually overwhelmed by this but it's like riding a bike. Once you get
past the initial learning curve it becomes second nature.

Let's create a series of tests for a React component, following Uncle Bob's
rules, so you can see the changes over time.

The full code base can be seen at http://bit.ly/2IW51qj

## Todo list example

Let's make the most cliched example in web development, the humble todo list.

### Create the folder and test file

I personally like creating folders for new files with an index to export
contents. The folder gives us a space to create test files, helpers, or
child subcomponent folders.

```
/**
 * src/TodoList/TodoList.test.tsx
 */
import React from "react";
import { render } from "@testing-library/react";

import { TodoList } from ".";

describe("TodoList", () => {
  it("works", () => {
    render(<TodoList />);
  });
});

```

That's it. That's how you start. Run the test suite. This initial test should
fail (red) and sets up a few expectations right out the gate.

1. It establishes the dependencies needed to start testing. I prefer React
   Testing Library when testing React components so I attempt to simply render
   the my component.
2. It establishes the way I expect to consume the component. By attempting to
   import directly from the folder, I'm testing that there is an index file made
   available.
3. I'm isolating the test suite to just the behavior of the component.

Now let's make the component and the index file.

```
/**
 * src/TodoList/index.ts
 */
export * from "./TodoList";
```

```
/**
 * src/TodoList/TodoList.tsx
 */
import React from "react";

export function TodoList() {
  return <div />;
}
```

Again, that's it. We've now fixed the broken test (green). It's not much, but
it's how I start every new isolated module. This could be a React component, it
could be a Node module, the pattern is the same.

Now let's start adding meaningful tests by adding our first feature.

```
/**
 * src/TodoList/TodoList.test.tsx
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { TodoList } from ".";

describe("TodoList", () => {
  it("receives user input", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Take the dinglebop" } });
    expect(input.value).toBe("Take the dinglebop");
  });
});
```

In this initial pass, I'm attempting to add an input for the user to add todos.
I want to be sure that the input takes values and show the values. I'll run the
test suite to let it fail and begin fixing the code to make it pass.

```
/**
 * src/TodoList/TodoList.tsx
 */
import React, { useState } from "react";

export function TodoList() {
  const [inputState, inputDispatch] = useState("");
  return (
    <input
      data-testid="todo-input"
      type="text"
      value={inputState}
      onChange={e => {
        inputDispatch(e.target.value);
      }}
    />
  );
}
```

I've now created a simple input that takes user values, sets it to an internal
state, and renders it in the input. I'll run the test suite to make it pass (green). I
think this is simple enough that no further refactoring is needed, I'll move
forward with another set of behavior assertions.

```
/**
 * src/TodoList/TodoList.test.tsx
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { TodoList } from ".";

describe("TodoList", () => {
  it("receives user input", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Take the dinglebop" } });
    expect(input.value).toBe("Take the dinglebop");
  });

  it("adds a todo", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, { target: { value: "Smooth it out with a bunch of
    shleem" } });
    fireEvent.click(add);
    const todo = getByTestId("todo");
    expect(todo.textContent).toBe("Smooth it out with a bunch of shleem");
  });
});
```

I'm now testing the entire user flow of adding text to the input, pressing a
button to add it to the list, and rendering the list. You'll notice that there
is some repitition. That's okay, we want to be sure that we're completely
isolating our tests to avoid weird side effects. Do not be tempted to stick a
huge `beforeEach` setup because you want things to be DRY. If you start now,
you'll just continue adding things to the block and it will become unreadable
for yourself and other devs over time. Run the test suite again to be
sure the test fails.

```
/**
 * src/TodoList/TodoList.tsx
 */
import React, { useState } from "react";

export function TodoList() {
  const [todos, updateTodos] = useState([]);
  const [inputState, inputDispatch] = useState("");
  const addTodo = newTodo => updateTodos([...todos, newTodo]);
  return (
    <div>
      <input
        data-testid="todo-input"
        type="text"
        value={inputState}
        onChange={e => {
          inputDispatch(e.target.value);
        }}
      />
      <button data-testid="todo-add" onClick={() => addTodo(inputState)}>
        Add
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} data-testid="todo">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

I've introduced a new piece of state, a button to add a todo directly from the
input state, and a list of todos. I'll run the test suite and see that it is now
green. Now that the tests are green, let's consider refactoring. Here's some
things I want to consider changing:

* I don't like the term "inputDispatch" and I actually like the way I named
    "updateTodos". Feels more declarative and explicit.
* I know that I could use a reducer but there really isn't a need at this moment
    to use one. I'll hold off for now.

Here's what it comes out refactored.

```
import React, { useState } from "react";

export function TodoList() {
  const [todos, updateTodos] = useState([]);
  const [userInput, updateUserInput] = useState("");
  const addTodo = newTodo => updateTodos([...todos, newTodo]);
  return (
    <div>
      <input
        data-testid="todo-input"
        type="text"
        value={userInput}
        onChange={e => {
          updateUserInput(e.target.value);
        }}
      />
      <button data-testid="todo-add" onClick={() => addTodo(userInput)}>
        Add
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} data-testid="todo">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

The changes are minimal but shows the process of how we can shape the code
safely. Let's move on to more behavior. Now that we're adding todos and
rendering them for the user, we want to reset the user input so the user can
continue adding more.

```
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { TodoList } from ".";

describe("TodoList", () => {
  it("receives user input", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Take the dinglebop" } });
    expect(input.value).toBe("Take the dinglebop");
  });

  it("adds a todo", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Smooth it out with a bunch of shleem" }
    });
    fireEvent.click(add);
    const todo = getByTestId("todo");
    expect(todo.texContent).toBe("Smooth it out with a bunch of shleem");
  });

  it("clears the user input after a todo is added", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Re-purpose shleem for later batches" }
    });
    fireEvent.click(add);
    expect(input.value).toBe("");
  });
});
```

I'll run the test suite to make it red.

```
import React, { useState } from "react";

export function TodoList() {
  const [todos, updateTodos] = useState([]);
  const [userInput, updateUserInput] = useState("");
  const addTodo = newTodo => updateTodos([...todos, newTodo]);
  return (
    <div>
      <input
        data-testid="todo-input"
        type="text"
        value={userInput}
        onChange={e => {
          updateUserInput(e.target.value);
        }}
      />
      <button
        data-testid="todo-add"
        onClick={() => {
          addTodo(userInput);
          updateUserInput("");
        }}
      >
        Add
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} data-testid="todo">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

I've now added a function call for `updateUserInput("")` to the button click
handler to clear the user input state. However, we still have the issue that users
can add empty todos to the list. Let's fix that.

```
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { TodoList } from ".";

describe("TodoList", () => {
  it("receives user input", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Take the dinglebop" } });
    expect(input.value).toBe("Take the dinglebop");
  });

  it("adds a todo", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Smooth it out with a bunch of shleem" }
    });
    fireEvent.click(add);
    const todo = getByTestId("todo");
    expect(todo.texContent).toBe("Smooth it out with a bunch of shleem");
  });

  it("clears the user input after a todo is added", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Re-purpose shleem for later batches" }
    });
    fireEvent.click(add);
    expect(input.value).toBe("");
  });

  it('disables the "Add Todo" button when the user input is empty', () => {
    const { getByTestId } = render(<TodoList />);
    const add = getByTestId("todo-add");
    expect(add.disabled).toBe(true);
  });
});
```

```
import React, { useState } from "react";

export function TodoList() {
  const [todos, updateTodos] = useState([]);
  const [userInput, updateUserInput] = useState("");
  const addTodo = newTodo => updateTodos([...todos, newTodo]);
  return (
    <div>
      <input
        data-testid="todo-input"
        type="text"
        value={userInput}
        onChange={e => {
          updateUserInput(e.target.value);
        }}
      />
      <button
        data-testid="todo-add"
        disabled={userInput === "" ? true : false}
        onClick={() => {
          addTodo(userInput);
          updateUserInput("");
        }}
      >
        Add
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} data-testid="todo">
           {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

We now have a comprehensive set of behaviors that we expect from our TodoList
application. There's still a few crucial pieces that need to be addressed;
editing and deleting. Let's fix that now.

```
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { TodoList } from ".";

describe("TodoList", () => {
  it("receives user input", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Take the dinglebop" } });
    expect(input.value).toBe("Take the dinglebop");
  });

  it("adds a todo", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Smooth it out with a bunch of shleem" }
    });
    fireEvent.click(add);
    const todo = getByTestId("todo");
    expect(todo.textContent).toBe("Smooth it out with a bunch of shleem");
  });

  it("clears the user input after a todo is added", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Re-purpose shleem for later batches" }
    });
    fireEvent.click(add);
    expect(input.value).toBe("");
  });

  it('disables the "Add Todo" button when the user input is empty', () => {
    const { getByTestId } = render(<TodoList />);
    const add = getByTestId("todo-add");
    expect(add.disabled).toBe(true);
  });

  it("deletes todos", () => {
    const { getByTestId, queryAllByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Take the dinglebop and push it through the grumbo" }
    });
    fireEvent.click(add);
    const remove = getByTestId("todo-remove");
    fireEvent.click(remove);
    expect(queryAllByTestId("todo")).toHaveLength(0);
  });
});
```

I'm now setting up a todo, attempting to remove it with a new button that I
intend to add next to each element, and then checking that the todo on the page
has been removed. I'll run the test and it should fail because it won't find the
`todo-remove` button. After fixing that, I'll run it again to be sure that the
todos are rendering and failing the test as expected.

```
import React, { useState } from "react";

export function TodoList() {
  const [todos, updateTodos] = useState([]);
  const [userInput, updateUserInput] = useState("");
  const addTodo = newTodo => updateTodos([...todos, newTodo]);
  const removeTodo = index =>
    updateTodos(todos.filter((todo, i) => i !== index));
  return (
    <div>
      <input
        data-testid="todo-input"
        type="text"
        value={userInput}
        onChange={e => {
          updateUserInput(e.target.value);
        }}
      />
      <button
        data-testid="todo-add"
        disabled={userInput === "" ? true : false}
        onClick={() => {
          addTodo(userInput);
          updateUserInput("");
        }}
      >
        Add
      </button>
      <ul>
       {todos.map((todo, index) => (
          <li key={index}>
            <span data-testid="todo">{todo}</span>
            <button data-testid="todo-remove" onClick={() => removeTodo(index)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

We've now added a button that will remove the specific todo from state with a
new function that interacts with the current state. I run the test and it now
passes green.

I will again assess the code to see what I think, does it need to be refactored?

* We've added an additional state method but it still doesn't feel like I need
    to introduce something as heavy as a reducer yet. It reads well and is
    simple enough to remain.
* The render is getting larger but it's not unreadable.

Nothing is really jumping out at me, still seems to be pretty reasonable. Let's
forward with maybe our most complicated feature so far; editing. Let's start
with creating the inline editing experience.

```
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { TodoList } from ".";

describe("TodoList", () => {
  it("receives user input", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Take the dinglebop" } });
    expect(input.value).toBe("Take the dinglebop");
  });

  it("adds a todo", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Smooth it out with a bunch of shleem" }
    });
    fireEvent.click(add);
    const todo = getByTestId("todo");
    expect(todo.textContent).toBe("Smooth it out with a bunch of shleem");
  });

  it("clears the user input after a todo is added", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Re-purpose shleem for later batches" }
    });
    fireEvent.click(add);
    expect(input.value).toBe("");
  });

  it('disables the "Add Todo" button when the user input is empty', () => {
    const { getByTestId } = render(<TodoList />);
    const add = getByTestId("todo-add");
    expect(add.disabled).toBe(true);
  });

  it("deletes todos", () => {
    const { getByTestId, queryAllByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Take the dinglebop and push it through the grumbo" }
    });
    fireEvent.click(add);
    const remove = getByTestId("todo-remove");
    fireEvent.click(remove);
    expect(queryAllByTestId("todo")).toHaveLength(0);
  });

  it("opens an editor to receive user input", () => {
    const { getByTestId } = render(<TodoList />);
    const input = getByTestId("todo-input");
    const add = getByTestId("todo-add");
    fireEvent.change(input, {
      target: { value: "Take the dinglebop and push it through the grumbo" }
    });
    fireEvent.click(add);
    const edit = getByTestId("todo-edit");
    fireEvent.click(edit);
    const editorInput = getByTestId("todo-editor");
    expect(editorInput.value).toBe(
      "Take the dinglebop and push it through the grumbo"
    );
  });
});
```

I've added a new button next to the button to remove the todo called 'Edit'.
When I click on it, I expect to see a new input to change the todo with the
original todo in the input.

```
import React, { useState } from "react";

export function TodoList() {
  const [todos, updateTodos] = useState([]);
  const [userInput, updateUserInput] = useState("");
  const [editTodoIndex, updateEditTodoIndex] = useState();
  const addTodo = newTodo => updateTodos([...todos, newTodo]);
  const removeTodo = index =>
    updateTodos(todos.filter((todo, i) => i !== index));
  return (
    <div>
      <input
        data-testid="todo-input"
        type="text"
        value={userInput}
        onChange={e => {
          updateUserInput(e.target.value);
        }}
      />
      <button
        data-testid="todo-add"
        disabled={userInput === "" ? true : false}
        onClick={() => {
          addTodo(userInput);
          updateUserInput("");
        }}
      >
        Add
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span data-testid="todo">{todo}</span>
            {index === editTodoIndex && (
              <input
                data-testid="todo-editor"
                value={todo}
                onChange={() => null}
              />
            )}
            <button
              data-testid="todo-edit"
              onClick={() => updateEditTodoIndex(index)}
            >
              Edit
            </button>
            <button data-testid="todo-remove" onClick={() => removeTodo(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

I now want to change the todo and explicitly save it after I make a change.
Let's break this idea out into steps. The first is simply changing the input
values of the new editor experience.

