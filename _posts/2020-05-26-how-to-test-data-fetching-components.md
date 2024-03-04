---
layout: post
title: "Testing components that make API calls"
description: "Learn how to test API calls in components with examples in React
and Jest. Write tests flexible enough for change"
image: "post-boxes-on-brick-compressed.jpg"
date: 2020-05-25
last_modified_at: 2024-03-03
---

Most examples that discuss [Test-Driven
Development](https://www.anthonygonzales.dev/blog/why-learn-test-driven-development.html)
don't include information about how to test components that fetch data. With
Jest, we get an environment in Node.js that mimics the browser because it
provides jsdom. However, Jest does not describe a "batteries included" vision
for server responses. Let's discuss the best way to test front-end components
that make API calls.

* Do not remove this line (it will not be displayed)
{:toc}

<!--break-->

## Mocks are risky assumptions

I often see examples advising that you mock an entire library. The examples
mock axios, request, or fetch to test that a specific function is called.
Here's an example provided by [Testing
Library](https://web.archive.org/web/20200512192923/https://testing-library.com/docs/react-testing-library/example-intro/){:
rel="nofollow noopener" target="_blank"} using React:

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

<div class="callout warning-callout">
Update: Testing Library recommends <a href="https://mswjs.io" re="noopener
nofollow" target="_blank">Mock Service Worker</a> and no longer maintains the
example above.
</div>

This approach tests implementation details in addition to behavior. It binds our
test suite to a library and assumes that the library's API will not change. It
also assumes that we're using the library method correctly. In this case, our
test suite is now bound to axios, and the method `get()`. If your team wants to
switch request libraries from axios to another option such as unfetch, the test
example above will need to be re-written to account for unfetch's API. Say you
have 4k tests on a large project? To properly refactor, you will need to
re-write all tests that directly mock axios. You will lose your testing baseline
which means you will need to follow Red, Green, Refactor across all of the tests
you previously wrote. The process of changing your data fetching library will be
tedious and prone to errors.



## Which API inteceptor library should I use?

There are several libraries available to stub server responses:

* miragejs
* msw
* cypress
* nock

I recommend [msw](https://mswjs.io/){: rel="nofollow noopener" target="_blank"} for
several compelling reasons:

* Seamless integration with both browser and Node.js environments
* Realistic request interception
* Rich documentation and community support

msw is a powerful tool for mocking API responses in both front-end and back-end
testing environments, offering seamless integration without the need for
configuring a separate server or altering your production code's network
requests. This library stands out because it intercepts requests at the network
level, allowing for a more realistic simulation of API calls in development and
testing scenarios.

## Implement a fake server 

Let's look at msw using the previous example and assume we've already done
the recommended setup.

```jsx
// fetch/fetch.test.js
import React from 'react'
import { rest } from 'msw';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import { server } from '@/mocks/server';

import Fetch from '.'

test('override handler in a single test', async () => {
  // Override the handler for this test
  server.use(
    rest.get('https://yoursite.com/greeting', (req, res, ctx) => {
      return res(ctx.json({ greeting: 'hello there' }));
    })
  );

  const url = '/greeting';
  render(<Fetch url={url} />);
  fireEvent.click(screen.getByText('Load Greeting'));

  await waitFor(() => screen.getByRole('heading'));

  // Assertions can now expect the overridden behavior
  expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  expect(screen.getByRole('button')).toHaveAttribute('disabled');
});
```

In the new and immproved approach, we've done several things:

1. Stopped mocking the axios library and method response
2. Specified a response at a url and a route
3. Removed unnecessary assertions about API calls

Our test suite no longer knows the way our components fetch data. If you switch
from axios, fetch, or unfetch, the test file will not require changes. More
importantly, if you upgrade your data fetching library version, your test suite
will give you meaningful feedback. When we mock a dependency, we begin testing
with faulty assumptions that the package will not have made breaking changes to
its internals or its API, leading to false positives in our test suite.

## How to test components using Apollo Client with GraphQL

![Two red mail boxes against a brick wall in the
UK](/assets/img/post-boxes-on-brick-compressed.jpg)

{:.post-img-credit}
Photo by [Kristina
Tripkovic](https://unsplash.com/@tinamosquito?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText){:
rel="nofollow noopener" target="_blank"} on [Unsplash](https://unsplash.com){: rel="nofollow
noopener" target="_blank"}

With the rise of GraphQL, Apollo has made significant strides in writing server
and client-side libraries to make managing data easier. The trouble comes with
their recommended approach to testing UI components that rely on Apollo.

Apollo has created a `MockedProvider` [test
component](https://www.apollographql.com/docs/react/development-testing/testing/){: rel="nofollow noopener" target="_blank"}
which allows you to test your UI components. They assert that using the live
Provider would be unpredictable as it runs against an actual backend. That may
be true, but nothing stops us from hijacking the means of communicating with the
backend just like we did with the axios example.

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
list](https://graphql-pokemon.now.sh){: rel="nofollow noopener" target="_blank"} server, grab some fake data, and query
against it.

```jsx
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { render } from "@testing-library/react";
import { graphql } from "msw";

import { client } from "@/api/client";
import { server } from "@/mocks/server";

import { App } from "./";

describe("App", () => {
  it("displays all Pokemon", async () => {
    // Override the default handlers for this test
    server.use(
      graphql.post("https://graphql-pokemon.now.sh", (req, res, ctx) => {
        return res(
          ctx.json({
            data: {
              pokemon: [
                {
                  id: "UG9rZW1vbjowMDE=",
                  name: "Bulbasaur",
                  __typename: "Pokemon"
                },
                {
                  id: "UG9rZW1vbjowMDI=",
                  name: "Ivysaur",
                  __typename: "Pokemon"
                },
                {
                  id: "UG9rZW1vbjowMDM=",
                  name: "Venusaur",
                  __typename: "Pokemon"
                }
              ]
            }
          })
        );
      })
    );

    const { findAllByTestId } = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );

    const pokemon = await findAllByTestId("pokemon");
    expect(pokemon.length).toBe(3);
  });
});
```

You may be thinking, "this looks like a lot of setup in comparison to using
`MockedProvider` as recommended". You're not wrong. We now know about some of
the implementation details of how Apollo fetches data from the server. However,
I would argue that this minor detail is what we need to know to have confidence
in our tests and the confidence to make changes. The GraphQL server expects us
to perform a POST operation, and if we decide to no longer use Apollo, we have
some safety.

## Swapping Apollo Client for Fetch

Here's what it looks like if we no longer want to use Apollo Client and opt for
a more close to the metal solution using
[isomorphic-unfetch](https://github.com/developit/unfetch#readme){: rel="nofollow noopener" target="_blank"}:

```jsx
import { useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import fetch from 'isomorphic-unfetch';

// Updated GraphQL query string
const ALL_POKEMON = `
{
  pokemon(first: 3) {
    id
    name
  }
}
`;

// Updated App component
export function App() {
  // We'll comment  out useQuery()
  // const { data, loading } = useQuery(ALL_POKEMON);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPokemon() {
      try {
        const result = await fetch('https://graphql-pokemon.now.sh', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({query: ALL_POKEMON}),
          signal: controller.signal,
        });
        const json = await result.json();
        setData(json.data);
        setIsLoading(false); // Moved inside try to only set loading false on success
      } catch(e) {
        console.error(e);
        setIsLoading(false); // Consider setting loading to false on error as well
      }
    }
    fetchPokemon();
    return () => {
      controller.abort();
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  // Assuming you have a component to render this data
  return <List items={data ? data.pokemon : []} />;
}

// Updated List component (no changes provided, assuming no change)
function List({ items = []}) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

Notice that I did not change the test suite. I've hollowed out the innards of
the production code and was able to retain the test suite. The test suite does
not care about how my app fetches data as long as I follow the server's
contract.

The goal of having a robust test suite is the ability to make changes
confidently and receive feedback if we make changes that might cause problems.
By removing mocks and stubbing the server, we can create a flexible test suite
that ensures a server contract is maintained.

## Constraining requests

Using GraphQL means we can't implement a single endpoint and respond with
different data. With HTTP interceptors like msw, we assign one endpoint to one
response. We must control the flow of data by checking the incoming query.
Without checking the incoming data, we'll end up responding incorrectly to the
different calls.

```jsx
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { render } from "@testing-library/react";
import { graphql } from "msw";

import { client } from "@/api/client";
import { server } from "@/mocks/server"; 

import { App } from "./";

describe("App", () => {
  it("requires a querying a specific number of Pokemon", async () => {
    const ALL_POKEMON_QUERY = `
    {
      pokemon(first: 3) {
        id
        name
        __typename
      }
    }`;

    // Override the default handlers for this test to check for a specific query
    server.use(
      graphql.post("https://graphql-pokemon.now.sh", (req, res, ctx) => {
        // Check if the incoming query matches the expected query
        if (req.body.query.includes("pokemon(first: 3)")) {
          return res(
            ctx.json({
              data: {
                pokemon: [
                  {
                    id: "UG9rZW1vbjowMDE=",
                    name: "Bulbasaur",
                    __typename: "Pokemon"
                  },
                  {
                    id: "UG9rZW1vbjowMDI=",
                    name: "Ivysaur",
                    __typename: "Pokemon"
                  },
                  {
                    id: "UG9rZW1vbjowMDM=",
                    name: "Venusaur",
                    __typename: "Pokemon"
                  }
                ]
              }
            })
          );
        } else {
          // If the query does not match, you could return an error or handle as needed
          return res(ctx.status(400), ctx.json({ error: "Query not matched" }));
        }
      })
    );

    const { findAllByTestId } = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );

    const pokemon = await findAllByTestId("pokemon");
    expect(pokemon.length).toBe(3);
  });
});
```

I've now added a data constraint to the msw graphql handler. If I don't pass
data that matches the constraint, I will not receive the `200` reply and data.
The [GraphQL spec](https://graphql.org/learn/serving-over-http/#post-request){:
rel="nofollow noopener" target="_blank"} advises that you pass an object with
two specific parameters; `query` and `variables`. In this particular case,
we're sending just the query. With our request constraint added, we're now free
to add additional responses.

## Deciding tradeoffs

The solutions I've proposed are ultimately about tradeoffs. As your software
changes, you have to decide which parts you are comfortable living with, no
matter the scale. For some people, the notion of managing a server response
library is more painful and tedious than just mocking libraries and responses.
For me, the pain of not having confidence in my test suite far outweighs the
trivial tedium of using msw.

I've felt the pain of migrating a codebase from one library to another,
including libraries that fetch data. I hope this guide helps you evaluate the
tradeoffs in mocking dependencies versus stubbing environment responses.

