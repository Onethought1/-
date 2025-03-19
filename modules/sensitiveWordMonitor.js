/**
 * 敏感词监控模块
 * 包含在线检测、敏感词管理和预警查询功能
 */

// 加载敏感词监控界面
function loadSensitiveWordMonitor() {
    const container = document.getElementById('main-content');
    
    // 切换标题
    document.querySelector('.header').textContent = '敏感词监控';
    
    // 构建敏感词监控主界面
    let html = `
        <div class="tabs">
            <div class="tab active" onclick="switchSensitiveWordTab('sensitive-word-management')">敏感词管理</div>
            <div class="tab" onclick="switchSensitiveWordTab('online-detection')">在线检测</div>
            <div class="tab" onclick="switchSensitiveWordTab('warning-query')">预警查询</div>
        </div>
        
        <div id="sensitive-word-tab-content">
            <!-- 初始加载敏感词管理标签页 -->
            ${getSensitiveWordManagementTabContent()}
        </div>
    `;
    
    container.innerHTML = html;
    
    // 初始化事件监听
    initSensitiveWordEvents();
}

// 切换标签页
function switchSensitiveWordTab(tabName) {
    // 更新标签页样式
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 根据选择的标签页显示内容
    const tabContent = document.getElementById('sensitive-word-tab-content');
    
    if (tabName === 'sensitive-word-management') {
        event.target.classList.add('active');
        tabContent.innerHTML = getSensitiveWordManagementTabContent();
        initSensitiveWordManagementEvents();
    } else if (tabName === 'online-detection') {
        event.target.classList.add('active');
        tabContent.innerHTML = getOnlineDetectionTabContent();
        initOnlineDetectionEvents();
    } else if (tabName === 'warning-query') {
        event.target.classList.add('active');
        tabContent.innerHTML = getWarningQueryTabContent();
        initWarningQueryEvents();
    }
}

// 获取敏感词管理标签页内容
function getSensitiveWordManagementTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>敏感词：</label>
                    <input type="text" class="form-input" id="sensitive-word-search" placeholder="请输入敏感词">
                </div>
                <div class="search-item">
                    <label>类型：</label>
                    <select class="form-input" id="sensitive-word-type-search">
                        <option value="">全部</option>
                        <option value="政治敏感">政治敏感</option>
                        <option value="军事安全">军事安全</option>
                        <option value="其他">其他</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>级别：</label>
                    <select class="form-input" id="sensitive-word-level-search">
                        <option value="">全部</option>
                        <option value="高">高</option>
                        <option value="中">中</option>
                        <option value="低">低</option>
                    </select>
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchSensitiveWords()">查询</button>
                    <button class="button" onclick="resetSensitiveWordSearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="addSensitiveWord()">添加敏感词</button>
                <button class="button" onclick="batchDeleteSensitiveWords()">批量删除</button>
                <button class="button" onclick="importSensitiveWords()">导入敏感词库</button>
                <button class="button" onclick="exportSensitiveWords()">导出敏感词库</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-sensitive-words"></th>
                        <th>序号</th>
                        <th>敏感词</th>
                        <th>类型</th>
                        <th>级别</th>
                        <th>替换词</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="sensitive-word-list">
                    <tr>
                        <td><input type="checkbox" class="sensitive-word-checkbox" value="1"></td>
                        <td>1</td>
                        <td>***</td>
                        <td>政治敏感</td>
                        <td>高</td>
                        <td>***</td>
                        <td>2023-01-15</td>
                        <td>
                            <a href="javascript:void(0)" onclick="editSensitiveWord(1)">编辑</a>
                            <a href="javascript:void(0)" onclick="deleteSensitiveWord(1)">删除</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="sensitive-word-checkbox" value="2"></td>
                        <td>2</td>
                        <td>***</td>
                        <td>军事安全</td>
                        <td>高</td>
                        <td>***</td>
                        <td>2023-02-20</td>
                        <td>
                            <a href="javascript:void(0)" onclick="editSensitiveWord(2)">编辑</a>
                            <a href="javascript:void(0)" onclick="deleteSensitiveWord(2)">删除</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="sensitive-word-checkbox" value="3"></td>
                        <td>3</td>
                        <td>***</td>
                        <td>军事安全</td>
                        <td>中</td>
                        <td>***</td>
                        <td>2023-03-10</td>
                        <td>
                            <a href="javascript:void(0)" onclick="editSensitiveWord(3)">编辑</a>
                            <a href="javascript:void(0)" onclick="deleteSensitiveWord(3)">删除</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="sensitive-word-checkbox" value="4"></td>
                        <td>4</td>
                        <td>***</td>
                        <td>其他</td>
                        <td>低</td>
                        <td>***</td>
                        <td>2023-04-05</td>
                        <td>
                            <a href="javascript:void(0)" onclick="editSensitiveWord(4)">编辑</a>
                            <a href="javascript:void(0)" onclick="deleteSensitiveWord(4)">删除</a>
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

// 获取在线检测标签页内容
function getOnlineDetectionTabContent() {
    return `
        <div class="card">
            <div class="card-title">在线检测</div>
            
            <div class="form-group">
                <label>检测内容：</label>
                <textarea class="form-input" id="detection-content" style="width: 100%; height: 150px; resize: vertical;" placeholder="请输入要检测的内容..."></textarea>
            </div>
            
            <div class="form-group">
                <label>检测结果：</label>
                <div id="detection-result" class="detection-result">
                    <div class="note">检测结果将在此显示</div>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="detectContent()">开始检测</button>
                <button class="button" onclick="clearDetectionContent()">清空内容</button>
                <button class="button" onclick="uploadFileForDetection()">上传文件检测</button>
            </div>
        </div>
    `;
}

// 获取预警查询标签页内容
function getWarningQueryTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>预警内容：</label>
                    <input type="text" class="form-input" id="warning-content-search" placeholder="请输入预警内容">
                </div>
                <div class="search-item">
                    <label>预警类型：</label>
                    <select class="form-input" id="warning-type-search">
                        <option value="">全部</option>
                        <option value="政治敏感">政治敏感</option>
                        <option value="军事安全">军事安全</option>
                        <option value="其他">其他</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>预警时间：</label>
                    <input type="date" class="form-input" id="warning-start-date"> 至
                    <input type="date" class="form-input" id="warning-end-date">
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchWarnings()">查询</button>
                    <button class="button" onclick="resetWarningSearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="generateWarningReport()">生成预警报告</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-warnings"></th>
                        <th>序号</th>
                        <th>预警内容</th>
                        <th>预警类型</th>
                        <th>预警级别</th>
                        <th>文件名称</th>
                        <th>上传人</th>
                        <th>预警时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="warning-list">
                    <tr>
                        <td><input type="checkbox" class="warning-checkbox" value="1"></td>
                        <td>1</td>
                        <td>内容包含敏感词"***"</td>
                        <td>政治敏感</td>
                        <td>高</td>
                        <td>成果证明材料.pdf</td>
                        <td>张三</td>
                        <td>2023-05-20</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewWarningDetail(1)">查看详情</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="warning-checkbox" value="2"></td>
                        <td>2</td>
                        <td>内容包含敏感词"***"</td>
                        <td>军事安全</td>
                        <td>高</td>
                        <td>军事训练心得.docx</td>
                        <td>李四</td>
                        <td>2023-06-15</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewWarningDetail(2)">查看详情</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="warning-checkbox" value="3"></td>
                        <td>3</td>
                        <td>内容包含敏感词"***"</td>
                        <td>军事安全</td>
                        <td>中</td>
                        <td>战术研究报告.pdf</td>
                        <td>王五</td>
                        <td>2023-07-05</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewWarningDetail(3)">查看详情</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="pagination">
                <span>共 3 条记录</span>
                <span>第 1/1 页</span>
                <button disabled>上一页</button>
                <button disabled>下一页</button>
            </div>
        </div>
    `;
}

// 初始化敏感词监控事件监听
function initSensitiveWordEvents() {
    // 暂时不需要初始化事件，切换标签时会单独初始化对应标签页的事件
}

// 初始化敏感词管理事件
function initSensitiveWordManagementEvents() {
    // 敏感词的全选功能
    const selectAllSensitiveWords = document.getElementById('select-all-sensitive-words');
    if (selectAllSensitiveWords) {
        selectAllSensitiveWords.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.sensitive-word-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllSensitiveWords.checked;
            });
        });
    }
}

// 初始化在线检测事件
function initOnlineDetectionEvents() {
    // 目前没有特殊的事件需要初始化
}

// 初始化预警查询事件
function initWarningQueryEvents() {
    // 预警的全选功能
    const selectAllWarnings = document.getElementById('select-all-warnings');
    if (selectAllWarnings) {
        selectAllWarnings.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.warning-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllWarnings.checked;
            });
        });
    }
}

// 搜索敏感词
function searchSensitiveWords() {
    const wordSearch = document.getElementById('sensitive-word-search').value;
    const typeSearch = document.getElementById('sensitive-word-type-search').value;
    const levelSearch = document.getElementById('sensitive-word-level-search').value;
    
    console.log('搜索敏感词：', {
        敏感词: wordSearch,
        类型: typeSearch,
        级别: levelSearch
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置敏感词搜索条件
function resetSensitiveWordSearch() {
    document.getElementById('sensitive-word-search').value = '';
    document.getElementById('sensitive-word-type-search').value = '';
    document.getElementById('sensitive-word-level-search').value = '';
}

// 添加敏感词
function addSensitiveWord() {
    alert('添加敏感词功能已触发，将打开敏感词添加表单');
    // 实际应用中这里会打开一个模态框或跳转到添加页面
}

// 编辑敏感词
function editSensitiveWord(id) {
    alert(`编辑ID为${id}的敏感词`);
    // 实际应用中这里会打开一个模态框或跳转到编辑页面
}

// 删除单个敏感词
function deleteSensitiveWord(id) {
    if (confirm(`确定要删除ID为${id}的敏感词吗？`)) {
        alert(`已删除ID为${id}的敏感词`);
        // 实际应用中这里会调用后端API删除敏感词
    }
}

// 批量删除敏感词
function batchDeleteSensitiveWords() {
    const selectedIds = getSelectedSensitiveWordIds();
    if (selectedIds.length === 0) {
        alert('请先选择要删除的敏感词');
        return;
    }
    
    if (confirm(`确定要删除选中的${selectedIds.length}个敏感词吗？`)) {
        alert(`已删除以下ID的敏感词: ${selectedIds.join(', ')}`);
        // 实际应用中这里会调用后端API进行批量删除
    }
}

// 导入敏感词库
function importSensitiveWords() {
    alert('导入敏感词库功能已触发，将打开文件选择器');
    // 实际应用中这里会打开一个文件选择器并上传文件
}

// 导出敏感词库
function exportSensitiveWords() {
    alert('导出敏感词库功能已触发');
    // 实际应用中这里会触发浏览器下载
}

// 获取已选中的敏感词ID
function getSelectedSensitiveWordIds() {
    const checkboxes = document.querySelectorAll('.sensitive-word-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 检测内容
function detectContent() {
    const content = document.getElementById('detection-content').value;
    
    if (!content.trim()) {
        alert('请先输入要检测的内容');
        return;
    }
    
    // 模拟检测结果
    const resultDiv = document.getElementById('detection-result');
    resultDiv.innerHTML = `
        <div class="detection-result-item warning">
            <div class="detection-result-title">检测到 2 个敏感词：</div>
            <div class="detection-result-content">
                <p>1. "***"（政治敏感，高级别）</p>
                <p>2. "***"（军事安全，中级别）</p>
            </div>
        </div>
        <div class="detection-result-item">
            <div class="detection-result-title">替换后的内容：</div>
            <div class="detection-result-content">
                <p>${content.replace(/敏感/g, '***')}</p>
            </div>
        </div>
    `;
    
    // 实际应用中这里会调用后端API进行内容检测
}

// 清空检测内容
function clearDetectionContent() {
    document.getElementById('detection-content').value = '';
    document.getElementById('detection-result').innerHTML = '<div class="note">检测结果将在此显示</div>';
}

// 上传文件进行检测
function uploadFileForDetection() {
    alert('上传文件检测功能已触发，将打开文件选择器');
    // 实际应用中这里会打开一个文件选择器并上传文件
}

// 搜索预警信息
function searchWarnings() {
    const contentSearch = document.getElementById('warning-content-search').value;
    const typeSearch = document.getElementById('warning-type-search').value;
    const startDate = document.getElementById('warning-start-date').value;
    const endDate = document.getElementById('warning-end-date').value;
    
    console.log('搜索预警信息：', {
        内容: contentSearch,
        类型: typeSearch,
        开始日期: startDate,
        结束日期: endDate
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置预警搜索条件
function resetWarningSearch() {
    document.getElementById('warning-content-search').value = '';
    document.getElementById('warning-type-search').value = '';
    document.getElementById('warning-start-date').value = '';
    document.getElementById('warning-end-date').value = '';
}

// 查看预警详情
function viewWarningDetail(id) {
    alert(`查看ID为${id}的预警详情`);
    // 实际应用中这里会打开一个模态框或跳转到详情页面
}

// 生成预警报告
function generateWarningReport() {
    const selectedIds = getSelectedWarningIds();
    if (selectedIds.length === 0) {
        alert('请先选择要包含在报告中的预警信息');
        return;
    }
    
    alert(`将生成包含以下ID预警信息的报告: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API生成预警报告
}

// 获取已选中的预警ID
function getSelectedWarningIds() {
    const checkboxes = document.querySelectorAll('.warning-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
} 