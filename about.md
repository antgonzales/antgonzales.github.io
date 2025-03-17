---
layout: page
title: About
---

I'm a [Product
Engineer](https://leerob.com/n/product-engineers){:target="_blank"} based in
New York, NY.

I specialize in web technologies like Typescript, Node.js, React, and Postgres.
I'm also an expert in Test Driven Development methodologies.

You can email me at hello[at]anthonygonzales.dev.

## Experience

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
