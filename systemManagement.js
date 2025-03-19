function initSystemManagement() {
    const container = document.getElementById('content');
    container.className = 'admin-container';
    container.innerHTML = `
        <div class="admin-header">
            <h2 class="admin-title">系统管理</h2>
            <div class="admin-actions">
                <button id="btnRefresh" class="btn btn-secondary"><i class="fas fa-sync-alt"></i> 刷新</button>
            </div>
        </div>
        <div class="tabs">
            <div class="tab active" data-tab="account">账号管理</div>
            <div class="tab" data-tab="log">日志管理</div>
            <div class="tab" data-tab="dictionary">数据字典</div>
            <div class="tab" data-tab="display">显示设置</div>
        </div>
        <div id="tabContent" class="tab-content"></div>
    `;

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.getAttribute('data-tab');
            switch (tabName) {
                case 'account':
                    showAccountManagement();
                    break;
                case 'log':
                    showLogManagement();
                    break;
                case 'dictionary':
                    showDictionaryManagement();
                    break;
                case 'display':
                    showDisplaySettings();
                    break;
            }
        });
    });

    document.getElementById('btnRefresh').addEventListener('click', () => {
        const activeTab = document.querySelector('.tab.active').getAttribute('data-tab');
        switch (activeTab) {
            case 'account':
                showAccountManagement();
                break;
            case 'log':
                showLogManagement();
                break;
            case 'dictionary':
                showDictionaryManagement();
                break;
            case 'display':
                showDisplaySettings();
                break;
        }
    });

    showAccountManagement(); // 默认显示账号管理
}

// 账号管理界面
function showAccountManagement() {
    const tabContent = document.getElementById('tabContent');
    tabContent.innerHTML = `
        <div class="admin-header">
            <h3 class="admin-title">账号管理</h3>
            <div class="admin-actions">
                <button id="btnAddAccount" class="btn btn-primary"><i class="fas fa-plus"></i> 添加账号</button>
                <button id="btnExportAccounts" class="btn btn-secondary"><i class="fas fa-file-export"></i> 导出</button>
            </div>
        </div>
        
        <div class="search-panel">
            <form class="search-form">
                <div class="form-group">
                    <label for="accountName">账号名称</label>
                    <input type="text" id="accountName" class="form-control" placeholder="输入账号名称">
                </div>
                <div class="form-group">
                    <label for="accountRole">角色</label>
                    <select id="accountRole" class="form-control">
                        <option value="">全部</option>
                        <option value="admin">管理员</option>
                        <option value="user">普通用户</option>
                        <option value="guest">访客</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="accountStatus">状态</label>
                    <select id="accountStatus" class="form-control">
                        <option value="">全部</option>
                        <option value="active">活跃</option>
                        <option value="inactive">禁用</option>
                    </select>
                </div>
                <div>
                    <button type="button" id="btnSearchAccount" class="btn btn-primary">搜索</button>
                    <button type="button" id="btnResetAccount" class="btn btn-secondary">重置</button>
                </div>
            </form>
        </div>
        
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>账号ID</th>
                        <th>用户名</th>
                        <th>姓名</th>
                        <th>角色</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>最后登录</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="accountTableBody">
                    <!-- 数据将通过JavaScript加载 -->
                </tbody>
            </table>
        </div>
        
        <div class="pagination" id="accountPagination">
            <a href="#" class="pagination-item">1</a>
            <a href="#" class="pagination-item active">2</a>
            <a href="#" class="pagination-item">3</a>
            <a href="#" class="pagination-item">...</a>
            <a href="#" class="pagination-item">10</a>
        </div>
    `;

    // 添加事件监听器
    document.getElementById('btnAddAccount').addEventListener('click', showAddAccountModal);
    document.getElementById('btnSearchAccount').addEventListener('click', searchAccounts);
    document.getElementById('btnResetAccount').addEventListener('click', resetAccountSearch);
    document.getElementById('btnExportAccounts').addEventListener('click', exportAccounts);

    // 加载模拟数据
    loadMockAccounts();
}

function showAddAccountModal() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>添加新账号</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <form id="addAccountForm">
                    <div class="form-group">
                        <label for="newUsername">用户名</label>
                        <input type="text" id="newUsername" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="newPassword">密码</label>
                        <input type="password" id="newPassword" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="newFullName">姓名</label>
                        <input type="text" id="newFullName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="newRole">角色</label>
                        <select id="newRole" class="form-control" required>
                            <option value="admin">管理员</option>
                            <option value="user">普通用户</option>
                            <option value="guest">访客</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary close-modal">取消</button>
                <button type="button" class="btn btn-primary" id="btnSaveAccount">保存</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 关闭模态框
    const closeModal = () => {
        document.body.removeChild(modal);
    };

    modal.querySelector('.close').addEventListener('click', closeModal);
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 保存账号
    document.getElementById('btnSaveAccount').addEventListener('click', () => {
        // 模拟保存操作
        alert('账号添加成功！');
        closeModal();
        loadMockAccounts(); // 重新加载数据
    });
}

function searchAccounts() {
    // 模拟搜索功能
    console.log('搜索账号...');
    const name = document.getElementById('accountName').value;
    const role = document.getElementById('accountRole').value;
    const status = document.getElementById('accountStatus').value;
    
    // 这里应该是实际的搜索逻辑
    console.log(`搜索条件: 名称=${name}, 角色=${role}, 状态=${status}`);
    
    // 重新加载模拟数据
    loadMockAccounts();
}

function resetAccountSearch() {
    // 重置搜索表单
    document.getElementById('accountName').value = '';
    document.getElementById('accountRole').value = '';
    document.getElementById('accountStatus').value = '';
    loadMockAccounts();
}

function exportAccounts() {
    // 模拟导出功能
    alert('账号数据已成功导出！');
}

function loadMockAccounts() {
    // 模拟账号数据
    const mockAccounts = [
        { id: 1001, username: 'admin', fullName: '系统管理员', role: '管理员', status: '活跃', created: '2023-01-15', lastLogin: '2023-06-20 08:45' },
        { id: 1002, username: 'zhangsan', fullName: '张三', role: '普通用户', status: '活跃', created: '2023-02-18', lastLogin: '2023-06-19 14:30' },
        { id: 1003, username: 'lisi', fullName: '李四', role: '普通用户', status: '活跃', created: '2023-03-22', lastLogin: '2023-06-18 09:15' },
        { id: 1004, username: 'wangwu', fullName: '王五', role: '访客', status: '禁用', created: '2023-04-05', lastLogin: '2023-05-30 11:20' },
        { id: 1005, username: 'zhaoliu', fullName: '赵六', role: '普通用户', status: '活跃', created: '2023-05-12', lastLogin: '2023-06-17 16:40' }
    ];

    const tbody = document.getElementById('accountTableBody');
    tbody.innerHTML = '';
    
    mockAccounts.forEach(account => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${account.id}</td>
            <td>${account.username}</td>
            <td>${account.fullName}</td>
            <td>${account.role}</td>
            <td>${account.status}</td>
            <td>${account.created}</td>
            <td>${account.lastLogin}</td>
            <td>
                <a href="#" class="edit-account" data-id="${account.id}">编辑</a>
                <a href="#" class="delete-account" data-id="${account.id}">删除</a>
                <a href="#" class="reset-password" data-id="${account.id}">重置密码</a>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // 添加事件监听器
    document.querySelectorAll('.edit-account').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            editAccount(id);
        });
    });

    document.querySelectorAll('.delete-account').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            deleteAccount(id);
        });
    });

    document.querySelectorAll('.reset-password').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            resetPassword(id);
        });
    });
}

function editAccount(id) {
    // 模拟编辑账号
    alert(`编辑账号 ID: ${id}`);
}

function deleteAccount(id) {
    // 模拟删除账号
    if (confirm(`确定要删除账号 ID: ${id} 吗？`)) {
        alert(`账号 ID: ${id} 已删除`);
        loadMockAccounts(); // 重新加载数据
    }
}

function resetPassword(id) {
    // 模拟重置密码
    alert(`账号 ID: ${id} 的密码已重置`);
}

// 日志管理界面
function showLogManagement() {
    const tabContent = document.getElementById('tabContent');
    tabContent.innerHTML = `
        <div class="admin-header">
            <h3 class="admin-title">日志管理</h3>
            <div class="admin-actions">
                <button id="btnExportLogs" class="btn btn-secondary"><i class="fas fa-file-export"></i> 导出日志</button>
                <button id="btnClearLogs" class="btn btn-danger"><i class="fas fa-trash"></i> 清空日志</button>
            </div>
        </div>
        
        <div class="search-panel">
            <form class="search-form">
                <div class="form-group">
                    <label for="logType">日志类型</label>
                    <select id="logType" class="form-control">
                        <option value="">全部</option>
                        <option value="login">登录日志</option>
                        <option value="operation">操作日志</option>
                        <option value="system">系统日志</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="logUser">操作用户</label>
                    <input type="text" id="logUser" class="form-control" placeholder="输入用户名">
                </div>
                <div class="form-group">
                    <label for="logStartDate">开始日期</label>
                    <input type="date" id="logStartDate" class="form-control">
                </div>
                <div class="form-group">
                    <label for="logEndDate">结束日期</label>
                    <input type="date" id="logEndDate" class="form-control">
                </div>
                <div>
                    <button type="button" id="btnSearchLog" class="btn btn-primary">搜索</button>
                    <button type="button" id="btnResetLog" class="btn btn-secondary">重置</button>
                </div>
            </form>
        </div>
        
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>日志类型</th>
                        <th>内容</th>
                        <th>操作用户</th>
                        <th>IP地址</th>
                        <th>操作时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="logTableBody">
                    <!-- 数据将通过JavaScript加载 -->
                </tbody>
            </table>
        </div>
        
        <div class="pagination" id="logPagination">
            <a href="#" class="pagination-item">1</a>
            <a href="#" class="pagination-item active">2</a>
            <a href="#" class="pagination-item">3</a>
            <a href="#" class="pagination-item">...</a>
            <a href="#" class="pagination-item">10</a>
        </div>
    `;

    // 添加事件监听器
    document.getElementById('btnExportLogs').addEventListener('click', exportLogs);
    document.getElementById('btnClearLogs').addEventListener('click', clearLogs);
    document.getElementById('btnSearchLog').addEventListener('click', searchLogs);
    document.getElementById('btnResetLog').addEventListener('click', resetLogSearch);

    // 加载模拟数据
    loadMockLogs();
}

function exportLogs() {
    // 模拟导出日志
    alert('日志数据已成功导出！');
}

function clearLogs() {
    // 模拟清空日志
    if (confirm('确定要清空所有日志吗？此操作不可恢复！')) {
        alert('所有日志已清空！');
        loadMockLogs(); // 重新加载数据
    }
}

function searchLogs() {
    // 模拟搜索日志
    console.log('搜索日志...');
    const type = document.getElementById('logType').value;
    const user = document.getElementById('logUser').value;
    const startDate = document.getElementById('logStartDate').value;
    const endDate = document.getElementById('logEndDate').value;
    
    // 这里应该是实际的搜索逻辑
    console.log(`搜索条件: 类型=${type}, 用户=${user}, 开始日期=${startDate}, 结束日期=${endDate}`);
    
    // 重新加载模拟数据
    loadMockLogs();
}

function resetLogSearch() {
    // 重置搜索表单
    document.getElementById('logType').value = '';
    document.getElementById('logUser').value = '';
    document.getElementById('logStartDate').value = '';
    document.getElementById('logEndDate').value = '';
    loadMockLogs();
}

function loadMockLogs() {
    // 模拟日志数据
    const mockLogs = [
        { id: 5001, type: '登录日志', content: '用户登录成功', user: 'admin', ip: '192.168.1.100', time: '2023-06-20 08:45:12' },
        { id: 5002, type: '操作日志', content: '修改了用户信息', user: 'admin', ip: '192.168.1.100', time: '2023-06-20 09:12:34' },
        { id: 5003, type: '系统日志', content: '系统备份完成', user: 'system', ip: '127.0.0.1', time: '2023-06-20 01:00:00' },
        { id: 5004, type: '登录日志', content: '用户登录失败', user: 'zhangsan', ip: '192.168.1.120', time: '2023-06-19 16:23:45' },
        { id: 5005, type: '操作日志', content: '导出了成绩数据', user: 'lisi', ip: '192.168.1.135', time: '2023-06-19 11:56:21' }
    ];

    const tbody = document.getElementById('logTableBody');
    tbody.innerHTML = '';
    
    mockLogs.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${log.id}</td>
            <td>${log.type}</td>
            <td>${log.content}</td>
            <td>${log.user}</td>
            <td>${log.ip}</td>
            <td>${log.time}</td>
            <td>
                <a href="#" class="view-log" data-id="${log.id}">查看</a>
                <a href="#" class="delete-log" data-id="${log.id}">删除</a>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // 添加事件监听器
    document.querySelectorAll('.view-log').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            viewLog(id);
        });
    });

    document.querySelectorAll('.delete-log').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            deleteLog(id);
        });
    });
}

function viewLog(id) {
    // 模拟查看日志详情
    alert(`查看日志 ID: ${id} 的详情`);
}

function deleteLog(id) {
    // 模拟删除日志
    if (confirm(`确定要删除日志 ID: ${id} 吗？`)) {
        alert(`日志 ID: ${id} 已删除`);
        loadMockLogs(); // 重新加载数据
    }
}

// 数据字典管理界面
function showDictionaryManagement() {
    const tabContent = document.getElementById('tabContent');
    tabContent.innerHTML = `
        <div class="admin-header">
            <h3 class="admin-title">数据字典</h3>
            <div class="admin-actions">
                <button id="btnAddDict" class="btn btn-primary"><i class="fas fa-plus"></i> 添加字典</button>
                <button id="btnImportDict" class="btn btn-secondary"><i class="fas fa-file-import"></i> 导入</button>
                <button id="btnExportDict" class="btn btn-secondary"><i class="fas fa-file-export"></i> 导出</button>
            </div>
        </div>
        
        <div class="tree-view" id="dictTree">
            <!-- 树形控件将通过JavaScript加载 -->
        </div>
        
        <div id="dictDetail">
            <!-- 字典详情将在选择树节点后显示 -->
        </div>
    `;

    // 添加事件监听器
    document.getElementById('btnAddDict').addEventListener('click', showAddDictModal);
    document.getElementById('btnImportDict').addEventListener('click', importDict);
    document.getElementById('btnExportDict').addEventListener('click', exportDict);

    // 加载模拟数据
    loadMockDictTree();
}

function showAddDictModal() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>添加数据字典</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <form id="addDictForm">
                    <div class="form-group">
                        <label for="dictType">字典类型</label>
                        <select id="dictType" class="form-control" required>
                            <option value="category">分类</option>
                            <option value="item">条目</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dictCode">字典编码</label>
                        <input type="text" id="dictCode" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="dictName">字典名称</label>
                        <input type="text" id="dictName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="dictParent">上级字典</label>
                        <select id="dictParent" class="form-control">
                            <option value="">无（顶级）</option>
                            <option value="sys_user_type">用户类型</option>
                            <option value="sys_log_type">日志类型</option>
                            <option value="sys_menu_type">菜单类型</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dictOrder">排序</label>
                        <input type="number" id="dictOrder" class="form-control" value="0">
                    </div>
                    <div class="form-group">
                        <label for="dictRemark">备注</label>
                        <textarea id="dictRemark" class="form-control" rows="3"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary close-modal">取消</button>
                <button type="button" class="btn btn-primary" id="btnSaveDict">保存</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 关闭模态框
    const closeModal = () => {
        document.body.removeChild(modal);
    };

    modal.querySelector('.close').addEventListener('click', closeModal);
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 保存字典
    document.getElementById('btnSaveDict').addEventListener('click', () => {
        // 模拟保存操作
        alert('字典添加成功！');
        closeModal();
        loadMockDictTree(); // 重新加载数据
    });
}

function importDict() {
    // 模拟导入字典
    alert('字典数据导入成功！');
    loadMockDictTree();
}

function exportDict() {
    // 模拟导出字典
    alert('字典数据已成功导出！');
}

function loadMockDictTree() {
    // 模拟字典树数据
    const mockDictTree = [
        {
            id: 'sys_user_type',
            name: '用户类型',
            code: 'sys_user_type',
            children: [
                { id: 'admin', name: '管理员', code: 'admin' },
                { id: 'user', name: '普通用户', code: 'user' },
                { id: 'guest', name: '访客', code: 'guest' }
            ]
        },
        {
            id: 'sys_log_type',
            name: '日志类型',
            code: 'sys_log_type',
            children: [
                { id: 'login', name: '登录日志', code: 'login' },
                { id: 'operation', name: '操作日志', code: 'operation' },
                { id: 'system', name: '系统日志', code: 'system' }
            ]
        },
        {
            id: 'sys_menu_type',
            name: '菜单类型',
            code: 'sys_menu_type',
            children: [
                { id: 'directory', name: '目录', code: 'directory' },
                { id: 'menu', name: '菜单', code: 'menu' },
                { id: 'button', name: '按钮', code: 'button' }
            ]
        }
    ];

    const treeContainer = document.getElementById('dictTree');
    treeContainer.innerHTML = '';
    
    function renderTreeNode(node, container) {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'tree-node';
        nodeElement.innerHTML = `
            <div class="tree-node-content" data-id="${node.id}">
                <span class="tree-node-icon">
                    ${node.children ? '<i class="fas fa-folder"></i>' : '<i class="fas fa-file-alt"></i>'}
                </span>
                <span>${node.name} [${node.code}]</span>
            </div>
        `;
        
        if (node.children && node.children.length > 0) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'tree-node-children';
            nodeElement.appendChild(childrenContainer);
            
            node.children.forEach(child => {
                renderTreeNode(child, childrenContainer);
            });
            
            // 添加展开/折叠功能
            const nodeContent = nodeElement.querySelector('.tree-node-content');
            nodeContent.addEventListener('click', () => {
                nodeElement.classList.toggle('expanded');
            });
        } else {
            // 为叶子节点添加点击事件
            const nodeContent = nodeElement.querySelector('.tree-node-content');
            nodeContent.addEventListener('click', () => {
                showDictDetail(node);
            });
        }
        
        container.appendChild(nodeElement);
    }
    
    mockDictTree.forEach(node => {
        renderTreeNode(node, treeContainer);
    });
}

function showDictDetail(dict) {
    // 显示字典详情
    const detailContainer = document.getElementById('dictDetail');
    detailContainer.innerHTML = `
        <div class="admin-header">
            <h3 class="admin-title">字典详情: ${dict.name}</h3>
            <div class="admin-actions">
                <button class="btn btn-primary edit-dict" data-id="${dict.id}"><i class="fas fa-edit"></i> 编辑</button>
                <button class="btn btn-danger delete-dict" data-id="${dict.id}"><i class="fas fa-trash"></i> 删除</button>
            </div>
        </div>
        
        <div class="detail-text">
            <p><strong>字典编码:</strong> ${dict.code}</p>
            <p><strong>字典名称:</strong> ${dict.name}</p>
            <p><strong>排序:</strong> 0</p>
            <p><strong>备注:</strong> 这是一条示例字典数据</p>
        </div>
    `;

    // 添加事件监听器
    detailContainer.querySelector('.edit-dict').addEventListener('click', () => {
        editDict(dict.id);
    });

    detailContainer.querySelector('.delete-dict').addEventListener('click', () => {
        deleteDict(dict.id);
    });
}

function editDict(id) {
    // 模拟编辑字典
    alert(`编辑字典 ID: ${id}`);
}

function deleteDict(id) {
    // 模拟删除字典
    if (confirm(`确定要删除字典 ID: ${id} 吗？`)) {
        alert(`字典 ID: ${id} 已删除`);
        loadMockDictTree(); // 重新加载数据
        document.getElementById('dictDetail').innerHTML = '';
    }
}

// 显示设置界面
function showDisplaySettings() {
    const tabContent = document.getElementById('tabContent');
    tabContent.innerHTML = `
        <div class="admin-header">
            <h3 class="admin-title">显示设置</h3>
            <div class="admin-actions">
                <button id="btnSaveSettings" class="btn btn-primary"><i class="fas fa-save"></i> 保存设置</button>
                <button id="btnResetSettings" class="btn btn-secondary"><i class="fas fa-undo"></i> 恢复默认</button>
            </div>
        </div>
        
        <div class="customize-panel">
            <div class="form-group">
                <label for="themeColor">主题颜色</label>
                <select id="themeColor" class="form-control">
                    <option value="blue">蓝色主题</option>
                    <option value="green">绿色主题</option>
                    <option value="red">红色主题</option>
                    <option value="purple">紫色主题</option>
                    <option value="dark">深色主题</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="fontSize">字体大小</label>
                <select id="fontSize" class="form-control">
                    <option value="small">小号</option>
                    <option value="medium" selected>中号</option>
                    <option value="large">大号</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="tableRowCount">表格每页行数</label>
                <select id="tableRowCount" class="form-control">
                    <option value="10">10行/页</option>
                    <option value="20" selected>20行/页</option>
                    <option value="50">50行/页</option>
                    <option value="100">100行/页</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="sidebarPos">侧边栏位置</label>
                <select id="sidebarPos" class="form-control">
                    <option value="left" selected>左侧</option>
                    <option value="right">右侧</option>
                </select>
            </div>
        </div>
        
        <h4>模块显示</h4>
        <div class="template-grid">
            <div class="template-item">
                <img src="images/template1.jpg" alt="统计模块">
                <div class="template-title">统计数据模块</div>
                <label class="checkbox-container">
                    <input type="checkbox" checked> 显示
                </label>
            </div>
            
            <div class="template-item">
                <img src="images/template2.jpg" alt="成绩模块">
                <div class="template-title">成绩分析模块</div>
                <label class="checkbox-container">
                    <input type="checkbox" checked> 显示
                </label>
            </div>
            
            <div class="template-item">
                <img src="images/template3.jpg" alt="用户模块">
                <div class="template-title">用户活跃模块</div>
                <label class="checkbox-container">
                    <input type="checkbox" checked> 显示
                </label>
            </div>
            
            <div class="template-item">
                <img src="images/template4.jpg" alt="消息模块">
                <div class="template-title">消息通知模块</div>
                <label class="checkbox-container">
                    <input type="checkbox"> 显示
                </label>
            </div>
        </div>
    `;

    // 添加事件监听器
    document.getElementById('btnSaveSettings').addEventListener('click', saveDisplaySettings);
    document.getElementById('btnResetSettings').addEventListener('click', resetDisplaySettings);
}

function saveDisplaySettings() {
    // 模拟保存显示设置
    alert('显示设置已保存！');
}

function resetDisplaySettings() {
    // 模拟重置显示设置
    if (confirm('确定要恢复为默认设置吗？')) {
        alert('显示设置已恢复为默认！');
        
        // 重置表单
        document.getElementById('themeColor').value = 'blue';
        document.getElementById('fontSize').value = 'medium';
        document.getElementById('tableRowCount').value = '20';
        document.getElementById('sidebarPos').value = 'left';
        
        // 重置复选框
        document.querySelectorAll('.template-item input[type="checkbox"]').forEach((checkbox, index) => {
            checkbox.checked = index < 3; // 默认前三个选中
        });
    }
} 