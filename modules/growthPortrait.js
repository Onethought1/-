/**
 * 成长画像模块
 * 包含成长轨迹和学习统计功能
 */

// 加载成长画像界面
function loadGrowthPortrait() {
    const container = document.getElementById('main-content');
    
    // 构建成长画像界面
    let html = `
        <div class="content-title">成长画像</div>
        <div class="tab-container">
            <button class="tab-button active" data-tab="growth-track">成长轨迹</button>
            <button class="tab-button" data-tab="learning-stats">学习统计</button>
        </div>
        
        <div class="tab-content">
            <!-- 成长轨迹内容 -->
            <div class="tab-pane active" id="growth-track-tab">
                <div class="card">
                    <div class="card-title">个人成长时间轴</div>
                    <div class="time-filter">
                        <select class="form-input" id="time-range-filter" onchange="changeTimeRange()">
                            <option value="all">全部时间</option>
                            <option value="year">最近一年</option>
                            <option value="half">最近半年</option>
                            <option value="quarter">最近一季度</option>
                        </select>
                        <select class="form-input" id="achievement-type-filter" onchange="changeAchievementType()">
                            <option value="all">全部成果类型</option>
                            <option value="exam">考试成果</option>
                            <option value="training">培训成果</option>
                            <option value="research">研究成果</option>
                            <option value="practice">实践成果</option>
                        </select>
                    </div>
                    
                    <div class="growth-timeline">
                        <div class="chart-placeholder" id="growth-timeline-chart">成长时间轴加载中...</div>
                    </div>
                    
                    <div class="growth-summary">
                        <div class="summary-item">
                            <div class="summary-title">学习成果总数</div>
                            <div class="summary-value">24</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-title">认证成果数</div>
                            <div class="summary-value">18</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-title">学习累计时长</div>
                            <div class="summary-value">235小时</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-title">成果认定分值</div>
                            <div class="summary-value">187.5</div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-title">成长轨迹分析</div>
                    <div class="growth-analysis">
                        <div class="analysis-chart">
                            <div class="chart-title">成果类型分布</div>
                            <div class="chart-placeholder" id="achievement-type-chart">成果类型分布图表加载中...</div>
                        </div>
                        <div class="analysis-chart">
                            <div class="chart-title">学习经历趋势</div>
                            <div class="chart-placeholder" id="learning-trend-chart">学习经历趋势图表加载中...</div>
                        </div>
                    </div>
                    <div class="growth-analysis-text">
                        <p>您的成长轨迹呈现稳健上升趋势，在过去一年中，您的学习成果总数增长了35%，其中研究类成果增长最为显著（增长52%）。您在军事理论和实战训练方面的投入时间逐渐增加，显示出您对专业发展的重视。</p>
                        <p>与同岗位同级别人员相比，您的学习活跃度处于前30%，成果认定分值处于前25%。建议您进一步增加实践类成果的比例，以加强理论与实践的结合。</p>
                    </div>
                </div>
            </div>
            
            <!-- 学习统计内容 -->
            <div class="tab-pane" id="learning-stats-tab">
                <div class="card">
                    <div class="card-title">学习行为分析</div>
                    <div class="learning-behavior-overview">
                        <div class="behavior-summary">
                            <div class="summary-title">学习风格</div>
                            <div class="summary-content">
                                <p>您的学习风格偏向于<strong>视觉型学习者</strong>，喜欢通过图表、视频等视觉内容进行学习。同时，您也具备一定的实践型学习特征，喜欢通过动手实践来巩固知识。</p>
                                <p>您的学习节奏较为稳定，平均每周投入学习时间约15小时，高于平均水平（12小时/周）。</p>
                            </div>
                        </div>
                        <div class="behavior-chart">
                            <div class="chart-placeholder" id="learning-style-chart">学习风格图表加载中...</div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-title">学习成果分析</div>
                    <div class="ability-model-overview">
                        <h3>军事能力模型</h3>
                        <div class="ability-radar-container">
                            <div class="chart-placeholder" id="ability-radar-chart">能力雷达图加载中...</div>
                        </div>
                        <div class="ability-summary">
                            <div class="ability-summary-title">总体评估</div>
                            <div class="ability-summary-desc">
                                <p>根据您的学习活动和成果数据，系统对您的军事能力进行了全面评估。您在军事理论和指挥协调方面表现优异，在战术理解和装备应用方面具有良好基础，在实战经验和专业研究方面有提升空间。</p>
                                <p>相比同级人员，您的综合能力处于前20%的水平。建议继续加强专业研究能力的培养，并通过更多实战演练提升实战经验。</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ability-detail-list">
                        <div class="ability-item">
                            <div class="ability-name">
                                军事理论
                                <span class="ability-score">92</span>
                            </div>
                            <div class="ability-progress">
                                <div class="ability-progress-bar" style="width: 92%"></div>
                            </div>
                            <div class="ability-desc">掌握军事基本原理、军事思想和军事战略，能够运用理论分析军事问题。</div>
                        </div>
                        <div class="ability-item">
                            <div class="ability-name">
                                战术理解
                                <span class="ability-score">85</span>
                            </div>
                            <div class="ability-progress">
                                <div class="ability-progress-bar" style="width: 85%"></div>
                            </div>
                            <div class="ability-desc">理解战术原则和战术运用，能够制定合理的战术计划和执行战术行动。</div>
                        </div>
                        <div class="ability-item">
                            <div class="ability-name">
                                指挥协调
                                <span class="ability-score">90</span>
                            </div>
                            <div class="ability-progress">
                                <div class="ability-progress-bar" style="width: 90%"></div>
                            </div>
                            <div class="ability-desc">具备良好的组织指挥能力，能够协调各方资源有效完成任务。</div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-title">学习位置分析</div>
                    <div class="learning-position-analysis">
                        <div class="position-chart">
                            <div class="chart-title">个人在全体人员中的位置</div>
                            <div class="chart-placeholder" id="overall-position-chart">位置图表加载中...</div>
                        </div>
                        <div class="position-summary">
                            <ul class="position-list">
                                <li>在所有人员中：学习成果总数排名 <strong>前15%</strong>，学习时长排名 <strong>前20%</strong></li>
                                <li>在本单位中：学习成果总数排名 <strong>第3名</strong>，学习时长排名 <strong>第5名</strong></li>
                                <li>在同岗位人员中：学习成果总数排名 <strong>前10%</strong>，学习时长排名 <strong>前15%</strong></li>
                                <li>在同级别人员中：学习成果总数排名 <strong>前12%</strong>，学习时长排名 <strong>前18%</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-title">学习兴趣分析</div>
                    <div class="learning-interest-analysis">
                        <div class="interest-chart">
                            <div class="chart-placeholder" id="interest-distribution-chart">兴趣分布图表加载中...</div>
                        </div>
                        <div class="interest-summary">
                            <p>您的学习兴趣主要集中在<strong>战术分析</strong>、<strong>军事历史</strong>和<strong>领导力</strong>方面，相对较少关注<strong>武器装备</strong>和<strong>军事技术</strong>领域。</p>
                            <p>根据您的兴趣和职业发展方向，系统推荐以下学习资源：</p>
                            <ul class="recommendation-list">
                                <li>《现代战术分析与应用》在线课程</li>
                                <li>《指挥决策与领导力提升》专题讲座</li>
                                <li>《经典战例解析》系列研讨会</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    
    container.innerHTML = html;
    
    // 初始化事件
    initPortraitEvents();
}

// 将函数导出到全局作用域
window.loadGrowthPortrait = loadGrowthPortrait;

// 初始化成长画像事件监听
function initPortraitEvents() {
    // 添加标签切换事件
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有标签页的激活状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 激活当前标签页
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
            
            // 加载图表
            loadCharts();
        });
    });
    
    // 初始加载图表
    loadCharts();
}

// 加载图表
function loadCharts() {
    // 模拟图表加载
    setTimeout(() => {
        document.querySelectorAll('.chart-placeholder').forEach(placeholder => {
            placeholder.innerHTML = "已加载图表（示例）";
        });
    }, 1000);
}

// 更改时间范围
function changeTimeRange() {
    const timeRange = document.getElementById('time-range-filter').value;
    console.log('切换时间范围为:', timeRange);
    // 重新加载成长轨迹数据和图表
    loadCharts();
}

// 更改成果类型
function changeAchievementType() {
    const achievementType = document.getElementById('achievement-type-filter').value;
    console.log('切换成果类型为:', achievementType);
    // 重新加载成长轨迹数据和图表
    loadCharts();
}

// 下载成长轨迹报告
function downloadGrowthTrackReport() {
    alert('下载成长轨迹报告功能已触发');
    // 实际应用中这里会触发浏览器下载
}

// 下载学习统计报告
function downloadLearningStatsReport() {
    alert('下载学习统计报告功能已触发');
    // 实际应用中这里会触发浏览器下载
} 