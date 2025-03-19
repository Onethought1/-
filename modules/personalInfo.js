/**
 * 个人信息管理模块
 * 包含查看和编辑个人信息等功能
 */

// 加载个人信息管理界面
function loadPersonalInfo() {
    const container = document.getElementById('main-content');
    
    // 切换标题和添加操作按钮
    const header = document.querySelector('.header');
    header.innerHTML = `
        <div class="header-actions">
            
        </div>
        个人信息管理
    `;
    
    // 构建个人信息管理主界面
    let html = `
        <div class="sub-card">
            <div class="sub-card-header">
                <div class="sub-card-title">
                    <i class="fas fa-user"></i> 个人基本信息
                </div>
                <div>
                    <button class="button" onclick="refreshPersonalInfo()">
                        <i class="fas fa-sync-alt"></i> 刷新信息
                    </button>
                </div>
            </div>
            
            <div class="sub-card-body">
                <div class="user-profile">
                    <div class="user-avatar">
                        <i class="fas fa-user-circle fa-5x"></i>
                        <div class="avatar-upload">
                            <button class="button" onclick="uploadAvatar()">
                                <i class="fas fa-camera"></i> 更换头像
                            </button>
                        </div>
                    </div>
                    
                    <div class="user-info">
                        <div class="form-row">
                            <div class="form-col form-col-6">
                                <div class="info-group">
                                    <label class="form-label">姓名：</label>
                                    <span>张三</span>
                                </div>
                            </div>
                            <div class="form-col form-col-6">
                                <div class="info-group">
                                    <label class="form-label">性别：</label>
                                    <span>男</span>
                                </div>
                            </div>
                            <div class="form-col form-col-6">
                                <div class="info-group">
                                    <label class="form-label">证件号：</label>
                                    <span>1234567890</span>
                                </div>
                            </div>
                            <div class="form-col form-col-6">
                                <div class="info-group">
                                    <label class="form-label">所属单位：</label>
                                    <span>某军事学校</span>
                                </div>
                            </div>
                            <div class="form-col form-col-6">
                                <div class="info-group">
                                    <label class="form-label">岗位：</label>
                                    <span>教员</span>
                                </div>
                            </div>
                            <div class="form-col form-col-6">
                                <div class="info-group">
                                    <label class="form-label">职级：</label>
                                    <span>中级</span>
                                </div>
                            </div>
                            <div class="form-col form-col-6">
                                <div class="info-group">
                                    <label class="form-label">电话：</label>
                                    <input type="text" class="form-control" value="13800138000">
                                </div>
                            </div>
                            <div class="form-col form-col-6">
                                <div class="info-group">
                                    <label class="form-label">邮箱：</label>
                                    <input type="email" class="form-control" value="zhangsan@example.com">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="sub-card">
            <div class="sub-card-header">
                <div class="sub-card-title">
                    <i class="fas fa-star"></i> 学习兴趣
                </div>
            </div>
            <div class="sub-card-body">
                <div class="interest-tags">
                    <div class="tag active">军事理论</div>
                    <div class="tag active">战术训练</div>
                    <div class="tag">武器装备</div>
                    <div class="tag">指挥能力</div>
                    <div class="tag active">军事历史</div>
                    <div class="tag">国防政策</div>
                    <div class="tag">军事技能</div>
                    <div class="tag">军事科技</div>
                </div>
            </div>
            <div class="sub-card-footer">
                <button class="button" onclick="savePersonalInfo()">
                    <i class="fas fa-save"></i> 保存修改
                </button>
            </div>
        </div>
        
        <div class="sub-card">
            <div class="sub-card-header">
                <div class="sub-card-title">
                    <i class="fas fa-id-card"></i> 账号信息
                </div>
            </div>
            <div class="sub-card-body">
                <div class="form-row">
                    <div class="form-col form-col-6">
                        <div class="info-group">
                            <label class="form-label">用户名：</label>
                            <span>zhangsan</span>
                        </div>
                    </div>
                    <div class="form-col form-col-6">
                        <div class="info-group">
                            <label class="form-label">账号状态：</label>
                            <span class="status-badge status-success">正常</span>
                        </div>
                    </div>
                    <div class="form-col form-col-6">
                        <div class="info-group">
                            <label class="form-label">最后登录时间：</label>
                            <span>2023-12-15 14:30:25</span>
                        </div>
                    </div>
                    <div class="form-col form-col-6">
                        <div class="info-group">
                            <label class="form-label">登录IP：</label>
                            <span>192.168.1.100</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sub-card-footer">
                <button class="button button-outline" onclick="resetPassword()">
                    <i class="fas fa-key"></i> 修改密码
                </button>
                <button class="button button-outline" onclick="bindMobile()">
                    <i class="fas fa-mobile-alt"></i> 绑定手机
                </button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // 初始化标签点击事件
    initTagEvents();
}

// 初始化标签点击事件
function initTagEvents() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

// 上传头像
function uploadAvatar() {
    alert('上传头像功能已触发，将打开文件选择器');
    // 实际应用中这里会打开一个文件选择器并上传文件
}

// 保存个人信息
function savePersonalInfo() {
    alert('保存个人信息功能已触发');
    // 实际应用中这里会调用后端API保存信息
}

// 刷新个人信息
function refreshPersonalInfo() {
    alert('从大学军事职业教育数据监控分系统获取最新个人信息');
    // 实际应用中这里会调用外部系统API获取信息
}

// 重置密码
function resetPassword() {
    alert('打开修改密码对话框');
    // 实际应用中这里会打开修改密码的模态框
}

// 绑定手机
function bindMobile() {
    alert('打开绑定手机对话框');
    // 实际应用中这里会打开绑定手机的模态框
}

// 将函数导出到全局作用域
window.loadPersonalInfo = loadPersonalInfo;
window.uploadAvatar = uploadAvatar;
window.savePersonalInfo = savePersonalInfo;
window.refreshPersonalInfo = refreshPersonalInfo;
window.resetPassword = resetPassword;
window.bindMobile = bindMobile; 