/**
 * 模板样式管理模块
 * 包含表格模板管理和证明生成记录功能
 */

// 加载模板样式管理界面
function loadTemplateStyleManagement() {
    const container = document.getElementById('main-content');
    
    // 切换标题
    document.querySelector('.header').textContent = '模板样式管理';
    
    // 构建模板样式管理主界面
    let html = `
        <div class="tabs">
            <div class="tab active" onclick="switchTemplateTab('table-template')">表格模板管理</div>
            <div class="tab" onclick="switchTemplateTab('certificate-record')">证明生成记录</div>
        </div>
        
        <div id="template-tab-content">
            <!-- 初始加载表格模板管理标签页 -->
            ${getTableTemplateTabContent()}
        </div>
    `;
    
    container.innerHTML = html;
    
    // 初始化事件监听
    initTemplateEvents();
}

// 切换标签页
function switchTemplateTab(tabName) {
    // 更新标签页样式
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 根据选择的标签页显示内容
    const tabContent = document.getElementById('template-tab-content');
    
    if (tabName === 'table-template') {
        event.target.classList.add('active');
        tabContent.innerHTML = getTableTemplateTabContent();
        initTableTemplateEvents();
    } else if (tabName === 'certificate-record') {
        event.target.classList.add('active');
        tabContent.innerHTML = getCertificateRecordTabContent();
        initCertificateRecordEvents();
    }
}

// 获取表格模板管理标签页内容
function getTableTemplateTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>模板名称：</label>
                    <input type="text" class="form-input" id="template-name-search" placeholder="请输入模板名称">
                </div>
                <div class="search-item">
                    <label>模板类型：</label>
                    <select class="form-input" id="template-type-search">
                        <option value="">全部</option>
                        <option value="导入模板">导入模板</option>
                        <option value="导出模板">导出模板</option>
                        <option value="成果证明">成果证明</option>
                        <option value="申请认证">申请认证</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>状态：</label>
                    <select class="form-input" id="template-status-search">
                        <option value="">全部</option>
                        <option value="启用">启用</option>
                        <option value="停用">停用</option>
                    </select>
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchTemplates()">查询</button>
                    <button class="button" onclick="resetTemplateSearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="addTemplate()">添加模板</button>
                <button class="button" onclick="enableTemplates()">启用</button>
                <button class="button" onclick="disableTemplates()">停用</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-templates"></th>
                        <th>序号</th>
                        <th>模板名称</th>
                        <th>模板类型</th>
                        <th>适用范围</th>
                        <th>上传时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="template-list">
                    <tr>
                        <td><input type="checkbox" class="template-checkbox" value="1"></td>
                        <td>1</td>
                        <td>绩效评估导入模板</td>
                        <td>导入模板</td>
                        <td>学习小组管理员</td>
                        <td>2023-05-15</td>
                        <td>启用</td>
                        <td>
                            <a href="javascript:void(0)" onclick="previewTemplate(1)">预览</a>
                            <a href="javascript:void(0)" onclick="downloadTemplate(1)">下载</a>
                            <a href="javascript:void(0)" onclick="editTemplate(1)">编辑</a>
                            <a href="javascript:void(0)" onclick="disableTemplate(1)">停用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="template-checkbox" value="2"></td>
                        <td>2</td>
                        <td>成果证明模板</td>
                        <td>成果证明</td>
                        <td>所有用户</td>
                        <td>2023-06-20</td>
                        <td>启用</td>
                        <td>
                            <a href="javascript:void(0)" onclick="previewTemplate(2)">预览</a>
                            <a href="javascript:void(0)" onclick="downloadTemplate(2)">下载</a>
                            <a href="javascript:void(0)" onclick="editTemplate(2)">编辑</a>
                            <a href="javascript:void(0)" onclick="disableTemplate(2)">停用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="template-checkbox" value="3"></td>
                        <td>3</td>
                        <td>申请认证报告模板</td>
                        <td>申请认证</td>
                        <td>学习小组管理员</td>
                        <td>2023-07-10</td>
                        <td>启用</td>
                        <td>
                            <a href="javascript:void(0)" onclick="previewTemplate(3)">预览</a>
                            <a href="javascript:void(0)" onclick="downloadTemplate(3)">下载</a>
                            <a href="javascript:void(0)" onclick="editTemplate(3)">编辑</a>
                            <a href="javascript:void(0)" onclick="disableTemplate(3)">停用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="template-checkbox" value="4"></td>
                        <td>4</td>
                        <td>成果导出模板</td>
                        <td>导出模板</td>
                        <td>所有用户</td>
                        <td>2023-08-05</td>
                        <td>停用</td>
                        <td>
                            <a href="javascript:void(0)" onclick="previewTemplate(4)">预览</a>
                            <a href="javascript:void(0)" onclick="downloadTemplate(4)">下载</a>
                            <a href="javascript:void(0)" onclick="editTemplate(4)">编辑</a>
                            <a href="javascript:void(0)" onclick="enableTemplate(4)">启用</a>
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

// 获取证明生成记录标签页内容
function getCertificateRecordTabContent() {
    return `
        <div class="card">
            <div class="search-bar">
                <div class="search-item">
                    <label>证明类型：</label>
                    <select class="form-input" id="certificate-type-search">
                        <option value="">全部</option>
                        <option value="成果证明">成果证明</option>
                        <option value="申请认证报告">申请认证报告</option>
                    </select>
                </div>
                <div class="search-item">
                    <label>生成时间：</label>
                    <input type="date" class="form-input" id="certificate-start-date"> 至
                    <input type="date" class="form-input" id="certificate-end-date">
                </div>
                <div class="search-buttons">
                    <button class="button" onclick="searchCertificates()">查询</button>
                    <button class="button" onclick="resetCertificateSearch()">重置</button>
                </div>
            </div>
            
            <div class="action-bar">
                <button class="button" onclick="uploadCertificateTemplate()">上传模板</button>
                <button class="button" onclick="batchPrintCertificates()">批量打印</button>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" id="select-all-certificates"></th>
                        <th>序号</th>
                        <th>证明名称</th>
                        <th>证明类型</th>
                        <th>生成人</th>
                        <th>生成时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="certificate-list">
                    <tr>
                        <td><input type="checkbox" class="certificate-checkbox" value="1"></td>
                        <td>1</td>
                        <td>张三的成果证明-20230510</td>
                        <td>成果证明</td>
                        <td>张三</td>
                        <td>2023-05-10</td>
                        <td>
                            <a href="javascript:void(0)" onclick="previewCertificate(1)">预览</a>
                            <a href="javascript:void(0)" onclick="downloadCertificate(1)">下载</a>
                            <a href="javascript:void(0)" onclick="printCertificate(1)">打印</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="certificate-checkbox" value="2"></td>
                        <td>2</td>
                        <td>李四的成果证明-20230612</td>
                        <td>成果证明</td>
                        <td>李四</td>
                        <td>2023-06-12</td>
                        <td>
                            <a href="javascript:void(0)" onclick="previewCertificate(2)">预览</a>
                            <a href="javascript:void(0)" onclick="downloadCertificate(2)">下载</a>
                            <a href="javascript:void(0)" onclick="printCertificate(2)">打印</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" class="certificate-checkbox" value="3"></td>
                        <td>3</td>
                        <td>第一营申请认证报告-2023Q2</td>
                        <td>申请认证报告</td>
                        <td>王五</td>
                        <td>2023-07-05</td>
                        <td>
                            <a href="javascript:void(0)" onclick="previewCertificate(3)">预览</a>
                            <a href="javascript:void(0)" onclick="downloadCertificate(3)">下载</a>
                            <a href="javascript:void(0)" onclick="printCertificate(3)">打印</a>
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

// 初始化模板管理事件监听
function initTemplateEvents() {
    // 暂时不需要初始化事件，切换标签时会单独初始化对应标签页的事件
}

// 初始化表格模板管理事件
function initTableTemplateEvents() {
    // 表格模板的全选功能
    const selectAllTemplates = document.getElementById('select-all-templates');
    if (selectAllTemplates) {
        selectAllTemplates.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.template-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllTemplates.checked;
            });
        });
    }
}

// 初始化证明生成记录事件
function initCertificateRecordEvents() {
    // 证明记录的全选功能
    const selectAllCertificates = document.getElementById('select-all-certificates');
    if (selectAllCertificates) {
        selectAllCertificates.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.certificate-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCertificates.checked;
            });
        });
    }
}

// 搜索模板
function searchTemplates() {
    const nameSearch = document.getElementById('template-name-search').value;
    const typeSearch = document.getElementById('template-type-search').value;
    const statusSearch = document.getElementById('template-status-search').value;
    
    console.log('搜索模板：', {
        名称: nameSearch,
        类型: typeSearch,
        状态: statusSearch
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置模板搜索条件
function resetTemplateSearch() {
    document.getElementById('template-name-search').value = '';
    document.getElementById('template-type-search').value = '';
    document.getElementById('template-status-search').value = '';
}

// 添加模板
function addTemplate() {
    alert('添加模板功能已触发，将打开模板上传界面');
    // 实际应用中这里会打开一个模态框或跳转到上传页面
}

// 预览模板
function previewTemplate(id) {
    alert(`预览ID为${id}的模板`);
    // 实际应用中这里会打开一个模态框或新窗口预览模板
}

// 下载模板
function downloadTemplate(id) {
    alert(`下载ID为${id}的模板`);
    // 实际应用中这里会触发浏览器下载
}

// 编辑模板
function editTemplate(id) {
    alert(`编辑ID为${id}的模板`);
    // 实际应用中这里会打开一个模态框或跳转到编辑页面
}

// 启用单个模板
function enableTemplate(id) {
    alert(`启用ID为${id}的模板`);
    // 实际应用中这里会调用后端API启用模板
}

// 停用单个模板
function disableTemplate(id) {
    alert(`停用ID为${id}的模板`);
    // 实际应用中这里会调用后端API停用模板
}

// 批量启用模板
function enableTemplates() {
    const selectedIds = getSelectedTemplateIds();
    if (selectedIds.length === 0) {
        alert('请先选择要启用的模板');
        return;
    }
    
    alert(`将启用以下ID的模板: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API进行批量启用
}

// 批量停用模板
function disableTemplates() {
    const selectedIds = getSelectedTemplateIds();
    if (selectedIds.length === 0) {
        alert('请先选择要停用的模板');
        return;
    }
    
    alert(`将停用以下ID的模板: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API进行批量停用
}

// 获取已选中的模板ID
function getSelectedTemplateIds() {
    const checkboxes = document.querySelectorAll('.template-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 搜索证明记录
function searchCertificates() {
    const typeSearch = document.getElementById('certificate-type-search').value;
    const startDate = document.getElementById('certificate-start-date').value;
    const endDate = document.getElementById('certificate-end-date').value;
    
    console.log('搜索证明记录：', {
        类型: typeSearch,
        开始日期: startDate,
        结束日期: endDate
    });
    
    // 实际应用中这里会调用后端API进行搜索
    alert('搜索功能已触发，请查看控制台日志');
}

// 重置证明记录搜索条件
function resetCertificateSearch() {
    document.getElementById('certificate-type-search').value = '';
    document.getElementById('certificate-start-date').value = '';
    document.getElementById('certificate-end-date').value = '';
}

// 上传证明模板
function uploadCertificateTemplate() {
    alert('上传证明模板功能已触发，将打开模板上传界面');
    // 实际应用中这里会打开一个模态框或跳转到上传页面
}

// 预览证明
function previewCertificate(id) {
    alert(`预览ID为${id}的证明`);
    // 实际应用中这里会打开一个模态框或新窗口预览证明
}

// 下载证明
function downloadCertificate(id) {
    alert(`下载ID为${id}的证明`);
    // 实际应用中这里会触发浏览器下载
}

// 打印单个证明
function printCertificate(id) {
    alert(`打印ID为${id}的证明`);
    // 实际应用中这里会调用浏览器打印功能
}

// 批量打印证明
function batchPrintCertificates() {
    const selectedIds = getSelectedCertificateIds();
    if (selectedIds.length === 0) {
        alert('请先选择要打印的证明');
        return;
    }
    
    alert(`将批量打印以下ID的证明: ${selectedIds.join(', ')}`);
    // 实际应用中这里会调用后端API进行批量打印
}

// 获取已选中的证明ID
function getSelectedCertificateIds() {
    const checkboxes = document.querySelectorAll('.certificate-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
} 