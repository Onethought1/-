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
    // 为所有菜单项添加点击事件
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 切换子菜单的显示/隐藏
            const targetId = this.getAttribute('onclick').match(/toggleSubmenu\('(.+?)'\)/)[1];
            toggleSubmenu(targetId);
        });
    });
}

// 初始化内容处理函数
function initContentHandlers() {
    // 创建全局内容处理函数对象
    window.contentHandlers = {};
    
    // 注册内容处理函数
    // 个人成果管理
    window.contentHandlers['personal-info'] = function() {
        loadPersonalInfo();
    };
    
    window.contentHandlers['achievement-register'] = function() {
        loadAchievementRegister();
    };
    
    window.contentHandlers['learning-archive'] = function() {
        loadLearningArchive();
    };
    
    window.contentHandlers['growth-portrait'] = function() {
        loadGrowthPortrait();
    };
    
    // 单位成果管理
    window.contentHandlers['achievement-entry'] = function() {
        loadAchievementEntry();
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
        loadPerformanceEvaluation();
    };
    
    window.contentHandlers['statistical-analysis'] = function() {
        loadStatisticalAnalysis();
    };
    
    window.contentHandlers['achievement-display'] = function() {
        loadAchievementDisplay();
    };
    
    // 系统管理 - 这些函数在systemManagement.js中已定义
    window.contentHandlers['account-management'] = function() {
        loadAccountManagement();
    };
    
    window.contentHandlers['log-management'] = function() {
        loadLogManagement();
    };
    
    window.contentHandlers['dictionary-management'] = function() {
        loadDictionaryManagement();
    };
    
    window.contentHandlers['display-management'] = function() {
        loadDisplayManagement();
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

// 切换子菜单显示/隐藏
function toggleSubmenu(id) {
    // 获取所有主菜单项和子菜单
    const menuItems = document.querySelectorAll('.menu-item');
    const submenus = document.querySelectorAll('.submenu');
    
    // 获取要切换的子菜单元素
    const targetSubmenu = document.getElementById(id + '-submenu');
    
    // 判断目标子菜单是否已经激活
    const isActive = targetSubmenu.classList.contains('active');
    
    // 如果点击的是当前激活的菜单，则不做任何操作
    if (isActive) return;
    
    // 移除所有子菜单和菜单项的激活状态
    submenus.forEach(submenu => {
        submenu.classList.remove('active');
    });
    
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 为当前菜单项和子菜单添加激活状态
    const currentMenuItem = document.querySelector(`.menu-item[onclick*="${id}"]`);
    currentMenuItem.classList.add('active');
    targetSubmenu.classList.add('active');
    
    // 默认选中子菜单的第一个项目
    const firstSubmenuItem = targetSubmenu.querySelector('.submenu-item');
    if (firstSubmenuItem) {
        const contentId = firstSubmenuItem.getAttribute('onclick').match(/showContent\('(.+?)'\)/)[1];
        showContent(contentId);
    }
}

// 显示内容
function showContent(id) {
    // 移除所有子菜单项的激活状态
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 为当前子菜单项添加激活状态
    const currentSubmenuItem = document.querySelector(`.submenu-item[onclick*="${id}"]`);
    if (currentSubmenuItem) {
        currentSubmenuItem.classList.add('active');
    }
    
    // 调用对应的内容处理函数
    if (window.contentHandlers[id]) {
        window.contentHandlers[id]();
    } else {
        document.getElementById('main-content').innerHTML = `<div class="loading">加载中...</div>`;
        console.error(`未找到ID为${id}的内容处理函数`);
    }
}

// 加载内容模块
function loadContentModule(id) {
    const content = document.getElementById('main-content');
    
    // 调用对应的模块函数
    switch(id) {
        case 'personal-info':
            loadPersonalInfoModule(content);
            break;
        case 'achievement-register':
            loadAchievementRegisterModule(content);
            break;
        case 'learning-archive':
            loadLearningArchiveModule(content);
            break;
        case 'growth-portrait':
            loadGrowthPortraitModule(content);
            break;
        case 'achievement-entry':
            loadAchievementEntryModule(content);
            break;
        case 'achievement-review':
            loadAchievementReviewModule(content);
            break;
        case 'achievement-confirmation':
            loadAchievementConfirmationModule(content);
            break;
        case 'certification-application':
            // 使用新的独立模块中的函数，无需传递content参数
            loadCertificationApplication();
            break;
        case 'performance-evaluation':
            loadPerformanceEvaluationModule(content);
            break;
        case 'statistical-analysis':
            loadStatisticalAnalysisModule(content);
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