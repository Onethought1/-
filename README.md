# 军事学校成果认证系统

## 项目概述

军事学校成果认证系统是一个面向军事学校的职业教育成果认证平台，用于管理和认证学习成果。系统支持个人成果管理、单位成果管理、成果统计分析、系统管理和成果模板管理等功能，为军事职业教育提供全面的成果认证解决方案。

## 功能架构

系统主要包括以下五个功能模块：

### 1. 个人成果管理
- **个人信息管理**：查看和编辑个人信息，从军事职业教育数据监控分系统获取最新个人信息
- **成果登记**：认领学习成果、自主登记、暂存、编辑、删除、查询、查看详情、提交和批量提交、导出
- **学习档案**：查看已认定学习成果、证明报告记录、个人绩效评估结果、未认领学习成果
- **成长画像**：成长轨迹分析、学习统计（多维度统计分析）

### 2. 单位成果管理
- **成果录入**：录入、导入、关联、暂存、编辑、删除、查询、查看、提交、导出
- **成果初审**：查询、查看、初审、辅助初审、统计、导出
- **成果认定**：查询、查看、认定、辅助认定、统计、导出
- **申报认证**：多层级的成果认证申报功能

### 3. 成果统计分析
- **绩效评估**：基于成果数据的绩效评估功能
- **统计分析**：多维度数据统计与分析功能
- **成果展示**：多样化的成果展示方式

### 4. 系统管理
- **账号权限管理**：用户账号和权限的管理功能
- **用户日志管理**：系统操作日志的管理和查询
- **数据字典管理**：系统数据字典的维护和管理
- **展板样式管理**：系统展示界面样式的定制和管理

### 5. 成果模板管理
- **成果名录管理**：成果类型和名录的管理功能
- **模板样式管理**：成果模板的样式设计和管理
- **敏感词监控**：对系统内容进行敏感词监控和过滤

## 技术架构

本系统采用前端Web技术开发，主要技术栈包括：

- **前端框架**：原生JavaScript、HTML5、CSS3
- **UI设计**：响应式设计，支持多终端显示
- **图标库**：Font Awesome
- **数据可视化**：自定义图表展示
- **集成能力**：与军事职业教育服务平台和军事职业教育数据监控分系统集成

## 目录结构

```
军事学校成果认证系统/
├── index.html                 # 主页面
├── main.js                    # 主脚本文件
├── styles.css                 # 主样式表
├── tabs.css                   # 标签样式
├── systemManagement.js        # 系统管理模块
├── update_modules.js          # 模块更新脚本
├── module_template.js         # 模块模板
└── modules/                   # 功能模块目录
    ├── personalInfo.js        # 个人信息管理
    ├── achievementRegister.js # 成果登记
    ├── learningArchive.js     # 学习档案
    ├── growthPortrait.js      # 成长画像
    ├── achievementEntry.js    # 成果录入
    ├── achievementReview.js   # 成果初审
    ├── achievementConfirmation.js # 成果认定
    ├── certificationApplication.js # 申报认证
    ├── performanceEvaluation.js # 绩效评估
    ├── statisticalAnalysis.js # 统计分析
    ├── achievementDisplay.js  # 成果展示
    ├── accountManagement.js   # 账号权限管理
    ├── logManagement.js       # 用户日志管理
    ├── dictionaryManagement.js # 数据字典管理
    ├── displayManagement.js   # 展板样式管理
    ├── directoryManagement.js # 成果名录管理
    ├── templateManagement.js  # 模板管理
    ├── templateStyleManagement.js # 模板样式管理
    ├── sensitiveWordMonitor.js # 敏感词监控
    ├── personalManagement.js  # 个人管理
    ├── unitManagement.js      # 单位管理
    ├── statisticsManagement.js # 统计管理
    └── systemManagement.js    # 系统管理
```

## 业务流程

系统主要业务流程包括：

1. **个人成果登记与认证流程**：
   - 用户登记个人成果 → 学习小组管理员初审 → 成果认定审核员认定 → 成果保存至学习档案

2. **单位成果录入与认证流程**：
   - 学习小组管理员录入集体成果 → 提交认定 → 成果认定审核员认定 → 成果保存及关联学习者

3. **成果认领流程**：
   - 从军事职业教育服务平台获取学习成果 → 用户认领 → 自动完成成果登记、初审和认定

4. **证明报告生成流程**：
   - 选择学习档案中的成果 → 生成电子证明报告 → 查看和下载报告

## 安装与使用

1. 将项目文件部署到Web服务器目录下
2. 确保服务器支持HTML5和JavaScript
3. 通过浏览器访问index.html文件
4. 根据权限不同，使用对应的功能模块

## 系统要求

- 现代Web浏览器（Chrome、Firefox、Edge等）
- 支持JavaScript和CSS3
- 建议分辨率不低于1366×768

## 数据交互

系统与外部系统的数据交互：
- 与军事职业教育服务平台集成，获取学习成果数据
- 与军事职业教育数据监控分系统集成，获取用户基本信息

## 开发与维护

本系统采用模块化开发方式，各功能模块相对独立，便于维护和扩展。模块更新可通过update_modules.js脚本进行。

## 系统优化说明

系统已进行文件结构优化，主要包括：
1. 整合了主要脚本文件，采用优化版main.js替代旧版
2. 整合了HTML页面，采用优化版index.html替代旧版
3. 删除了根目录下的空certificationApplication.js文件，采用modules目录下的实现
4. 统一了systemManagement.js的管理，明确了根目录和modules目录下文件的职责划分
5. 移除了冗余的unitManagement.js文件，该文件是早期实现版本，其功能已被拆分到achievementEntry.js、achievementReview.js和achievementConfirmation.js等专门模块中 