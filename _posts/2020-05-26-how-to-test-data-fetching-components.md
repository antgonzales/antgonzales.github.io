---
layout: post
title: "Testing components that make API calls"
description: "Don't get stuck with a single data fetching library. Write tests
flexible enough for change"
image: "post-boxes-on-brick-compressed.jpg"
date: 2020-05-25
---

Most examples that discuss [Test-Driven
Development](https://www.anthonygonzales.dev/blog/why-learn-test-driven-development.html)
don't include information about how to test components that fetch data. With
Jest, we get an environment in Node.js that mimics the browser because it
includes jsdom, however, Jest does not describe a "batteries included" vision
for server responses. Let's discuss the best way to test front-end components
that make API calls.

* Do not remove this line (it will not be displayed)
{:toc}

<!--break-->

## Mocks are a code smell

I often see examples advising that you mock an entire library. The examples mock
axios, request, or fetch to test that a specific function is called. Here's an
example provided by [Jest](https://jestjs.io/docs/en/tutorial-async) using React:

```jsx
// fetch/fetch.test.js
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import Fetch from '.'

jest.mock('axios')

test('loads and displays greeting', async () => {
  const url = '/greeting'
  render(<Fetch url={url} />)

  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: 'hello there' },
  })

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('heading'))

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toHaveAttribute('disabled')
})
```

This approach tests implementation details in addition to behavior. It binds our
test suite to a library and assumes that the API for the library will not
change. It also assumes that we're using the library method correctly.  In this
case, our test suite is now bound to axios and the method `get()`. If your team
wants to switch from axios to unfetch, the test example above will need to be
re-written to account for unfetch's API.  Say you have a 4k tests on a large
project? To properly refactor, you will need to re-write all tests that mock
axios. You will lose your testing baseline which means you will need to follow
Red, Green, Refactor across all of the tests you previously wrote. The process
of changing your data fetching library will be tedious and prone to errors.

## Stub the environment, not the implementation

jsdom is the backbone of UI testing in Jest. Before Jest and React, most
front-end developers relied on Angular, Phantom, and Karma. The idea was, let's
spin up Chrome (which every UI developer was using) and run tests with a *live*
browser. Kicking off a live browser to run tests is just as problematic as
mocking data fetching libraries. You get the behavior of a single browser, along
with its quirks, the cost of ensuring the browser can run on a CI pipeline, and
the cost of a browser turning on/off while you develop code. jsdom is the sweet
spot between the two extremes. It's portable, follows web specs fairly well, and
doesn't have as high of a cost as a real browser. jsdom stubs the browser environment.

What is the extreme opposite of mocking data fetching libraries and their
methods? Running a live server. So what's the sweet spot in between? A library
that follows the HTTP spec, reads incoming data, and allows you to stub
responses.

## Which API stubbing library should I use?

I recommend [nock](https://github.com/nock/nock) for several reasons:

* Lightweight
* Portable
* Well-documented

Clocking in 170kb, it's perfect for usage in isolated unit and integration
tests. There's no big installation and no major setup. It's a mature,
well-documented library that gives developers the ability to investigate and
find answers to their problems easily. These aspects pay off in spades as a
project grows and ages.

Let's look at nock using the previous example:

```jsx
// fetch/fetch.test.js
import React from 'react'
import nock from 'nock'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Fetch from '.'

test('loads and displays greeting', async () => {
  const url = '/greeting'

  const scope = nock('https://yoursite.com')
    .get('/greeting')
    .once()
    .reply(200, {
      data: { greeting: 'hello there' },
    });
  render(<Fetch url={url} />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('heading'))

  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toHaveAttribute('disabled')
})
```

In the new and immproved approach, we've done several things:

1. Stopped mocking the axios library and method response
2. Specified a response at a url and a route
3. Removed unnecessary assertions about API calls

Our test suite no longer has knowledge about the way our components fetch data.
If you switch from axios, to fetch, or to unfetch, the test file will not
require changes. More importantly, if you upgrade your data fetching library
version, your test suite will give you meaningful feedback. When we mock a
dependency, we begin testing with faulty assumptions that the package will not
have made breaking changes to it's internals or it's API which will lead to
false positives in our test suite.

## How to test components using Apollo Client with GraphQL

![Two red mail boxes against a brick wall in the
UK](/assets/img/post-boxes-on-brick-compressed.jpg)

{:.post-img-credit}
Photo by [Kristina
Tripkovic](https://unsplash.com/@tinamosquito?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on [Unsplash](https://unsplash.com)

With the rise of GraphQL, Apollo has made big strides in writing server and
client-side libraries to make managing data easier. The trouble comes with their
recommended approach to testing UI components that rely on Apollo.

Apollo has created a `MockedProvider` [test
component](https://www.apollographql.com/docs/react/development-testing/testing/)
which allows you to test your UI components. They assert that using
the real thing would be unpredictable as it runs against an actual backend. That
may be true, but there's nothing stopping us from hijacking the means of
communicating with the backend just like we did with the axios example.

Here are the things I know about interfacing with Apollo and GraphQL:

1. All requests, queries and mutations, use the HTTP POST method. Because
   GraphQL serves a single resource, the graph, it doesn't follow the REST
   resources approach in HTTP (GET/PUT/PATCH/DELETE).
2. Apollo requires an instantiated client which is essentially a config class
   for setup.
3. Apollo ensures type names in the resource response.

I now know about a few details in setting up a proper test:

1. We need to import the real client to be sure I'm hitting the right endpoint
2. We need to get some stub data from my endpoint
3. We're going to respond to a post request with the stub data

For this example, I will use the free [Pokemon
list](https://graphql-pokemon.now.sh) server, grab some fake data, and query
against it.

```diff
diff --git a/src/App/App.test.js b/src/App/App.test.js
index e69de29..0d66745 100644
--- a/src/App/App.test.js
+++ b/src/App/App.test.js
@@ -0,0 +1,45 @@
+import React from "react";
+import { ApolloProvider } from "@apollo/react-hooks";
+import nock from "nock";
+import { render } from "@testing-library/react";
+
+import { client } from "./client";
+import { App } from "./";
+
+describe("App", () => {
+  it("works", async () => {
+    nock("https://graphql-pokemon.now.sh")
+      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
+      .post("/")
+      .reply(200, {
+        data: {
+          pokemons: [
+            {
+              id: "UG9rZW1vbjowMDE=",
+              name: "Bulbasaur",
+              __typename: "Pokemon"
+            },
+            {
+              id: "UG9rZW1vbjowMDI=",
+              name: "Ivysaur",
+              __typename: "Pokemon"
+            },
+            {
+              id: "UG9rZW1vbjowMDM=",
+              name: "Venusaur",
+              __typename: "Pokemon"
+            }
+          ]
+        }
+      });
+
+    const { findAllByTestId } = render(
+      <ApolloProvider client={client}>
+        <App />
+      </ApolloProvider>
+    );
+
+    const pokemon = await findAllByTestId("pokemon");
+    expect(pokemon.length).toBe(3);
+  });
+});
diff --git a/src/App/client/client.js b/src/App/client/client.js
index 8b13789..b586022 100644
--- a/src/App/client/client.js
+++ b/src/App/client/client.js
@@ -1 +1,7 @@
+import ApolloClient from "apollo-boost";

+const options = {
+  uri: "https://graphql-pokemon.now.sh",
+}
+
+export const client = new ApolloClient(options);
```

You may be thinking, "this looks like a lot of setup in comparison to using
`MockProvider` as recommended". You're not wrong. We now know about some of the
implementation details of how Apollo fetches data from the server (POST).
However, I would argue that this minor detail is exactly what we need to know in
order to have confidence in our tests and confidence that we can make changes.
The GraphQL server expects us to perform a POST operation and if we decide to no
longer use Apollo, we have some safety.

## Swapping Apollo Client for Fetch

Here's what it looks like if we no longer want to use Apollo Client and opt for
a more close to the metal solution using
[isomorphic-unfetch](https://github.com/developit/unfetch#readme):

```diff
diff --git a/package.json b/package.json
index 6cbd5e4..00e3a3a 100644
--- a/package.json
+++ b/package.json
@@ -12,6 +12,7 @@
     "@testing-library/react": "^10.0.4",
     "apollo-boost": "0.4.9",
     "graphql": "15.0.0",
+    "isomorphic-unfetch": "^3.0.0",
     "nock": "12.0.3",
     "react": "16.12.0",
     "react-dom": "16.12.0",
diff --git a/src/App/App.js b/src/App/App.js
index e9f0350..25a0b4f 100644
--- a/src/App/App.js
+++ b/src/App/App.js
@@ -1,8 +1,7 @@
-import React from "react";
-import { gql } from "apollo-boost";
-import { useQuery } from "@apollo/react-hooks";
+import React, { useEffect, useState } from "react";
+import fetch from 'isomorphic-unfetch';

-const ALL_POKEMONS = gql`
+const ALL_POKEMONS = `
   {
     pokemons(first: 3) {
       id
@@ -16,9 +15,24 @@ function List({ items = []}) {
 }

 export function App() {
-  const { data, loading } = useQuery(ALL_POKEMONS);
+  const [isLoading, setIsLoading] = useState(true);
+  const [data, setData] = useState(undefined);

-  if (loading) return <div>Loading...</div>;
+  useEffect(() => {
+    async function fetchPokemon() {
+      const result = await fetch('https://graphql-pokemon.now.sh', {
+        method: 'POST',
+        headers: {'Content-Type': 'application/json'},
+        body: JSON.stringify({query: ALL_POKEMONS}),
+      });
+      const json = await result.json();
+      setData(json.data);
+    }
+    fetchPokemon();
+    setIsLoading(false);
+  }, []);
+
+  if (isLoading) return <div>Loading...</div>;

   return (
     <ul>
diff --git a/src/App/App.test.js b/src/App/App.test.js
index 0d66745..6fd98df 100644
--- a/src/App/App.test.js
+++ b/src/App/App.test.js
@@ -1,9 +1,7 @@
 import React from "react";
-import { ApolloProvider } from "@apollo/react-hooks";
 import nock from "nock";
 import { render } from "@testing-library/react";

-import { client } from "./client";
 import { App } from "./";

 describe("App", () => {
@@ -33,11 +31,7 @@ describe("App", () => {
         }
       });

-    const { findAllByTestId } = render(
-      <ApolloProvider client={client}>
-        <App />
-      </ApolloProvider>
-    );
+    const { findAllByTestId } = render(<App />);

     const pokemon = await findAllByTestId("pokemon");
     expect(pokemon.length).toBe(3);
```

Notice that my test assertions didn't change. I've hollowed out the innards of
the production code and was able to retain the test suite. The test suite does
not care how I go about fetching data as long as I follow the contract
determined by the server.

The goal of having a robust test suite is the ability to make changes
confidently and receive feedback if we make changes that might cause problems.
By removing mocks and stubbing the server, we're able to create a
flexible test suite that ensures a server contract maintained.

## Testing with multiple requests

Using GraphQL means we can't stub a single endpoint and respond with different data.
We must control the flow of data by checking the query. Without checking the
incoming data, we'll end up responding incorrectly to the different calls.

```diff
diff --git a/src/App/App.js b/src/App/App.js
index 25a0b4f..691c47a 100644
--- a/src/App/App.js
+++ b/src/App/App.js
@@ -1,7 +1,7 @@
 import React, { useEffect, useState } from "react";
 import fetch from 'isomorphic-unfetch';

-const ALL_POKEMONS = `
+export const ALL_POKEMONS = `
   {
     pokemons(first: 3) {
       id
diff --git a/src/App/App.test.js b/src/App/App.test.js
index 6fd98df..5304b3c 100644
--- a/src/App/App.test.js
+++ b/src/App/App.test.js
@@ -2,13 +2,13 @@ import React from "react";
 import nock from "nock";
 import { render } from "@testing-library/react";

-import { App } from "./";
+import { App, ALL_POKEMONS } from "./";

 describe("App", () => {
   it("works", async () => {
     nock("https://graphql-pokemon.now.sh")
       .defaultReplyHeaders({ "access-control-allow-origin": "*" })
-      .post("/")
+      .post("/", JSON.stringify({query: ALL_POKEMONS}))
       .reply(200, {
         data: {
           pokemons: [
```

I've now added a data constraint to the post method in nock. If I don't pass
data that matches the constraint, I will not receive the `200` reply and
data. The [GraphQL
spec](https://graphql.org/learn/serving-over-http/#post-request) advises that
you pass an object with two specific parameters; `query` and `variables`. In
this particular case, we're sending just the query. With our request constraint
added, we're now free to add additional responses.

## Making a decision about tradeoffs

The solutions I've proposed are ultimately about tradeoffs. As your software
changes, no matter the scale, you have to make decisions about which parts you
are comfortable living with. For some people, the notion of managing a server
response library is more painful and tedious than just mocking libraries and
responses. For me, the pain of not having confidence in my test suite far
outweighs the trivial tedium of using nock.

I've felt the pain of migrating a code base from one library to another,
including libraries that fetch data. I hope this guide helps you make a decision
about the tradeoffs in mocking dependencies versus stubbing environment
responses.

