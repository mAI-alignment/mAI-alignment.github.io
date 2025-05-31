---
layout: page
permalink: /team/
title: team
description: Meet the members of the mAI alignment lab
nav: true
nav_order: 2
---

{% assign team_members = site.team | sort: 'order' %}
{% for member in team_members %}
<div class="team-member" style="margin-bottom: 2rem;">
  {% if member.profile_pic %}
  <div style="float: left; margin-right: 1rem; margin-bottom: 1rem;">
    <img src="{{ '/assets/img/' | append: member.profile_pic | relative_url }}" alt="{{ member.name }}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 50%;">
  </div>
  {% endif %}
  
  <h3>{{ member.name }}</h3>
  <p><strong>{{ member.position }}</strong></p>
  {% if member.office %}
  <p><em>{{ member.office }}</em></p>
  {% endif %}
  
  <p>
    {% if member.email %}
    <a href="mailto:{{ member.email }}"><i class="fas fa-envelope"></i> Email</a> |
    {% endif %}
    {% if member.website %}
    <a href="{{ member.website }}" target="_blank"><i class="fas fa-home"></i> Website</a> |
    {% endif %}
    {% if member.google_scholar %}
    <a href="{{ member.google_scholar }}" target="_blank"><i class="ai ai-google-scholar"></i> Google Scholar</a> |
    {% endif %}
    {% if member.github %}
    <a href="{{ member.github }}" target="_blank"><i class="fab fa-github"></i> GitHub</a> |
    {% endif %}
    {% if member.linkedin %}
    <a href="{{ member.linkedin }}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
    {% endif %}
  </p>
  
  <div style="clear: both;">
    {{ member.content }}
  </div>
</div>
{% endfor %}

---

## Affiliations

- **[CAISA Lab](https://caisa-lab.github.io/)** - Conversational AI and Social Analytics (CAISA) Lab