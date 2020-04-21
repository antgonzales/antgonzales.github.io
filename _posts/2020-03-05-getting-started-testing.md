---
layout: post
title:  "Getting started testing: culture and practice"
description: "Test Driven Development is a cultural hot button issue for many
software organizations. Let's discuss the reasons why you should begin testing
and how to get started with a practical example"
date: 2020-04-21
---

Across all of my professional software projects, I insist on Test Driven
Development (TDD). Not all developers share my enthusiasm and some see testing
as onerous and costly. There's so much to learn, you have to maintain a whole
set of dependencies and libraries, you have to mock dependencies, it takes too
long, and the list goes on. These concerns are cultural and have less to do with
proficiency. TDD is another skill to learn and a powerful tool for the long term
health of a software project. Test-Driven Development creates a safe environment
for developers to take risks, builds trust between team members and management,
and provides legibility for other developers to make changes.

* Do not remove this line (it will not be displayed)
{:toc}

<!--break-->

## Safe Danger

![Philip Johnson's Glass House at night](/assets/img/glass-house-at-night-compressed.jpg)

{:.post-img-credit}
Photo by James Vaughan (CC BY-NC-SA 2.0)

Last fall, my wife took me to visit Philip Johnson's Glass House in New Caanan,
CT. Beautiful and simple, the Glass House is an icon of modern architecture. It
rests on a property filled with Johnson’s experimental creations, including a
bunker that houses art by Andy Warhol and Jasper Johns. The house itself is four
walls of glass with 360-degree views of the surrounding woods where coyotes howl
at night. On the property, there's a perilously large staircase that extends to
nowhere, a footbridge that intentionally bounces as you cross a dry creek and a
highly toxic cactus that rests on his desk. One of Mr. Johnson's guiding
principles in architecture is the concept of "Safe Danger"; the idea that we are
most engaged when we can take risks in a safe environment.

Testing provides an environment for developers to take risks safely to produce
their best work. Each commit comes with a set of assertions that proves that the
newly added code has been thoughtfully examined. It gives team members the
ability to completely gut the contents of the production code and not lose any
sleep over it. Anybody can rearrange files, rename functions and variables, and
break large pieces down into new abstractions. I can add a new feature and not
worry about a coworker (or myself in most cases) not understanding the behavior
at a later date. When a new person joins the company, they feel confident that
they will get early feedback that they broke something. Nobody wants to feel set
up for failure or responsible for the loss of revenue due to a production bug.
With a testing library, we can build an environment that encourages people to
not only take risks but have fun along the way.

## Confidence and Trust

At the heart of any team is the ability for members to trust one another to make
choices. Teams with low levels of trust inevitably create systems to prevent
people from making choices. Bureaucracy takes hold and the innovative spark is
lost as team members begin to feel like they're cogs in a machine. In web
development, we prize our ability to make choices and we thrive on learning. By
taking away a developer's ability to think, you take away their ability to make
an impact on a technology stack. Your junior developer today could become the
person that creates software that fundamentally changes the business tomorrow,
but you need to give that person the room to make mistakes and learn.

You build trust between team members and stakeholders by developing a culture
that prioritizes testing. Bugs and unintended side effects are minimized. Silly
mistakes are removed and handled before they reach a staging environment.
Customers experience less downtime, management doesn't feel the need to create
bureaucratic systems, and developers get to try new things.  Nobody loses sleep
over a deploy, features are shipped, and the team feels confident that they are
moving fast without causing damage.

## Documentation for free

Legibility is a side-effect of encapsulating code into testable pieces with
clear assertions. Legibility gives not only your team members a chance to read
and understand your intent, but gives you a better understanding when you return
to code at a later date. Well-written test assertions are a bit like having
well-written annotations to a technical blueprint. You get the benefit of
understanding the intent of the behavior, not just a visual understanding of the
mechanics.

Writing clear documentation is another difficult challenge when working under
strict deadlines. Oftentimes, projects are made quickly and documentation is
made later. Developers have to comb through the codebase to determine how the
code works and what parts need to be communicated. One of the bonuses of testing
is that behavior is documented in the test suite. Assertions use plain English
and describe the expected behavior of a specific piece of code. A
well-maintained test suite is not a substitute for documentation, but it can
make the process of writing documentation much faster.

## Red, Green, Refactor

Test Driven Development is a recursive set of steps a software developer follows
to create new features. You write tests first, then write enough code to satisfy
the failing test, and lastly, refactor the code you just wrote. Continue that
process until you've completed your work. It's dead simple and effective.

I adhere to Uncle Bob's [Three Laws of
TDD](http://www.butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd):

1. You are not allowed to write any production code unless it is to make a
   failing unit test pass.
2. You are not allowed to write any more of a unit test than is sufficient to
   fail; and compilation failures are failures.
3. You are not allowed to write any more production code than is sufficient to
   pass the one failing unit test.

People are usually overwhelmed by this, but it's like riding a bike. Once you get
past the initial learning curve it becomes second nature.

### A word on "refactoring"

What does refactoring mean? According to [Martin
Fowler](https://refactoring.com/), "Refactoring is a disciplined technique for
restructuring an existing body of code, altering its internal structure without
changing its external behavior."  The key phrase in this definition is "without
changing its external behavior."  Implicit in this definition is confidence and
certainty. How can you be confident that your changes didn't change external
behavior? I posit that the only way you can have certainty is through some form
of checking, either manually or through automated tests. Changing code without
meaningful feedback is rewriting, not refactoring.

## Todo list example

For the remainder of this post, I will create a series of features for a Todo
List Application in React, following Uncle Bob's rules, so you can see the
changes over time. The intention is to show how the code changes, the way I
think, what I write, and most importantly, what I leave out. I oftentimes see
developers in interviews add more code than they need upfront to address all
potential edgecases but those concerns aren't important until problems arise. We
don't want to forecast problems, we want to solve the problems right in front of
us.

The full code base can be seen on [CodeSandbox](http://bit.ly/2IW51qj).

### Create the folder and test file

There are different ways to organize your files and folders in a Javascript code
base. I create folders for new files with an index to export contents in order
to co-locate important pieces. The folder gives us a space to create
test files, css, helpers, or child subcomponent folders.

```
/src
  /App
    index.js
    App.css
    App.jsx
    App.test.jsx
```

Following this pattern, let's create a `TodoList` component folder with a test
file first.

```diff
diff --git a/src/TodoList/TodoList.test.jsx b/src/TodoList/TodoList.test.jsx
new file mode 100644
index 0000000..1a6e53f
--- /dev/null
+++ b/src/TodoList/TodoList.test.jsx
@@ -0,0 +1,10 @@
+import React from "react";
+import { render } from "@testing-library/react";
+
+import { TodoList } from ".";
+
+describe("TodoList", () => {
+  it("works", () => {
+    render(<TodoList />);
+  });
+});
```

That's it. That's how you start. Notice that I did not create the `index.js` or
the production code in `TodoList.jsx` yet? Run the test suite. This initial test
should fail (Red). There are a few important reasons why you want to start every
new component this way.

1. It establishes the dependencies needed to start testing. I prefer React
   Testing Library when testing React components to test behavior as a user sees
   it. By attempting a render, I'm attempting to establish the connection
   between test file and production code.
2. It establishes the way I expect to consume the component. By attempting to
   import directly from the folder, I'm testing that there is an established
   contract for consuming the new code.
3. I'm isolating the test suite to just the behavior of the component.

Now let's make the component and the index file.

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
new file mode 100644
index 0000000..ad0c714
--- /dev/null
+++ b/src/TodoList/TodoList.jsx
@@ -0,0 +1,5 @@
+import React from "react";
+
+export function TodoList() {
+  return <div />;
+}
diff --git a/src/TodoList/index.js b/src/TodoList/index.js
new file mode 100644
index 0000000..f239f43
--- /dev/null
+++ b/src/TodoList/index.js
@@ -0,0 +1 @@
+export * from './TodoList';
```

Again, that's it. We've now fixed the broken test (Green). It's not much, but
it's how I start every new isolated module. This could be a React component, it
could be a Node module, the pattern is the same.

Now let's start adding meaningful features.

### Giving the user an input

In this initial pass, I'm going to attempt to add an input for the user to add
todos.  I want to be sure that the input takes and shows the values.

```diff
diff --git a/src/TodoList/TodoList.test.jsx b/src/TodoList/TodoList.test.jsx
index 1a6e53f..9151a6e 100644
--- a/src/TodoList/TodoList.test.jsx
+++ b/src/TodoList/TodoList.test.jsx
@@ -1,10 +1,13 @@
 import React from "react";
-import { render } from "@testing-library/react";
+import { render, fireEvent } from "@testing-library/react";

 import { TodoList } from ".";

 describe("TodoList", () => {
-  it("works", () => {
-    render(<TodoList />);
+  it("receives user input", () => {
+    const { getByTestId } = render(<TodoList />);
+    const input = getByTestId("todo-input");
+    fireEvent.change(input, { target: { value: "Take the dinglebop" } });
+    expect(input.value).toBe("Take the dinglebop");
   });
 });
```

I'll run the test suite to let it fail and begin fixing the code to make it
pass. After it fails (Red), I'm going to create a simple input that takes user
values, set it to an internal state, and render the value in the input.

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index ad0c714..e9c78bc 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -1,5 +1,15 @@
-import React from "react";
+import React, { useState } from "react";

 export function TodoList() {
-  return <div />;
+  const [inputState, inputDispatch] = useState("");
+  return (
+    <input
+      data-testid="todo-input"
+      type="text"
+      value={inputState}
+      onChange={e => {
+        inputDispatch(e.target.value);
+      }}
+    />
+  );
 }
```

After I've added my new code, I'll run the test suite to make it pass (Green). I
think this is simple enough that no further refactoring is needed. I'll move
forward with another set of behavior assertions.

### Saving a todo

I now want to test the entire user flow of adding text to the input and saving
it to the list.

```diff
diff --git a/src/TodoList/TodoList.test.jsx b/src/TodoList/TodoList.test.jsx
index 9151a6e..d768b4a 100644
--- a/src/TodoList/TodoList.test.jsx
+++ b/src/TodoList/TodoList.test.jsx
@@ -10,4 +10,15 @@ describe("TodoList", () => {
     fireEvent.change(input, { target: { value: "Take the dinglebop" } });
     expect(input.value).toBe("Take the dinglebop");
   });
+
+  it("adds a todo", () => {
+    const { getByTestId } = render(<TodoList />);
+    const input = getByTestId("todo-input");
+    const add = getByTestId("todo-add");
+    fireEvent.change(input, { target: { value: "Smooth it out with a bunch of shleem" } });
+    fireEvent.click(add);
+    const todo = getByTestId("todo");
+    expect(todo.textContent).toBe("Smooth it out with a bunch of shleem");
+  });
 });
```

You'll notice that there is some repetition. That's okay, we want to be sure
that we're completely isolating our tests to avoid weird side effects. Do not be
tempted to stick a huge `beforeEach` setup because you want things to be DRY. If
you start now, you'll just continue adding things to the block and it will
become unreadable for yourself and other devs over time. Run the test suite
again to be sure the test fails (Red).

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index e9c78bc..b75791b 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -1,15 +1,29 @@
 import React, { useState } from "react";

 export function TodoList() {
+  const [todos, updateTodos] = useState([]);
   const [inputState, inputDispatch] = useState("");
+  const addTodo = newTodo => updateTodos([...todos, newTodo]);
   return (
-    <input
-      data-testid="todo-input"
-      type="text"
-      value={inputState}
-      onChange={e => {
-        inputDispatch(e.target.value);
-      }}
-    />
+    <div>
+      <input
+        data-testid="todo-input"
+        type="text"
+        value={inputState}
+        onChange={e => {
+          inputDispatch(e.target.value);
+        }}
+      />
+      <button data-testid="todo-add" onClick={() => addTodo(inputState)}>
+        Add
+      </button>
+      <ul>
+        {todos.map((todo, index) => (
+          <li key={index} data-testid="todo">
+            {todo}
+          </li>
+        ))}
+      </ul>
+    </div>
   );
 }
```

I've introduced a new piece of state, a button to add a todo directly from the
input state, and a list of todos. I'll run the test suite and see that it
passes (Green). Now that the tests are passing, let's consider refactoring.

### Refactoring after getting todo's saved

Here's some things I want to consider changing:

* I don't like the term "inputDispatch" and I actually like the way I named
    "updateTodos". It feels more declarative and explicit.
* I know that I could use a reducer but there really isn't a need at this moment
    to use one. I'll hold off for now.

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index b75791b..2483839 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -2,19 +2,19 @@ import React, { useState } from "react";

 export function TodoList() {
   const [todos, updateTodos] = useState([]);
-  const [inputState, inputDispatch] = useState("");
+  const [userInput, updateUserInput] = useState("");
   const addTodo = newTodo => updateTodos([...todos, newTodo]);
   return (
     <div>
       <input
         data-testid="todo-input"
         type="text"
-        value={inputState}
+        value={userInput}
         onChange={e => {
-          inputDispatch(e.target.value);
+          updateUserInput(e.target.value);
         }}
       />
-      <button data-testid="todo-add" onClick={() => addTodo(inputState)}>
+      <button data-testid="todo-add" onClick={() => addTodo(userInput)}>
         Add
       </button>
       <ul>
```

The changes are minimal but show the process of how we can make changes without
changing external behavior. Let's move on to more features.

### Reset the user input after adding a todo

Now that we're adding todos and rendering them for the user, we want to reset
the user input so the user can continue adding more.

```diff
diff --git a/src/TodoList/TodoList.test.jsx b/src/TodoList/TodoList.test.jsx
index f939631..4908af4 100644
--- a/src/TodoList/TodoList.test.jsx
+++ b/src/TodoList/TodoList.test.jsx
@@ -20,4 +20,15 @@ describe("TodoList", () => {
     const todo = getByTestId("todo");
     expect(todo.textContent).toBe("Smooth it out with a bunch of shleem");
   });
+
+  it("clears the user input after a todo is added", () => {
+    const { getByTestId } = render(<TodoList />);
+    const input = getByTestId("todo-input");
+    const add = getByTestId("todo-add");
+    fireEvent.change(input, {
+      target: { value: "Re-purpose shleem for later batches" }
+    });
+    fireEvent.click(add);
+    expect(input.value).toBe("");
+  });
 });
```

I'll run the test suite to make it fail (Red).

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index 2483839..4adf6d6 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -14,7 +14,13 @@ export function TodoList() {
           updateUserInput(e.target.value);
         }}
       />
-      <button data-testid="todo-add" onClick={() => addTodo(userInput)}>
+      <button
+        data-testid="todo-add"
+        onClick={() => {
+          addTodo(userInput);
+          updateUserInput("");
+        }}
+      >
         Add
       </button>
       <ul>
```

I've now added a function call for `updateUserInput("")` to the button click
handler to clear the user input state. However, we still have the issue that users
can add empty todos to the list. Let's fix that.

### Ensuring todo field isn't empty

```diff
diff --git a/src/TodoList/TodoList.test.jsx b/src/TodoList/TodoList.test.jsx
index 4908af4..04c7a4c 100644
--- a/src/TodoList/TodoList.test.jsx
+++ b/src/TodoList/TodoList.test.jsx
@@ -31,4 +31,10 @@ describe("TodoList", () => {
     fireEvent.click(add);
     expect(input.value).toBe("");
   });
+
+  it('disables the "Add Todo" button when the user input is empty', () => {
+    const { getByTestId } = render(<TodoList />);
+    const add = getByTestId("todo-add");
+    expect(add.disabled).toBe(true);
+  });
 });
```

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index 4adf6d6..a643fee 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -16,6 +16,7 @@ export function TodoList() {
       />
       <button
         data-testid="todo-add"
+        disabled={userInput === "" ? true : false}
         onClick={() => {
           addTodo(userInput);
           updateUserInput("");
@@ -26,7 +27,7 @@ export function TodoList() {
       <ul>
         {todos.map((todo, index) => (
           <li key={index} data-testid="todo">
-            {todo}
+           {todo}
           </li>
         ))}
       </ul>
```

We now have a comprehensive set of behaviors that we expect from our TodoList
application. There are still a few crucial pieces that need to be addressed --
editing and deleting. Let's add those features now.

### Delete todos

I'm going to have to set up a todo, attempt to remove it with a new button that I
intend to add next to each element, and then check that the todo on the page
has been removed. I'll run the test and it should fail because it won't find the
`todo-remove` button. After fixing that, I'll run it again to be sure that the
todos are rendering and failing the test as expected.

```diff
diff --git a/src/TodoList/TodoList.test.jsx b/src/TodoList/TodoList.test.jsx
index 04c7a4c..20c35b8 100644
--- a/src/TodoList/TodoList.test.jsx
+++ b/src/TodoList/TodoList.test.jsx
@@ -37,4 +37,17 @@ describe("TodoList", () => {
     const add = getByTestId("todo-add");
     expect(add.disabled).toBe(true);
   });
+
+  it("deletes todos", () => {
+    const { getByTestId, queryAllByTestId } = render(<TodoList />);
+    const input = getByTestId("todo-input");
+    const add = getByTestId("todo-add");
+    fireEvent.change(input, {
+      target: { value: "Take the dinglebop and push it through the grumbo" }
+    });
+    fireEvent.click(add);
+    const remove = getByTestId("todo-remove");
+    fireEvent.click(remove);
+    expect(queryAllByTestId("todo")).toHaveLength(0);
+  });
 });
```

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index a643fee..20d40f6 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -4,6 +4,8 @@ export function TodoList() {
   const [todos, updateTodos] = useState([]);
   const [userInput, updateUserInput] = useState("");
   const addTodo = newTodo => updateTodos([...todos, newTodo]);
+  const removeTodo = index =>
+    updateTodos(todos.filter((todo, i) => i !== index));
   return (
     <div>
       <input
@@ -25,9 +27,12 @@ export function TodoList() {
         Add
       </button>
       <ul>
-        {todos.map((todo, index) => (
-          <li key={index} data-testid="todo">
-           {todo}
+       {todos.map((todo, index) => (
+          <li key={index}>
+            <span data-testid="todo">{todo}</span>
+            <button data-testid="todo-remove" onClick={() => removeTodo(index)}>
+              x
+            </button>
           </li>
         ))}
       </ul>
```

We've now added a button that will remove the specific todo from state with a
new function that interacts with the current state. I run the test and it now
passes (Green).

I will again assess the code to see what I think, does it need to be refactored?

* We've added an additional state method but it still doesn't feel like I need
    to introduce something as heavy as a reducer yet. It reads well and is
    simple enough to remain.
* The render is getting larger but it's not unreadable.

Nothing is really jumping out at me, it still seems to be pretty reasonable. Let's move
forward with maybe our most complicated feature so far -- editing.

### Editing todo

I'm going to attempt to create an inline editing experience. I want to be able
to click a button "Edit" that opens an input with the existing todo text in the
field. The user will be able to change the text and save it.

```diff
diff --git a/src/TodoList/TodoList.test.jsx b/src/TodoList/TodoList.test.jsx
index 20c35b8..f6a2850 100644
--- a/src/TodoList/TodoList.test.jsx
+++ b/src/TodoList/TodoList.test.jsx
@@ -50,4 +50,20 @@ describe("TodoList", () => {
     fireEvent.click(remove);
     expect(queryAllByTestId("todo")).toHaveLength(0);
   });
+
+  it("opens an editor to receive user input", () => {
+    const { getByTestId } = render(<TodoList />);
+    const input = getByTestId("todo-input");
+    const add = getByTestId("todo-add");
+    fireEvent.change(input, {
+      target: { value: "Take the dinglebop and push it through the grumbo" }
+    });
+    fireEvent.click(add);
+    const edit = getByTestId("todo-edit");
+    fireEvent.click(edit);
+    const editorInput = getByTestId("todo-editor");
+    expect(editorInput.value).toBe(
+      "Take the dinglebop and push it through the grumbo"
+    );
+  });
 });
```

In this test, I'm just checking the behavior of the input and not yet saving the
text. Let's add the inline editor experience to the code now that I have a
test failing the way I expect.

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index 20d40f6..b6b3440 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -3,6 +3,7 @@ import React, { useState } from "react";
 export function TodoList() {
   const [todos, updateTodos] = useState([]);
   const [userInput, updateUserInput] = useState("");
+  const [editTodoIndex, updateEditTodoIndex] = useState();
   const addTodo = newTodo => updateTodos([...todos, newTodo]);
   const removeTodo = index =>
     updateTodos(todos.filter((todo, i) => i !== index));
@@ -27,11 +28,24 @@ export function TodoList() {
         Add
       </button>
       <ul>
-       {todos.map((todo, index) => (
+        {todos.map((todo, index) => (
           <li key={index}>
             <span data-testid="todo">{todo}</span>
+            {index === editTodoIndex && (
+              <input
+                data-testid="todo-editor"
+                value={todo}
+                onChange={() => null}
+              />
+            )}
+            <button
+              data-testid="todo-edit"
+              onClick={() => updateEditTodoIndex(index)}
+            >
+              Edit
+            </button>
             <button data-testid="todo-remove" onClick={() => removeTodo(index)}>
-              x
+              Remove
             </button>
           </li>
         ))}
```

### Saving an edited todo

I now want to change the todo and explicitly save it afterward.

```diff
diff --git a/src/TodoList/TodoList.test.jsx b/src/TodoList/TodoList.test.jsx
index f6a2850..efe93ba 100644
--- a/src/TodoList/TodoList.test.jsx
+++ b/src/TodoList/TodoList.test.jsx
@@ -66,4 +66,23 @@ describe("TodoList", () => {
       "Take the dinglebop and push it through the grumbo"
     );
   });
+
+  it("edits the previously saved todo", () => {
+    const { getByTestId } = render(<TodoList />);
+    const input = getByTestId("todo-input");
+    const add = getByTestId("todo-add");
+    fireEvent.change(input, {
+      target: { value: "Take the dinglebop and push it through the grumbo" }
+    });
+    fireEvent.click(add);
+    const edit = getByTestId("todo-edit");
+    fireEvent.click(edit);
+    const editorInput = getByTestId("todo-editor");
+    fireEvent.change(editorInput, {
+      target: { value: "Rub it with fleeb" }
+    });
+    const save = getByTestId("todo-edit-save");
+    fireEvent.click(save);
+    expect(getByTestId("todo").textContent).toBe("Rub it with fleeb");
+  });
 });
```

At this point, things are now getting tricky. There are so many steps to set up
our editing test assertions that I'm considering creating a test helper. I'm
going to hold off temporarily in favor of getting the test assertions passed.

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index b6b3440..c68600f 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -3,10 +3,18 @@ import React, { useState } from "react";
 export function TodoList() {
   const [todos, updateTodos] = useState([]);
   const [userInput, updateUserInput] = useState("");
+
   const [editTodoIndex, updateEditTodoIndex] = useState();
+  const [editTodo, updateEditTodo] = useState("");
+
   const addTodo = newTodo => updateTodos([...todos, newTodo]);
   const removeTodo = index =>
     updateTodos(todos.filter((todo, i) => i !== index));
+  const saveEditedTodo = (newValue, todoIndex) => {
+    const todosCopy = todos.slice();
+    todosCopy[todoIndex] = newValue;
+    updateTodos(todosCopy);
+  }
   return (
     <div>
       <input
@@ -32,15 +40,21 @@ export function TodoList() {
           <li key={index}>
             <span data-testid="todo">{todo}</span>
             {index === editTodoIndex && (
-              <input
-                data-testid="todo-editor"
-                value={todo}
-                onChange={() => null}
-              />
+              <>
+                <input
+                  data-testid="todo-editor"
+                  value={editTodo}
+                  onChange={e => updateEditTodo(e.target.value)}
+                />
+                <button data-testid="todo-editor-save" onClick={() => saveEditedTodo(editTodo, index)}>Save</button>
+              </>
             )}
             <button
               data-testid="todo-edit"
-              onClick={() => updateEditTodoIndex(index)}
+              onClick={() => {
+                updateEditTodoIndex(index);
+                updateEditTodo(todo);
+              }}
             >
               Edit
             </button>
```

Boom! We've now added editing to the list of behaviors to our Todo Appplication.
Now that we've got our editing experience working, we desperately need to
refactor our code for legibility. I'm going to be honest, I took a break writing
this blog post and felt lost in my own code base. That's fine! It just means I
need to spend more time making the work clear. Let's do that now and wrap up.

### Refactoring the Todo

I'm going to focus on fixing the todo editor code. Our top level component knows
too much about the internals of a todo. We can break that up but it's important
we roll out changes in small incremental steps to be sure that we don't break
the test suite. By having that quick feedback, we'll be able to mold it into
something more legible.

I'll start with the render of the todo value in the loop.

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index c68600f..8d8e672 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -1,5 +1,10 @@
 import React, { useState } from "react";

+function Todo(props) {
+  const {value} = props;
+  return <span data-testid="todo">{value}</span>;
+}
+
 export function TodoList() {
   const [todos, updateTodos] = useState([]);
   const [userInput, updateUserInput] = useState("");
@@ -38,7 +43,7 @@ export function TodoList() {
       <ul>
         {todos.map((todo, index) => (
           <li key={index}>
-            <span data-testid="todo">{todo}</span>
+            <Todo value={todo}/>
             {index === editTodoIndex && (
               <>
                 <input
```

That's maybe the smallest change I can make looking at the code and it's a great
first step in moving the functionality of a todo into its own concerns.

### Refactoring the Todo Editing Experience

We're now going to migrate the editing experience to the Todo component since
that work takes place at a more local level within the loop of the todos.

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index f60a2cf..f7a3776 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -1,19 +1,38 @@
 import React, { useState } from "react";

 function Todo(props) {
-  const {value} = props;
+  const {value, saveEditedTodo} = props;
   const [isTodoEditorOpen, toggleTodoEditor] = useState(false);
-
-  return <span data-testid="todo">{value}</span>;
+  const [editorInput, updateEditorInput] = useState(value);
+  return (
+    <>
+      <span data-testid="todo">{value}</span>
+      {isTodoEditorOpen && (
+        <>
+          <input
+            data-testid="todo-editor"
+            value={editorInput}
+            onChange={e => updateEditorInput(e.target.value)}
+          />
+          <button data-testid="todo-editor-save" onClick={() => saveEditedTodo(editorInput)}>Save</button>
+        </>
+      )}
+      <button
+        data-testid="todo-edit"
+        onClick={() => {
+          toggleTodoEditor(true);
+        }}
+      >
+        Edit
+      </button>
+    </>
+  );
 }

 export function TodoList() {
   const [todos, updateTodos] = useState([]);
   const [userInput, updateUserInput] = useState("");

-  const [editTodoIndex, updateEditTodoIndex] = useState();
-  const [editTodo, updateEditTodo] = useState("");
-
   const addTodo = newTodo => updateTodos([...todos, newTodo]);
   const removeTodo = index =>
     updateTodos(todos.filter((todo, i) => i !== index));
@@ -45,26 +64,7 @@ export function TodoList() {
       <ul>
         {todos.map((todo, index) => (
           <li key={index}>
-            <Todo value={todo}/>
-            {index === editTodoIndex && (
-              <>
-                <input
-                  data-testid="todo-editor"
-                  value={editTodo}
-                  onChange={e => updateEditTodo(e.target.value)}
-                />
-                <button data-testid="todo-editor-save" onClick={() => saveEditedTodo(editTodo, index)}>Save</button>
-              </>
-            )}
-            <button
-              data-testid="todo-edit"
-              onClick={() => {
-                updateEditTodoIndex(index);
-                updateEditTodo(todo);
-              }}
-            >
-              Edit
-            </button>
+            <Todo value={todo} saveEditedTodo={(editedTodo) => saveEditedTodo(editedTodo, index)}/>
             <button data-testid="todo-remove" onClick={() => removeTodo(index)}>
               Remove
             </button>
```

### Refactoring the removal of a todo

We've moved the editing experience into the `Todo` function component but we
still have to migrate the 'Remove' button. 

```diff
diff --git a/src/TodoList/TodoList.jsx b/src/TodoList/TodoList.jsx
index f7a3776..9b40665 100644
--- a/src/TodoList/TodoList.jsx
+++ b/src/TodoList/TodoList.jsx
@@ -1,7 +1,7 @@
 import React, { useState } from "react";

 function Todo(props) {
-  const {value, saveEditedTodo} = props;
+  const {value, saveEditedTodo, removeTodo} = props;
   const [isTodoEditorOpen, toggleTodoEditor] = useState(false);
   const [editorInput, updateEditorInput] = useState(value);
   return (
@@ -25,6 +25,9 @@ function Todo(props) {
       >
         Edit
       </button>
+      <button data-testid="todo-remove" onClick={() => removeTodo()}>
+        Remove
+      </button>
     </>
   );
 }
@@ -64,10 +67,7 @@ export function TodoList() {
       <ul>
         {todos.map((todo, index) => (
           <li key={index}>
-            <Todo value={todo} saveEditedTodo={(editedTodo) => saveEditedTodo(editedTodo, index)}/>
-            <button data-testid="todo-remove" onClick={() => removeTodo(index)}>
-              Remove
-            </button>
+            <Todo value={todo} saveEditedTodo={(editedTodo) => saveEditedTodo(editedTodo, index)} removeTodo={() => removeTodo(index)}/>
           </li>
         ))}
       </ul>
```

I've now migrated the todo removal behavior into the `Todo` component with the
other controls. There's still more behavior to address and I want to give you
the opportunity to practice.

## Take home assignment

If you visit the Code Sandbox link, you can download the repo and begin testing
using the Create React App scripts in the `package.json` file. You'll be able to
pick up right where I left off and begin adding some new features. Here are a few
things you could implement:

* Hiding the 'Edit' and 'Remove' controls when the user opens the inline editing experience
* Turning off the editing experience when the user saves a new input
* Adding a 'Cancel' button to turn off the editing experience

I would focus on thinking through how you would set up a new test and making
sure that you have the right failing test. TDD is a skill that you will
continually need to practice, learn, and improve. I've benefited greatly in my
professional development by having this tool available in my toolbox. I hope
this long form post will serve as a reference for how to start your journey on
testing.
