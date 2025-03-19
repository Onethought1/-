// 用户日志管理模块
document.addEventListener('DOMContentLoaded', function() {
    // 初始化用户日志管理相关事件
    initLogManagement();
});

function initLogManagement() {
    // 用户日志管理初始化
    console.log("初始化用户日志管理模块");
}

// 查询日志
function searchLogs() {
    const logType = document.getElementById('log-type').value;
    const username = document.getElementById('log-username').value;
    const startDate = document.getElementById('log-start-date').value;
    const endDate = document.getElementById('log-end-date').value;
    
    console.log("查询日志：", { logType, username, startDate, endDate });
    
    // 模拟查询结果
    const logs = [
        { id: 1, username: 'admin', type: '登录', time: '2023-06-01 09:30:15', ip: '192.168.1.100', result: '成功' },
        { id: 2, username: 'user001', type: '成果登记', time: '2023-06-01 10:15:22', ip: '192.168.1.105', result: '成功' },
        { id: 3, username: 'admin', type: '角色管理', time: '2023-06-01 11:30:45', ip: '192.168.1.100', result: '成功' },
        { id: 4, username: 'group_admin', type: '成果初审', time: '2023-06-01 14:22:33', ip: '192.168.1.110', result: '成功' },
        { id: 5, username: 'reviewer', type: '成果认定', time: '2023-06-01 15:45:12', ip: '192.168.1.115', result: '成功' }
    ];
    
    // 更新表格数据
    updateLogTable(logs);
}

// 显示日志统计
function showLogStatistics() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>用户日志统计</h3>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <div class="tabs">
                    <div class="tab active" onclick="switchStatisticsTab(this, 'login')">登录日志统计</div>
                    <div class="tab" onclick="switchStatisticsTab(this, 'operation')">操作日志统计</div>
                </div>
                <div class="tab-content" id="statistics-content">
                    <div class="stat-section">
                        <h4>登录日志统计</h4>
                        <div class="stat-charts">
                            <div class="chart">
                                <h5>每日登录次数</h5>
                                <div class="chart-placeholder">
                                    <img src="images/chart-login-daily.png" alt="每日登录次数">
                                </div>
                            </div>
                            <div class="chart">
                                <h5>登录用户分布</h5>
                                <div class="chart-placeholder">
                                    <img src="images/chart-login-users.png" alt="登录用户分布">
                                </div>
                            </div>
                        </div>
                        <div class="stat-table">
                            <h5>登录日志汇总</h5>
                            <table>
                                <thead>
                                    <tr>
                                        <th>日期</th>
                                        <th>登录次数</th>
                                        <th>登录成功率</th>
                                        <th>平均登录时长</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2023-06-01</td>
                                        <td>125</td>
                                        <td>98.5%</td>
                                        <td>35分钟</td>
                                    </tr>
                                    <tr>
                                        <td>2023-05-31</td>
                                        <td>118</td>
                                        <td>97.2%</td>
                                        <td>42分钟</td>
                                    </tr>
                                    <tr>
                                        <td>2023-05-30</td>
                                        <td>132</td>
                                        <td>99.1%</td>
                                        <td>38分钟</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal(this)">关闭</button>
                <button class="btn btn-secondary" onclick="exportStatistics()">导出统计</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 100);
}

// 查看日志详情
function viewLogDetail(id) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>日志详情</h3>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>用户名：</label>
                    <span id="detail-username">admin</span>
                </div>
                <div class="form-group">
                    <label>操作类型：</label>
                    <span id="detail-type">登录</span>
                </div>
                <div class="form-group">
                    <label>操作时间：</label>
                    <span id="detail-time">2023-06-01 09:30:15</span>
                </div>
                <div class="form-group">
                    <label>IP地址：</label>
                    <span id="detail-ip">192.168.1.100</span>
                </div>
                <div class="form-group">
                    <label>操作结果：</label>
                    <span id="detail-result">成功</span>
                </div>
                <div class="form-group">
                    <label>详细信息：</label>
                    <div id="detail-info" class="detail-text">
                        用户admin于2023-06-01 09:30:15通过浏览器Chrome从IP 192.168.1.100登录系统，登录成功。
                    </div>
                </div>
                <div class="form-group">
                    <label>浏览器：</label>
                    <span id="detail-browser">Chrome 102.0.5005.115</span>
                </div>
                <div class="form-group">
                    <label>操作系统：</label>
                    <span id="detail-os">Windows 10</span>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal(this)">关闭</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 100);
}

// 更新日志表格数据
function updateLogTable(logs) {
    const tableBody = document.getElementById('log-table-body');
    
    if (!tableBody) return;
    
    let html = '';
    logs.forEach((log, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${log.username}</td>
                <td>${log.type}</td>
                <td>${log.time}</td>
                <td>${log.ip}</td>
                <td>${log.result}</td>
                <td><a href="#" onclick="viewLogDetail(${log.id})">详情</a></td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// 关闭模态框
function closeModal(element) {
    const modal = element.closest('.modal');
    modal.style.display = 'none';
    
    // 移除模态框
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// 切换统计标签页
function switchStatisticsTab(element, tab) {
    // 获取所有标签页
    const tabs = element.parentNode.querySelectorAll('.tab');
    tabs.forEach(tabElement => {
        tabElement.classList.remove('active');
    });
    
    // 激活当前标签页
    element.classList.add('active');
    
    // 更新内容
    const contentDiv = document.getElementById('statistics-content');
    
    if (tab === 'login') {
        contentDiv.innerHTML = `
            <div class="stat-section">
                <h4>登录日志统计</h4>
                <div class="stat-charts">
                    <div class="chart">
                        <h5>每日登录次数</h5>
                        <div class="chart-placeholder">
                            <img src="images/chart-login-daily.png" alt="每日登录次数">
                        </div>
                    </div>
                    <div class="chart">
                        <h5>登录用户分布</h5>
                        <div class="chart-placeholder">
                            <img src="images/chart-login-users.png" alt="登录用户分布">
                        </div>
                    </div>
                </div>
                <div class="stat-table">
                    <h5>登录日志汇总</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>登录次数</th>
                                <th>登录成功率</th>
                                <th>平均登录时长</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2023-06-01</td>
                                <td>125</td>
                                <td>98.5%</td>
                                <td>35分钟</td>
                            </tr>
                            <tr>
                                <td>2023-05-31</td>
                                <td>118</td>
                                <td>97.2%</td>
                                <td>42分钟</td>
                            </tr>
                            <tr>
                                <td>2023-05-30</td>
                                <td>132</td>
                                <td>99.1%</td>
                                <td>38分钟</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (tab === 'operation') {
        contentDiv.innerHTML = `
            <div class="stat-section">
                <h4>操作日志统计</h4>
                <div class="stat-charts">
                    <div class="chart">
                        <h5>操作类型分布</h5>
                        <div class="chart-placeholder">
                            <img src="images/chart-operation-types.png" alt="操作类型分布">
                        </div>
                    </div>
                    <div class="chart">
                        <h5>每日操作次数</h5>
                        <div class="chart-placeholder">
                            <img src="images/chart-operation-daily.png" alt="每日操作次数">
                        </div>
                    </div>
                </div>
                <div class="stat-table">
                    <h5>操作日志汇总</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>操作类型</th>
                                <th>操作次数</th>
                                <th>成功率</th>
                                <th>平均耗时</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>成果登记</td>
                                <td>320</td>
                                <td>95.2%</td>
                                <td>2.5分钟</td>
                            </tr>
                            <tr>
                                <td>成果初审</td>
                                <td>185</td>
                                <td>98.7%</td>
                                <td>3.2分钟</td>
                            </tr>
                            <tr>
                                <td>成果认定</td>
                                <td>142</td>
                                <td>99.3%</td>
                                <td>4.1分钟</td>
                            </tr>
                            <tr>
                                <td>角色管理</td>
                                <td>45</td>
                                <td>100%</td>
                                <td>1.8分钟</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

// 导出统计数据
function exportStatistics() {
    alert("正在导出统计数据...");
} 