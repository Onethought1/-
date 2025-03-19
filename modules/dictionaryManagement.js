// 数据字典管理模块
document.addEventListener('DOMContentLoaded', function() {
    // 初始化数据字典管理相关事件
    initDictionaryManagement();
});

function initDictionaryManagement() {
    // 数据字典管理初始化
    console.log("初始化数据字典管理模块");
}

// 显示数据字典标签页
function showDictionaryTab() {
    switchDictionaryTab('dictionary');
}

// 切换数据字典标签页
function switchDictionaryTab(tab) {
    // 获取所有标签页和内容元素
    const tabs = document.querySelectorAll('.tabs .tab');
    const contentDiv = document.getElementById('dictionary-tab-content');
    
    // 移除所有标签页的active类
    tabs.forEach(tabElement => {
        tabElement.classList.remove('active');
    });
    
    // 为点击的标签页添加active类
    if (typeof event !== 'undefined') {
        event.target.classList.add('active');
    } else {
        // 如果不是通过点击事件调用，则找到对应的标签页并添加active类
        const tabElement = document.querySelector(`.tabs .tab[onclick*="${tab}"]`);
        if (tabElement) {
            tabElement.classList.add('active');
        }
    }
    
    // 根据选择的标签页加载相应内容
    if (tab === 'dictionary') {
        showDictionaryManagementTab();
    } else if (tab === 'dict-item') {
        showDictionaryItemManagementTab();
    }
}

// 数据字典标签页内容
function showDictionaryManagementTab() {
    const contentDiv = document.getElementById('dictionary-tab-content');
    
    contentDiv.innerHTML = `
        <div class="toolbar">
            <div class="search-area">
                <input type="text" id="dictionary-search" placeholder="搜索字典名称或编码">
                <button class="btn btn-secondary" onclick="searchDictionaries()">查询</button>
                <button class="btn btn-primary" onclick="addNewDictionary()">新增字典</button>
            </div>
        </div>
        
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>字典名称</th>
                        <th>字典编码</th>
                        <th>状态</th>
                        <th>备注</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="dictionary-table-body">
                    <tr>
                        <td>1</td>
                        <td>民族</td>
                        <td>nation</td>
                        <td>启用</td>
                        <td>包含各民族名称</td>
                        <td>2023-01-01</td>
                        <td>
                            <a href="#" onclick="editDictionary(1)">编辑</a>
                            <a href="#" onclick="viewDictionaryItems(1)">查看项目</a>
                            <a href="#" onclick="disableDictionary(1)">停用</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>政治面貌</td>
                        <td>politics</td>
                        <td>启用</td>
                        <td>包含各政治面貌名称</td>
                        <td>2023-01-01</td>
                        <td>
                            <a href="#" onclick="editDictionary(2)">编辑</a>
                            <a href="#" onclick="viewDictionaryItems(2)">查看项目</a>
                            <a href="#" onclick="disableDictionary(2)">停用</a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>成果类型</td>
                        <td>achievement_type</td>
                        <td>启用</td>
                        <td>包含各类成果类型</td>
                        <td>2023-01-01</td>
                        <td>
                            <a href="#" onclick="editDictionary(3)">编辑</a>
                            <a href="#" onclick="viewDictionaryItems(3)">查看项目</a>
                            <a href="#" onclick="disableDictionary(3)">停用</a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>单位类型</td>
                        <td>unit_type</td>
                        <td>启用</td>
                        <td>包含各类单位类型</td>
                        <td>2023-01-01</td>
                        <td>
                            <a href="#" onclick="editDictionary(4)">编辑</a>
                            <a href="#" onclick="viewDictionaryItems(4)">查看项目</a>
                            <a href="#" onclick="disableDictionary(4)">停用</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination">
                <a href="#" class="pagination-item">上一页</a>
                <a href="#" class="pagination-item active">1</a>
                <a href="#" class="pagination-item">2</a>
                <a href="#" class="pagination-item">下一页</a>
            </div>
        </div>
    `;
}

// 字典项管理标签页内容
function showDictionaryItemManagementTab() {
    const contentDiv = document.getElementById('dictionary-tab-content');
    
    contentDiv.innerHTML = `
        <div class="toolbar">
            <div class="search-area">
                <select id="dictionary-select">
                    <option value="">选择字典</option>
                    <option value="1">民族</option>
                    <option value="2">政治面貌</option>
                    <option value="3">成果类型</option>
                    <option value="4">单位类型</option>
                </select>
                <input type="text" id="dict-item-search" placeholder="搜索字典项名称或编码">
                <button class="btn btn-secondary" onclick="searchDictionaryItems()">查询</button>
                <button class="btn btn-primary" onclick="addNewDictionaryItem()">新增字典项</button>
            </div>
        </div>
        
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>所属字典</th>
                        <th>字典项名称</th>
                        <th>字典项编码</th>
                        <th>排序</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="dict-item-table-body">
                    <tr>
                        <td>1</td>
                        <td>民族</td>
                        <td>汉族</td>
                        <td>han</td>
                        <td>1</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editDictionaryItem(1)">编辑</a>
                            <a href="#" onclick="disableDictionaryItem(1)">停用</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>民族</td>
                        <td>蒙古族</td>
                        <td>mongol</td>
                        <td>2</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editDictionaryItem(2)">编辑</a>
                            <a href="#" onclick="disableDictionaryItem(2)">停用</a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>政治面貌</td>
                        <td>党员</td>
                        <td>party_member</td>
                        <td>1</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editDictionaryItem(3)">编辑</a>
                            <a href="#" onclick="disableDictionaryItem(3)">停用</a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>政治面貌</td>
                        <td>群众</td>
                        <td>masses</td>
                        <td>2</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editDictionaryItem(4)">编辑</a>
                            <a href="#" onclick="disableDictionaryItem(4)">停用</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination">
                <a href="#" class="pagination-item">上一页</a>
                <a href="#" class="pagination-item active">1</a>
                <a href="#" class="pagination-item">2</a>
                <a href="#" class="pagination-item">下一页</a>
            </div>
        </div>
    `;
    
    // 监听字典选择变化
    document.getElementById('dictionary-select').addEventListener('change', function() {
        searchDictionaryItems();
    });
}

// 数据字典功能
function searchDictionaries() {
    const keyword = document.getElementById('dictionary-search').value;
    console.log("搜索字典：", keyword);
    alert("搜索字典：" + keyword);
}

function addNewDictionary() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>新增数据字典</h3>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>字典名称：</label>
                    <input type="text" id="dict-name" class="form-control">
                </div>
                <div class="form-group">
                    <label>字典编码：</label>
                    <input type="text" id="dict-code" class="form-control">
                </div>
                <div class="form-group">
                    <label>备注：</label>
                    <textarea id="dict-remark" class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label>状态：</label>
                    <select id="dict-status" class="form-control">
                        <option value="1">启用</option>
                        <option value="0">停用</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="saveDictionary()">保存</button>
                <button class="btn btn-secondary" onclick="closeModal(this)">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 100);
}

function editDictionary(id) {
    // 创建模态框，与新增类似，但标题和内容略有不同
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>编辑数据字典</h3>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>字典名称：</label>
                    <input type="text" id="dict-name" class="form-control" value="民族">
                </div>
                <div class="form-group">
                    <label>字典编码：</label>
                    <input type="text" id="dict-code" class="form-control" value="nation" readonly>
                </div>
                <div class="form-group">
                    <label>备注：</label>
                    <textarea id="dict-remark" class="form-control">包含各民族名称</textarea>
                </div>
                <div class="form-group">
                    <label>状态：</label>
                    <select id="dict-status" class="form-control">
                        <option value="1" selected>启用</option>
                        <option value="0">停用</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="updateDictionary(${id})">保存</button>
                <button class="btn btn-secondary" onclick="closeModal(this)">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 100);
}

function viewDictionaryItems(id) {
    // 切换到字典项管理标签页并选中对应字典
    const tabElement = document.querySelector('.tabs .tab[onclick*="dict-item"]');
    if (tabElement) {
        tabElement.click();
        setTimeout(() => {
            const dictSelect = document.getElementById('dictionary-select');
            if (dictSelect) {
                dictSelect.value = id;
                searchDictionaryItems();
            }
        }, 100);
    }
}

function disableDictionary(id) {
    if (confirm('确定要停用该字典吗？')) {
        alert("停用字典：" + id);
    }
}

function saveDictionary() {
    const name = document.getElementById('dict-name').value;
    const code = document.getElementById('dict-code').value;
    const remark = document.getElementById('dict-remark').value;
    const status = document.getElementById('dict-status').value;
    
    if (!name || !code) {
        alert('字典名称和编码不能为空！');
        return;
    }
    
    alert(`保存字典：${name}, ${code}, ${remark}, ${status === '1' ? '启用' : '停用'}`);
    closeModal(document.querySelector('.modal .close'));
}

function updateDictionary(id) {
    const name = document.getElementById('dict-name').value;
    const code = document.getElementById('dict-code').value;
    const remark = document.getElementById('dict-remark').value;
    const status = document.getElementById('dict-status').value;
    
    if (!name || !code) {
        alert('字典名称和编码不能为空！');
        return;
    }
    
    alert(`更新字典${id}：${name}, ${code}, ${remark}, ${status === '1' ? '启用' : '停用'}`);
    closeModal(document.querySelector('.modal .close'));
}

// 字典项功能
function searchDictionaryItems() {
    const dictId = document.getElementById('dictionary-select').value;
    const keyword = document.getElementById('dict-item-search').value;
    console.log("搜索字典项：", { dictId, keyword });
    alert(`搜索字典项：字典ID=${dictId}, 关键词=${keyword}`);
}

function addNewDictionaryItem() {
    const dictId = document.getElementById('dictionary-select').value;
    
    if (!dictId) {
        alert('请先选择一个字典！');
        return;
    }
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>新增字典项</h3>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>所属字典：</label>
                    <select id="item-dict-id" class="form-control" disabled>
                        <option value="1" ${dictId === '1' ? 'selected' : ''}>民族</option>
                        <option value="2" ${dictId === '2' ? 'selected' : ''}>政治面貌</option>
                        <option value="3" ${dictId === '3' ? 'selected' : ''}>成果类型</option>
                        <option value="4" ${dictId === '4' ? 'selected' : ''}>单位类型</option>
                    </select>
                    <input type="hidden" id="item-dict-id-hidden" value="${dictId}">
                </div>
                <div class="form-group">
                    <label>字典项名称：</label>
                    <input type="text" id="item-name" class="form-control">
                </div>
                <div class="form-group">
                    <label>字典项编码：</label>
                    <input type="text" id="item-code" class="form-control">
                </div>
                <div class="form-group">
                    <label>排序：</label>
                    <input type="number" id="item-sort" class="form-control" value="1" min="1">
                </div>
                <div class="form-group">
                    <label>状态：</label>
                    <select id="item-status" class="form-control">
                        <option value="1">启用</option>
                        <option value="0">停用</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="saveDictionaryItem()">保存</button>
                <button class="btn btn-secondary" onclick="closeModal(this)">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 100);
}

function editDictionaryItem(id) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>编辑字典项</h3>
                <span class="close" onclick="closeModal(this)">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>所属字典：</label>
                    <select id="item-dict-id" class="form-control" disabled>
                        <option value="1" selected>民族</option>
                        <option value="2">政治面貌</option>
                        <option value="3">成果类型</option>
                        <option value="4">单位类型</option>
                    </select>
                    <input type="hidden" id="item-dict-id-hidden" value="1">
                </div>
                <div class="form-group">
                    <label>字典项名称：</label>
                    <input type="text" id="item-name" class="form-control" value="汉族">
                </div>
                <div class="form-group">
                    <label>字典项编码：</label>
                    <input type="text" id="item-code" class="form-control" value="han">
                </div>
                <div class="form-group">
                    <label>排序：</label>
                    <input type="number" id="item-sort" class="form-control" value="1" min="1">
                </div>
                <div class="form-group">
                    <label>状态：</label>
                    <select id="item-status" class="form-control">
                        <option value="1" selected>启用</option>
                        <option value="0">停用</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="updateDictionaryItem(${id})">保存</button>
                <button class="btn btn-secondary" onclick="closeModal(this)">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 100);
}

function disableDictionaryItem(id) {
    if (confirm('确定要停用该字典项吗？')) {
        alert("停用字典项：" + id);
    }
}

function saveDictionaryItem() {
    const dictId = document.getElementById('item-dict-id-hidden').value;
    const name = document.getElementById('item-name').value;
    const code = document.getElementById('item-code').value;
    const sort = document.getElementById('item-sort').value;
    const status = document.getElementById('item-status').value;
    
    if (!name || !code) {
        alert('字典项名称和编码不能为空！');
        return;
    }
    
    alert(`保存字典项：字典ID=${dictId}, 名称=${name}, 编码=${code}, 排序=${sort}, 状态=${status === '1' ? '启用' : '停用'}`);
    closeModal(document.querySelector('.modal .close'));
}

function updateDictionaryItem(id) {
    const dictId = document.getElementById('item-dict-id-hidden').value;
    const name = document.getElementById('item-name').value;
    const code = document.getElementById('item-code').value;
    const sort = document.getElementById('item-sort').value;
    const status = document.getElementById('item-status').value;
    
    if (!name || !code) {
        alert('字典项名称和编码不能为空！');
        return;
    }
    
    alert(`更新字典项${id}：字典ID=${dictId}, 名称=${name}, 编码=${code}, 排序=${sort}, 状态=${status === '1' ? '启用' : '停用'}`);
    closeModal(document.querySelector('.modal .close'));
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