/**
 * 成果名录管理模块
 * 包含名录管理和名录表单功能
 */

// 加载成果名录管理界面
function loadDirectoryManagement() {
    const container = document.getElementById('main-content');
    
    // 切换标题
    document.querySelector('.header').textContent = '成果名录管理';
    
    // 构建成果名录管理主界面
    let html = `
        <div class="tabs">
            <div class="tab active" onclick="switchDirectoryTab('directory-list')">名录管理</div>
            <div class="tab" onclick="switchDirectoryTab('directory-form')">名录表单</div>
        </div>
        
        <div id="directory-tab-content">
            <!-- 初始加载名录管理标签页 -->
            ${getDirectoryListTabContent()}
        </div>
    `;
    
    container.innerHTML = html;
    
    // 初始化事件监听
    initDirectoryEvents();
}

// 切换标签页
function switchDirectoryTab(tabName) {
    // 更新标签页样式
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 根据选择的标签页显示内容
    const tabContent = document.getElementById('directory-tab-content');
    
    if (tabName === 'directory-list') {
        event.target.classList.add('active');
        tabContent.innerHTML = getDirectoryListTabContent();
        initDirectoryListEvents();
    } else if (tabName === 'directory-form') {
        event.target.classList.add('active');
        tabContent.innerHTML = getDirectoryFormTabContent();
        initDirectoryFormEvents();
    }
}

// 获取名录管理标签页内容
function getDirectoryListTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>名录名称：</label>
                    <input type="text" class="form-input" id="directory-name-search" placeholder="请输入名录名称">
                </div>
                <div class="search-item">
                    <label>名录类型：</label>
                    <select class="form-input" id="directory-type-search">
                        <option value="">全部</option>
                        <option value="目录">目录</option>
                        <option value="名录">名录</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>发布状态：</label>
                    <select class="form-input" id="directory-status-search">
                        <option value="">全部</option>
                        <option value="已发布">已发布</option>
                        <option value="未发布">未发布</option>
                        <option value="已下线">已下线</option>
                    </select>
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchDirectories()">查询</button>
                    <button class="button" onclick="resetDirectorySearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="addDirectory()">添加名录</button>
                <button class="button" onclick="publishDirectories()">发布</button>
                <button class="button" onclick="cancelPublishDirectories()">取消发布</button>
                <button class="button" onclick="offlineDirectories()">下线</button>
                <button class="button" onclick="activateDirectories()">启用</button>
                <button class="button" onclick="exportDirectories()">导出</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-directories"></th>
                        <th>序号</th>
                        <th>名录名称</th>
                        <th>类型</th>
                        <th>适用范围</th>
                        <th>创建时间</th>
                        <th>有效时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="directory-list">
                    <tr>
                        <td><input type="checkbox" class="directory-checkbox" value="1"></td>
                        <td>1</td>
                        <td>军事理论考试</td>
                        <td>名录</td>
                        <td>军事理论学习</td>
                        <td>2023-05-10</td>
                        <td>2023-05-10至2025-05-10</td>
                        <td>已发布</td>
                        <td>
                            <a href="javascript:void(0)" onclick="editDirectory(1)">编辑</a>
                            <a href="javascript:void(0)" onclick="viewDirectory(1)">查看</a>
                            <a href="javascript:void(0)" onclick="setDirectoryTimeLimit(1)">设置时效</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="directory-checkbox" value="2"></td>
                        <td>2</td>
                        <td>军事技能培训</td>
                        <td>目录</td>
                        <td>军事技能提升</td>
                        <td>2023-06-15</td>
                        <td>2023-06-15至2024-06-15</td>
                        <td>已发布</td>
                        <td>
                            <a href="javascript:void(0)" onclick="editDirectory(2)">编辑</a>
                            <a href="javascript:void(0)" onclick="viewDirectory(2)">查看</a>
                            <a href="javascript:void(0)" onclick="setDirectoryTimeLimit(2)">设置时效</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="directory-checkbox" value="3"></td>
                        <td>3</td>
                        <td>指挥能力训练</td>
                        <td>名录</td>
                        <td>指挥员能力提升</td>
                        <td>2023-07-20</td>
                        <td>未设置</td>
                        <td>未发布</td>
                        <td>
                            <a href="javascript:void(0)" onclick="editDirectory(3)">编辑</a>
                            <a href="javascript:void(0)" onclick="viewDirectory(3)">查看</a>
                            <a href="javascript:void(0)" onclick="deleteDirectory(3)">删除</a>
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

// 获取名录表单标签页内容
function getDirectoryFormTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>名录名称：</label>
                    <select class="form-input" id="form-directory-select">
                        <option value="">请选择名录</option>
                        <option value="1">军事理论考试</option>
                        <option value="2">军事技能培训</option>
                        <option value="3">指挥能力训练</option>
                    </select>
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="loadDirectoryForm()">查看表单</button>
                </div>
            </div>
            
            <div id="directory-form-content" style="margin-top: 20px;">
                <div class="note">请先选择名录查看表单</div>
            </div>
        </div>
    `;
}

// 加载选定名录的表单
function loadDirectoryForm() {
    const directoryId = document.getElementById('form-directory-select').value;
    
    if (!directoryId) {
        alert('请先选择一个名录');
        return;
    }
    
    const formContent = document.getElementById('directory-form-content');
    
    formContent.innerHTML = `
        <div class="form-title">军事理论考试表单设计</div>
        
        <div class="action-bar">
            <button class="button" onclick="addFormAttribute()">添加属性</button>
            <button class="button" onclick="saveFormAttributes()">保存</button>
        </div>
        
        <table class="table">
            <thead>
                <tr>
                    <th style="width: 40px;"><input type="checkbox" id="select-all-attributes"></th>
                    <th>序号</th>
                    <th>属性名称</th>
                    <th>输入类型</th>
                    <th>是否必填</th>
                    <th>提示信息</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody id="attribute-list">
                <tr>
                    <td><input type="checkbox" class="attribute-checkbox" value="1"></td>
                    <td>1</td>
                    <td>考试名称</td>
                    <td>文本输入框</td>
                    <td>是</td>
                    <td>请输入考试完整名称</td>
                    <td>
                        <a href="javascript:void(0)" onclick="editAttribute(1)">编辑</a>
                        <a href="javascript:void(0)" onclick="deleteAttribute(1)">删除</a>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" class="attribute-checkbox" value="2"></td>
                    <td>2</td>
                    <td>考试日期</td>
                    <td>日期选择器</td>
                    <td>是</td>
                    <td>请选择考试日期</td>
                    <td>
                        <a href="javascript:void(0)" onclick="editAttribute(2)">编辑</a>
                        <a href="javascript:void(0)" onclick="deleteAttribute(2)">删除</a>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" class="attribute-checkbox" value="3"></td>
                    <td>3</td>
                    <td>考试成绩</td>
                    <td>数字输入框</td>
                    <td>是</td>
                    <td>请输入考试分数(0-100)</td>
                    <td>
                        <a href="javascript:void(0)" onclick="editAttribute(3)">编辑</a>
                        <a href="javascript:void(0)" onclick="deleteAttribute(3)">删除</a>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" class="attribute-checkbox" value="4"></td>
                    <td>4</td>
                    <td>考试类型</td>
                    <td>下拉选择框</td>
                    <td>是</td>
                    <td>请选择考试类型</td>
                    <td>
                        <a href="javascript:void(0)" onclick="editAttribute(4)">编辑</a>
                        <a href="javascript:void(0)" onclick="deleteAttribute(4)">删除</a>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" class="attribute-checkbox" value="5"></td>
                    <td>5</td>
                    <td>考试证明材料</td>
                    <td>文件上传</td>
                    <td>是</td>
                    <td>请上传考试证明材料(PDF、JPG)</td>
                    <td>
                        <a href="javascript:void(0)" onclick="editAttribute(5)">编辑</a>
                        <a href="javascript:void(0)" onclick="deleteAttribute(5)">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

// 初始化事件监听
function initDirectoryEvents() {
    // 为全选复选框添加事件监听
    const selectAllCheckbox = document.getElementById('select-all-directories');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.directory-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }
}

// 初始化名录列表事件
function initDirectoryListEvents() {
    // 名录列表的全选功能
    const selectAllCheckbox = document.getElementById('select-all-directories');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.directory-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }
}

// 初始化名录表单事件
function initDirectoryFormEvents() {
    // 表单属性的全选功能
    const selectAllAttributes = document.getElementById('select-all-attributes');
    if (selectAllAttributes) {
        selectAllAttributes.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.attribute-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllAttributes.checked;
            });
        });
    }
}

// 搜索目录
function searchDirectories() {
    const nameSearch = document.getElementById('directory-name-search').value;
    const typeSearch = document.getElementById('directory-type-search').value;
    const statusSearch = document.getElementById('directory-status-search').value;
    
    console.log('搜索名录：', {
        名称: nameSearch,
        类型: typeSearch,
        状态: statusSearch
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置搜索条件
function resetDirectorySearch() {
    document.getElementById('directory-name-search').value = '';
    document.getElementById('directory-type-search').value = '';
    document.getElementById('directory-status-search').value = '';
}

// 添加名录
function addDirectory() {
    alert('添加名录功能，将打开名录编辑表单');
    // 实际应用中这里会打开一个模态框或跳转到编辑页面
}

// 编辑名录
function editDirectory(id) {
    alert(`编辑ID为${id}的名录`);
    // 实际应用中这里会打开一个模态框或跳转到编辑页面
}

// 查看名录详情
function viewDirectory(id) {
    alert(`查看ID为${id}的名录详情`);
    // 实际应用中这里会打开一个模态框或跳转到详情页面
}

// 设置名录时效
function setDirectoryTimeLimit(id) {
    alert(`为ID为${id}的名录设置时效`);
    // 实际应用中这里会打开一个模态框进行设置
}

// 删除名录
function deleteDirectory(id) {
    if (confirm(`确定要删除ID为${id}的名录吗？`)) {
        alert(`已删除ID为${id}的名录`);
        // 实际应用中这里会调用后端API进行删除操作
    }
}

// 批量发布名录
function publishDirectories() {
    const selectedIds = getSelectedDirectoryIds();
    if (selectedIds.length === 0) {
        alert('请先选择要发布的名录');
        return;
    }
    
    alert(`将发布以下ID的名录: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API进行批量发布
}

// 批量取消发布名录
function cancelPublishDirectories() {
    const selectedIds = getSelectedDirectoryIds();
    if (selectedIds.length === 0) {
        alert('请先选择要取消发布的名录');
        return;
    }
    
    alert(`将取消发布以下ID的名录: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API进行批量取消发布
}

// 批量下线名录
function offlineDirectories() {
    const selectedIds = getSelectedDirectoryIds();
    if (selectedIds.length === 0) {
        alert('请先选择要下线的名录');
        return;
    }
    
    alert(`将下线以下ID的名录: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API进行批量下线
}

// 批量启用名录
function activateDirectories() {
    const selectedIds = getSelectedDirectoryIds();
    if (selectedIds.length === 0) {
        alert('请先选择要启用的名录');
        return;
    }
    
    alert(`将启用以下ID的名录: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API进行批量启用
}

// 导出名录
function exportDirectories() {
    alert('导出名录功能已触发');
    // 实际应用中这里会调用后端API进行导出
}

// 获取已选中的名录ID
function getSelectedDirectoryIds() {
    const checkboxes = document.querySelectorAll('.directory-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 添加表单属性
function addFormAttribute() {
    alert('添加表单属性功能已触发');
    // 实际应用中这里会打开一个模态框添加属性
}

// 保存表单属性
function saveFormAttributes() {
    alert('保存表单属性功能已触发');
    // 实际应用中这里会调用后端API保存表单设计
}

// 编辑属性
function editAttribute(id) {
    alert(`编辑ID为${id}的属性`);
    // 实际应用中这里会打开一个模态框编辑属性
}

// 删除属性
function deleteAttribute(id) {
    if (confirm(`确定要删除ID为${id}的属性吗？`)) {
        alert(`已删除ID为${id}的属性`);
        // 实际应用中这里会调用后端API删除属性
    }
} 