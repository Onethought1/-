// 主脚本文件
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initMenu();
    initContentHandlers();
    
    // 加载默认内容 - 个人信息管理
    showContent('personal-info');
});

// 初始化菜单控制
function initMenu() {
    // 设置菜单点击事件
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const menuId = this.dataset.menu;
            if (menuId) {
                toggleSubmenu(menuId);
            }
        });
    });

    // 设置子菜单项点击事件
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.dataset.content;
            if (contentId) {
                showContent(contentId);
            }
        });
    });

    // 默认显示第一个菜单的子菜单
    const defaultMenuItem = document.querySelector('.menu-item');
    if (defaultMenuItem) {
        defaultMenuItem.classList.add('active');
        const menuId = defaultMenuItem.dataset.menu;
        const defaultSubmenu = document.getElementById(menuId + '-submenu');
        if (defaultSubmenu) {
            defaultSubmenu.classList.add('show');
            defaultSubmenu.style.display = 'block';
        }
    }
}

// 初始化内容处理函数
function initContentHandlers() {
    // 创建全局内容处理函数对象
    window.contentHandlers = {};
    
    // 注册内容处理函数
    // 个人成果管理
    window.contentHandlers['personal-info'] = function() {
        if (typeof window.loadPersonalInfo === 'function') {
            loadPersonalInfo();
        } else {
            console.error('函数 loadPersonalInfo 未定义');
        }
    };
    
    window.contentHandlers['achievement-register'] = function() {
        if (typeof window.loadAchievementRegister === 'function') {
            loadAchievementRegister();
        } else {
            console.error('函数 loadAchievementRegister 未定义');
        }
    };
    
    window.contentHandlers['learning-archive'] = function() {
        if (typeof window.loadLearningArchive === 'function') {
            loadLearningArchive();
        } else {
            console.error('函数 loadLearningArchive 未定义');
        }
    };
    
    window.contentHandlers['growth-portrait'] = function() {
        if (typeof window.loadGrowthPortrait === 'function') {
            loadGrowthPortrait();
        } else {
            console.error('函数 loadGrowthPortrait 未定义');
        }
    };
    
    // 单位成果管理
    window.contentHandlers['achievement-entry'] = function() {
        if (typeof window.loadAchievementEntry === 'function') {
            loadAchievementEntry();
        } else {
            console.error('函数 loadAchievementEntry 未定义');
        }
    };
    
    window.contentHandlers['achievement-review'] = function() {
        loadAchievementReview();
    };
    
    window.contentHandlers['achievement-confirmation'] = function() {
        loadAchievementConfirmation();
    };
    
    window.contentHandlers['certification-application'] = function() {
        loadCertificationApplication();
    };
    
    // 成果统计分析
    window.contentHandlers['performance-evaluation'] = function() {
        if (typeof window.loadPerformanceEvaluationModule === 'function') {
            loadPerformanceEvaluationModule(document.getElementById('main-content'));
        } else {
            console.error('Performance Evaluation Module not loaded');
        }
    };
    
    window.contentHandlers['statistical-analysis'] = function() {
        if (typeof window.loadStatisticsManagementModule === 'function') {
            loadStatisticsManagementModule(document.getElementById('main-content'));
        } else {
            console.error('Statistics Management Module not loaded');
        }
    };
    
    window.contentHandlers['achievement-display'] = function() {
        if (typeof window.loadAchievementDisplayModule === 'function') {
            loadAchievementDisplayModule(document.getElementById('main-content'));
        } else {
            console.error('Achievement Display Module not loaded');
        }
    };
    
    // 系统管理 - 这些函数在systemManagement.js中已定义
    window.contentHandlers['account-management'] = function() {
        showAccountManagement();
    };
    
    window.contentHandlers['log-management'] = function() {
        showLogManagement();
    };
    
    window.contentHandlers['dictionary-management'] = function() {
        showDictionaryManagement();
    };
    
    window.contentHandlers['display-management'] = function() {
        showDisplayManagement();
    };
    
    // 成果模板管理
    window.contentHandlers['directory-management'] = function() {
        loadDirectoryManagement();
    };
    
    window.contentHandlers['template-management'] = function() {
        loadTemplateStyleManagement();
    };
    
    window.contentHandlers['sensitive-word'] = function() {
        loadSensitiveWordMonitor();
    };
}

// 切换子菜单的显示和隐藏
function toggleSubmenu(id) {
    // 获取所有子菜单
    const allSubmenus = document.querySelectorAll('.submenu');
    const targetSubmenu = document.getElementById(id + '-submenu');
    
    // 隐藏所有子菜单，除了当前点击的
    allSubmenus.forEach(submenu => {
        if (submenu.id !== id + '-submenu') {
            submenu.classList.remove('show');
            submenu.style.display = 'none';
        }
    });
    
    // 切换目标子菜单的显示/隐藏
    if (targetSubmenu) {
        const wasHidden = !targetSubmenu.classList.contains('show');
        
        // 如果子菜单是隐藏的，就显示它
        if (wasHidden) {
            targetSubmenu.classList.add('show');
            targetSubmenu.style.display = 'block';
        }
        
        // 更新菜单项激活状态
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            if (item.dataset.menu === id) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // 如果子菜单被显示，默认选中第一个子菜单项
        if (wasHidden) {
            const firstSubmenuItem = targetSubmenu.querySelector('.submenu-item');
            if (firstSubmenuItem) {
                const contentId = firstSubmenuItem.dataset.content;
                if (contentId) {
                    showContent(contentId);
                }
            }
        }
    }
}

// 显示指定的内容
function showContent(contentId) {
    // 更新子菜单项的激活状态
    const allSubmenuItems = document.querySelectorAll('.submenu-item');
    allSubmenuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 激活当前内容对应的子菜单项
    const currentSubmenuItem = document.querySelector(`.submenu-item[data-content="${contentId}"]`);
    if (currentSubmenuItem) {
        currentSubmenuItem.classList.add('active');
        
        // 确保该子菜单是可见的
        const parentSubmenu = currentSubmenuItem.closest('.submenu');
        if (parentSubmenu) {
            // 获取父菜单ID
            const menuId = parentSubmenu.id.replace('-submenu', '');
            
            // 移除所有菜单项的激活状态
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // 激活当前父菜单
            const parentMenuItem = document.querySelector(`.menu-item[data-menu="${menuId}"]`);
            if (parentMenuItem) {
                parentMenuItem.classList.add('active');
            }
            
            // 隐藏其他子菜单，显示当前子菜单
            const allSubmenus = document.querySelectorAll('.submenu');
            allSubmenus.forEach(submenu => {
                if (submenu !== parentSubmenu) {
                    submenu.classList.remove('show');
                    submenu.style.display = 'none';
                } else {
                    submenu.classList.add('show');
                    submenu.style.display = 'block';
                }
            });
        }
    }
    
    // 更新标题
    updateHeader(contentId);
    
    // 清空内容区域
    const contentArea = document.getElementById('main-content');
    contentArea.innerHTML = '';
    
    // 调用对应的内容处理函数
    if (window.contentHandlers && window.contentHandlers[contentId]) {
        window.contentHandlers[contentId]();
    } else {
        contentArea.innerHTML = '<div class="content-placeholder">内容正在建设中...</div>';
    }
}

// 更新页面标题
function updateHeader(contentId) {
    const headerMap = {
        'personal-info': '个人信息管理',
        'achievement-register': '成果登记',
        'learning-archive': '学习档案',
        'growth-portrait': '成长画像',
        'achievement-entry': '成果录入',
        'achievement-review': '成果初审',
        'achievement-confirmation': '成果认定',
        'certification-application': '申报认证',
        'performance-evaluation': '绩效评估',
        'statistical-analysis': '统计分析',
        'achievement-display': '成果展示',
        'account-management': '账号权限管理',
        'log-management': '用户日志管理',
        'dictionary-management': '数据字典管理',
        'display-management': '展板样式管理',
        'directory-management': '成果名录管理',
        'template-management': '模板样式管理',
        'sensitive-word': '敏感词监控'
    };
    
    const headerElement = document.querySelector('.header');
    if (headerElement && headerMap[contentId]) {
        headerElement.textContent = headerMap[contentId];
    }
}

// 加载内容模块
function loadContentModule(id) {
    const content = document.getElementById('main-content');
    
    // 调用对应的模块函数
    switch(id) {
        case 'personal-info':
            loadPersonalInfo(content);
            break;
        case 'achievement-register':
            loadAchievementRegister(content);
            break;
        case 'learning-archive':
            loadLearningArchive(content);
            break;
        case 'growth-portrait':
            loadGrowthPortrait(content);
            break;
        case 'achievement-entry':
            loadAchievementEntry(content);
            break;
        case 'achievement-review':
            loadAchievementReview(content);
            break;
        case 'achievement-confirmation':
            loadAchievementConfirmation(content);
            break;
        case 'certification-application':
            loadCertificationApplication();
            break;
        case 'performance-evaluation':
            loadPerformanceEvaluationModule(content);
            break;
        case 'statistical-analysis':
            loadStatisticsManagementModule(content);
            break;
        case 'achievement-display':
            loadAchievementDisplayModule(content);
            break;
        case 'account-management':
            loadAccountManagementModule(content);
            break;
        case 'log-management':
            loadLogManagementModule(content);
            break;
        case 'dictionary-management':
            loadDictionaryManagementModule(content);
            break;
        case 'display-management':
            loadDisplayManagementModule(content);
            break;
        // 成果模板管理模块 - 这部分现在由子模块JS文件中的函数直接处理
        default:
            content.innerHTML = `<div class="content-title">内容未找到</div>`;
    }
}

// 成果登记相关功能
function showRegisterForm(type) {
    const form = document.getElementById('register-form');
    const title = document.getElementById('register-form-title');
    
    form.style.display = 'block';
    
    if (type === 'claim') {
        title.textContent = '认领学习成果';
    } else {
        title.textContent = '自主登记';
    }
}

// 成果录入相关功能
function showEntryForm(type) {
    const form = document.getElementById('entry-form');
    const title = document.getElementById('entry-form-title');
    const importForm = document.getElementById('import-form');
    
    form.style.display = 'block';
    
    if (type === 'import') {
        title.textContent = '批量导入';
        importForm.style.display = 'block';
    } else {
        title.textContent = '手动录入';
        importForm.style.display = 'none';
    }
}

// 将需要的函数导出到全局作用域，使HTML中的onclick属性可以找到它们
window.toggleSubmenu = toggleSubmenu;
window.showContent = showContent;
window.showRegisterForm = showRegisterForm;
window.showEntryForm = showEntryForm; 