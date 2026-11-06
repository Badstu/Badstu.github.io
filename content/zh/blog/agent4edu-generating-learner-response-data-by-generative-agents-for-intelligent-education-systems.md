---
title: "Agent4Edu: Generating Learner Response Data by Generative Agents for
  Intelligent Education Systems"
date: 2026-11-06
summary: |-
  Agent4Edu基于LLM做了个学生模拟器，能够从真实历史答题序列中推导出学生的动作，生成未来模拟答题序列，放在CAT环境下使用，自动回答CAT推荐的题目。框架包含3部分，
  1. 首先Profile Module从学生历史答题序列里推导学生Profile（练习特征和认知特征）
  2. 其次Memory Module 将长短期做题记录记录下来，并及时总结反思
  3. 最后Action Module 先选择题目、再阅读理解题目、最后解题。（有文本答案和解题过程）
featured: false
draft: false
---
![image.png](/uploads/blog/image.png)

本文提出了Agent4Edu，基于LLM做了个学生模拟器，能够从真实历史答题序列中推导出学生的动作，生成未来模拟答题序列，放在CAT环境下使用，自动回答CAT推荐的题目。框架包含3部分，

1. 首先Profile Module从学生历史答题序列里推导学生Profile（练习特征和认知特征）
2. 其次Memory Module 将长短期做题记录记录下来，并及时总结反思
3. 最后Action Module 先选择题目、再阅读理解题目、最后解题。（有文本答案和解题过程）



&nbsp;

&nbsp;