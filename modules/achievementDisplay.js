// 成果展示模块
function loadAchievementDisplayModule(container) {
    let contentHTML = `<div class="content-title">成果展示</div>
        <div class="card">
            <div class="card-title">成果展示</div>
                    <div class="form-group">
                <div class="form-label">选择展示类型</div>
                        <select class="form-input">
                    <option value="table">表格展示</option>
                    <option value="chart">图表展示</option>
                        </select>
            </div>
            <div class="button" onclick="displayAchievements()">展示</div>
            </div>
        <div class="dashboard">
            <div class="dashboard-card">
                <div class="dashboard-card-title">展示总数</div>
                <div class="dashboard-card-value">200</div>
            </div>
            <div class="dashboard-card">
                <div class="dashboard-card-title">展示类型</div>
                <div class="dashboard-card-value">图表</div>
            </div>
        </div>`;
    container.innerHTML = contentHTML;
}

function displayAchievements() {
    alert('展示成果信息');
    // 实际应用中这里会调用后端API进行展示
}

// 将函数导出到全局作用域
window.loadAchievementDisplayModule = loadAchievementDisplayModule; 