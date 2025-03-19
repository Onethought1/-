// 申报认证模块文件
// 包含申报认证相关的所有功能

// 加载申报认证模块的主函数
function loadCertificationApplication() {
    const container = document.getElementById('main-content');
    
    // 切换标题
    document.querySelector('.header').textContent = '申报认证';
    
    // 构建申报认证主界面
    let html = `
        <div class="tabs">
            <div class="tab active" onclick="switchCertificationTab('uncertified')">未申报认证</div>
            <div class="tab" onclick="switchCertificationTab('certified')">已生成认证清单</div>
        </div>
        
        <div id="certification-tab-content">
            <!-- 初始加载未申报认证标签页 -->
            ${getUncertifiedTabContent()}
        </div>
    `;
    
    container.innerHTML = html;
    
    // 初始化事件监听
    initCertificationEvents();
}

// 切换标签页
function switchCertificationTab(tabName) {
    // 更新标签页样式
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 根据选择的标签页显示内容
    const tabContent = document.getElementById('certification-tab-content');
    
    if (tabName === 'uncertified') {
        event.target.classList.add('active');
        tabContent.innerHTML = getUncertifiedTabContent();
        initUncertifiedEvents();
    } else if (tabName === 'certified') {
        event.target.classList.add('active');
        tabContent.innerHTML = getCertifiedTabContent();
        initCertifiedEvents();
    }
}

// 获取未申报认证标签页内容
function getUncertifiedTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>成果名称：</label>
                    <input type="text" class="form-input" id="uncertified-name-search" placeholder="请输入成果名称">
                </div>
                <div class="search-item">
                    <label>成果来源：</label>
                    <select class="form-input" id="uncertified-source-search">
                        <option value="">全部来源</option>
                        <option value="个人提报">个人提报</option>
                        <option value="单位提报">单位提报</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>认定时间：</label>
                    <input type="date" class="form-input" id="uncertified-start-date"> 至
                    <input type="date" class="form-input" id="uncertified-end-date">
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchUncertifiedAchievements()">查询</button>
                    <button class="button" onclick="resetUncertifiedSearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="batchApplyCertification()">批量申报</button>
                <button class="button" onclick="generateCertificationReport()">生成申请认证报告</button>
                <button class="button" onclick="exportUncertifiedList()">导出列表</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-uncertified"></th>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>提交人</th>
                        <th>成果类型</th>
                        <th>认定时间</th>
                        <th>认定分值</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="uncertified-list">
                    <tr>
                        <td><input type="checkbox" class="uncertified-checkbox" value="1"></td>
                        <td>1</td>
                        <td>军事理论考试优秀</td>
                        <td>李四</td>
                        <td>考试成果</td>
                        <td>2023-03-18</td>
                        <td>5.0</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewUncertifiedDetail(1)">查看详情</a>
                            <a href="javascript:void(0)" onclick="applyCertification(1)">申报认证</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="uncertified-checkbox" value="2"></td>
                        <td>2</td>
                        <td>军事研究论文</td>
                        <td>王五</td>
                        <td>研究成果</td>
                        <td>2023-03-20</td>
                        <td>8.0</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewUncertifiedDetail(2)">查看详情</a>
                            <a href="javascript:void(0)" onclick="applyCertification(2)">申报认证</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="uncertified-checkbox" value="3"></td>
                        <td>3</td>
                        <td>军事技能训练</td>
                        <td>赵六</td>
                        <td>训练成果</td>
                        <td>2023-03-25</td>
                        <td>6.5</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewUncertifiedDetail(3)">查看详情</a>
                            <a href="javascript:void(0)" onclick="applyCertification(3)">申报认证</a>
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

// 获取已生成认证清单标签页内容
function getCertifiedTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>清单名称：</label>
                    <input type="text" class="form-input" id="certified-name-search" placeholder="请输入清单名称">
                </div>
                <div class="search-item">
                    <label>成果类型：</label>
                    <select class="form-input" id="certified-type-search">
                        <option value="">全部类型</option>
                        <option value="考试成果">考试成果</option>
                        <option value="研究成果">研究成果</option>
                        <option value="训练成果">训练成果</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>生成时间：</label>
                    <input type="date" class="form-input" id="certified-start-date"> 至
                    <input type="date" class="form-input" id="certified-end-date">
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchCertifiedLists()">查询</button>
                    <button class="button" onclick="resetCertifiedSearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="exportCertifiedList()">导出列表</button>
                <button class="button" onclick="batchDownloadCertificationList()">批量下载</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-certified"></th>
                        <th>序号</th>
                        <th>认证清单名称</th>
                        <th>包含成果数</th>
                        <th>生成时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="certified-list">
                    <tr>
                        <td><input type="checkbox" class="certified-checkbox" value="1"></td>
                        <td>1</td>
                        <td>2023年第一季度军事成果认证清单</td>
                        <td>5</td>
                        <td>2023-03-20</td>
                        <td>已提交</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewCertificationList(1)">查看详情</a>
                            <a href="javascript:void(0)" onclick="downloadCertificationList(1)">下载</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="certified-checkbox" value="2"></td>
                        <td>2</td>
                        <td>2023年第二季度军事成果认证清单</td>
                        <td>8</td>
                        <td>2023-06-15</td>
                        <td>已确认</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewCertificationList(2)">查看详情</a>
                            <a href="javascript:void(0)" onclick="downloadCertificationList(2)">下载</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="certified-checkbox" value="3"></td>
                        <td>3</td>
                        <td>2023年上半年考试成果认证清单</td>
                        <td>12</td>
                        <td>2023-07-05</td>
                        <td>处理中</td>
                        <td>
                            <a href="javascript:void(0)" onclick="viewCertificationList(3)">查看详情</a>
                            <a href="javascript:void(0)" onclick="downloadCertificationList(3)">下载</a>
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

// 初始化申报认证事件监听
function initCertificationEvents() {
    // 暂时不需要初始化事件，切换标签时会单独初始化对应标签页的事件
}

// 初始化未申报认证列表事件
function initUncertifiedEvents() {
    // 未申报认证列表的全选功能
    const selectAllUncertified = document.getElementById('select-all-uncertified');
    if (selectAllUncertified) {
        selectAllUncertified.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.uncertified-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllUncertified.checked;
            });
        });
    }
}

// 初始化已生成认证清单列表事件
function initCertifiedEvents() {
    // 已生成认证清单列表的全选功能
    const selectAllCertified = document.getElementById('select-all-certified');
    if (selectAllCertified) {
        selectAllCertified.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.certified-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCertified.checked;
            });
        });
    }
}

// 搜索未申报认证成果
function searchUncertifiedAchievements() {
    const nameSearch = document.getElementById('uncertified-name-search').value;
    const sourceSearch = document.getElementById('uncertified-source-search').value;
    const startDate = document.getElementById('uncertified-start-date').value;
    const endDate = document.getElementById('uncertified-end-date').value;
    
    console.log('搜索未申报认证成果：', {
        成果名称: nameSearch,
        成果来源: sourceSearch,
        开始日期: startDate,
        结束日期: endDate
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置未申报认证搜索条件
function resetUncertifiedSearch() {
    document.getElementById('uncertified-name-search').value = '';
    document.getElementById('uncertified-source-search').value = '';
    document.getElementById('uncertified-start-date').value = '';
    document.getElementById('uncertified-end-date').value = '';
}

// 搜索已生成认证清单
function searchCertifiedLists() {
    const nameSearch = document.getElementById('certified-name-search').value;
    const typeSearch = document.getElementById('certified-type-search').value;
    const startDate = document.getElementById('certified-start-date').value;
    const endDate = document.getElementById('certified-end-date').value;
    
    console.log('搜索已生成认证清单：', {
        清单名称: nameSearch,
        成果类型: typeSearch,
        开始日期: startDate,
        结束日期: endDate
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置已生成认证清单搜索条件
function resetCertifiedSearch() {
    document.getElementById('certified-name-search').value = '';
    document.getElementById('certified-type-search').value = '';
    document.getElementById('certified-start-date').value = '';
    document.getElementById('certified-end-date').value = '';
}

// 查看未申报认证成果详情
function viewUncertifiedDetail(id) {
    showCertificationDetailModal(id, 'uncertified');
}

// 申报认证单个成果
function applyCertification(id) {
    if (confirm(`确定要为ID为${id}的成果申报认证吗？`)) {
        alert(`已为ID为${id}的成果申报认证`);
        // 实际应用中这里会调用后端API进行申报操作
    }
}

// 批量申报认证
function batchApplyCertification() {
    const selectedIds = getSelectedUncertifiedIds();
    if (selectedIds.length === 0) {
        alert('请先选择要申报认证的成果');
        return;
    }
    
    if (confirm(`确定要为以下ID的成果申报认证吗？${selectedIds.join(', ')}`)) {
        alert(`已为以下ID的成果申报认证: ${selectedIds.join(', ')}`);
        // 实际应用中这里会调用后端API进行批量申报操作
    }
}

// 生成申请认证报告
function generateCertificationReport() {
    const selectedIds = getSelectedUncertifiedIds();
    if (selectedIds.length === 0) {
        alert("请先选择要申请认证的成果");
        return;
    }
    
    alert("正在生成申请认证报告，请稍候...");
    // 实际应用中这里会调用后端API生成报告，然后更新UI
}

// 导出未申报认证列表
function exportUncertifiedList() {
    alert('导出未申报认证列表功能已触发');
    // 实际应用中这里会调用后端API进行导出
}

// 导出已生成认证清单列表
function exportCertifiedList() {
    alert('导出已生成认证清单列表功能已触发');
    // 实际应用中这里会调用后端API进行导出
}

// 查看认证清单详情
function viewCertificationList(id) {
    showCertificationListModal(id);
}

// 显示认证清单详情模态框
function showCertificationListModal(id) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'certification-list-modal';
    
    let modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>认证清单详情</h3>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h4>基本信息</h4>
                    <div class="detail-row">
                        <div class="detail-label">清单名称：</div>
                        <div class="detail-value">2023年第一季度军事成果认证清单</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">生成时间：</div>
                        <div class="detail-value">2023-03-20</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">包含成果数：</div>
                        <div class="detail-value">5</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">状态：</div>
                        <div class="detail-value">已提交</div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>包含成果列表</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>成果名称</th>
                                <th>提交人</th>
                                <th>成果类型</th>
                                <th>认定时间</th>
                                <th>认定分值</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>军事理论考试优秀</td>
                                <td>李四</td>
                                <td>考试成果</td>
                                <td>2023-03-18</td>
                                <td>5.0</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>军事研究论文</td>
                                <td>王五</td>
                                <td>研究成果</td>
                                <td>2023-03-20</td>
                                <td>8.0</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>指挥能力训练</td>
                                <td>赵六</td>
                                <td>训练成果</td>
                                <td>2023-02-15</td>
                                <td>6.5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="button-group">
                    <button class="button" onclick="downloadCertificationList(${id})">下载认证清单</button>
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

// 显示成果详情模态框
function showCertificationDetailModal(id, type) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'certification-detail-modal';
    
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
                        <div class="detail-value">军事理论考试优秀</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">成果类型：</div>
                        <div class="detail-value">考试成果</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">提交人：</div>
                        <div class="detail-value">李四</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">提交时间：</div>
                        <div class="detail-value">2023-03-15</div>
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
                        <div class="detail-value">2023-03-10</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">考试成绩：</div>
                        <div class="detail-value">95分</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">考试类型：</div>
                        <div class="detail-value">期末考试</div>
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
                        <div class="detail-value">2023-03-18</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">认定分值：</div>
                        <div class="detail-value">5.0</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">认定意见：</div>
                        <div class="detail-value">成果符合认定标准，认可其有效性，给予相应分值。</div>
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
                    <button class="button" onclick="applyCertification(${id})">申报认证</button>
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

// 下载认证清单
function downloadCertificationList(id) {
    alert(`下载ID为${id}的认证清单功能已触发`);
    // 实际应用中这里会调用后端API下载认证清单文件
}

// 批量下载认证清单
function batchDownloadCertificationList() {
    const selectedIds = getSelectedCertifiedIds();
    if (selectedIds.length === 0) {
        alert('请先选择要下载的认证清单');
        return;
    }
    
    alert(`将下载以下ID的认证清单: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API进行批量下载
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

// 获取已选中的未申报认证ID
function getSelectedUncertifiedIds() {
    const checkboxes = document.querySelectorAll('.uncertified-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 获取已选中的已生成认证清单ID
function getSelectedCertifiedIds() {
    const checkboxes = document.querySelectorAll('.certified-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 导出函数
// 确保这些函数可以被其他模块调用
window.loadCertificationApplication = loadCertificationApplication;
window.initiateCertification = initiateCertification;
window.initiateCertificationFromModal = initiateCertificationFromModal;
window.viewCertificationStatus = viewCertificationStatus;

// 从成果认定模块发起申报
function initiateCertification(id) {
    if (confirm(`确定要为ID为${id}的成果发起申报认证吗？`)) {
        alert(`已为ID为${id}的成果发起申报认证，将跳转至申报认证页面`);
        // 实际应用中这里会调用后端API进行申报操作，然后跳转至申报认证页面
        
        // 跳转到申报认证页面
        showContent('certification-application');
    }
}

// 从模态框中发起申报
function initiateCertificationFromModal(id) {
    if (confirm(`确定要为ID为${id}的成果发起申报认证吗？`)) {
        alert(`已为ID为${id}的成果发起申报认证，将跳转至申报认证页面`);
        closeModal();
        // 实际应用中这里会调用后端API进行申报操作，然后跳转至申报认证页面
        
        // 跳转到申报认证页面
        showContent('certification-application');
    }
}

// 查看申报状态
function viewCertificationStatus(id) {
    alert(`查看ID为${id}的成果申报状态，将跳转至申报认证页面`);
    // 实际应用中这里会跳转至申报认证页面，并显示该成果的申报状态
    
    // 跳转到申报认证页面
    showContent('certification-application');
}
