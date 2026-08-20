---
layout: page
permalink: /teaching/
title: teaching
description: Teaching activities and student supervision at the mAI alignment lab.
nav: true
nav_order: 6
---

## Courses

{% assign courses = site.data.courses %}
{% if courses and courses.size > 0 %}
  {% assign courses_by_year = courses | group_by: 'year' | sort: 'name' | reverse %}
  {% for year_group in courses_by_year %}
  {% assign first_course = year_group.items.first %}
  <h3>{{ first_course.semester }} Semester {{ year_group.name }}</h3>
  <div class="courses-container">
    {% for course in year_group.items %}
    <div class="course-item" style="margin-bottom: 2rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">
      {% if course.image %}
      <div style="float: left; margin-right: 1rem; margin-bottom: 1rem;">
        <img src="{{ '/assets/img/' | append: course.image | relative_url }}" alt="{{ course.title }}" style="width: 150px; max-height: 150px; object-fit: contain; border-radius: 4px; border: 1px solid #eee;">
      </div>
      {% endif %}
      
      <h4>{{ course.title }}</h4>
      <p><strong>{{ course.type }}</strong>{% if course.course_code %} | {{ course.course_code }}{% endif %} | {{ course.semester }} {{ course.year }} | {{ course.ects }} ECTS</p>
      <p>{{ course.description }}</p>
      
      {% if course.learning_outcomes %}
      <p><strong>Learning Outcomes:</strong></p>
      <ul>
        {% for outcome in course.learning_outcomes %}
        <li>{{ outcome }}</li>
        {% endfor %}
      </ul>
      {% endif %}
      
      {% if course.prerequisites %}
      <p><strong>Prerequisites:</strong> {{ course.prerequisites }}</p>
      {% endif %}
      
      {% if course.instructors %}
      <p><strong>Instructors:</strong> {{ course.instructors | join: ", " }}</p>
      {% endif %}
      
      {% if course.schedule %}
      <p><strong>Schedule:</strong> {{ course.schedule }}</p>
      {% endif %}
      
      <div style="clear: both;"></div>
    </div>
    {% endfor %}
  </div>
  {% endfor %}
{% else %}
<p>No courses are currently being taught.</p>
{% endif %}
