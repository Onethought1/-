/**
 * 模块模板文件 - 适用于所有子模块
 * 
 * 每个模块文件请遵循以下规则：
 * 1. 定义所有需要的函数
 * 2. 在文件末尾将这些函数导出到全局作用域 (window对象)
 */

// 主要加载函数 - 每个模块都应该有一个主加载函数
function loadModuleName() {
    // 实现模块的主要功能
    const container = document.getElementById('main-content');
    
    // 设置标题
    document.querySelector('.header').textContent = '模块标题';
    
    // 设置内容
    container.innerHTML = `
        <!-- 模块的HTML内容 -->
        <div>模块内容</div>
    `;
}

// 其他辅助函数
function helperFunction1() {
    // 实现辅助功能1
}

function helperFunction2() {
    // 实现辅助功能2
}

// 重要：将所有函数导出到全局作用域
// 这是确保函数可以被其他模块调用的关键步骤
window.loadModuleName = loadModuleName;
window.helperFunction1 = helperFunction1;
window.helperFunction2 = helperFunction2; 