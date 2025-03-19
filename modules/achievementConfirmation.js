/**
 * 成果认定模块
 * 包含待认定列表、已认定列表和批量操作功能
 */

// 加载成果认定界面
function loadAchievementConfirmation() {
    const container = document.getElementById('main-content');
    
    // 切换标题
    document.querySelector('.header').textContent = '成果认定';
    
    // 构建成果认定主界面
    let html = `
        <div class="tabs">
            <div class="tab active" onclick="switchConfirmationTab('pending-confirmation')">待认定</div>
            <div class="tab" onclick="switchConfirmationTab('confirmed')">已认定</div>
        </div>
        
        <div id="confirmation-tab-content">
            <!-- 初始加载待认定标签页 -->
            ${getPendingConfirmationTabContent()}
        </div>
    `;
    
    container.innerHTML = html;
    
    // 初始化事件监听
    initConfirmationEvents();
}

// 切换标签页
function switchConfirmationTab(tabName) {
    // 更新标签页样式
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 根据选择的标签页显示内容
    const tabContent = document.getElementById('confirmation-tab-content');
    
    if (tabName === 'pending-confirmation') {
        event.target.classList.add('active');
        tabContent.innerHTML = getPendingConfirmationTabContent();
        initPendingConfirmationEvents();
    } else if (tabName === 'confirmed') {
        event.target.classList.add('active');
        tabContent.innerHTML = getConfirmedTabContent();
        initConfirmedEvents();
    }
}

// 获取待认定标签页内容
function getPendingConfirmationTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>成果名称：</label>
                    <input type="text" class="form-input" id="pending-confirm-name-search" placeholder="请输入成果名称">
                </div>
                <div class="search-item">
                    <label>成果类型：</label>
                    <select class="form-input" id="pending-confirm-type-search">
                        <option value="">全部</option>
                        <option value="军事理论考试">军事理论考试</option>
                        <option value="军事技能培训">军事技能培训</option>
                        <option value="指挥能力训练">指挥能力训练</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>提交时间：</label>
                    <input type="date" class="form-input" id="pending-confirm-start-date"> 至
                    <input type="date" class="form-input" id="pending-confirm-end-date">
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchPendingConfirmations()">查询</button>
                    <button class="button" onclick="resetPendingConfirmSearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="batchConfirm()">批量认定</button>
                <button class="button" onclick="batchReturn()">批量退回</button>
                <button class="button" onclick="exportPendingConfirmations()">导出列表</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-pending-confirm"></th>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>成果类型</th>
                        <th>提交人</th>
                        <th>初审状态</th>
                        <th>初审人</th>
                        <th>初审时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="pending-confirmation-list">
                    <tr>
                        <td><input type="checkbox" class="pending-confirm-checkbox" value="1"></td>
                        <td>1</td>
                        <td>2023年军事理论考试</td>
                        <td>军事理论考试</td>
                        <td>张三</td>
                        <td><span class="status-approved">初审通过</span></td>
                        <td>教导员</td>
                        <td>2023-06-18</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewPendingConfirmDetail(1)">查看详情</a>
                            <a href="javascript:void(0)" onclick="confirmAchievement(1)">认定</a>
                            <a href="javascript:void(0)" onclick="returnAchievement(1)">退回</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="pending-confirm-checkbox" value="2"></td>
                        <td>2</td>
                        <td>军事技能综合训练</td>
                        <td>军事技能培训</td>
                        <td>李四</td>
                        <td><span class="status-approved">初审通过</span></td>
                        <td>教导员</td>
                        <td>2023-06-22</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewPendingConfirmDetail(2)">查看详情</a>
                            <a href="javascript:void(0)" onclick="confirmAchievement(2)">认定</a>
                            <a href="javascript:void(0)" onclick="returnAchievement(2)">退回</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="pending-confirm-checkbox" value="3"></td>
                        <td>3</td>
                        <td>指挥能力实战演练</td>
                        <td>指挥能力训练</td>
                        <td>王五</td>
                        <td><span class="status-approved">初审通过</span></td>
                        <td>教导员</td>
                        <td>2023-07-08</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewPendingConfirmDetail(3)">查看详情</a>
                            <a href="javascript:void(0)" onclick="confirmAchievement(3)">认定</a>
                            <a href="javascript:void(0)" onclick="returnAchievement(3)">退回</a>
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

// 获取已认定标签页内容
function getConfirmedTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>成果名称：</label>
                    <input type="text" class="form-input" id="confirmed-name-search" placeholder="请输入成果名称">
                </div>
                <div class="search-item">
                    <label>成果类型：</label>
                    <select class="form-input" id="confirmed-type-search">
                        <option value="">全部</option>
                        <option value="军事理论考试">军事理论考试</option>
                        <option value="军事技能培训">军事技能培训</option>
                        <option value="指挥能力训练">指挥能力训练</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>认定结果：</label>
                    <select class="form-input" id="confirm-result-search">
                        <option value="">全部</option>
                        <option value="认定">认定</option>
                        <option value="退回">退回</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>认定时间：</label>
                    <input type="date" class="form-input" id="confirmed-start-date"> 至
                    <input type="date" class="form-input" id="confirmed-end-date">
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchConfirmedAchievements()">查询</button>
                    <button class="button" onclick="resetConfirmedSearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="exportConfirmedList()">导出列表</button>
                <button class="button" onclick="generateConfirmationReport()">生成认定报告</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-confirmed"></th>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>成果类型</th>
                        <th>提交人</th>
                        <th>认定结果</th>
                        <th>认定人</th>
                        <th>认定时间</th>
                        <th>申报状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="confirmed-list">
                    <tr>
                        <td><input type="checkbox" class="confirmed-checkbox" value="1"></td>
                        <td>1</td>
                        <td>2022年度军事技能测评</td>
                        <td>军事技能培训</td>
                        <td>赵六</td>
                        <td><span class="status-confirmed">已认定</span></td>
                        <td>部门主管</td>
                        <td>2022-12-20</td>
                        <td>未申报</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewConfirmedDetail(1)">查看详情</a>
                            <a href="javascript:void(0)" onclick="initiateCertification(1)">发起申报</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="confirmed-checkbox" value="2"></td>
                        <td>2</td>
                        <td>军事理论基础考试</td>
                        <td>军事理论考试</td>
                        <td>钱七</td>
                        <td><span class="status-returned">已退回</span></td>
                        <td>部门主管</td>
                        <td>2023-01-15</td>
                        <td>-</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewConfirmedDetail(2)">查看详情</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="confirmed-checkbox" value="3"></td>
                        <td>3</td>
                        <td>作战指挥能力训练</td>
                        <td>指挥能力训练</td>
                        <td>孙八</td>
                        <td><span class="status-confirmed">已认定</span></td>
                        <td>部门主管</td>
                        <td>2023-02-25</td>
                        <td>已申报</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewConfirmedDetail(3)">查看详情</a>
                            <a href="javascript:void(0)" onclick="viewCertificationStatus(3)">查看申报</a>
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

// 初始化成果认定事件监听
function initConfirmationEvents() {
    // 暂时不需要初始化事件，切换标签时会单独初始化对应标签页的事件
}

// 初始化待认定列表事件
function initPendingConfirmationEvents() {
    // 待认定列表的全选功能
    const selectAllPending = document.getElementById('select-all-pending-confirm');
    if (selectAllPending) {
        selectAllPending.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.pending-confirm-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllPending.checked;
            });
        });
    }
}

// 初始化已认定列表事件
function initConfirmedEvents() {
    // 已认定列表的全选功能
    const selectAllConfirmed = document.getElementById('select-all-confirmed');
    if (selectAllConfirmed) {
        selectAllConfirmed.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.confirmed-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllConfirmed.checked;
            });
        });
    }
}

// 搜索待认定成果
function searchPendingConfirmations() {
    const nameSearch = document.getElementById('pending-confirm-name-search').value;
    const typeSearch = document.getElementById('pending-confirm-type-search').value;
    const startDate = document.getElementById('pending-confirm-start-date').value;
    const endDate = document.getElementById('pending-confirm-end-date').value;
    
    console.log('搜索待认定成果：', {
        成果名称: nameSearch,
        成果类型: typeSearch,
        开始日期: startDate,
        结束日期: endDate
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置待认定搜索条件
function resetPendingConfirmSearch() {
    document.getElementById('pending-confirm-name-search').value = '';
    document.getElementById('pending-confirm-type-search').value = '';
    document.getElementById('pending-confirm-start-date').value = '';
    document.getElementById('pending-confirm-end-date').value = '';
}

// 搜索已认定成果
function searchConfirmedAchievements() {
    const nameSearch = document.getElementById('confirmed-name-search').value;
    const typeSearch = document.getElementById('confirmed-type-search').value;
    const resultSearch = document.getElementById('confirm-result-search').value;
    const startDate = document.getElementById('confirmed-start-date').value;
    const endDate = document.getElementById('confirmed-end-date').value;
    
    console.log('搜索已认定成果：', {
        成果名称: nameSearch,
        成果类型: typeSearch,
        认定结果: resultSearch,
        开始日期: startDate,
        结束日期: endDate
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置已认定搜索条件
function resetConfirmedSearch() {
    document.getElementById('confirmed-name-search').value = '';
    document.getElementById('confirmed-type-search').value = '';
    document.getElementById('confirm-result-search').value = '';
    document.getElementById('confirmed-start-date').value = '';
    document.getElementById('confirmed-end-date').value = '';
}

// 查看待认定成果详情
function viewPendingConfirmDetail(id) {
    showConfirmationDetailModal(id, 'pending');
}

// 查看已认定成果详情
function viewConfirmedDetail(id) {
    showConfirmationDetailModal(id, 'confirmed');
}

// 显示成果认定详情模态框
function showConfirmationDetailModal(id, type) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'confirmation-detail-modal';
    
    let modalContent = '';
    
    if (type === 'pending') {
        modalContent = `
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
                            <div class="detail-label">提交人：</div>
                            <div class="detail-value">张三</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">提交时间：</div>
                            <div class="detail-value">2023-06-15</div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4>考试详情</h4>
                        <div class="detail-row">
                            <div class="detail-label">考试名称：</div>
                            <div class="detail-value">2023年军事理论考试</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">考试日期：</div>
                            <div class="detail-value">2023-06-10</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">考试成绩：</div>
                            <div class="detail-value">92分</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">考试类型：</div>
                            <div class="detail-value">期末考试</div>
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
                    
                    <div class="detail-section">
                        <h4>初审信息</h4>
                        <div class="detail-row">
                            <div class="detail-label">初审结果：</div>
                            <div class="detail-value"><span class="status-approved">通过</span></div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">初审人：</div>
                            <div class="detail-value">教导员</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">初审时间：</div>
                            <div class="detail-value">2023-06-18</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">初审意见：</div>
                            <div class="detail-value">成果材料齐全，考试成绩真实有效，符合军事理论考试成果认定标准。</div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4>认定操作</h4>
                        <div class="form-group">
                            <label>认定意见：</label>
                            <textarea class="form-input" id="confirmation-comment" rows="3" placeholder="请输入认定意见..."></textarea>
                        </div>
                        <div class="button-group">
                            <button class="button" onclick="confirmModalAchievement(${id})">认定</button>
                            <button class="button" onclick="returnModalAchievement(${id})">退回</button>
                            <button class="button" onclick="closeModal()">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'confirmed') {
        modalContent = `
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
                            <div class="detail-value">2022年度军事技能测评</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">成果类型：</div>
                            <div class="detail-value">军事技能培训</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">提交人：</div>
                            <div class="detail-value">赵六</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">提交时间：</div>
                            <div class="detail-value">2022-12-15</div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4>培训详情</h4>
                        <div class="detail-row">
                            <div class="detail-label">培训名称：</div>
                            <div class="detail-value">2022年度军事技能测评</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">培训时间：</div>
                            <div class="detail-value">2022-11-01至2022-12-10</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">培训成绩：</div>
                            <div class="detail-value">良好</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">培训内容：</div>
                            <div class="detail-value">包含军事体能训练、武器操作技能、战场急救等综合军事技能培训和测评。</div>
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
                    
                    <div class="detail-section">
                        <h4>初审信息</h4>
                        <div class="detail-row">
                            <div class="detail-label">初审结果：</div>
                            <div class="detail-value"><span class="status-approved">通过</span></div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">初审人：</div>
                            <div class="detail-value">教导员</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">初审时间：</div>
                            <div class="detail-value">2022-12-18</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">初审意见：</div>
                            <div class="detail-value">成果材料齐全，内容真实有效，符合军事技能培训成果认定标准。</div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4>认定信息</h4>
                        <div class="detail-row">
                            <div class="detail-label">认定结果：</div>
                            <div class="detail-value"><span class="status-confirmed">已认定</span></div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">认定人：</div>
                            <div class="detail-value">部门主管</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">认定时间：</div>
                            <div class="detail-value">2022-12-20</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">认定意见：</div>
                            <div class="detail-value">成果符合军事技能培训认定标准，认可其有效性，予以认定。</div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4>申报状态</h4>
                        <div class="detail-row">
                            <div class="detail-label">申报状态：</div>
                            <div class="detail-value">未申报</div>
                        </div>
                    </div>
                    
                    <div class="button-group">
                        <button class="button" onclick="initiateCertificationFromModal(${id})">发起申报</button>
                        <button class="button" onclick="closeModal()">关闭</button>
                    </div>
                </div>
            </div>
        `;
    }
    
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
    const modal = document.getElementById('confirmation-detail-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }, 300);
    }
}

// 认定单个成果
function confirmAchievement(id) {
    if (confirm(`确定要认定ID为${id}的成果吗？`)) {
        alert(`已认定ID为${id}的成果`);
        // 实际应用中这里会调用后端API进行认定操作
    }
}

// 退回单个成果
function returnAchievement(id) {
    const reason = prompt('请输入退回原因：');
    if (reason !== null) {
        alert(`已退回ID为${id}的成果，退回原因：${reason}`);
        // 实际应用中这里会调用后端API进行退回操作
    }
}

// 模态框中认定成果
function confirmModalAchievement(id) {
    const comment = document.getElementById('confirmation-comment').value;
    if (!comment) {
        alert('请输入认定意见');
        return;
    }
    alert(`已认定ID为${id}的成果，认定意见：${comment}`);
    closeModal();
    // 实际应用中这里会调用后端API进行认定操作
}

// 模态框中退回成果
function returnModalAchievement(id) {
    const comment = document.getElementById('confirmation-comment').value;
    if (!comment) {
        alert('请输入退回原因');
        return;
    }
    alert(`已退回ID为${id}的成果，退回原因：${comment}`);
    closeModal();
    // 实际应用中这里会调用后端API进行退回操作
}

// 批量认定成果
function batchConfirm() {
    const selectedIds = getSelectedPendingConfirmIds();
    if (selectedIds.length === 0) {
        alert('请先选择要认定的成果');
        return;
    }
    
    const comment = prompt('请输入认定意见：');
    if (comment !== null) {
        alert(`已认定以下ID的成果: ${selectedIds.join(', ')}，认定意见：${comment}`);
        // 实际应用中这里会调用后端API进行批量认定操作
    }
}

// 批量退回成果
function batchReturn() {
    const selectedIds = getSelectedPendingConfirmIds();
    if (selectedIds.length === 0) {
        alert('请先选择要退回的成果');
        return;
    }
    
    const reason = prompt('请输入退回原因：');
    if (reason !== null) {
        alert(`已退回以下ID的成果: ${selectedIds.join(', ')}，退回原因：${reason}`);
        // 实际应用中这里会调用后端API进行批量退回操作
    }
}

// 导出待认定列表
function exportPendingConfirmations() {
    alert('导出待认定列表功能已触发');
    // 实际应用中这里会调用后端API进行导出
}

// 导出已认定列表
function exportConfirmedList() {
    alert('导出已认定列表功能已触发');
    // 实际应用中这里会调用后端API进行导出
}

// 生成认定报告
function generateConfirmationReport() {
    const selectedIds = getSelectedConfirmedIds();
    if (selectedIds.length === 0) {
        alert('请先选择要生成报告的成果记录');
        return;
    }
    
    alert(`将为以下ID的成果生成认定报告: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API生成报告
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

// 获取已选中的待认定ID
function getSelectedPendingConfirmIds() {
    const checkboxes = document.querySelectorAll('.pending-confirm-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 获取已选中的已认定ID
function getSelectedConfirmedIds() {
    const checkboxes = document.querySelectorAll('.confirmed-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
} 