/**
 * 成果录入模块
 * 包含批量导入和个人录入功能
 */

// 加载成果录入界面
function loadAchievementEntry() {
    const container = document.getElementById('main-content');
    
    // 切换标题
    document.querySelector('.header').textContent = '成果录入';
    
    // 构建成果录入主界面
    let html = `
        <div class="tabs">
            <div class="tab active" onclick="switchEntryTab('entry-list')">录入列表</div>
            <div class="tab" onclick="switchEntryTab('entry-form')">成果录入</div>
        </div>
        
        <div id="entry-tab-content">
            <!-- 初始加载录入列表标签页 -->
            ${getEntryListTabContent()}
        </div>
    `;
    
    container.innerHTML = html;
    
    // 初始化事件监听
    initEntryEvents();
}

// 切换标签页
function switchEntryTab(tabName) {
    // 更新标签页样式
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 根据选择的标签页显示内容
    const tabContent = document.getElementById('entry-tab-content');
    
    if (tabName === 'entry-list') {
        event.target.classList.add('active');
        tabContent.innerHTML = getEntryListTabContent();
        initEntryListEvents();
    } else if (tabName === 'entry-form') {
        event.target.classList.add('active');
        tabContent.innerHTML = getEntryFormTabContent();
        initEntryFormEvents();
    }
}

// 获取录入列表标签页内容
function getEntryListTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>成果名称：</label>
                    <input type="text" class="form-input" id="entry-name-search" placeholder="请输入成果名称">
                </div>
                <div class="search-item">
                    <label>成果类型：</label>
                    <select class="form-input" id="entry-type-search">
                        <option value="">全部</option>
                        <option value="军事理论考试">军事理论考试</option>
                        <option value="军事技能培训">军事技能培训</option>
                        <option value="指挥能力训练">指挥能力训练</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>录入时间：</label>
                    <div class="date-range">
                        <input type="date" class="form-input" id="entry-start-date">
                        <span class="date-separator">至</span>
                        <input type="date" class="form-input" id="entry-end-date">
                    </div>
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchEntries()">查询</button>
                    <button class="button" onclick="resetEntrySearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <div class="left-actions">
                    <button class="button" onclick="batchSubmitEntries()">批量提交</button>
                    <button class="button" onclick="exportEntries()">导出</button>
                    <button class="button" onclick="batchDeleteEntries()">批量删除</button>
                </div>
                <div class="right-actions">
                    <button class="button primary" onclick="switchEntryTab('entry-form')">添加成果</button>
                </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-entries"></th>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>成果类型</th>
                        <th>人员姓名</th>
                        <th>录入时间</th>
                        <th>审核状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="entry-list">
                    <tr>
                        <td><input type="checkbox" class="entry-checkbox" value="1"></td>
                        <td>1</td>
                        <td>2023年军事理论考试</td>
                        <td>军事理论考试</td>
                        <td>张三</td>
                        <td>2023-06-15</td>
                        <td><span class="status-badge pending">待审核</span></td>
                        <td>
                            <a href="javascript:void(0)" onclick="editEntry(1)">编辑</a>
                            <a href="javascript:void(0)" onclick="viewEntry(1)">查看</a>
                            <a href="javascript:void(0)" onclick="submitEntry(1)">提交</a>
                            <a href="javascript:void(0)" onclick="deleteEntry(1)">删除</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="entry-checkbox" value="2"></td>
                        <td>2</td>
                        <td>军事技能综合训练</td>
                        <td>军事技能培训</td>
                        <td>李四</td>
                        <td>2023-06-20</td>
                        <td><span class="status-badge pending">待审核</span></td>
                        <td>
                            <a href="javascript:void(0)" onclick="editEntry(2)">编辑</a>
                            <a href="javascript:void(0)" onclick="viewEntry(2)">查看</a>
                            <a href="javascript:void(0)" onclick="submitEntry(2)">提交</a>
                            <a href="javascript:void(0)" onclick="deleteEntry(2)">删除</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="entry-checkbox" value="3"></td>
                        <td>3</td>
                        <td>指挥能力实战演练</td>
                        <td>指挥能力训练</td>
                        <td>王五</td>
                        <td>2023-07-05</td>
                        <td><span class="status-badge submitted">已提交</span></td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewEntry(3)">查看</a>
                            <a href="javascript:void(0)" onclick="viewProgress(3)">查看进度</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="pagination">
                <div class="pagination-info">
                    <span>共 3 条记录</span>
                    <span>第 1/1 页</span>
                </div>
                <div class="pagination-buttons">
                    <button disabled>首页</button>
                    <button disabled>上一页</button>
                    <button disabled>下一页</button>
                    <button disabled>末页</button>
                </div>
            </div>
        </div>
    `;
}

// 获取成果录入标签页内容
function getEntryFormTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>成果名录：</label>
                    <select class="form-input" id="entry-directory-select" onchange="loadDirectoryFieldsForSearch()">
                        <option value="">全部名录</option>
                        <option value="1">军事理论考试</option>
                        <option value="2">军事技能培训</option>
                        <option value="3">指挥能力训练</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>录入方式：</label>
                    <select class="form-input" id="entry-method-select">
                        <option value="">全部方式</option>
                        <option value="batch">批量导入</option>
                        <option value="single">单条录入</option>
                    </select>
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="switchEntryMethod('batch')">批量导入</button>
                    <button class="button" onclick="switchEntryMethod('single')">单条录入</button>
                </div>
            </div>
            
            <div id="entry-method-content" style="margin-top: 20px;">
                <!-- 默认显示批量导入 -->
                ${getBatchImportContent()}
            </div>
        </div>
    `;
}

// 切换成果录入方式
function switchEntryMethod(method) {
    const contentDiv = document.getElementById('entry-method-content');
    
    // 更新按钮状态
    const buttons = document.querySelectorAll('.search-buttons .button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`.search-buttons .button[onclick*="${method}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    if (method === 'batch') {
        contentDiv.innerHTML = getBatchImportContent();
    } else if (method === 'single') {
        contentDiv.innerHTML = getSingleEntryContent();
    }
}

// 获取批量导入表单内容
function getBatchImportContent() {
    return `
        <div class="card">
            <div class="card-title">批量导入成果</div>
            
            <div class="form-content">
                <div class="form-group">
                    <label>成果名录：<span class="required">*</span></label>
                    <select class="form-input" id="batch-directory-select">
                        <option value="">请选择成果名录</option>
                        <option value="1">军事理论考试</option>
                        <option value="2">军事技能培训</option>
                        <option value="3">指挥能力训练</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>导入文件：<span class="required">*</span></label>
                    <div class="file-upload">
                        <input type="file" id="batch-import-file" accept=".xlsx,.xls">
                        <div class="upload-hint">支持.xlsx, .xls格式，文件大小不超过10MB</div>
                    </div>
                </div>
                
                <div class="action-bar">
                    <button class="button" onclick="downloadTemplate()">下载导入模板</button>
                    <button class="button" onclick="previewImport()">预览导入</button>
                </div>
                
                <div class="note">
                    <strong>注意事项：</strong>
                    <ol>
                        <li>请先下载对应名录的导入模板，按照模板格式填写数据</li>
                        <li>必填字段不能为空，日期格式为YYYY-MM-DD</li>
                        <li>文件中不能包含特殊字符和敏感词汇</li>
                    </ol>
                </div>
            </div>
            
            <div id="import-preview" style="display: none; margin-top: 20px;">
                <div class="card-title">导入预览</div>
                <div class="note">共检测到 <span id="import-count">0</span> 条记录，其中 <span id="import-valid">0</span> 条有效，<span id="import-invalid">0</span> 条无效</div>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>姓名</th>
                            <th>成果名称</th>
                            <th>成果日期</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody id="import-preview-list">
                        <!-- 导入预览数据 -->
                    </tbody>
                </table>
                
                <div class="pagination">
                    <span>共 <span id="import-total">0</span> 条记录</span>
                    <span>第 1/1 页</span>
                    <button disabled>上一页</button>
                    <button disabled>下一页</button>
                </div>
            </div>
            
            <div class="button-group">
                <button class="button" onclick="confirmImport()">确认导入</button>
                <button class="button" onclick="cancelImport()">取消</button>
            </div>
        </div>
    `;
}

// 获取单条录入表单内容
function getSingleEntryContent() {
    return `
        <div class="card">
            <div class="card-title">单条录入成果</div>
            
            <div class="form-content">
                <div class="form-section">
                    <h4>基本信息</h4>
                    <div class="form-group">
                        <label>成果名录：<span class="required">*</span></label>
                        <select class="form-input" id="single-directory-select" onchange="loadDirectoryFields()">
                            <option value="">请选择成果名录</option>
                            <option value="1">军事理论考试</option>
                            <option value="2">军事技能培训</option>
                            <option value="3">指挥能力训练</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>人员姓名：<span class="required">*</span></label>
                        <select class="form-input" id="personnel-select">
                            <option value="">请选择人员</option>
                            <option value="1">张三</option>
                            <option value="2">李四</option>
                            <option value="3">王五</option>
                            <option value="4">赵六</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>成果详情</h4>
                    <div id="directory-fields">
                        <!-- 成果名录的动态字段将在选择名录后显示 -->
                        <div class="form-placeholder">请先选择成果名录，加载对应的表单字段</div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>附加信息</h4>
                    <div class="form-group">
                        <label>备注：</label>
                        <textarea class="form-input" id="entry-remark" rows="3" placeholder="请输入备注信息（选填）"></textarea>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button class="button" onclick="saveAsDraft()">保存草稿</button>
                <button class="button" onclick="submitSingleEntry()">提交</button>
                <button class="button" onclick="cancelSingleEntry()">取消</button>
            </div>
        </div>
    `;
}

// 加载名录字段
function loadDirectoryFields() {
    const directoryId = document.getElementById('single-directory-select').value;
    
    if (!directoryId) {
        document.getElementById('directory-fields').innerHTML = '<div class="form-placeholder">请先选择成果名录，加载对应的表单字段</div>';
        return;
    }
    
    // 根据选择的名录加载对应的字段
    let fieldsHtml = '';
    
    if (directoryId === '1') { // 军事理论考试
        fieldsHtml = `
            <div class="form-row">
                <div class="form-group">
                    <label>考试名称：<span class="required">*</span></label>
                    <input type="text" class="form-input" id="field-exam-name" placeholder="请输入考试名称">
                </div>
                <div class="form-group">
                    <label>考试日期：<span class="required">*</span></label>
                    <input type="date" class="form-input" id="field-exam-date">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>考试成绩：<span class="required">*</span></label>
                    <input type="number" class="form-input" id="field-exam-score" min="0" max="100" placeholder="请输入考试分数(0-100)">
                </div>
                <div class="form-group">
                    <label>考试类型：<span class="required">*</span></label>
                    <select class="form-input" id="field-exam-type">
                        <option value="">请选择考试类型</option>
                        <option value="期中考试">期中考试</option>
                        <option value="期末考试">期末考试</option>
                        <option value="资格考试">资格考试</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>证明材料：<span class="required">*</span></label>
                <div class="file-upload">
                    <input type="file" id="field-exam-proof" accept=".pdf,.jpg,.jpeg,.png">
                    <div class="upload-hint">支持PDF、JPG格式，文件大小不超过5MB</div>
                </div>
            </div>
        `;
    } else if (directoryId === '2') { // 军事技能培训
        fieldsHtml = `
            <div class="form-row">
                <div class="form-group">
                    <label>培训名称：<span class="required">*</span></label>
                    <input type="text" class="form-input" id="field-training-name" placeholder="请输入培训名称">
                </div>
                <div class="form-group">
                    <label>培训成绩：</label>
                    <input type="text" class="form-input" id="field-training-result" placeholder="请输入培训成绩或评价">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>开始日期：<span class="required">*</span></label>
                    <input type="date" class="form-input" id="field-training-start-date">
                </div>
                <div class="form-group">
                    <label>结束日期：<span class="required">*</span></label>
                    <input type="date" class="form-input" id="field-training-end-date">
                </div>
            </div>
            <div class="form-group">
                <label>培训内容：<span class="required">*</span></label>
                <textarea class="form-input" id="field-training-content" rows="4" placeholder="请简要描述培训内容"></textarea>
            </div>
            <div class="form-group">
                <label>证明材料：<span class="required">*</span></label>
                <div class="file-upload">
                    <input type="file" id="field-training-proof" accept=".pdf,.jpg,.jpeg,.png">
                    <div class="upload-hint">支持PDF、JPG格式，文件大小不超过5MB</div>
                </div>
            </div>
        `;
    } else if (directoryId === '3') { // 指挥能力训练
        fieldsHtml = `
            <div class="form-row">
                <div class="form-group">
                    <label>训练项目：<span class="required">*</span></label>
                    <input type="text" class="form-input" id="field-command-name" placeholder="请输入训练项目名称">
                </div>
                <div class="form-group">
                    <label>训练日期：<span class="required">*</span></label>
                    <input type="date" class="form-input" id="field-command-date">
                </div>
            </div>
            <div class="form-group">
                <label>训练目标：<span class="required">*</span></label>
                <textarea class="form-input" id="field-command-objective" rows="3" placeholder="请描述训练目标"></textarea>
            </div>
            <div class="form-group">
                <label>训练成果：<span class="required">*</span></label>
                <textarea class="form-input" id="field-command-result" rows="3" placeholder="请描述训练成果"></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>评价等级：<span class="required">*</span></label>
                    <select class="form-input" id="field-command-rating">
                        <option value="">请选择评价等级</option>
                        <option value="优秀">优秀</option>
                        <option value="良好">良好</option>
                        <option value="合格">合格</option>
                        <option value="不合格">不合格</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>证明材料：<span class="required">*</span></label>
                <div class="file-upload">
                    <input type="file" id="field-command-proof" accept=".pdf,.jpg,.jpeg,.png">
                    <div class="upload-hint">支持PDF、JPG格式，文件大小不超过5MB</div>
                </div>
            </div>
        `;
    }
    
    document.getElementById('directory-fields').innerHTML = fieldsHtml;
}

// 为搜索加载名录字段
function loadDirectoryFieldsForSearch() {
    // 这里可以根据选择的成果名录更新搜索条件
    console.log('更新搜索条件');
}

// 初始化成果录入事件监听
function initEntryEvents() {
    // 暂时不需要初始化事件，切换标签时会单独初始化对应标签页的事件
}

// 初始化录入列表事件
function initEntryListEvents() {
    // 录入列表的全选功能
    const selectAllCheckbox = document.getElementById('select-all-entries');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.entry-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }
    
    // 监听每个复选框的变化，更新按钮状态
    const checkboxes = document.querySelectorAll('.entry-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateActionButtonsState);
    });
    
    // 初始化更新按钮状态
    updateActionButtonsState();
}

// 更新操作按钮状态
function updateActionButtonsState() {
    const selectedCount = document.querySelectorAll('.entry-checkbox:checked').length;
    const batchButtons = [
        document.querySelector('button[onclick="batchSubmitEntries()"]'),
        document.querySelector('button[onclick="batchDeleteEntries()"]')
    ];
    
    batchButtons.forEach(button => {
        if (button) {
            if (selectedCount > 0) {
                button.classList.remove('disabled');
                button.disabled = false;
            } else {
                button.classList.add('disabled');
                button.disabled = true;
            }
        }
    });
}

// 初始化成果录入表单事件
function initEntryFormEvents() {
    // 暂无特殊事件需要初始化
}

// 搜索成果录入记录
function searchEntries() {
    const nameSearch = document.getElementById('entry-name-search').value;
    const typeSearch = document.getElementById('entry-type-search').value;
    const startDate = document.getElementById('entry-start-date').value;
    const endDate = document.getElementById('entry-end-date').value;
    
    console.log('搜索成果录入记录：', {
        成果名称: nameSearch,
        成果类型: typeSearch,
        开始日期: startDate,
        结束日期: endDate
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置搜索条件
function resetEntrySearch() {
    document.getElementById('entry-name-search').value = '';
    document.getElementById('entry-type-search').value = '';
    document.getElementById('entry-start-date').value = '';
    document.getElementById('entry-end-date').value = '';
}

// 编辑成果录入
function editEntry(id) {
    alert(`编辑ID为${id}的成果录入记录`);
    // 实际应用中这里会打开编辑表单
}

// 查看成果录入详情
function viewEntry(id) {
    showEntryDetailModal(id);
}

// 显示成果录入详情模态框
function showEntryDetailModal(id) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'entry-detail-modal';
    
    let modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>成果详情</h3>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h4>基本信息</h4>
                    <div class="detail-row">
                        <div class="detail-label">成果名称：</div>
                        <div class="detail-value">2023年军事理论考试</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">成果类型：</div>
                        <div class="detail-value">军事理论考试</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">录入人：</div>
                        <div class="detail-value">张三</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">录入时间：</div>
                        <div class="detail-value">2023-06-15</div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>考试详情</h4>
                    <div class="detail-row">
                        <div class="detail-label">考试名称：</div>
                        <div class="detail-value">2023年军事理论期末考试</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">考试日期：</div>
                        <div class="detail-value">2023-06-10</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">考试成绩：</div>
                        <div class="detail-value">90分</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">考试类型：</div>
                        <div class="detail-value">期末考试</div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>审核状态</h4>
                    <div class="detail-row">
                        <div class="detail-label">当前状态：</div>
                        <div class="detail-value"><span class="status-badge pending">待审核</span></div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>证明材料</h4>
                    <div class="proof-preview">
                        <img src="images/proof_placeholder.jpg" alt="证明材料预览">
                    </div>
                    <div class="button-group">
                        <button class="button" onclick="viewFullProof()">查看完整证明</button>
                        <button class="button" onclick="downloadProof()">下载证明材料</button>
                    </div>
                </div>
                
                <div class="button-group">
                    <button class="button" onclick="editEntry(${id})">编辑</button>
                    <button class="button" onclick="submitEntry(${id})">提交</button>
                    <button class="button" onclick="closeModal()">关闭</button>
                </div>
            </div>
        </div>
    `;
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'block';
        modal.classList.add('show');
    }, 10);
    
    // 点击模态框外部关闭模态框
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

// 关闭模态框
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }, 300);
    }
}

// 查看完整证明材料
function viewFullProof() {
    window.open('images/proof_placeholder.jpg', '_blank');
    // 实际应用中这里会打开完整的证明材料
}

// 下载证明材料
function downloadProof() {
    alert('下载证明材料功能已触发');
    // 实际应用中这里会调用后端API进行下载
}

// 提交成果录入
function submitEntry(id) {
    alert(`提交ID为${id}的成果录入记录`);
    // 实际应用中这里会调用后端API进行提交
}

// 删除成果录入
function deleteEntry(id) {
    if (confirm(`确定要删除ID为${id}的成果录入记录吗？`)) {
        alert(`已删除ID为${id}的成果录入记录`);
        // 实际应用中这里会调用后端API进行删除操作
    }
}

// 查看审核进度
function viewProgress(id) {
    showProgressModal(id);
}

// 显示审核进度模态框
function showProgressModal(id) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'progress-modal';
    
    let modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>审核进度</h3>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h4>成果基本信息</h4>
                    <div class="detail-row">
                        <div class="detail-label">成果名称：</div>
                        <div class="detail-value">指挥能力实战演练</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">成果类型：</div>
                        <div class="detail-value">指挥能力训练</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">提交人：</div>
                        <div class="detail-value">王五</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">提交时间：</div>
                        <div class="detail-value">2023-07-05</div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>审核进度</h4>
                    <div class="progress-timeline">
                        <div class="progress-step completed">
                            <div class="progress-icon"></div>
                            <div class="progress-content">
                                <div class="progress-title">提交成功</div>
                                <div class="progress-time">2023-07-05 10:30</div>
                                <div class="progress-desc">成果信息已成功提交，等待初审</div>
                            </div>
                        </div>
                        <div class="progress-step completed">
                            <div class="progress-icon"></div>
                            <div class="progress-content">
                                <div class="progress-title">初审通过</div>
                                <div class="progress-time">2023-07-06 14:20</div>
                                <div class="progress-desc">内容审核通过，等待主管认定</div>
                            </div>
                        </div>
                        <div class="progress-step current">
                            <div class="progress-icon"></div>
                            <div class="progress-content">
                                <div class="progress-title">等待认定</div>
                                <div class="progress-time">--</div>
                                <div class="progress-desc">等待主管进行成果认定</div>
                            </div>
                        </div>
                        <div class="progress-step">
                            <div class="progress-icon"></div>
                            <div class="progress-content">
                                <div class="progress-title">认定完成</div>
                                <div class="progress-time">--</div>
                                <div class="progress-desc">成果认定完成，可进行申报认证</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="button-group">
                    <button class="button" onclick="closeModal()">关闭</button>
                </div>
            </div>
        </div>
    `;
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'block';
        modal.classList.add('show');
    }, 10);
    
    // 点击模态框外部关闭模态框
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

// 批量提交成果录入
function batchSubmitEntries() {
    const selectedIds = getSelectedEntryIds();
    if (selectedIds.length === 0) {
        alert('请先选择要提交的成果录入记录');
        return;
    }
    
    alert(`将提交以下ID的成果录入记录: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API进行批量提交
}

// 导出成果录入
function exportEntries() {
    alert('导出成果录入记录功能已触发');
    // 实际应用中这里会调用后端API进行导出
}

// 批量删除成果录入
function batchDeleteEntries() {
    const selectedIds = getSelectedEntryIds();
    if (selectedIds.length === 0) {
        alert('请先选择要删除的成果录入记录');
        return;
    }
    
    if (confirm(`确定要删除选中的 ${selectedIds.length} 条成果录入记录吗？`)) {
        alert(`已删除以下ID的成果录入记录: ${selectedIds.join(', ')}`);
        // 实际应用中这里会调用后端API进行批量删除
    }
}

// 获取已选中的成果录入ID
function getSelectedEntryIds() {
    const checkboxes = document.querySelectorAll('.entry-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 下载导入模板
function downloadTemplate() {
    const directoryId = document.getElementById('batch-directory-select').value;
    
    if (!directoryId) {
        alert('请先选择成果名录');
        return;
    }
    
    alert(`下载成果名录ID为${directoryId}的导入模板`);
    // 实际应用中这里会触发浏览器下载
}

// 预览导入
function previewImport() {
    const directoryId = document.getElementById('batch-directory-select').value;
    const importFile = document.getElementById('batch-import-file').value;
    
    if (!directoryId) {
        alert('请先选择成果名录');
        return;
    }
    
    if (!importFile) {
        alert('请先选择导入文件');
        return;
    }
    
    // 显示导入预览区域
    document.getElementById('import-preview').style.display = 'block';
    
    // 模拟导入预览结果
    document.getElementById('import-count').textContent = '3';
    document.getElementById('import-valid').textContent = '2';
    document.getElementById('import-invalid').textContent = '1';
    
    document.getElementById('import-preview-list').innerHTML = `
        <tr>
            <td>1</td>
            <td>张三</td>
            <td>2023年军事理论考试</td>
            <td>2023-06-15</td>
            <td style="color: green;">有效</td>
        </tr>
        <tr>
            <td>2</td>
            <td>李四</td>
            <td>2023年军事理论考试</td>
            <td>2023-06-15</td>
            <td style="color: green;">有效</td>
        </tr>
        <tr>
            <td>3</td>
            <td>王五</td>
            <td>2023年军事理论考试</td>
            <td></td>
            <td style="color: red;">无效 - 缺少必填字段</td>
        </tr>
    `;
}

// 确认导入
function confirmImport() {
    const directoryId = document.getElementById('batch-directory-select').value;
    const importFile = document.getElementById('batch-import-file').value;
    
    if (!directoryId) {
        alert('请先选择成果名录');
        return;
    }
    
    if (!importFile) {
        alert('请先选择导入文件');
        return;
    }
    
    alert('成功导入2条有效记录！');
    // 实际应用中这里会调用后端API进行导入
}

// 取消导入
function cancelImport() {
    // 重置表单
    document.getElementById('batch-directory-select').value = '';
    document.getElementById('batch-import-file').value = '';
    document.getElementById('import-preview').style.display = 'none';
}

// 保存为草稿
function saveAsDraft() {
    const directoryId = document.getElementById('single-directory-select').value;
    const personnelId = document.getElementById('personnel-select').value;
    
    if (!directoryId) {
        alert('请先选择成果名录');
        return;
    }
    
    if (!personnelId) {
        alert('请先选择人员');
        return;
    }
    
    alert('成果录入信息已保存为草稿');
    // 实际应用中这里会调用后端API进行保存
}

// 提交单条录入
function submitSingleEntry() {
    const directoryId = document.getElementById('single-directory-select').value;
    const personnelId = document.getElementById('personnel-select').value;
    
    if (!directoryId) {
        alert('请先选择成果名录');
        return;
    }
    
    if (!personnelId) {
        alert('请先选择人员');
        return;
    }
    
    // 简单验证，实际应用中会有更完善的验证
    if (directoryId === '1') {
        const examName = document.getElementById('field-exam-name').value;
        const examDate = document.getElementById('field-exam-date').value;
        const examScore = document.getElementById('field-exam-score').value;
        const examType = document.getElementById('field-exam-type').value;
        const examProof = document.getElementById('field-exam-proof').value;
        
        if (!examName || !examDate || !examScore || !examType || !examProof) {
            alert('请填写所有必填字段');
            return;
        }
    }
    
    alert('成果录入信息已提交成功');
    // 实际应用中这里会调用后端API进行提交
}

// 取消单条录入
function cancelSingleEntry() {
    // 重置表单
    document.getElementById('single-directory-select').value = '';
    document.getElementById('personnel-select').value = '';
    document.getElementById('directory-fields').innerHTML = '';
} 