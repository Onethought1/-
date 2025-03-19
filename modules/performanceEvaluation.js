// 绩效评估模块
function loadPerformanceEvaluationModule(container) {
    let contentHTML = `<div class="content-title">绩效评估</div>
        <div class="card">
            <div class="card-title">绩效评估</div>
            <div class="form-group">
                <div class="form-label">选择年度</div>
                <select class="form-input">
                    <option value="2023">2023年度</option>
                    <option value="2022">2022年度</option>
                    <option value="2021">2021年度</option>
                </select>
            </div>
            <div class="form-group">
                <div class="form-label">选择单位</div>
                <select class="form-input">
                    <option value="all">全部单位</option>
                    <option value="unit1">第一学习小组</option>
                    <option value="unit2">第二学习小组</option>
                </select>
            </div>
            <div class="button" onclick="searchPerformance()">查询</div>
        </div>
        <div class="dashboard">
            <div class="dashboard-card">
                <div class="dashboard-card-title">总评估数</div>
                <div class="dashboard-card-value">100</div>
            </div>
            <div class="dashboard-card">
                <div class="dashboard-card-title">平均分值</div>
                <div class="dashboard-card-value">85.5</div>
            </div>
        </div>`;
    container.innerHTML = contentHTML;
}

function searchPerformance() {
    alert('查询绩效评估结果');
    // 实际应用中这里会调用后端API进行查询
}

// 将函数导出到全局作用域
window.loadPerformanceEvaluationModule = loadPerformanceEvaluationModule;

// 显示个人绩效详情
function showPersonalPerformance() {
    const modalHTML = `<div id="personal-performance-modal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000;">
        <div style="position: relative; width: 80%; max-width: 800px; margin: 50px auto; background-color: #fff; padding: 20px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #e8e8e8;">
                个人绩效详情 - 张三
                <span style="position: absolute; right: 20px; top: 20px; cursor: pointer;" onclick="document.getElementById('personal-performance-modal').remove()">×</span>
            </div>
            
            <div class="dashboard">
                <div class="dashboard-card">
                    <div class="dashboard-card-title">成果总数</div>
                    <div class="dashboard-card-value">8</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">总分值</div>
                    <div class="dashboard-card-value">87.5</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">评估结果</div>
                    <div class="dashboard-card-value">优秀</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">排名</div>
                    <div class="dashboard-card-value">1/42</div>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <div style="font-weight: bold; margin-bottom: 10px;">成果明细</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>成果名称</th>
                            <th>成果类型</th>
                            <th>获得时间</th>
                            <th>分值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>军事理论考试优秀</td>
                            <td>考试成果</td>
                            <td>2023-03-15</td>
                            <td>15.0</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>军事技能培训</td>
                            <td>培训成果</td>
                            <td>2023-04-10</td>
                            <td>12.5</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>军事研究论文</td>
                            <td>研究成果</td>
                            <td>2023-05-20</td>
                            <td>20.0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div style="margin-top: 20px;">
                <div style="font-weight: bold; margin-bottom: 10px;">评估记录</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>评估人</th>
                            <th>评估时间</th>
                            <th>评估结果</th>
                            <th>评语</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>王组长</td>
                            <td>2023-12-25</td>
                            <td>优秀</td>
                            <td>全面发展，成果丰富，表现突出</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="button-group">
                <div class="button" onclick="document.getElementById('personal-performance-modal').remove()">关闭</div>
                <div class="button">导出评估报告</div>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 评估绩效
function evaluatePerformance() {
    const modalHTML = `<div id="evaluate-performance-modal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000;">
        <div style="position: relative; width: 600px; margin: 100px auto; background-color: #fff; padding: 20px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #e8e8e8;">
                绩效评估 - 赵六
                <span style="position: absolute; right: 20px; top: 20px; cursor: pointer;" onclick="document.getElementById('evaluate-performance-modal').remove()">×</span>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="font-weight: bold; margin-bottom: 10px;">成果明细</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>成果名称</th>
                            <th>成果类型</th>
                            <th>获得时间</th>
                            <th>分值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>军事理论考试</td>
                            <td>考试成果</td>
                            <td>2023-03-15</td>
                            <td>10.0</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>军事技能培训</td>
                            <td>培训成果</td>
                            <td>2023-04-10</td>
                            <td>12.5</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="form-group">
                <div class="form-label">评估结果</div>
                <select class="form-input">
                    <option value="">请选择评估结果</option>
                    <option value="1">优秀</option>
                    <option value="2">良好</option>
                    <option value="3">合格</option>
                    <option value="4">不合格</option>
                </select>
            </div>
            
            <div class="form-group">
                <div class="form-label">评语</div>
                <textarea class="form-input" rows="4" placeholder="请输入评语"></textarea>
            </div>
            
            <div class="button-group">
                <div class="button" onclick="alert('评估成功'); document.getElementById('evaluate-performance-modal').remove()">确定</div>
                <div class="button" style="background-color: #999;" onclick="document.getElementById('evaluate-performance-modal').remove()">取消</div>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
} 