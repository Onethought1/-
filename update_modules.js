/**
 * 模块更新辅助脚本
 * 用于将所有模块的函数导出到全局作用域
 * 
 * 使用方法：
 * 1. 将此脚本复制到项目根目录
 * 2. 使用浏览器打开控制台
 * 3. 复制以下代码并在控制台中执行
 */

// 模块文件列表
const moduleFiles = [
    // 个人成果管理模块
    'personalInfo.js',
    'achievementRegister.js',
    'learningArchive.js',
    'growthPortrait.js',
    
    // 单位成果管理模块
    'achievementEntry.js',
    'achievementReview.js',
    'achievementConfirmation.js',
    'certificationApplication.js',
    
    // 成果统计分析模块
    'performanceEvaluation.js',
    'statisticalAnalysis.js',
    'achievementDisplay.js',
    
    // 系统管理模块
    'accountManagement.js',
    'logManagement.js',
    'dictionaryManagement.js',
    'displayManagement.js',
    
    // 成果模板管理模块
    'directoryManagement.js',
    'templateStyleManagement.js',
    'sensitiveWordMonitor.js'
];

/**
 * 需要在每个模块文件中添加的代码模板
 * 请根据实际情况修改函数名列表
 */
function generateExportCode(moduleName) {
    // 根据模块名推断主函数名
    let mainFunction = '';
    
    if (moduleName.startsWith('achievement')) {
        mainFunction = 'load' + moduleName.charAt(0).toUpperCase() + moduleName.slice(1, -3);
    } else if (moduleName === 'personalInfo.js') {
        mainFunction = 'loadPersonalInfo';
    } else if (moduleName === 'learningArchive.js') {
        mainFunction = 'loadLearningArchive';
    } else if (moduleName === 'growthPortrait.js') {
        mainFunction = 'loadGrowthPortrait';
    } else if (moduleName === 'certificationApplication.js') {
        mainFunction = 'loadCertificationApplication';
    } else if (moduleName === 'performanceEvaluation.js') {
        mainFunction = 'loadPerformanceEvaluation';
    } else if (moduleName === 'statisticalAnalysis.js') {
        mainFunction = 'loadStatisticalAnalysis';
    } else if (moduleName === 'achievementDisplay.js') {
        mainFunction = 'loadAchievementDisplay';
    } else if (moduleName === 'accountManagement.js') {
        mainFunction = 'loadAccountManagement';
    } else if (moduleName === 'logManagement.js') {
        mainFunction = 'loadLogManagement';
    } else if (moduleName === 'dictionaryManagement.js') {
        mainFunction = 'loadDictionaryManagement';
    } else if (moduleName === 'displayManagement.js') {
        mainFunction = 'loadDisplayManagement';
    } else if (moduleName === 'directoryManagement.js') {
        mainFunction = 'loadDirectoryManagement';
    } else if (moduleName === 'templateStyleManagement.js') {
        mainFunction = 'loadTemplateStyleManagement';
    } else if (moduleName === 'sensitiveWordMonitor.js') {
        mainFunction = 'loadSensitiveWordMonitor';
    }
    
    return `
// 确保将模块中的所有函数添加到全局作用域
// 主加载函数
window.${mainFunction} = ${mainFunction};

// 注意：您还需要手动添加其他函数
// 例如：window.otherFunction = otherFunction;
`;
}

// 使用说明文档
console.log('=================================================');
console.log('模块更新辅助脚本');
console.log('=================================================');
console.log('此脚本将帮助您更新所有模块文件，添加全局函数导出代码');
console.log('请按照以下步骤操作：');
console.log('1. 对于每个模块文件，复制下面生成的代码');
console.log('2. 将代码添加到模块文件的末尾');
console.log('3. 根据需要，添加其他函数的导出代码');
console.log('=================================================\n');

// 为每个模块生成导出代码
moduleFiles.forEach(module => {
    console.log(`文件: modules/${module}`);
    console.log(`添加代码:`);
    console.log(generateExportCode(module));
    console.log('=================================================\n');
});

console.log('完成后，刷新页面，测试菜单点击功能。');
console.log('如果仍有问题，请检查控制台报错信息。'); 