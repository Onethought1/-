/**
 * 成果登记模块
 * 包含认领和自主登记学习成果功能
 */

// 加载成果登记界面
function loadAchievementRegister() {
    const container = document.getElementById('main-content');
    
    // 切换标题和添加操作按钮
    const header = document.querySelector('.header');
    header.innerHTML = `
        成果登记
        <div class="header-actions">
            <button class="button button-outline" onclick="exportAchievements()">
                <i class="fas fa-download"></i> 导出数据
            </button>
        </div>
    `;
    
    // 构建成果登记主界面
    let html = `
        <div class="tabs-container">
            <div class="tabs-nav">
                <div class="tab-item active" onclick="switchRegisterTab('register-list')">登记列表</div>
                <div class="tab-item" onclick="switchRegisterTab('register-form')">成果登记</div>
            </div>
            
            <div id="register-tab-content">
                <!-- 初始加载登记列表标签页 -->
                ${getRegisterListTabContent()}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // 初始化事件监听
    initRegisterEvents();
}

// 切换标签页
function switchRegisterTab(tabName) {
    // 更新标签页样式
    document.querySelectorAll('.tabs-nav .tab-item').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 根据选择的标签页显示内容
    const tabContent = document.getElementById('register-tab-content');
    
    if (tabName === 'register-list') {
        event.target.classList.add('active');
        tabContent.innerHTML = getRegisterListTabContent();
        initRegisterListEvents();
    } else if (tabName === 'register-form') {
        event.target.classList.add('active');
        tabContent.innerHTML = getRegisterFormTabContent();
        initRegisterFormEvents();
    }
}

// 获取登记列表标签页内容
function getRegisterListTabContent() {
    return `
        <div class="sub-card">
            <div class="sub-card-header">
                <div class="sub-card-title">
                    <i class="fas fa-search"></i> 查询条件
                </div>
            </div>
            <div class="sub-card-body">
                <div class="search-form">
                    <div class="search-form-item">
                        <label class="form-label">成果名称：</label>
                        <input type="text" class="form-control" id="achievement-name-search" placeholder="请输入成果名称">
                    </div>
                    <div class="search-form-item">
                        <label class="form-label">登记方式：</label>
                        <select class="form-control" id="register-type-search">
                            <option value="">全部</option>
                            <option value="self">自主登记</option>
                            <option value="claim">认领</option>
                        </select>
                    </div>
                    <div class="search-form-item">
                        <label class="form-label">审核状态：</label>
                        <select class="form-control" id="review-status-search">
                            <option value="">全部</option>
                            <option value="draft">未提交</option>
                            <option value="reviewing">审核中</option>
                            <option value="approved">已通过</option>
                            <option value="rejected">未通过</option>
                        </select>
                    </div>
                    <div class="search-form-item">
                        <label class="form-label">登记时间：</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="date" class="form-control" id="start-date" style="width: 48%;">
                            <input type="date" class="form-control" id="end-date" style="width: 48%;">
                        </div>
                    </div>
                    <div class="search-form-actions">
                        <button class="button" onclick="searchAchievements()">
                            <i class="fas fa-search"></i> 查询
                        </button>
                        <button class="button button-outline" onclick="resetAchievementSearch()">
                            <i class="fas fa-redo"></i> 重置
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="sub-card">
            <div class="sub-card-header">
                <div class="sub-card-title">
                    <i class="fas fa-list"></i> 成果列表
                </div>
                <div>
                    <button class="button" onclick="showRegisterMethod()">
                        <i class="fas fa-plus"></i> 新增登记
                    </button>
                    <button class="button" onclick="batchSubmitAchievements()">
                        <i class="fas fa-upload"></i> 批量提交
                    </button>
                    <button class="button button-outline" onclick="exportAchievements()">
                        <i class="fas fa-download"></i> 导出
                    </button>
                </div>
            </div>
            <div class="sub-card-body">
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 40px;"><input type="checkbox" id="select-all-achievements"></th>
                                <th>序号</th>
                                <th>成果名称</th>
                                <th>成果类型</th>
                                <th>登记方式</th>
                                <th>登记时间</th>
                                <th>审核状态</th>
                                <th style="min-width: 120px;">操作</th>
                            </tr>
                        </thead>
                        <tbody id="achievement-list">
                            <tr>
                                <td><input type="checkbox" class="achievement-checkbox" value="1"></td>
                                <td>1</td>
                                <td>军事理论考试优秀</td>
                                <td>考试成果</td>
                                <td><span class="badge badge-info">自主登记</span></td>
                                <td>2023-05-10</td>
                                <td><span class="status-badge status-warning">未提交</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-button action-button-edit" onclick="editAchievement(1)">编辑</button>
                                        <button class="action-button action-button-view" onclick="viewAchievement(1)">查看</button>
                                        <button class="action-button action-button-edit" onclick="submitAchievement(1)">提交</button>
                                        <button class="action-button action-button-delete" onclick="deleteAchievement(1)">删除</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" class="achievement-checkbox" value="2"></td>
                                <td>2</td>
                                <td>军事训练表现突出</td>
                                <td>训练成果</td>
                                <td><span class="badge badge-info">自主登记</span></td>
                                <td>2023-06-20</td>
                                <td><span class="status-badge status-info">审核中</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-button action-button-view" onclick="viewAchievement(2)">查看</button>
                                        <button class="action-button action-button-view" onclick="viewProgress(2)">进度</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" class="achievement-checkbox" value="3"></td>
                                <td>3</td>
                                <td>军事学术论文发表</td>
                                <td>研究成果</td>
                                <td><span class="badge badge-primary">认领</span></td>
                                <td>2023-07-15</td>
                                <td><span class="status-badge status-success">已通过</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-button action-button-view" onclick="viewAchievement(3)">查看</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" class="achievement-checkbox" value="4"></td>
                                <td>4</td>
                                <td>军事技能培训优秀</td>
                                <td>培训成果</td>
                                <td><span class="badge badge-info">自主登记</span></td>
                                <td>2023-08-05</td>
                                <td><span class="status-badge status-danger">未通过</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-button action-button-edit" onclick="editAchievement(4)">编辑</button>
                                        <button class="action-button action-button-view" onclick="viewAchievement(4)">查看</button>
                                        <button class="action-button action-button-delete" onclick="deleteAchievement(4)">删除</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="pagination">
                    <div class="pagination-item">上一页</div>
                    <div class="pagination-item active">1</div>
                    <div class="pagination-item">2</div>
                    <div class="pagination-item">3</div>
                    <div class="pagination-item">下一页</div>
                </div>
            </div>
        </div>
    `;
}

// 获取登记表单标签页内容
function getRegisterFormTabContent() {
    return `
        <div class="register-methods">
            <div class="sub-card">
                <div class="sub-card-header">
                    <div class="sub-card-title">
                        <i class="fas fa-plus-circle"></i> 选择登记方式
                    </div>
                </div>
                <div class="sub-card-body">
                    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                        <div class="register-method-card" onclick="selectRegisterMethod('claim')">
                            <div class="register-method-icon">
                                <i class="fas fa-search-plus fa-3x"></i>
                            </div>
                            <div class="register-method-title">成果认领</div>
                            <div class="register-method-desc">从系统推荐的成果库中认领属于自己的成果</div>
                        </div>
                        <div class="register-method-card" onclick="selectRegisterMethod('self')">
                            <div class="register-method-icon">
                                <i class="fas fa-edit fa-3x"></i>
                            </div>
                            <div class="register-method-title">自主登记</div>
                            <div class="register-method-desc">手动填写表单录入自己的成果信息</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 初始化成果登记事件监听
function initRegisterEvents() {
    // 暂时不需要初始化事件，切换标签时会单独初始化对应标签页的事件
}

// 初始化登记列表事件
function initRegisterListEvents() {
    // 登记列表的全选功能
    const selectAllAchievements = document.getElementById('select-all-achievements');
    if (selectAllAchievements) {
        selectAllAchievements.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.achievement-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllAchievements.checked;
            });
        });
    }
}

// 初始化登记表单事件
function initRegisterFormEvents() {
    // 暂无特殊事件需要初始化
}

// 搜索成果
function searchAchievements() {
    const nameSearch = document.getElementById('achievement-name-search').value;
    const typeSearch = document.getElementById('register-type-search').value;
    const statusSearch = document.getElementById('review-status-search').value;
    
    console.log('搜索成果：', {
        名称: nameSearch,
        登记方式: typeSearch,
        审核状态: statusSearch
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置搜索条件
function resetAchievementSearch() {
    document.getElementById('achievement-name-search').value = '';
    document.getElementById('register-type-search').value = '';
    document.getElementById('review-status-search').value = '';
}

// 显示登记方式选择
function showRegisterMethod() {
    // 切换到登记表单标签页
    const tabs = document.querySelectorAll('.tabs-nav .tab-item');
    tabs[0].classList.remove('active');
    tabs[1].classList.add('active');
    
    const tabContent = document.getElementById('register-tab-content');
    tabContent.innerHTML = getRegisterFormTabContent();
}

// 选择登记方式
function selectRegisterMethod(method) {
    const registerContent = document.querySelector('.register-methods');
    
    if (method === 'claim') {
        registerContent.innerHTML = getClaimFormContent();
        initClaimEvents();
    } else if (method === 'self') {
        registerContent.innerHTML = getSelfRegisterFormContent();
        initSelfRegisterEvents();
    }
}

// 获取认领表单内容
function getClaimFormContent() {
    return `
        <div class="sub-card">
            <div class="sub-card-header">
                <div class="sub-card-title">
                    <i class="fas fa-search-plus"></i> 成果认领
                </div>
                <div>
                    <button class="button button-outline" onclick="switchRegisterTab('register-form')">
                        <i class="fas fa-arrow-left"></i> 返回
                    </button>
                </div>
            </div>
            <div class="sub-card-body">
                <div class="search-form">
                    <div class="search-form-item">
                        <label class="form-label">成果名称：</label>
                        <input type="text" class="form-control" id="claim-name-search" placeholder="请输入成果名称">
                    </div>
                    <div class="search-form-item">
                        <label class="form-label">成果类型：</label>
                        <select class="form-control" id="claim-type-search">
                            <option value="">全部</option>
                            <option value="exam">考试成果</option>
                            <option value="training">训练成果</option>
                            <option value="research">研究成果</option>
                            <option value="course">培训成果</option>
                        </select>
                    </div>
                    <div class="search-form-item">
                        <label class="form-label">成果时间：</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="date" class="form-control" id="claim-start-date" style="width: 48%;">
                            <input type="date" class="form-control" id="claim-end-date" style="width: 48%;">
                        </div>
                    </div>
                    <div class="search-form-actions">
                        <button class="button" onclick="searchClaimAchievements()">
                            <i class="fas fa-search"></i> 查询
                        </button>
                        <button class="button button-outline" onclick="refreshClaimAchievements()">
                            <i class="fas fa-sync-alt"></i> 刷新
                        </button>
                    </div>
                </div>
                
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 40px;"><input type="checkbox" id="select-all-claims"></th>
                                <th>序号</th>
                                <th>成果名称</th>
                                <th>成果类型</th>
                                <th>成果时间</th>
                                <th>成果来源</th>
                                <th style="min-width: 120px;">操作</th>
                            </tr>
                        </thead>
                        <tbody id="claim-list">
                            <tr>
                                <td><input type="checkbox" class="claim-checkbox" value="1"></td>
                                <td>1</td>
                                <td>军事理论考试优秀</td>
                                <td>考试成果</td>
                                <td>2023-05-10</td>
                                <td>军事职业教育系统</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-button action-button-view" onclick="viewClaimDetail(1)">查看</button>
                                        <button class="action-button action-button-edit" onclick="claimAchievement(1)">认领</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" class="claim-checkbox" value="2"></td>
                                <td>2</td>
                                <td>军事训练表现突出</td>
                                <td>训练成果</td>
                                <td>2023-06-20</td>
                                <td>军事训练管理系统</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-button action-button-view" onclick="viewClaimDetail(2)">查看</button>
                                        <button class="action-button action-button-edit" onclick="claimAchievement(2)">认领</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="sub-card-footer">
                    <button class="button" onclick="batchClaimAchievements()">
                        <i class="fas fa-check-circle"></i> 批量认领
                    </button>
                    <button class="button button-outline" onclick="cancelClaim()">
                        <i class="fas fa-times"></i> 取消
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 获取自主登记表单内容
function getSelfRegisterFormContent() {
    return `
        <div class="form-title">自主登记</div>
        
        <div class="form-group">
            <label>成果名录：<span class="required">*</span></label>
            <select class="form-input" id="achievement-directory" onchange="loadDirectoryForm()">
                <option value="">请选择成果名录</option>
                <option value="1">军事理论考试</option>
                <option value="2">军事技能培训</option>
                <option value="3">军事研究论文</option>
                <option value="4">指挥能力训练</option>
                <option value="other">暂未列入名录</option>
            </select>
        </div>
        
        <div id="directory-form">
            <!-- 表单字段将在选择成果名录后动态加载 -->
        </div>
        
        <div class="button-group">
            <button class="button" onclick="saveAsDraft()">暂存</button>
            <button class="button" onclick="submitAchievementForm()">提交</button>
            <button class="button" onclick="cancelSelfRegister()">取消</button>
        </div>
    `;
}

// 编辑成果
function editAchievement(id) {
    alert(`编辑ID为${id}的成果`);
    // 实际应用中会跳转到编辑页面或弹出编辑模态框
}

// 查看成果
function viewAchievement(id) {
    alert(`查看ID为${id}的成果详情`);
    // 实际应用中会跳转到详情页面或弹出详情模态框
}

// 提交成果
function submitAchievement(id) {
    alert(`提交ID为${id}的成果进行审核`);
    // 实际应用中会调用API提交成果
}

// 删除成果
function deleteAchievement(id) {
    if (confirm(`确定要删除ID为${id}的成果吗？`)) {
        alert(`已删除ID为${id}的成果`);
        // 实际应用中会调用API删除成果
    }
}

// 批量提交成果
function batchSubmitAchievements() {
    const selectedIds = getSelectedAchievementIds();
    if (selectedIds.length === 0) {
        alert('请先选择要提交的成果');
        return;
    }
    
    alert(`将提交以下ID的成果: ${selectedIds.join(', ')}`);
    // 实际应用中会调用API批量提交成果
}

// 导出成果
function exportAchievements() {
    alert('导出成果功能已触发');
    // 实际应用中会调用API导出成果
}

// 查看审核进度
function viewProgress(id) {
    alert(`查看ID为${id}的成果审核进度`);
    // 实际应用中会弹出进度查看模态框
}

// 搜索可认领的成果
function searchClaimAchievements() {
    const nameSearch = document.getElementById('claim-name-search').value;
    const typeSearch = document.getElementById('claim-type-search').value;
    
    console.log('搜索可认领成果：', {
        名称: nameSearch,
        类型: typeSearch
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 刷新可认领成果列表
function refreshClaimAchievements() {
    alert('从军事职业教育服务平台获取最新学习成果数据');
    // 实际应用中会调用外部API获取数据
}

// 认领单个成果
function claimAchievement(id) {
    alert(`认领ID为${id}的成果`);
    // 实际应用中会调用API认领成果
}

// 查看可认领成果详情
function viewClaimDetail(id) {
    alert(`查看ID为${id}的可认领成果详情`);
    // 实际应用中会弹出详情查看模态框
}

// 批量认领成果
function batchClaimAchievements() {
    const selectedIds = getSelectedClaimIds();
    if (selectedIds.length === 0) {
        alert('请先选择要认领的成果');
        return;
    }
    
    alert(`将认领以下ID的成果: ${selectedIds.join(', ')}`);
    // 实际应用中会调用API批量认领成果
}

// 取消认领操作
function cancelClaim() {
    // 返回到登记方式选择界面
    const formContainer = document.getElementById('register-tab-content');
    formContainer.innerHTML = getRegisterListTabContent();
}

// 加载成果名录表单
function loadDirectoryForm() {
    const directoryId = document.getElementById('achievement-directory').value;
    const formContainer = document.getElementById('directory-form');
    
    if (!directoryId) {
        formContainer.innerHTML = '';
        return;
    }
    
    if (directoryId === 'other') {
        formContainer.innerHTML = getOtherDirectoryForm();
    } else {
        formContainer.innerHTML = getDirectoryFormById(directoryId);
    }
}

// 获取暂未列入名录的表单
function getOtherDirectoryForm() {
    return `
        <div class="note">该成果暂未列入大学"成果名录"，可以暂存但不能提交审核。</div>
        
        <div class="form-group">
            <label>成果名称：<span class="required">*</span></label>
            <input type="text" class="form-input" id="achievement-name" placeholder="请输入成果名称">
        </div>
        
        <div class="form-group">
            <label>成果类型：<span class="required">*</span></label>
            <select class="form-input" id="achievement-type">
                <option value="">请选择成果类型</option>
                <option value="exam">考试成果</option>
                <option value="training">训练成果</option>
                <option value="research">研究成果</option>
                <option value="other">其他</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>取得时间：<span class="required">*</span></label>
            <input type="date" class="form-input" id="achievement-date">
        </div>
        
        <div class="form-group">
            <label>成果描述：<span class="required">*</span></label>
            <textarea class="form-input" id="achievement-description" rows="4" placeholder="请描述成果内容"></textarea>
        </div>
        
        <div class="form-group">
            <label>佐证材料：<span class="required">*</span></label>
            <div class="file-upload">
                <input type="file" id="achievement-file" multiple>
                <div class="upload-hint">支持Word、JPG、PNG、PDF格式</div>
            </div>
        </div>
    `;
}

// 根据成果名录ID获取对应的表单
function getDirectoryFormById(id) {
    // 这里只是示例，实际应用中会根据ID动态获取表单结构
    if (id === '1') {
        return `
            <div class="form-group">
                <label>考试名称：<span class="required">*</span></label>
                <input type="text" class="form-input" id="exam-name" placeholder="请输入考试完整名称">
            </div>
            
            <div class="form-group">
                <label>考试日期：<span class="required">*</span></label>
                <input type="date" class="form-input" id="exam-date">
            </div>
            
            <div class="form-group">
                <label>考试成绩：<span class="required">*</span></label>
                <input type="number" class="form-input" id="exam-score" placeholder="请输入考试分数(0-100)">
            </div>
            
            <div class="form-group">
                <label>考试类型：<span class="required">*</span></label>
                <select class="form-input" id="exam-type">
                    <option value="">请选择考试类型</option>
                    <option value="theory">理论考试</option>
                    <option value="practical">实践考试</option>
                    <option value="comprehensive">综合考试</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>考试证明材料：<span class="required">*</span></label>
                <div class="file-upload">
                    <input type="file" id="exam-file" multiple>
                    <div class="upload-hint">支持Word、JPG、PNG、PDF格式</div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="form-group">
                <label>成果名称：<span class="required">*</span></label>
                <input type="text" class="form-input" id="achievement-name" placeholder="请输入成果名称">
            </div>
            
            <div class="form-group">
                <label>取得时间：<span class="required">*</span></label>
                <input type="date" class="form-input" id="achievement-date">
            </div>
            
            <div class="form-group">
                <label>成果描述：<span class="required">*</span></label>
                <textarea class="form-input" id="achievement-description" rows="4" placeholder="请描述成果内容"></textarea>
            </div>
            
            <div class="form-group">
                <label>佐证材料：<span class="required">*</span></label>
                <div class="file-upload">
                    <input type="file" id="achievement-file" multiple>
                    <div class="upload-hint">支持Word、JPG、PNG、PDF格式</div>
                </div>
            </div>
        `;
    }
}

// 暂存自主登记的成果
function saveAsDraft() {
    alert('成果已暂存，可在登记列表中编辑和提交');
    // 实际应用中会调用API保存成果
    
    // 返回到登记列表页面
    switchRegisterTab('register-list');
}

// 提交自主登记的成果表单
function submitAchievementForm() {
    alert('成果已提交审核');
    // 实际应用中会调用API提交成果
    
    // 返回到登记列表页面
    switchRegisterTab('register-list');
}

// 取消自主登记操作
function cancelSelfRegister() {
    // 返回到登记方式选择界面
    const formContainer = document.getElementById('register-tab-content');
    formContainer.innerHTML = getRegisterListTabContent();
}

// 获取已选中的成果ID
function getSelectedAchievementIds() {
    const checkboxes = document.querySelectorAll('.achievement-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 获取已选中的可认领成果ID
function getSelectedClaimIds() {
    const checkboxes = document.querySelectorAll('.claim-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 将所有函数导出到全局作用域
window.loadAchievementRegister = loadAchievementRegister;
window.switchRegisterTab = switchRegisterTab;
window.searchAchievements = searchAchievements;
window.resetAchievementSearch = resetAchievementSearch;
window.showRegisterMethod = showRegisterMethod;
window.selectRegisterMethod = selectRegisterMethod;
window.editAchievement = editAchievement;
window.viewAchievement = viewAchievement;
window.submitAchievement = submitAchievement;
window.deleteAchievement = deleteAchievement;
window.batchSubmitAchievements = batchSubmitAchievements;
window.exportAchievements = exportAchievements;
window.viewProgress = viewProgress;
window.searchClaimAchievements = searchClaimAchievements;
window.refreshClaimAchievements = refreshClaimAchievements;
window.claimAchievement = claimAchievement;
window.viewClaimDetail = viewClaimDetail;
window.batchClaimAchievements = batchClaimAchievements;
window.cancelClaim = cancelClaim;
window.loadDirectoryForm = loadDirectoryForm;
window.saveAsDraft = saveAsDraft;
window.submitAchievementForm = submitAchievementForm;
window.cancelSelfRegister = cancelSelfRegister; 