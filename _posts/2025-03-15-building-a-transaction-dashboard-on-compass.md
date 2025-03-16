---
layout: post
title: "Building a transaction dashboard on Compass"
description: "Case study: Leading engineering teams to build Compass One, a real estate transaction dashboard that boosted client engagement by 43% with 4.5/5 satisfaction."
date: 2025-03-15
---

![Compass One dashboard homepage showing the main interface with client transaction overview and navigation elements](/assets/img/compass-one/compass-one.webp)
<!--break-->

* Do not remove this line (it will not be displayed)
{:toc}

## Introduction

[Compass One](https://one.compass.com/){:target="_blank"} is the real estate industry's premier
client dashboard providing 24/7 transparency into transactions—the #1 requested
feature since 2021. Launched in beta in October 2024 and nationally on February
3, 2025, this platform addresses inefficient communication between clients and
agents, transforming how clients track their real estate journey. After
pandemic-related delays and market fluctuations, the project finally secured
funding in early 2024, becoming the most ambitious engineering initiative in
Compass's history.

As Frontend Engineering Lead, I orchestrated collaboration across six
engineering teams to develop this comprehensive platform requiring seamless
integration with every major system across the company. Over twelve months, I
implemented rigorous engineering standards, developed an estimation framework,
and built resilient architecture while coordinating approximately 50 frontend
engineers who collectively merged 800 pull requests. The following case study
outlines the key strategies that enabled us to successfully deliver this
complex, mission-critical feature on time and with exceptional quality metrics.

## Creating a well-oiled machine

When I onboarded, I faced two significant challenges: (1) managing the
abandoned codebase from 2021 that had accumulated technical debt, and (2)
creating alignment between product, design, and engineering teams on how to
move forward. The central question became: How could we deliver quickly without
sacrificing quality or confidence?

Rather than focusing solely on technical implementation details, I drafted a
proposal that established a clear vision for team operations. My approach
addressed both immediate code quality concerns and long-term engineering
practices:

1. **Cleaned legacy codebase**: Systematically addressed technical debt and
   deprecated outdated patterns that would hinder our progress
2. **Established non-negotiable requirements**:
    * Daily code deployments (except Fridays to reduce weekend support risk)
    * Comprehensive unit and integration test coverage for all new production
    code
    * Mandatory passing Cypress end-to-end tests as a deployment prerequisite
    with deployment gates in CI/CD
    * Feature flag implementation for all new functionality to enable
    controlled rollouts

While these practices might seem fundamental, they're often the first
casualties when teams face tight deadlines or pressure to deliver. With support
from my manager, [Lucas Reis](https://github.com/lucasmreis){:target="_blank"}, we successfully
implemented these standards as non-optional protocols for all contributors.

This disciplined approach paid off significantly. We maintained over 90% unit
test coverage across three frontend applications and a shared component
library. More importantly, these practices enabled us to move quickly while
maintaining high quality—our deployment pipeline caught potential issues early,
and feature flags allowed us to safely integrate work from multiple teams
without risking the overall system stability.

## Know what you don't know

Compass has not historically had a uniform method for estimating projects of
this size. Teams would typically provide general estimates in developer weeks,
padding timeframes for areas with knowledge gaps or unknown variables. This
approach often led to inaccurate timelines and didn't effectively communicate
risk to stakeholders.

We updated our estimation process by implementing Jacob Kaplan-Moss's
methodology from [Estimating Software
Projects](https://jacobian.org/series/estimation/){:target="_blank"}, which explicitly accounts
for both **time and uncertainty**.

As frontend developers, we evaluated each feature against three critical
dependencies:

1. Product requirements
2. Backend API definitions
3. Designs

We then systematically adjusted confidence levels based on the completeness of
these dependencies. For example:

* **High Confidence**: All three dependencies clearly defined
* **Medium Confidence**: Missing product requirements
* **Low Confidence**: Missing both product requirements and designs
* **No Confidence**: Missing all three dependencies

This approach delivered multiple benefits beyond just better time estimates:

1. It created a structured review process that provided actionable feedback to
cross-functional partners
2. It allowed us to prioritize work effectively, focusing on high-confidence
items while waiting for dependencies on others
3. By quantifying risk through confidence multipliers, we could clearly
communicate potential timeline impacts to leadership
4. Most importantly, it helped us identify and address bottlenecks early,
enabling us to deliver the entire project on schedule

## Good fences make good neighbors

Compass One's index page functions as a central hub integrating multiple
widgets and components from six different engineering teams. Each team
contributed code connecting to their own systems, including:

* Invited users to the deal
* A timeline of upcoming tasks and events
* Market reports for sellers
* Comments on Collections (listings saved by a buyer)
* Favorited listings
* Contact information for agent team members on the transaction

Despite our rigorous testing standards, the integration of so many
independently developed components created significant risk. A single error in
any team's code could potentially crash the entire application, creating a poor
user experience and making it difficult to identify the source of problems.

We implemented a resilient architecture based on the principle that isolating
failures is as important as preventing them. By creating custom Error Boundary
components, we established protective "fences" around each team's code
contributions. Drawing inspiration from established patterns in the React
ecosystem, we adapted:

* [Datadog's RUM React
integration](https://github.com/DataDog/rum-react-integration-examples/tree/master/src/ErrorBoundary){:target="_blank"}
* [Sentry's React Error
Boundary](https://docs.sentry.io/platforms/javascript/guides/react/features/error-boundary/){:target="_blank"}

Our implementation went beyond simple error catching. We developed:

1. Automatic error reporting that routed issues directly to the responsible
teams
2. Graceful fallback UI components that maintained overall application
usability
3. A visual debugging interface that allowed teams to isolate and test their
components

This architectural approach proved invaluable during our integration phases.
When errors occurred—and they inevitably did—they remained contained to the
specific widget rather than crashing the entire application.

The error boundaries provided three key benefits:

1. **Improved user experience** - Clients could still use the rest of the
application even if one component failed
2. **Faster debugging** - Teams could quickly identify their own issues without
impacting others
3. **Increased accountability** - Clear ownership of errors encouraged teams to
fix issues promptly

This "good neighbor" policy fostered both technical resilience and team
collaboration, allowing us to maintain our ambitious delivery timeline despite
the complexity of cross-team integration.

<a href="/assets/img/compass-one/compass-one-debugger.webp" target="_blank">
  <img src="/assets/img/compass-one/compass-one-debugger.webp" alt="Interactive Error Boundary visual debugger showing component isolation and error state visualization in Compass One">
</a>

## Results

In just the first week, agents sent 14,950 client invitations, driving a 43%
increase in client weekly active users. Despite the surge in traffic during the
live announcement, the system maintained 100% uptime with no performance
degradation. Most importantly, both agents and clients embraced the platform
enthusiastically, awarding it a customer satisfaction score of 4.5 out of 5.
These early results validate not only the product's value proposition but also
the engineering approach that ensured its stability and performance under
real-world conditions.

## Press Coverage

* Bloomberg - [Compass Launches New Client-Facing Portal](https://www.bloomberg.com/news/videos/2025-02-05/compass-ceo-on-us-housing-market-video){:target="_blank"}
* Inman - [Compass One puts clients at true north: Tech
Review](https://www.inman.com/2025/02/28/compass-one-puts-clients-at-true-north-tech-review/){:target="_blank"}
* Inman - [Compass launches 'Compass One' client portal and
dashboard](https://www.inman.com/2025/02/03/compass-to-launch-compass-one-client-portal-and-dashboard/){:target="_blank"}
* The Real Deal - [Compass has the listings, now it has the
platform](https://therealdeal.com/national/2025/02/06/how-compass-new-consumer-platform-adds-to-inventory-push/){:target="_blank"}
* Housing Wire - [Compass launches client-facing portal with listings, docs and
more](https://www.housingwire.com/articles/compass-one-portal-clients-listings/){:target="_blank"}
* Real Estate News - [Compass to launch client portal amid private listings
push](https://www.realestatenews.com/2025/02/01/compass-launches-client-portal-amid-private-listings-push){:target="_blank"}

## Screenshots

### Buyer's Dashboard

<a href="/assets/img/compass-one/compass-one-buyer-dashboard.webp" target="_blank">
  <img src="/assets/img/compass-one/compass-one-buyer-dashboard.webp" alt="Compass One Buyer's Dashboard showing property listings, transaction timeline, and client communication features">
</a>

### Seller's Dashboard

<a href="/assets/img/compass-one/compass-one-seller-dashboard.webp" target="_blank">
  <img src="/assets/img/compass-one/compass-one-seller-dashboard.webp" alt="Compass One Seller's Dashboard displaying property marketing status, offer tracking, and transaction progress">
</a>
