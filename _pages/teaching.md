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

---

## Theses

{% assign theses = site.data.theses | default: empty %}

### Open Thesis Topics

{% if theses and theses.size > 0 %}
  {% assign open_theses = theses | where: "assigned_student", null | where: "finished", false %}
{% else %}
  {% assign open_theses = empty %}
{% endif %}

{% if open_theses and open_theses.size > 0 %}
  <div class="theses-container">
    {% for thesis in open_theses %}
    <div class="thesis-item" style="margin-bottom: 2rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">
      {% if thesis.image %}
      <div style="float: left; margin-right: 1rem; margin-bottom: 1rem;">
        <img src="{{ '/assets/img/' | append: thesis.image | relative_url }}" alt="{{ thesis.title }}" style="width: 120px; height: 80px; object-fit: cover; border-radius: 4px;">
      </div>
      {% endif %}
      
      <h4>{{ thesis.title }}</h4>
      <p><strong>Type:</strong> {{ thesis.type }} Thesis</p>
      <p><strong>Supervisor:</strong> {{ thesis.supervisor }}</p>
      <p>{{ thesis.description }}</p>
      
      {% if thesis.keywords %}
      <p><strong>Keywords:</strong> {{ thesis.keywords | join: ", " }}</p>
      {% endif %}
      
      <div style="clear: both;"></div>
    </div>
    {% endfor %}
  </div>
{% else %}
<p>No open thesis topics are currently available. Please contact Dr. Florian Mai at <a href="mailto:fmai@uni-bonn.de">fmai@uni-bonn.de</a> to discuss potential topics.</p>
{% endif %}

### Ongoing Thesis Topics

{% if theses and theses.size > 0 %}
  {% assign ongoing_theses = theses | where: "finished", false %}
  {% assign ongoing_theses = ongoing_theses | where_exp: "thesis", "thesis.assigned_student != null" %}
{% else %}
  {% assign ongoing_theses = empty %}
{% endif %}

{% if ongoing_theses and ongoing_theses.size > 0 %}
  <div class="theses-container">
    {% for thesis in ongoing_theses %}
    <div class="thesis-item" style="margin-bottom: 2rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">
      {% if thesis.image %}
      <div style="float: left; margin-right: 1rem; margin-bottom: 1rem;">
        <img src="{{ '/assets/img/' | append: thesis.image | relative_url }}" alt="{{ thesis.title }}" style="width: 120px; height: 80px; object-fit: cover; border-radius: 4px;">
      </div>
      {% endif %}
      
      <h4>{{ thesis.title }}</h4>
      <p><strong>Type:</strong> {{ thesis.type }} Thesis</p>
      <p><strong>Student:</strong> {{ thesis.assigned_student }}</p>
      <p><strong>Supervisor:</strong> {{ thesis.supervisor }}</p>
      {% if thesis.start_date %}
      <p><strong>Started:</strong> {{ thesis.start_date | date: "%B %Y" }}</p>
      {% endif %}
      {% if thesis.expected_completion %}
      <p><strong>Expected Completion:</strong> {{ thesis.expected_completion | date: "%B %Y" }}</p>
      {% endif %}
      <p>{{ thesis.description }}</p>
      
      <div style="clear: both;"></div>
    </div>
    {% endfor %}
  </div>
{% else %}
<p>No theses are currently ongoing.</p>
{% endif %}

### Finished Theses

{% if theses and theses.size > 0 %}
  {% assign finished_theses = theses | where: "finished", true | sort: "completion_date" | reverse %}
{% else %}
  {% assign finished_theses = empty %}
{% endif %}

{% if finished_theses and finished_theses.size > 0 %}
  <div class="theses-container">
    {% for thesis in finished_theses %}
    <div class="thesis-item" style="margin-bottom: 2rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">
      {% if thesis.image %}
      <div style="float: left; margin-right: 1rem; margin-bottom: 1rem;">
        <img src="{{ '/assets/img/' | append: thesis.image | relative_url }}" alt="{{ thesis.title }}" style="width: 120px; height: 80px; object-fit: cover; border-radius: 4px;">
      </div>
      {% endif %}
      
      <h4>{{ thesis.title }}</h4>
      <p><strong>Type:</strong> {{ thesis.type }} Thesis</p>
      <p><strong>Student:</strong> {{ thesis.assigned_student }}</p>
      <p><strong>Supervisor:</strong> {{ thesis.supervisor }}</p>
      {% if thesis.completion_date %}
      <p><strong>Completed:</strong> {{ thesis.completion_date | date: "%B %Y" }}</p>
      {% endif %}
      {% if thesis.grade %}
      <p><strong>Grade:</strong> {{ thesis.grade }}</p>
      {% endif %}
      <p>{{ thesis.description }}</p>
      
      <div style="clear: both;"></div>
    </div>
    {% endfor %}
  </div>
{% else %}
<p>No theses have been completed yet.</p>
{% endif %}
