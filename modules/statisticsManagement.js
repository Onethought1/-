// 绩效评估模块
function loadPerformanceEvaluationModule(container) {
    let contentHTML = `<div class="content-title">绩效评估</div>
        <div class="card">
            <div class="card-title">绩效评估</div>
            
            <div style="display: flex; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <div class="form-group">
                        <div class="form-label">评估周期</div>
                        <select class="form-input">
                            <option value="1">2023年度</option>
                            <option value="2">2022年度</option>
                            <option value="3">2021年度</option>
                        </select>
                    </div>
                </div>
                <div style="flex: 1; margin-left: 20px;">
                    <div class="form-group">
                        <div class="form-label">评估单位</div>
                        <select class="form-input">
                            <option value="1">全部单位</option>
                            <option value="2">第一学习小组</option>
                            <option value="3">第二学习小组</option>
                        </select>
                    </div>
                </div>
                <div style="flex: 1; margin-left: 20px;">
                    <div class="form-group">
                        <div class="form-label">评估状态</div>
                        <select class="form-input">
                            <option value="1">全部状态</option>
                            <option value="2">待评估</option>
                            <option value="3">已评估</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-end; margin-left: 20px;">
                    <div class="button">查询</div>
                </div>
            </div>
            
            <div class="dashboard">
                <div class="dashboard-card">
                    <div class="dashboard-card-title">总人数</div>
                    <div class="dashboard-card-value">42</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">总成果数</div>
                    <div class="dashboard-card-value">254</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">平均分值</div>
                    <div class="dashboard-card-value">78.5</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">已评估人数</div>
                    <div class="dashboard-card-value">38</div>
                </div>
            </div>
            
            <table class="table" style="margin-top: 20px;">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox"></th>
                        <th>序号</th>
                        <th>姓名</th>
                        <th>单位</th>
                        <th>成果总数</th>
                        <th>总分值</th>
                        <th>评估结果</th>
                        <th>评估时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>张三</td>
                        <td>第一学习小组</td>
                        <td>8</td>
                        <td>87.5</td>
                        <td>优秀</td>
                        <td>2023-12-25</td>
                        <td>
                            <a href="#" onclick="showPersonalPerformance()">查看</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>李四</td>
                        <td>第一学习小组</td>
                        <td>6</td>
                        <td>68.0</td>
                        <td>良好</td>
                        <td>2023-12-25</td>
                        <td>
                            <a href="#" onclick="showPersonalPerformance()">查看</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>王五</td>
                        <td>第二学习小组</td>
                        <td>5</td>
                        <td>76.5</td>
                        <td>良好</td>
                        <td>2023-12-25</td>
                        <td>
                            <a href="#" onclick="showPersonalPerformance()">查看</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>4</td>
                        <td>赵六</td>
                        <td>第二学习小组</td>
                        <td>4</td>
                        <td>-</td>
                        <td>待评估</td>
                        <td>-</td>
                        <td>
                            <a href="#" onclick="evaluatePerformance()">评估</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="button-group">
                <div class="button">生成评估报告</div>
                <div class="button">批量评估</div>
                <div class="button">导出</div>
            </div>
        </div>`;
    
    container.innerHTML = contentHTML;
}

// 统计分析模块
function loadStatisticsManagementModule(container) {
    let contentHTML = `<div class="content-title">统计分析</div>
        <div class="card">
            <div class="card-title">统计分析</div>
            <div class="form-group">
                <div class="form-label">选择统计类型</div>
                <select class="form-input">
                    <option value="achievement">成果统计</option>
                    <option value="behavior">学习行为分析</option>
                    <option value="trend">趋势分析</option>
                </select>
            </div>
            <div class="button" onclick="searchStatistics()">查询</div>
        </div>
        <div class="dashboard">
            <div class="dashboard-card">
                <div class="dashboard-card-title">总成果数</div>
                <div class="dashboard-card-value">500</div>
            </div>
            <div class="dashboard-card">
                <div class="dashboard-card-title">总学习时长</div>
                <div class="dashboard-card-value">1500小时</div>
            </div>
        </div>`;
    container.innerHTML = contentHTML;
}

function searchStatistics() {
    alert('查询统计分析结果');
    // 实际应用中这里会调用后端API进行查询
}

// 成果展示模块
function loadAchievementDisplayModule(container) {
    let contentHTML = `<div class="content-title">成果展示</div>
        <div class="card">
            <div class="card-title">成果展示配置</div>
            
            <div style="display: flex; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <div class="form-group">
                        <div class="form-label">展示周期</div>
                        <select class="form-input">
                            <option value="1">2023年度</option>
                            <option value="2">2022年度</option>
                            <option value="3">2021年度</option>
                        </select>
                    </div>
                </div>
                <div style="flex: 1; margin-left: 20px;">
                    <div class="form-group">
                        <div class="form-label">展示范围</div>
                        <select class="form-input">
                            <option value="1">全部单位</option>
                            <option value="2">第一学习小组</option>
                            <option value="3">第二学习小组</option>
                        </select>
                    </div>
                </div>
                <div style="flex: 1; margin-left: 20px;">
                    <div class="form-group">
                        <div class="form-label">展示状态</div>
                        <select class="form-input">
                            <option value="1">全部状态</option>
                            <option value="2">已发布</option>
                            <option value="3">未发布</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-end; margin-left: 20px;">
                    <div class="button">查询</div>
                </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox"></th>
                        <th>序号</th>
                        <th>展板名称</th>
                        <th>展示范围</th>
                        <th>创建时间</th>
                        <th>创建人</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>2023年第一季度成果展示</td>
                        <td>全部单位</td>
                        <td>2023-04-05</td>
                        <td>王组长</td>
                        <td>已发布</td>
                        <td>
                            <a href="#" onclick="previewDisplayBoard()">预览</a> |
                            <a href="#" onclick="editDisplayBoard()">编辑</a> |
                            <a href="#" onclick="confirm('确定要取消发布吗？')">取消发布</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>军事理论成果优秀榜</td>
                        <td>第一学习小组</td>
                        <td>2023-03-20</td>
                        <td>李主任</td>
                        <td>已发布</td>
                        <td>
                            <a href="#" onclick="previewDisplayBoard()">预览</a> |
                            <a href="#" onclick="editDisplayBoard()">编辑</a> |
                            <a href="#" onclick="confirm('确定要取消发布吗？')">取消发布</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>2023年半年度成果展示</td>
                        <td>全部单位</td>
                        <td>2023-06-15</td>
                        <td>王组长</td>
                        <td>未发布</td>
                        <td>
                            <a href="#" onclick="previewDisplayBoard()">预览</a> |
                            <a href="#" onclick="editDisplayBoard()">编辑</a> |
                            <a href="#" onclick="confirm('确定要发布吗？')">发布</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="button-group">
                <div class="button" onclick="createDisplayBoard()">新建展板</div>
                <div class="button">批量发布</div>
                <div class="button">批量取消发布</div>
            </div>
        </div>`;
    
    container.innerHTML = contentHTML;
}

// 将函数导出到全局作用域
window.loadStatisticsManagementModule = loadStatisticsManagementModule; 