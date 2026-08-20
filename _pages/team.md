---
layout: page
permalink: /team/
title: team
description: Meet the members of the mAI alignment lab
nav: true
nav_order: 3
---

{% assign current_members = site.team | where_exp: "member", "member.alumni != true" | sort: 'order' %}
{% assign alumni_members = site.team | where_exp: "member", "member.alumni == true" | sort: 'order' %}

{% for member in current_members %}
{% include team_member.html member=member %}
{% endfor %}

{% if alumni_members.size > 0 %}
---

## Alumni

{% for member in alumni_members %}
{% include team_member.html member=member %}
{% endfor %}
{% endif %}

---

## Affiliations

- **[CAISA Lab](https://caisa-lab.github.io/)** - Conversational AI and Social Analytics (CAISA) Lab
