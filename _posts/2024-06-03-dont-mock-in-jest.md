---
layout: post
title: "Don't use mocks in Jest"
description: "Discover why avoiding mocks in Jest enhances testing. Learn
strategies for resilient, standards-based tests that improve code
maintainability and reliability."
date: 2024-06-03
---

Jest revolutionized front-end testing upon its 2014 release by introducing a
comprehensive simulation of the web browser environment within Node.js, powered
by jsdom. This innovative approach marked a significant shift from the
traditional reliance on headless or real browsers utilized by predecessors like
Karma and Mocha. Embracing Jest's philosophy means more than just adapting new
tools; it's about adhering to web standards to create more reliable, resilient
tests. Often, developers resort to mocks for HTTP requests, navigation routing,
or to fill in missing features, but this strategy can lead to brittle tests
that are overly dependent on implementation specifics. 

By embracing a testing strategy that aligns with Jest's web-centric approach,
we can mitigate these issues but also write tests that enhance code quality and
maintainability.

* Do not remove this line (it will not be displayed)
{:toc}

<!--break-->

## Testing navigation elements in React

React Testing Library's [React Router
example](https://testing-library.com/docs/example-react-router/) shows how to
test routing at the root component level, however, it doesn't provide guidance
on children components. I came across the example below in a recent code
review. Our team uses a [custom test
render](https://testing-library.com/docs/react-testing-library/setup/#custom-render)
to help with components that utilize React Providers, including `MemoryRouter`.

```javascript
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

function renderWithProviders(
  ui,
  {
    initialRouterEntries = ['/'],
    route = '/',
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={initialRouterEntries}>
      <Routes>
        <Route path={route} element={children} />
      </Routes>
    </MemoryRouter>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
 
export * from '@testing-library/react'  
   
export { renderWithProviders };
```

```javascript
import { fireEvent, renderWithProviders, screen } from '@/testUtils';
import React from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // ❌ Mocking React Router's hook
  useNavigate: () => mockedUseNavigate,
}));

describe('<ComponentWithNavigation />', () => {
  it('provides a link to return to the dashboard', async () => {
    render(<ComponentWithNavigation />)
    const link = screen.getByRole(link, {name: 'Go to Home'});
    fireEvent.click(link);
    // ❌ Testing implementation details
    expect(mockedUseNavigate).toHaveBeenCalledWith('/', expect.anything());
  });
});
```

Although this approach tests the behavior of our component, it also checks the
implementation details of React Router and does not utilize HTML
specifications. Imagine the following scenario:

* We continue with the test suite checking the  `useNavigation()` hook and
  write all of our tests going forward in this way
* React Router releases a new version that alters the behavior of
  `useNavigation()` or deprecates the hook entirely
* We perform the upgrade without fully understanding the implications
* The test suite pass on CI/CD
* Production fails 💥

By binding our test suite to the implementation details of React Router, we've
removed our ability to check that the integration between our code and the
dependency work correctly.  We've opened ourselves up to false positives or
false negatives in our test suite.

A better, and simpler, approach is to check the `<a/>` tag's `href` property.

```javascript
import { render, screen } from '@/testUtils';
import React from 'react';

describe('<ComponentWithNavigation />', () => {
  it('provides a link to return to the dashboard', async () => {
    render(<ComponentWithNavigation />)
    const link = screen.getByRole(link, {name: 'Go to Home'});
    // ✅ Checking the link element render
    expect(link.href).toBe('/');
  });
});
```

We've now reduced the brittleness of the test and created more streamlined
approach to checking the navigation of the component without the custom test
render.

## Conclusion

Effective testing in React applications is not just about covering every line
of code with tests; it's about writing tests that remain resilient against
change. The goal of testing is not only to catch errors before they reach
production but to provide a safety net that allows for confident refactoring
and upgrades. By focusing on the user's perspective and the external interface
of components, rather than the underlying implementation, we ensure that our
tests are both meaningful and durable.
