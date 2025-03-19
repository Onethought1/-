// 展板样式管理模块
document.addEventListener('DOMContentLoaded', function() {
    // 初始化展板样式管理相关事件
    initDisplayManagement();
});

function initDisplayManagement() {
    // 展板样式管理初始化
    console.log("初始化展板样式管理模块");
}

// 选择展板模板
function selectTemplate(id) {
    // 移除所有模板项的选中状态
    const templateItems = document.querySelectorAll('.template-item');
    templateItems.forEach(item => {
        item.classList.remove('selected');
    });
    
    // 为当前模板添加选中状态
    const currentTemplate = event.target.closest('.template-item');
    if (currentTemplate) {
        currentTemplate.classList.add('selected');
    }
    
    alert(`已选择模板：${id}`);
}

// 保存展板设置
function saveDisplaySettings() {
    const themeColor = document.getElementById('theme-color').value;
    const bgColor = document.getElementById('bg-color').value;
    const chartColor = document.getElementById('chart-color').value;
    const rotateTime = document.getElementById('rotate-time').value;
    
    console.log("保存展板设置：", { themeColor, bgColor, chartColor, rotateTime });
    alert(`保存展板设置成功！主题颜色：${themeColor}，背景颜色：${bgColor}，图表颜色：${chartColor}，轮播时间：${rotateTime}秒`);
}

// 预览展板效果
function previewDisplay() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content preview-modal">
            <div class="modal-header">
                <h3>展板预览</h3>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <div class="preview-container">
                    <div class="preview-navbar">
                        <div class="preview-nav-item active">成果数量概览</div>
                        <div class="preview-nav-item">成果类型分布</div>
                        <div class="preview-nav-item">成果时间趋势</div>
                        <div class="preview-nav-item">单位成果排名</div>
                    </div>
                    <div class="preview-content">
                        <div class="preview-header">
                            <h2>成果认证系统 - 成果数量概览</h2>
                            <div class="preview-time">2023-06-01 15:30:45</div>
                        </div>
                        <div class="preview-body">
                            <div class="preview-panel">
                                <div class="preview-stat-card">
                                    <div class="stat-title">总成果数</div>
                                    <div class="stat-value">12,568</div>
                                    <div class="stat-footer">较上月 <span class="up">+3.2%</span></div>
                                </div>
                                <div class="preview-stat-card">
                                    <div class="stat-title">已认定成果</div>
                                    <div class="stat-value">10,245</div>
                                    <div class="stat-footer">较上月 <span class="up">+4.5%</span></div>
                                </div>
                                <div class="preview-stat-card">
                                    <div class="stat-title">已认证成果</div>
                                    <div class="stat-value">8,762</div>
                                    <div class="stat-footer">较上月 <span class="up">+2.8%</span></div>
                                </div>
                                <div class="preview-stat-card">
                                    <div class="stat-title">活跃用户</div>
                                    <div class="stat-value">352</div>
                                    <div class="stat-footer">较上月 <span class="up">+12.1%</span></div>
                                </div>
                            </div>
                            <div class="preview-charts">
                                <div class="preview-chart">
                                    <h3>成果类型分布</h3>
                                    <div class="chart-placeholder">
                                        <img src="images/chart-achievement-types.png" alt="成果类型分布">
                                    </div>
                                </div>
                                <div class="preview-chart">
                                    <h3>月度成果趋势</h3>
                                    <div class="chart-placeholder">
                                        <img src="images/chart-achievement-trend.png" alt="月度成果趋势">
                                    </div>
                                </div>
                            </div>
                            <div class="preview-table">
                                <h3>单位成果TOP5</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>排名</th>
                                            <th>单位名称</th>
                                            <th>成果总数</th>
                                            <th>认定数量</th>
                                            <th>认证数量</th>
                                            <th>本月新增</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>第一学习小组</td>
                                            <td>3,256</td>
                                            <td>2,987</td>
                                            <td>2,568</td>
                                            <td>152</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>第二学习小组</td>
                                            <td>2,845</td>
                                            <td>2,632</td>
                                            <td>2,324</td>
                                            <td>128</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>第三学习小组</td>
                                            <td>2,541</td>
                                            <td>2,321</td>
                                            <td>1,987</td>
                                            <td>115</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>第四学习小组</td>
                                            <td>1,897</td>
                                            <td>1,654</td>
                                            <td>1,432</td>
                                            <td>98</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>第五学习小组</td>
                                            <td>1,562</td>
                                            <td>1,321</td>
                                            <td>1,145</td>
                                            <td>86</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal(this)">关闭预览</button>
                <button class="btn btn-secondary" onclick="saveAsTemplate()">保存为模板</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 100);
}

// 创建自定义展板
function createCustomBoard() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>创建自定义展板</h3>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>展板名称：</label>
                    <input type="text" id="board-name" class="form-control">
                </div>
                <div class="form-group">
                    <label>展板类型：</label>
                    <select id="board-type" class="form-control">
                        <option value="personal">个人展板</option>
                        <option value="unit">单位展板</option>
                        <option value="statistics">统计展板</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>展板布局：</label>
                    <select id="board-layout" class="form-control">
                        <option value="layout1">布局1 (1大3小)</option>
                        <option value="layout2">布局2 (2x2网格)</option>
                        <option value="layout3">布局3 (左右分栏)</option>
                        <option value="layout4">布局4 (上下分栏)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>主题颜色：</label>
                    <input type="color" id="board-theme-color" class="form-control" value="#1e88e5">
                </div>
                <div class="form-group">
                    <label>背景颜色：</label>
                    <input type="color" id="board-bg-color" class="form-control" value="#ffffff">
                </div>
                <div class="form-group">
                    <label>图表颜色：</label>
                    <div class="color-palette">
                        <input type="color" class="palette-color" value="#4caf50">
                        <input type="color" class="palette-color" value="#ff9800">
                        <input type="color" class="palette-color" value="#f44336">
                        <input type="color" class="palette-color" value="#9c27b0">
                        <input type="color" class="palette-color" value="#3f51b5">
                        <button class="btn btn-sm" onclick="addColorToChartPalette()">+</button>
                    </div>
                </div>
                <div class="form-group">
                    <label>组件选择：</label>
                    <div class="component-selection">
                        <div class="component-item">
                            <input type="checkbox" id="comp-total" checked>
                            <label for="comp-total">总成果数统计</label>
                        </div>
                        <div class="component-item">
                            <input type="checkbox" id="comp-type-dist" checked>
                            <label for="comp-type-dist">成果类型分布</label>
                        </div>
                        <div class="component-item">
                            <input type="checkbox" id="comp-trend" checked>
                            <label for="comp-trend">成果趋势图</label>
                        </div>
                        <div class="component-item">
                            <input type="checkbox" id="comp-rank" checked>
                            <label for="comp-rank">成果排名表</label>
                        </div>
                        <div class="component-item">
                            <input type="checkbox" id="comp-user-active">
                            <label for="comp-user-active">用户活跃度</label>
                        </div>
                        <div class="component-item">
                            <input type="checkbox" id="comp-cert-rate">
                            <label for="comp-cert-rate">认证率统计</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>自动轮播设置：</label>
                    <div class="inline-form">
                        <input type="checkbox" id="board-auto-rotate" checked>
                        <label for="board-auto-rotate">启用自动轮播</label>
                        <input type="number" id="board-rotate-time" value="30" min="5" max="300" style="width: 60px;">
                        <label for="board-rotate-time">秒</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="saveCustomBoard()">保存</button>
                <button class="btn btn-secondary" onclick="previewCustomBoard()">预览</button>
                <button class="btn btn-default" onclick="closeModal(this)">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 100);
}

// 保存自定义展板
function saveCustomBoard() {
    const name = document.getElementById('board-name').value;
    const type = document.getElementById('board-type').value;
    const layout = document.getElementById('board-layout').value;
    
    if (!name) {
        alert('展板名称不能为空！');
        return;
    }
    
    alert(`保存自定义展板成功：${name}`);
    closeModal(document.querySelector('.modal .close'));
}

// 预览自定义展板
function previewCustomBoard() {
    const name = document.getElementById('board-name').value || '未命名展板';
    alert(`正在预览自定义展板：${name}`);
    // 这里可以调用预览展板的功能
    previewDisplay();
}

// 保存为模板
function saveAsTemplate() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal saveTemplate-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>保存为模板</h3>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>模板名称：</label>
                    <input type="text" id="template-name" class="form-control" value="成果数量概览模板">
                </div>
                <div class="form-group">
                    <label>模板类型：</label>
                    <select id="template-type" class="form-control">
                        <option value="statistics" selected>统计展板</option>
                        <option value="personal">个人展板</option>
                        <option value="unit">单位展板</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>模板描述：</label>
                    <textarea id="template-desc" class="form-control">展示成果数量总览、类型分布、趋势和排名等信息的统计展板模板。</textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="confirmSaveTemplate()">保存</button>
                <button class="btn btn-default" onclick="closeModal(this)">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 100);
}

// 确认保存模板
function confirmSaveTemplate() {
    const name = document.getElementById('template-name').value;
    const type = document.getElementById('template-type').value;
    const desc = document.getElementById('template-desc').value;
    
    if (!name) {
        alert('模板名称不能为空！');
        return;
    }
    
    alert(`保存模板成功：${name}`);
    
    // 关闭两个模态框
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
}

// 添加颜色到图表调色板
function addColorToChartPalette() {
    const colorPalette = document.querySelector('.color-palette');
    const newColor = document.createElement('input');
    newColor.type = 'color';
    newColor.className = 'palette-color';
    newColor.value = getRandomColor();
    
    // 插入到添加按钮之前
    colorPalette.insertBefore(newColor, colorPalette.lastElementChild);
}

// 生成随机颜色
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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