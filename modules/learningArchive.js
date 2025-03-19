/**
 * 学习档案模块
 * 包含学习活动记录、成果分析和学习轨迹管理功能
 */

// 加载学习档案界面
function loadLearningArchive() {
    const container = document.getElementById('main-content');
    
    // 构建学习档案主界面
    let html = `
        <div class="content-title">学习档案</div>
        <div class="tabs">
            <div class="tab active" onclick="switchArchiveTab('learning-activities')">学习活动记录</div>
            <div class="tab" onclick="switchArchiveTab('achievement-analysis')">成果分析</div>
            <div class="tab" onclick="switchArchiveTab('learning-path')">学习轨迹</div>
        </div>
        <div id="archive-tab-content">
            <!-- 标签页内容将动态加载到这里 -->
        </div>`;
    
    container.innerHTML = html;
    
    // 初始化默认显示第一个标签页的内容
    document.getElementById('archive-tab-content').innerHTML = getLearningActivitiesTabContent();
    
    // 初始化事件
    initArchiveEvents();
    initActivitiesEvents();
}

// 切换标签页
function switchArchiveTab(tabName) {
    // 更新标签页样式
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 找到对应标签并激活
    document.querySelector(`.tabs .tab[onclick*="${tabName}"]`).classList.add('active');
    
    // 根据选择的标签页显示内容
    const tabContent = document.getElementById('archive-tab-content');
    
    if (tabName === 'learning-activities') {
        tabContent.innerHTML = getLearningActivitiesTabContent();
        initActivitiesEvents();
    } else if (tabName === 'achievement-analysis') {
        tabContent.innerHTML = getAchievementAnalysisTabContent();
        initAnalysisEvents();
    } else if (tabName === 'learning-path') {
        tabContent.innerHTML = getLearningPathTabContent();
        initPathEvents();
    }
}

// 获取学习活动记录标签页内容
function getLearningActivitiesTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>活动名称：</label>
                    <input type="text" class="form-input" id="activity-name-search" placeholder="请输入活动名称">
                </div>
                <div class="search-item">
                    <label>活动类型：</label>
                    <select class="form-input" id="activity-type-search">
                        <option value="">全部</option>
                        <option value="online">在线学习</option>
                        <option value="offline">线下培训</option>
                        <option value="exam">考试测评</option>
                        <option value="research">研究活动</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>时间范围：</label>
                    <input type="date" class="form-input" id="activity-start-date"> 至
                    <input type="date" class="form-input" id="activity-end-date">
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchActivities()">查询</button>
                    <button class="button" onclick="resetActivitySearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="addActivity()">添加活动</button>
                <button class="button" onclick="batchDeleteActivities()">批量删除</button>
                <button class="button" onclick="exportActivities()">导出记录</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-activities"></th>
                        <th>序号</th>
                        <th>活动名称</th>
                        <th>活动类型</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>学习时长</th>
                        <th>完成情况</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="activity-list">
                    <tr>
                        <td><input type="checkbox" class="activity-checkbox" value="1"></td>
                        <td>1</td>
                        <td>军事理论基础课程</td>
                        <td>在线学习</td>
                        <td>2023-03-15</td>
                        <td>2023-04-20</td>
                        <td>36小时</td>
                        <td>已完成</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewActivity(1)">查看</a>
                            <a href="javascript:void(0)" onclick="editActivity(1)">编辑</a>
                            <a href="javascript:void(0)" onclick="deleteActivity(1)">删除</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="activity-checkbox" value="2"></td>
                        <td>2</td>
                        <td>战术技能训练</td>
                        <td>线下培训</td>
                        <td>2023-05-10</td>
                        <td>2023-05-20</td>
                        <td>40小时</td>
                        <td>已完成</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewActivity(2)">查看</a>
                            <a href="javascript:void(0)" onclick="editActivity(2)">编辑</a>
                            <a href="javascript:void(0)" onclick="deleteActivity(2)">删除</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="activity-checkbox" value="3"></td>
                        <td>3</td>
                        <td>军事指挥能力测评</td>
                        <td>考试测评</td>
                        <td>2023-06-15</td>
                        <td>2023-06-15</td>
                        <td>3小时</td>
                        <td>已完成</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewActivity(3)">查看</a>
                            <a href="javascript:void(0)" onclick="editActivity(3)">编辑</a>
                            <a href="javascript:void(0)" onclick="deleteActivity(3)">删除</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="activity-checkbox" value="4"></td>
                        <td>4</td>
                        <td>武器装备研究</td>
                        <td>研究活动</td>
                        <td>2023-07-01</td>
                        <td>2023-08-30</td>
                        <td>120小时</td>
                        <td>进行中</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewActivity(4)">查看</a>
                            <a href="javascript:void(0)" onclick="editActivity(4)">编辑</a>
                            <a href="javascript:void(0)" onclick="deleteActivity(4)">删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="pagination">
                <span>共 4 条记录</span>
                <span>第 1/1 页</span>
                <button disabled>上一页</button>
                <button disabled>下一页</button>
            </div>
        </div>
    `;
}

// 获取成果分析标签页内容
function getAchievementAnalysisTabContent() {
    return `
        <div class="card">
            <div class="card-title">个人成果总览</div>
            
            <div class="summary-panels">
                <div class="summary-panel">
                    <div class="summary-value">36</div>
                    <div class="summary-label">累计学习活动</div>
                </div>
                <div class="summary-panel">
                    <div class="summary-value">420</div>
                    <div class="summary-label">累计学习时长(小时)</div>
                </div>
                <div class="summary-panel">
                    <div class="summary-value">28</div>
                    <div class="summary-label">已获得成果</div>
                </div>
                <div class="summary-panel">
                    <div class="summary-value">92%</div>
                    <div class="summary-label">成果达成率</div>
                </div>
            </div>
            
            <div class="analysis-charts">
                <div class="analysis-chart">
                    <div class="chart-title">成果类型分布</div>
                    <div class="chart-container" id="achievement-type-chart">
                        <div class="chart-placeholder">图表加载中...</div>
                    </div>
                </div>
                <div class="analysis-chart">
                    <div class="chart-title">学习时长趋势</div>
                    <div class="chart-container" id="learning-time-chart">
                        <div class="chart-placeholder">图表加载中...</div>
                    </div>
                </div>
            </div>
            
            <div class="card-title">能力雷达图</div>
            <div class="ability-radar-chart" id="ability-radar-chart">
                <div class="chart-placeholder">能力雷达图加载中...</div>
            </div>
            
            <div class="card-title">成果质量评估</div>
            <table class="table">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>评估项目</th>
                        <th>当前评分</th>
                        <th>平均水平</th>
                        <th>趋势</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>军事理论水平</td>
                        <td>92</td>
                        <td>85</td>
                        <td><span class="trend-up">↑</span></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>实战技能</td>
                        <td>88</td>
                        <td>82</td>
                        <td><span class="trend-up">↑</span></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>指挥能力</td>
                        <td>85</td>
                        <td>80</td>
                        <td><span class="trend-up">↑</span></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>研究创新</td>
                        <td>78</td>
                        <td>75</td>
                        <td><span class="trend-up">↑</span></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>团队协作</td>
                        <td>90</td>
                        <td>83</td>
                        <td><span class="trend-up">↑</span></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="button-group">
                <button class="button" onclick="generateAnalysisReport()">生成分析报告</button>
                <button class="button" onclick="exportAnalysisData()">导出分析数据</button>
            </div>
        </div>
    `;
}

// 获取学习轨迹标签页内容
function getLearningPathTabContent() {
    return `
        <div class="card">
            <div class="card-title">学习轨迹图</div>
            
            <div class="path-timeline">
                <div class="timeline-controls">
                    <span>查看方式：</span>
                    <select class="form-input" id="path-view-mode" onchange="changePathViewMode()">
                        <option value="timeline">时间线</option>
                        <option value="category">分类视图</option>
                    </select>
                    
                    <span style="margin-left: 20px;">时间范围：</span>
                    <select class="form-input" id="path-time-range" onchange="changePathTimeRange()">
                        <option value="1">近1个月</option>
                        <option value="3">近3个月</option>
                        <option value="6" selected>近6个月</option>
                        <option value="12">近1年</option>
                        <option value="all">全部</option>
                    </select>
                </div>
                
                <div class="timeline-container" id="learning-timeline">
                    <div class="timeline-item">
                        <div class="timeline-date">2023-08-30</div>
                        <div class="timeline-content">
                            <div class="timeline-title">完成武器装备研究初步报告</div>
                            <div class="timeline-desc">完成了武器装备研究的初步报告编写，获得指导教员好评。</div>
                            <div class="timeline-tag">研究活动</div>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">2023-06-15</div>
                        <div class="timeline-content">
                            <div class="timeline-title">通过军事指挥能力测评</div>
                            <div class="timeline-desc">参加军事指挥能力测评并取得90分的好成绩。</div>
                            <div class="timeline-tag">考试测评</div>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">2023-05-20</div>
                        <div class="timeline-content">
                            <div class="timeline-title">完成战术技能训练</div>
                            <div class="timeline-desc">完成为期10天的战术技能集中训练，掌握了多项战术技能。</div>
                            <div class="timeline-tag">线下培训</div>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">2023-04-20</div>
                        <div class="timeline-content">
                            <div class="timeline-title">完成军事理论基础课程学习</div>
                            <div class="timeline-desc">完成全部军事理论基础课程的学习，并通过了课程测试。</div>
                            <div class="timeline-tag">在线学习</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card-title">课程推荐</div>
            <div class="recommended-courses">
                <div class="course-card">
                    <div class="course-title">高级战术分析</div>
                    <div class="course-desc">基于您的学习记录和能力评估，推荐您学习高级战术分析课程，提升战术分析能力。</div>
                    <div class="course-info">
                        <span>课程时长：40小时</span>
                        <span>难度：高级</span>
                    </div>
                    <button class="button" onclick="enrollCourse(1)">立即报名</button>
                </div>
                <div class="course-card">
                    <div class="course-title">现代武器系统概论</div>
                    <div class="course-desc">此课程将帮助您深入了解现代武器系统的原理与应用，支持您的武器装备研究。</div>
                    <div class="course-info">
                        <span>课程时长：30小时</span>
                        <span>难度：中级</span>
                    </div>
                    <button class="button" onclick="enrollCourse(2)">立即报名</button>
                </div>
                <div class="course-card">
                    <div class="course-title">军事领导力培养</div>
                    <div class="course-desc">提升您的军事领导能力和指挥技巧，培养卓越的军事领导才能。</div>
                    <div class="course-info">
                        <span>课程时长：25小时</span>
                        <span>难度：高级</span>
                    </div>
                    <button class="button" onclick="enrollCourse(3)">立即报名</button>
                </div>
            </div>
            
            <div class="button-group">
                <button class="button" onclick="viewAllCourses()">查看全部推荐课程</button>
            </div>
        </div>
    `;
}

// 初始化学习档案事件监听
function initArchiveEvents() {
    // 初始化图表和其他视觉元素
    setTimeout(() => {
        document.querySelectorAll('.chart-placeholder').forEach(placeholder => {
            placeholder.innerHTML = "已加载图表（示例）";
        });
    }, 1000);
}

// 初始化学习活动记录事件
function initActivitiesEvents() {
    // 学习活动的全选功能
    const selectAllActivities = document.getElementById('select-all-activities');
    if (selectAllActivities) {
        selectAllActivities.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.activity-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllActivities.checked;
            });
        });
    }
}

// 初始化成果分析事件
function initAnalysisEvents() {
    // 模拟加载图表
    setTimeout(() => {
        document.querySelectorAll('.chart-placeholder').forEach(placeholder => {
            placeholder.innerHTML = "已加载图表（示例）";
        });
    }, 1000);
}

// 初始化学习轨迹事件
function initPathEvents() {
    // 暂无特殊事件需要初始化
}

// 搜索学习活动
function searchActivities() {
    const nameSearch = document.getElementById('activity-name-search').value;
    const typeSearch = document.getElementById('activity-type-search').value;
    const startDate = document.getElementById('activity-start-date').value;
    const endDate = document.getElementById('activity-end-date').value;
    
    console.log('搜索学习活动：', {
        名称: nameSearch,
        类型: typeSearch,
        开始日期: startDate,
        结束日期: endDate
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置学习活动搜索条件
function resetActivitySearch() {
    document.getElementById('activity-name-search').value = '';
    document.getElementById('activity-type-search').value = '';
    document.getElementById('activity-start-date').value = '';
    document.getElementById('activity-end-date').value = '';
}

// 添加学习活动
function addActivity() {
    alert('添加学习活动功能已触发，将打开活动添加表单');
    // 实际应用中这里会打开一个模态框或跳转到添加页面
}

// 查看学习活动详情
function viewActivity(id) {
    alert(`查看ID为${id}的学习活动详情`);
    // 实际应用中这里会打开一个模态框或跳转到详情页面
}

// 编辑学习活动
function editActivity(id) {
    alert(`编辑ID为${id}的学习活动`);
    // 实际应用中这里会打开一个模态框或跳转到编辑页面
}

// 删除单个学习活动
function deleteActivity(id) {
    if (confirm(`确定要删除ID为${id}的学习活动吗？`)) {
        alert(`已删除ID为${id}的学习活动`);
        // 实际应用中这里会调用后端API删除活动
    }
}

// 批量删除学习活动
function batchDeleteActivities() {
    const selectedIds = getSelectedActivityIds();
    if (selectedIds.length === 0) {
        alert('请先选择要删除的学习活动');
        return;
    }
    
    if (confirm(`确定要删除选中的${selectedIds.length}个学习活动吗？`)) {
        alert(`已删除以下ID的学习活动: ${selectedIds.join(', ')}`);
        // 实际应用中这里会调用后端API进行批量删除
    }
}

// 导出学习活动记录
function exportActivities() {
    alert('导出学习活动记录功能已触发');
    // 实际应用中这里会触发浏览器下载
}

// 生成分析报告
function generateAnalysisReport() {
    alert('生成分析报告功能已触发');
    // 实际应用中这里会生成报告并提供下载或预览
}

// 导出分析数据
function exportAnalysisData() {
    alert('导出分析数据功能已触发');
    // 实际应用中这里会触发浏览器下载
}

// 更改学习轨迹查看方式
function changePathViewMode() {
    const viewMode = document.getElementById('path-view-mode').value;
    alert(`切换查看方式为: ${viewMode}`);
    // 实际应用中这里会重新加载轨迹图
}

// 更改学习轨迹时间范围
function changePathTimeRange() {
    const timeRange = document.getElementById('path-time-range').value;
    alert(`切换时间范围为: ${timeRange}`);
    // 实际应用中这里会重新加载轨迹图
}

// 报名课程
function enrollCourse(id) {
    alert(`报名ID为${id}的推荐课程`);
    // 实际应用中这里会调用后端API进行课程报名
}

// 查看全部推荐课程
function viewAllCourses() {
    alert('查看全部推荐课程功能已触发');
    // 实际应用中这里会跳转到课程中心页面
}

// 获取已选中的学习活动ID
function getSelectedActivityIds() {
    const checkboxes = document.querySelectorAll('.activity-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 将函数导出到全局作用域
window.loadLearningArchive = loadLearningArchive; 