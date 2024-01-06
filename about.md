---
layout: page
title: About
---

I'm a senior software developer with 10 years of experience, based in New
York, NY. I'm happily employed.

I specialize in web technologies like Typescript, Node.js, React, and Postgres.
I'm also an expert in Test Driven Development methodologies.

You can email me at hello[at]anthonygonzales.dev.

<h2>Experience</h2>
<table class="about-experience">
  <tbody>
    {% for job in site.data.resume.work %}
    <tr>
      <td>{{ job.company }}</td>
      <td>{{ job.position }}</td>
      <td>{{ job.startDate | date: "%Y" }} - {% if job.endDate %}{{ job.endDate | date: "%Y" }}{% else %}Present{% endif %}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

