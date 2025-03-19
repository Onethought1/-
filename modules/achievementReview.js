/**
 * 成果初审模块
 * 包含待审核列表、已审核列表和批量审核功能
 */

// 加载成果初审界面
function loadAchievementReview() {
    const container = document.getElementById('main-content');
    
    // 切换标题
    document.querySelector('.header').textContent = '成果初审';
    
    // 构建成果初审主界面
    let html = `
        <div class="tabs">
            <div class="tab active" onclick="switchReviewTab('pending-review')">待审核</div>
            <div class="tab" onclick="switchReviewTab('reviewed')">已审核</div>
        </div>
        
        <div id="review-tab-content">
            <!-- 初始加载待审核标签页 -->
            ${getPendingReviewTabContent()}
        </div>
    `;
    
    container.innerHTML = html;
    
    // 初始化事件监听
    initReviewEvents();
}

// 切换标签页
function switchReviewTab(tabName) {
    // 更新标签页样式
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 根据选择的标签页显示内容
    const tabContent = document.getElementById('review-tab-content');
    
    if (tabName === 'pending-review') {
        event.target.classList.add('active');
        tabContent.innerHTML = getPendingReviewTabContent();
        initPendingReviewEvents();
    } else if (tabName === 'reviewed') {
        event.target.classList.add('active');
        tabContent.innerHTML = getReviewedTabContent();
        initReviewedEvents();
    }
}

// 获取待审核标签页内容
function getPendingReviewTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>成果名称：</label>
                    <input type="text" class="form-input" id="pending-name-search" placeholder="请输入成果名称">
                </div>
                <div class="search-item">
                    <label>成果类型：</label>
                    <select class="form-input" id="pending-type-search">
                        <option value="">全部</option>
                        <option value="军事理论考试">军事理论考试</option>
                        <option value="军事技能培训">军事技能培训</option>
                        <option value="指挥能力训练">指挥能力训练</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>提交时间：</label>
                    <input type="date" class="form-input" id="pending-start-date"> 至
                    <input type="date" class="form-input" id="pending-end-date">
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchPendingReviews()">查询</button>
                    <button class="button" onclick="resetPendingSearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="batchApprove()">批量通过</button>
                <button class="button" onclick="batchReject()">批量拒绝</button>
                <button class="button" onclick="exportPendingReviews()">导出列表</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-pending"></th>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>成果类型</th>
                        <th>提交人</th>
                        <th>提交时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="pending-review-list">
                    <tr>
                        <td><input type="checkbox" class="pending-checkbox" value="1"></td>
                        <td>1</td>
                        <td>2023年军事理论考试</td>
                        <td>军事理论考试</td>
                        <td>张三</td>
                        <td>2023-06-15</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewPendingDetail(1)">查看详情</a>
                            <a href="javascript:void(0)" onclick="approveAchievement(1)">通过</a>
                            <a href="javascript:void(0)" onclick="rejectAchievement(1)">拒绝</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="pending-checkbox" value="2"></td>
                        <td>2</td>
                        <td>军事技能综合训练</td>
                        <td>军事技能培训</td>
                        <td>李四</td>
                        <td>2023-06-20</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewPendingDetail(2)">查看详情</a>
                            <a href="javascript:void(0)" onclick="approveAchievement(2)">通过</a>
                            <a href="javascript:void(0)" onclick="rejectAchievement(2)">拒绝</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="pending-checkbox" value="3"></td>
                        <td>3</td>
                        <td>指挥能力实战演练</td>
                        <td>指挥能力训练</td>
                        <td>王五</td>
                        <td>2023-07-05</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewPendingDetail(3)">查看详情</a>
                            <a href="javascript:void(0)" onclick="approveAchievement(3)">通过</a>
                            <a href="javascript:void(0)" onclick="rejectAchievement(3)">拒绝</a>
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

// 获取已审核标签页内容
function getReviewedTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>成果名称：</label>
                    <input type="text" class="form-input" id="reviewed-name-search" placeholder="请输入成果名称">
                </div>
                <div class="search-item">
                    <label>成果类型：</label>
                    <select class="form-input" id="reviewed-type-search">
                        <option value="">全部</option>
                        <option value="军事理论考试">军事理论考试</option>
                        <option value="军事技能培训">军事技能培训</option>
                        <option value="指挥能力训练">指挥能力训练</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>审核结果：</label>
                    <select class="form-input" id="review-result-search">
                        <option value="">全部</option>
                        <option value="通过">通过</option>
                        <option value="拒绝">拒绝</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>审核时间：</label>
                    <input type="date" class="form-input" id="reviewed-start-date"> 至
                    <input type="date" class="form-input" id="reviewed-end-date">
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchReviewedAchievements()">查询</button>
                    <button class="button" onclick="resetReviewedSearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="exportReviewedList()">导出列表</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>成果类型</th>
                        <th>提交人</th>
                        <th>提交时间</th>
                        <th>审核结果</th>
                        <th>审核人</th>
                        <th>审核时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="reviewed-list">
                    <tr>
                        <td>1</td>
                        <td>2022年度军事技能测评</td>
                        <td>军事技能培训</td>
                        <td>赵六</td>
                        <td>2022-12-15</td>
                        <td><span class="status-approved">通过</span></td>
                        <td>管理员</td>
                        <td>2022-12-18</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewReviewedDetail(1)">查看详情</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>军事理论基础考试</td>
                        <td>军事理论考试</td>
                        <td>钱七</td>
                        <td>2023-01-10</td>
                        <td><span class="status-rejected">拒绝</span></td>
                        <td>管理员</td>
                        <td>2023-01-12</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewReviewedDetail(2)">查看详情</a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>作战指挥能力训练</td>
                        <td>指挥能力训练</td>
                        <td>孙八</td>
                        <td>2023-02-20</td>
                        <td><span class="status-approved">通过</span></td>
                        <td>管理员</td>
                        <td>2023-02-22</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewReviewedDetail(3)">查看详情</a>
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

// 初始化成果初审事件监听
function initReviewEvents() {
    // 暂时不需要初始化事件，切换标签时会单独初始化对应标签页的事件
}

// 初始化待审核列表事件
function initPendingReviewEvents() {
    // 待审核列表的全选功能
    const selectAllPending = document.getElementById('select-all-pending');
    if (selectAllPending) {
        selectAllPending.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.pending-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllPending.checked;
            });
        });
    }
}

// 初始化已审核列表事件
function initReviewedEvents() {
    // 暂无特殊事件需要初始化
}

// 搜索待审核成果
function searchPendingReviews() {
    const nameSearch = document.getElementById('pending-name-search').value;
    const typeSearch = document.getElementById('pending-type-search').value;
    const startDate = document.getElementById('pending-start-date').value;
    const endDate = document.getElementById('pending-end-date').value;
    
    console.log('搜索待审核成果：', {
        成果名称: nameSearch,
        成果类型: typeSearch,
        开始日期: startDate,
        结束日期: endDate
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置待审核搜索条件
function resetPendingSearch() {
    document.getElementById('pending-name-search').value = '';
    document.getElementById('pending-type-search').value = '';
    document.getElementById('pending-start-date').value = '';
    document.getElementById('pending-end-date').value = '';
}

// 搜索已审核成果
function searchReviewedAchievements() {
    const nameSearch = document.getElementById('reviewed-name-search').value;
    const typeSearch = document.getElementById('reviewed-type-search').value;
    const resultSearch = document.getElementById('review-result-search').value;
    const startDate = document.getElementById('reviewed-start-date').value;
    const endDate = document.getElementById('reviewed-end-date').value;
    
    console.log('搜索已审核成果：', {
        成果名称: nameSearch,
        成果类型: typeSearch,
        审核结果: resultSearch,
        开始日期: startDate,
        结束日期: endDate
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置已审核搜索条件
function resetReviewedSearch() {
    document.getElementById('reviewed-name-search').value = '';
    document.getElementById('reviewed-type-search').value = '';
    document.getElementById('review-result-search').value = '';
    document.getElementById('reviewed-start-date').value = '';
    document.getElementById('reviewed-end-date').value = '';
}

// 查看待审核成果详情
function viewPendingDetail(id) {
    showAchievementDetailModal(id, 'pending');
}

// 查看已审核成果详情
function viewReviewedDetail(id) {
    showAchievementDetailModal(id, 'reviewed');
}

// 显示成果详情模态框
function showAchievementDetailModal(id, type) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'achievement-detail-modal';
    
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
                        <h4>审核操作</h4>
                        <div class="form-group">
                            <label>审核意见：</label>
                            <textarea class="form-input" id="review-comment" rows="3" placeholder="请输入审核意见..."></textarea>
                        </div>
                        <div class="button-group">
                            <button class="button" onclick="approveModalAchievement(${id})">通过</button>
                            <button class="button" onclick="rejectModalAchievement(${id})">拒绝</button>
                            <button class="button" onclick="closeModal()">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'reviewed') {
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
                        <h4>审核信息</h4>
                        <div class="detail-row">
                            <div class="detail-label">审核结果：</div>
                            <div class="detail-value"><span class="status-approved">通过</span></div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">审核人：</div>
                            <div class="detail-value">管理员</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">审核时间：</div>
                            <div class="detail-value">2022-12-18</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">审核意见：</div>
                            <div class="detail-value">成果材料齐全，内容真实有效，符合军事技能培训成果认定标准。</div>
                        </div>
                    </div>
                    
                    <div class="button-group">
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
    const modal = document.getElementById('achievement-detail-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }, 300);
    }
}

// 通过单个成果审核
function approveAchievement(id) {
    if (confirm(`确定要通过ID为${id}的成果吗？`)) {
        alert(`已通过ID为${id}的成果`);
        // 实际应用中这里会调用后端API进行审核操作
    }
}

// 拒绝单个成果审核
function rejectAchievement(id) {
    const reason = prompt('请输入拒绝原因：');
    if (reason !== null) {
        alert(`已拒绝ID为${id}的成果，拒绝原因：${reason}`);
        // 实际应用中这里会调用后端API进行审核操作
    }
}

// 模态框中通过成果
function approveModalAchievement(id) {
    const comment = document.getElementById('review-comment').value;
    alert(`已通过ID为${id}的成果，审核意见：${comment || '无'}`);
    closeModal();
    // 实际应用中这里会调用后端API进行审核操作
}

// 模态框中拒绝成果
function rejectModalAchievement(id) {
    const comment = document.getElementById('review-comment').value;
    if (!comment) {
        alert('请输入拒绝原因');
        return;
    }
    alert(`已拒绝ID为${id}的成果，拒绝原因：${comment}`);
    closeModal();
    // 实际应用中这里会调用后端API进行审核操作
}

// 批量通过成果
function batchApprove() {
    const selectedIds = getSelectedPendingIds();
    if (selectedIds.length === 0) {
        alert('请先选择要通过的成果');
        return;
    }
    
    if (confirm(`确定要批量通过选中的 ${selectedIds.length} 条成果吗？`)) {
        alert(`已通过以下ID的成果: ${selectedIds.join(', ')}`);
        // 实际应用中这里会调用后端API进行批量审核操作
    }
}

// 批量拒绝成果
function batchReject() {
    const selectedIds = getSelectedPendingIds();
    if (selectedIds.length === 0) {
        alert('请先选择要拒绝的成果');
        return;
    }
    
    const reason = prompt('请输入拒绝原因：');
    if (reason !== null) {
        alert(`已拒绝以下ID的成果: ${selectedIds.join(', ')}，拒绝原因：${reason}`);
        // 实际应用中这里会调用后端API进行批量审核操作
    }
}

// 导出待审核列表
function exportPendingReviews() {
    alert('导出待审核列表功能已触发');
    // 实际应用中这里会调用后端API进行导出
}

// 导出已审核列表
function exportReviewedList() {
    alert('导出已审核列表功能已触发');
    // 实际应用中这里会调用后端API进行导出
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

// 获取已选中的待审核ID
function getSelectedPendingIds() {
    const checkboxes = document.querySelectorAll('.pending-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
} 