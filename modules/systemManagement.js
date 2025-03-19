// 系统管理模块总控制文件
document.addEventListener('DOMContentLoaded', function() {
    // 初始化系统管理相关的事件监听和数据
    initSystemManagement();
});

// 初始化系统管理相关事件监听和数据
function initSystemManagement() {
    // 当显示系统管理相关页面时的处理函数
    if(typeof window.contentHandlers === 'undefined') {
        window.contentHandlers = {};
    }
    
    // 注册各个子模块的内容处理函数
    window.contentHandlers['account-management'] = showAccountManagement;
    window.contentHandlers['log-management'] = showLogManagement;
    window.contentHandlers['dictionary-management'] = showDictionaryManagement;
    window.contentHandlers['display-management'] = showDisplayManagement;
}

// 显示账号权限管理页面
function showAccountManagement() {
    const contentDiv = document.getElementById('main-content');
    document.querySelector('.header').textContent = '账号权限管理';
    
    // 加载账号权限管理的内容
    contentDiv.innerHTML = `
        <div class="tabs">
            <div class="tab active" onclick="switchAccountTab('account')">账号管理</div>
            <div class="tab" onclick="switchAccountTab('role')">角色管理</div>
            <div class="tab" onclick="switchAccountTab('group')">学习小组</div>
        </div>
        <div id="account-tab-content" class="tab-content"></div>
    `;
    
    // 默认显示账号管理标签页
    showAccountTab();
}

// 显示用户日志管理页面
function showLogManagement() {
    const contentDiv = document.getElementById('main-content');
    document.querySelector('.header').textContent = '用户日志管理';
    
    contentDiv.innerHTML = `
        <div class="search-panel">
            <div class="search-form">
                <div class="form-group">
                    <label>日志类型：</label>
                    <select id="log-type">
                        <option value="login">登录日志</option>
                        <option value="operation">操作日志</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>用户名：</label>
                    <input type="text" id="log-username" placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label>时间范围：</label>
                    <input type="date" id="log-start-date">
                    <span>至</span>
                    <input type="date" id="log-end-date">
                </div>
                <button class="btn btn-primary" onclick="searchLogs()">查询</button>
                <button class="btn btn-secondary" onclick="showLogStatistics()">统计</button>
            </div>
        </div>
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>用户名</th>
                        <th>操作类型</th>
                        <th>操作时间</th>
                        <th>IP地址</th>
                        <th>操作结果</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="log-table-body">
                    <!-- 日志数据将通过JS动态加载 -->
                    <tr>
                        <td>1</td>
                        <td>admin</td>
                        <td>登录</td>
                        <td>2023-06-01 09:30:15</td>
                        <td>192.168.1.100</td>
                        <td>成功</td>
                        <td><a href="#" onclick="viewLogDetail(1)">详情</a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>user001</td>
                        <td>成果登记</td>
                        <td>2023-06-01 10:15:22</td>
                        <td>192.168.1.105</td>
                        <td>成功</td>
                        <td><a href="#" onclick="viewLogDetail(2)">详情</a></td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination">
                <a href="#" class="pagination-item">上一页</a>
                <a href="#" class="pagination-item active">1</a>
                <a href="#" class="pagination-item">2</a>
                <a href="#" class="pagination-item">3</a>
                <a href="#" class="pagination-item">下一页</a>
            </div>
        </div>
    `;
}

// 显示数据字典管理页面
function showDictionaryManagement() {
    const contentDiv = document.getElementById('main-content');
    document.querySelector('.header').textContent = '数据字典管理';
    
    contentDiv.innerHTML = `
        <div class="tabs">
            <div class="tab active" onclick="switchDictionaryTab('dictionary')">数据字典</div>
            <div class="tab" onclick="switchDictionaryTab('dict-item')">字典项管理</div>
        </div>
        <div id="dictionary-tab-content" class="tab-content"></div>
    `;
    
    // 默认显示数据字典标签页
    showDictionaryTab();
}

// 显示展板样式管理页面
function showDisplayManagement() {
    const contentDiv = document.getElementById('main-content');
    document.querySelector('.header').textContent = '展板样式管理';
    
    contentDiv.innerHTML = `
        <div class="display-templates">
            <h3>预置展板模板</h3>
            <div class="template-grid">
                <div class="template-item">
                    <img src="images/template1.png" alt="模板1">
                    <div class="template-title">标准分析展板</div>
                    <button class="btn btn-primary" onclick="selectTemplate(1)">选择</button>
                </div>
                <div class="template-item">
                    <img src="images/template2.png" alt="模板2">
                    <div class="template-title">数据大屏模板</div>
                    <button class="btn btn-primary" onclick="selectTemplate(2)">选择</button>
                </div>
                <div class="template-item">
                    <img src="images/template3.png" alt="模板3">
                    <div class="template-title">成果对比模板</div>
                    <button class="btn btn-primary" onclick="selectTemplate(3)">选择</button>
                </div>
            </div>
            
            <h3>自定义设置</h3>
            <div class="customize-panel">
                <div class="form-group">
                    <label>主题颜色：</label>
                    <input type="color" id="theme-color" value="#1e88e5">
                </div>
                <div class="form-group">
                    <label>背景颜色：</label>
                    <input type="color" id="bg-color" value="#ffffff">
                </div>
                <div class="form-group">
                    <label>图表颜色：</label>
                    <input type="color" id="chart-color" value="#4caf50">
                </div>
                <div class="form-group">
                    <label>自动轮播时间(秒)：</label>
                    <input type="number" id="rotate-time" value="30" min="5" max="300">
                </div>
                <button class="btn btn-primary" onclick="saveDisplaySettings()">保存设置</button>
                <button class="btn btn-secondary" onclick="previewDisplay()">预览效果</button>
            </div>
        </div>
    `;
}

// 这些函数将在对应的模块JS文件中实现
function switchAccountTab(tab) {
    // 将在accountManagement.js中实现
    console.log("切换到账号管理标签页: " + tab);
}

function showAccountTab() {
    // 将在accountManagement.js中实现
    console.log("显示账号管理标签页");
}

function searchLogs() {
    // 将在logManagement.js中实现
    console.log("搜索日志");
}

function showLogStatistics() {
    // 将在logManagement.js中实现
    console.log("显示日志统计");
}

function viewLogDetail(id) {
    // 将在logManagement.js中实现
    console.log("查看日志详情: " + id);
}

function switchDictionaryTab(tab) {
    // 将在dictionaryManagement.js中实现
    console.log("切换到字典管理标签页: " + tab);
}

function showDictionaryTab() {
    // 将在dictionaryManagement.js中实现
    console.log("显示字典管理标签页");
}

function selectTemplate(id) {
    // 将在displayManagement.js中实现
    console.log("选择展板模板: " + id);
}

function saveDisplaySettings() {
    // 将在displayManagement.js中实现
    console.log("保存展板设置");
}

function previewDisplay() {
    // 将在displayManagement.js中实现
    console.log("预览展板效果");
}

// 将函数导出到全局作用域
window.showAccountManagement = showAccountManagement;
window.showLogManagement = showLogManagement;
window.showDictionaryManagement = showDictionaryManagement;
window.showDisplayManagement = showDisplayManagement;
window.switchAccountTab = switchAccountTab;
window.showAccountTab = showAccountTab;
window.searchLogs = searchLogs;
window.showLogStatistics = showLogStatistics;
window.viewLogDetail = viewLogDetail;
window.switchDictionaryTab = switchDictionaryTab;
window.showDictionaryTab = showDictionaryTab;
window.selectTemplate = selectTemplate;
window.saveDisplaySettings = saveDisplaySettings;
window.previewDisplay = previewDisplay; 