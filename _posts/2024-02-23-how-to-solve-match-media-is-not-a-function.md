---
layout: post
title: "Fix TypeError: window.matchMedia is not a function in Jest"
description: "Learn how to emulate matchMedia in Jest for responsive design
testing. Create a reusable test helper to check code at different breakpoints."
date: 2024-02-23
last_modified_at: 2024-07-28
---

Testing responsive designs in environments that don't support the matchMedia
API, like Jest and jsdom, can be challenging. This necessitates a custom
implementation to ensure our React tests can accurately simulate different
viewport sizes. Fortunately, the css-mediaquery library provides an API that
closely emulates matchMedia, allowing us to create a tailored solution that
adheres to Mobile First development principles.

* Do not remove this line (it will not be displayed)
{:toc}

<!--break-->

## Creating a custom matchMedia implementation

To address the `TypeError: window.matchMedia is not a function` error, we'll
develop a custom matchMedia function using the
[css-mediaquery](https://github.com/ericf/css-mediaquery) library in our
testing tools. This function will not only simulate the matchMedia API but also
allow us to dynamically adjust the viewport size for our tests, following a
Mobile First approach.

Below is the implementation:


```javascript
// src/testUtils/matchMedia.js
import mediaQuery from 'css-mediaquery';

beforeAll(() => {
  // Set the initial/default matchMedia implementation
  // for Mobile First development
  window.matchMedia = createMatchMedia(576);
});

afterEach(() => {
  // Reset matchMedia after each test
  window.matchMedia = createMatchMedia(576);
});

export function createMatchMedia(width) {
  window.matchMedia = (query) => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addListener: () => {},
    removeListener: () => {},
  });
}
```

Jest's [official
recommendation](https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom)
suggests creating mocks for methods not implemented in jsdom, such as
matchMedia. However, we've chosen a different approach. While mocks are a
powerful tool, they often lead us to write tests that focus too heavily on
implementation details rather than on behavior. This can lead to brittle tests
that fail when implementation details change, even if the behavior remains
correct.

By avoiding mocks and instead creating a custom matchMedia function using the
css-mediaquery library, we aim to simulate the matchMedia API more faithfully.
This approach allows us to write tests that focus on the behavior of our
components across different viewport sizes, in line with Mobile First
development principles.

## Utilizing the custom implementation in tests

With our custom `matchMedia` implementation in place, we can now write tests
that simulate different viewport sizes. This enables us to verify the
responsive behavior of our components under various conditions.

Below is an example test suite that tests React components starting with the
mobile viewport:

```javascript
import { render, screen, createMatchMedia } from '@/testUtils';
import React from 'react';

import ResponsiveComponent from '.'; 

it('displays details in mobile by default', () => {
  render(<ResponsiveComponent />);

  // Expectations for mobile layout
  expect(screen.getByText('Mobile')).toBeInTheDocument();
});

it('displays progressively more details for tablet', () => {
  createMatchMedia(768);
  render(<ResponsiveComponent />);

  // Expectations for tablet layout
  expect(screen.getByText('Mobile + Tablet')).toBeInTheDocument();
});

it('displays progressively more details for desktop', () => {
  createMatchMedia(992);
  render(<ResponsiveComponent />);

  // Expectations for desktop layout
  expect(screen.getByText('Mobile + Tablet + Desktop')).toBeInTheDocument();
});
```

## Conclusion

By leveraging the css-mediaquery library and implementing a custom `matchMedia`
function, we've created a flexible testing environment. This setup allows us to
simulate various viewport sizes, ensuring our responsive designs behave as
expected across different devices. This approach offers a practical workaround
for testing responsive components in jsdom, adhering to the principles of
Mobile First development.
