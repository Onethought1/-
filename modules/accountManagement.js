// 账号权限管理模块
document.addEventListener('DOMContentLoaded', function() {
    // 初始化账号权限管理相关事件
    initAccountManagement();
});

function initAccountManagement() {
    // 账号权限管理初始化
    console.log("初始化账号权限管理模块");
}

// 切换账号管理标签页
function switchAccountTab(tab) {
    // 获取所有标签页和内容元素
    const tabs = document.querySelectorAll('.tabs .tab');
    const contentDiv = document.getElementById('account-tab-content');
    
    // 移除所有标签页的active类
    tabs.forEach(tabElement => {
        tabElement.classList.remove('active');
    });
    
    // 为点击的标签页添加active类
    event.target.classList.add('active');
    
    // 根据选择的标签页加载相应内容
    switch(tab) {
        case 'account':
            showAccountManagementTab();
            break;
        case 'role':
            showRoleManagementTab();
            break;
        case 'group':
            showGroupManagementTab();
            break;
    }
}

// 显示账号管理标签页
function showAccountTab() {
    showAccountManagementTab();
}

// 账号管理标签页内容
function showAccountManagementTab() {
    const contentDiv = document.getElementById('account-tab-content');
    
    contentDiv.innerHTML = `
        <div class="toolbar">
            <div class="search-area">
                <button class="btn btn-primary" onclick="syncAccounts()">同步账号</button>
                <select id="account-status">
                    <option value="">全部状态</option>
                    <option value="active">启用</option>
                    <option value="inactive">停用</option>
                </select>
                <select id="account-role">
                    <option value="">全部角色</option>
                    <option value="admin">超级管理员</option>
                    <option value="unit-admin">单位平台管理员</option>
                    <option value="group-admin">学习小组管理员</option>
                    <option value="reviewer">成果认定审核人</option>
                    <option value="learner">学习者</option>
                </select>
                <input type="text" id="account-search" placeholder="搜索姓名或账号">
                <button class="btn btn-secondary" onclick="searchAccounts()">查询</button>
            </div>
        </div>
        
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" id="select-all-accounts"></th>
                        <th>账号</th>
                        <th>姓名</th>
                        <th>学习小组</th>
                        <th>角色</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>最后登录时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="account-table-body">
                    <tr>
                        <td><input type="checkbox" class="account-checkbox"></td>
                        <td>admin</td>
                        <td>系统管理员</td>
                        <td>系统</td>
                        <td>超级管理员</td>
                        <td>启用</td>
                        <td>2023-01-01</td>
                        <td>2023-06-01 09:30:15</td>
                        <td>
                            <a href="#" onclick="viewAccountDetail('admin')">查看</a>
                            <a href="#" onclick="assignAccountRole('admin')">授权</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="account-checkbox"></td>
                        <td>zhang_san</td>
                        <td>张三</td>
                        <td>第一学习小组</td>
                        <td>学习者</td>
                        <td>启用</td>
                        <td>2023-02-15</td>
                        <td>2023-06-01 11:15:22</td>
                        <td>
                            <a href="#" onclick="viewAccountDetail('zhang_san')">查看</a>
                            <a href="#" onclick="assignAccountRole('zhang_san')">授权</a>
                            <a href="#" onclick="disableAccount('zhang_san')">停用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="account-checkbox"></td>
                        <td>li_si</td>
                        <td>李四</td>
                        <td>第一学习小组</td>
                        <td>学习小组管理员</td>
                        <td>启用</td>
                        <td>2023-02-15</td>
                        <td>2023-06-01 10:45:30</td>
                        <td>
                            <a href="#" onclick="viewAccountDetail('li_si')">查看</a>
                            <a href="#" onclick="assignAccountRole('li_si')">授权</a>
                            <a href="#" onclick="disableAccount('li_si')">停用</a>
                        </td>
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
        
        <div class="batch-actions">
            <button class="btn btn-warning" onclick="batchEnableAccounts()">批量启用</button>
            <button class="btn btn-danger" onclick="batchDisableAccounts()">批量停用</button>
        </div>
    `;
    
    // 绑定全选事件
    document.getElementById('select-all-accounts').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.account-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
}

// 角色管理标签页内容
function showRoleManagementTab() {
    const contentDiv = document.getElementById('account-tab-content');
    
    contentDiv.innerHTML = `
        <div class="toolbar">
            <div class="search-area">
                <input type="text" id="role-search" placeholder="搜索角色名称">
                <button class="btn btn-secondary" onclick="searchRoles()">查询</button>
                <button class="btn btn-primary" onclick="addNewRole()">新增角色</button>
            </div>
        </div>
        
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>角色名称</th>
                        <th>角色编码</th>
                        <th>创建时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="role-table-body">
                    <tr>
                        <td>1</td>
                        <td>超级管理员</td>
                        <td>super_admin</td>
                        <td>2023-01-01</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editRole(1)">编辑</a>
                            <a href="#" onclick="assignPermission(1)">分配权限</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>单位平台管理员</td>
                        <td>unit_admin</td>
                        <td>2023-01-01</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editRole(2)">编辑</a>
                            <a href="#" onclick="assignPermission(2)">分配权限</a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>学习小组管理员</td>
                        <td>group_admin</td>
                        <td>2023-01-01</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editRole(3)">编辑</a>
                            <a href="#" onclick="assignPermission(3)">分配权限</a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>成果认定审核人</td>
                        <td>reviewer</td>
                        <td>2023-01-01</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editRole(4)">编辑</a>
                            <a href="#" onclick="assignPermission(4)">分配权限</a>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>学习者</td>
                        <td>learner</td>
                        <td>2023-01-01</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editRole(5)">编辑</a>
                            <a href="#" onclick="assignPermission(5)">分配权限</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// 学习小组标签页内容
function showGroupManagementTab() {
    const contentDiv = document.getElementById('account-tab-content');
    
    contentDiv.innerHTML = `
        <div class="toolbar">
            <button class="btn btn-primary" onclick="syncGroups()">同步学习小组</button>
        </div>
        
        <div class="tree-container">
            <div class="tree-view">
                <ul class="tree">
                    <li>
                        <div class="tree-node expanded">
                            <span class="tree-toggle" onclick="toggleTreeNode(this)">▼</span>
                            <span class="tree-label">军事学校</span>
                        </div>
                        <ul class="tree-children">
                            <li>
                                <div class="tree-node">
                                    <span class="tree-toggle" onclick="toggleTreeNode(this)">►</span>
                                    <span class="tree-label">第一学习小组</span>
                                </div>
                                <ul class="tree-children" style="display:none;">
                                    <li>
                                        <div class="tree-node">
                                            <span class="tree-toggle"></span>
                                            <span class="tree-label">第一班</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="tree-node">
                                            <span class="tree-toggle"></span>
                                            <span class="tree-label">第二班</span>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div class="tree-node">
                                    <span class="tree-toggle" onclick="toggleTreeNode(this)">►</span>
                                    <span class="tree-label">第二学习小组</span>
                                </div>
                                <ul class="tree-children" style="display:none;">
                                    <li>
                                        <div class="tree-node">
                                            <span class="tree-toggle"></span>
                                            <span class="tree-label">第一班</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="tree-node">
                                            <span class="tree-toggle"></span>
                                            <span class="tree-label">第二班</span>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="group-details">
                <h3>学习小组详情</h3>
                <div class="form-group">
                    <label>小组名称：</label>
                    <span id="group-name">军事学校</span>
                </div>
                <div class="form-group">
                    <label>小组编码：</label>
                    <span id="group-code">MS001</span>
                </div>
                <div class="form-group">
                    <label>小组人数：</label>
                    <span id="group-members">125</span>
                </div>
                <div class="form-group">
                    <label>管理员：</label>
                    <span id="group-admin">李四</span>
                </div>
                <div class="form-group">
                    <label>创建时间：</label>
                    <span id="group-create-time">2023-01-01</span>
                </div>
                <button class="btn btn-primary" onclick="assignGroupRole()">分配角色</button>
            </div>
        </div>
    `;
}

// 账号管理功能
function syncAccounts() {
    alert("正在从某分系统同步人员信息...");
}

function searchAccounts() {
    alert("正在按条件查询账号信息...");
}

function viewAccountDetail(username) {
    alert("正在查看用户详情：" + username);
}

function assignAccountRole(username) {
    alert("正在给用户分配角色和数据权限：" + username);
}

function disableAccount(username) {
    alert("正在停用账号：" + username);
}

function batchEnableAccounts() {
    alert("正在批量启用选中账号...");
}

function batchDisableAccounts() {
    alert("正在批量停用选中账号...");
}

// 角色管理功能
function searchRoles() {
    alert("正在查询角色...");
}

function addNewRole() {
    alert("正在添加新角色...");
}

function editRole(id) {
    alert("正在编辑角色：" + id);
}

function assignPermission(id) {
    alert("正在分配权限给角色：" + id);
}

// 学习小组功能
function syncGroups() {
    alert("正在从某分系统同步学习小组信息...");
}

function toggleTreeNode(element) {
    const node = element.parentNode.parentNode;
    const children = node.querySelector('.tree-children');
    
    if (children) {
        const isExpanded = element.textContent === '▼';
        element.textContent = isExpanded ? '►' : '▼';
        children.style.display = isExpanded ? 'none' : 'block';
    }
}

function assignGroupRole() {
    alert("正在分配学习小组角色...");
} 