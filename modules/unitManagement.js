// 成果录入模块
function loadAchievementEntryModule(container) {
    let contentHTML = `<div class="content-title">成果录入</div>
        <div class="card">
            <div class="card-title">成果录入</div>
            <div class="button-group">
                <div class="button" onclick="showEntryForm('single')">录入</div>
                <div class="button" onclick="showEntryForm('import')">导入</div>
            </div>
            
            <div id="entry-form" style="display: none; margin-top: 20px;">
                <div class="card" style="background-color: #fff;">
                    <div class="card-title" id="entry-form-title">成果录入</div>
                    
                    <div class="form-group">
                        <div class="form-label">成果名录</div>
                        <select class="form-input" id="entry-catalog">
                            <option value="">请选择成果名录</option>
                            <option value="1">军事理论培训</option>
                            <option value="2">军事技能培训</option>
                            <option value="3">指挥能力训练</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <div class="form-label">成果名称</div>
                        <input type="text" class="form-input" placeholder="请输入成果名称">
                    </div>
                    
                    <div class="form-group">
                        <div class="form-label">活动时间</div>
                        <input type="date" class="form-input">
                    </div>
                    
                    <div class="form-group">
                        <div class="form-label">佐证材料</div>
                        <input type="file" class="form-input" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
                        <div style="margin-top: 5px; font-size: 12px; color: #999;">支持Word文档、JPG图片、PNG图片、PDF格式</div>
                    </div>
                    
                    <div id="import-form" style="display: none;">
                        <div class="form-group">
                            <div class="form-label">Excel导入</div>
                            <input type="file" class="form-input" accept=".xlsx,.xls">
                            <div style="margin-top: 5px; font-size: 12px; color: #999;">请使用标准模板进行导入，<a href="#">下载模板</a></div>
                        </div>
                    </div>
                    
                    <div class="button-group">
                        <div class="button" onclick="alert('已关联学习者')">关联学习者</div>
                        <div class="button" onclick="alert('保存成功！')">暂存</div>
                        <div class="button" onclick="alert('提交成功，自动完成初审！')">提交</div>
                        <div class="button" style="background-color: #999;" onclick="document.getElementById('entry-form').style.display='none'">取消</div>
                    </div>
                </div>
            </div>
            
            <div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部状态</option>
                        <option value="1">暂存</option>
                        <option value="2">待认定</option>
                        <option value="3">认定未通过</option>
                        <option value="4">已认定</option>
                    </select>
                    <input type="text" class="form-input" placeholder="搜索成果名称" style="width: 200px;">
                    <div class="button" style="margin-top: 0;">查询</div>
                </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox"></th>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>成果类型</th>
                        <th>活动时间</th>
                        <th>参与人数</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>军事理论培训</td>
                        <td>集体培训</td>
                        <td>2023-03-15</td>
                        <td>42</td>
                        <td>暂存</td>
                        <td>
                            <a href="#">编辑</a> |
                            <a href="#">删除</a> |
                            <a href="#">关联学习者</a> |
                            <a href="#">提交</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>军事技能培训</td>
                        <td>集体培训</td>
                        <td>2023-04-10</td>
                        <td>38</td>
                        <td>待认定</td>
                        <td>
                            <a href="#">查看</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>指挥能力训练</td>
                        <td>集体训练</td>
                        <td>2023-03-28</td>
                        <td>15</td>
                        <td>已认定</td>
                        <td>
                            <a href="#">查看</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="button-group">
                <div class="button">批量提交</div>
                <div class="button">导出</div>
            </div>
        </div>`;
    
    container.innerHTML = contentHTML;
}

// 关联学习者弹窗
function showAssociateLearners() {
    const modal = document.getElementById('associate-learners-modal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        const modalHTML = `<div id="associate-learners-modal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000;">
            <div style="position: relative; width: 600px; margin: 100px auto; background-color: #fff; padding: 20px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #e8e8e8;">
                    关联学习者
                    <span style="position: absolute; right: 20px; top: 20px; cursor: pointer;" onclick="document.getElementById('associate-learners-modal').style.display='none'">×</span>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <div class="button" style="margin-right: 10px;">选择学习者</div>
                    <div class="button">导入学习者</div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <input type="text" class="form-input" placeholder="搜索学习者姓名或用户名" style="width: 200px;">
                    <div class="button" style="margin-top: 0;">查询</div>
                </div>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width: 40px;"><input type="checkbox"></th>
                            <th>序号</th>
                            <th>姓名</th>
                            <th>用户名</th>
                            <th>学习小组</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>1</td>
                            <td>张三</td>
                            <td>zhangsan</td>
                            <td>第一学习小组</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>2</td>
                            <td>李四</td>
                            <td>lisi</td>
                            <td>第一学习小组</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>3</td>
                            <td>王五</td>
                            <td>wangwu</td>
                            <td>第二学习小组</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="button-group" style="margin-top: 20px; text-align: right;">
                    <div class="button" onclick="alert('关联成功'); document.getElementById('associate-learners-modal').style.display='none'">确定</div>
                    <div class="button" style="background-color: #999;" onclick="document.getElementById('associate-learners-modal').style.display='none'">取消</div>
                </div>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// 成果初审模块
function loadAchievementReviewModule(container) {
    let contentHTML = `<div class="content-title">成果初审</div>
        <div class="card">
            <div class="card-title">成果初审</div>
            
            <div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部来源</option>
                        <option value="1">个人提报</option>
                        <option value="2">单位提报</option>
                    </select>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部类型</option>
                        <option value="1">考试成果</option>
                        <option value="2">培训成果</option>
                        <option value="3">研究成果</option>
                        <option value="4">训练成果</option>
                    </select>
                    <input type="text" class="form-input" placeholder="搜索成果名称或提交人" style="width: 200px; margin-right: 10px;">
                    <div class="button" style="margin-top: 0;">查询</div>
                </div>
                <div>
                    <div class="button" onclick="showReviewStatistics()">统计</div>
                    <div class="button">导出</div>
                </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox"></th>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>提交人</th>
                        <th>成果类型</th>
                        <th>提交时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>军事理论考试优秀</td>
                        <td>李四</td>
                        <td>考试成果</td>
                        <td>2023-03-15</td>
                        <td>待初审</td>
                        <td>
                            <a href="#" onclick="showAchievementDetail('review')">查看</a> |
                            <a href="#" onclick="reviewAchievement('pass')">通过</a> |
                            <a href="#" onclick="reviewAchievement('reject')">不通过</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>军事研究论文</td>
                        <td>王五</td>
                        <td>研究成果</td>
                        <td>2023-03-18</td>
                        <td>待初审</td>
                        <td>
                            <a href="#" onclick="showAchievementDetail('review')">查看</a> |
                            <a href="#" onclick="reviewAchievement('pass')">通过</a> |
                            <a href="#" onclick="reviewAchievement('reject')">不通过</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>指挥能力训练</td>
                        <td>赵六</td>
                        <td>训练成果</td>
                        <td>2023-03-20</td>
                        <td>待初审</td>
                        <td>
                            <a href="#" onclick="showAchievementDetail('review')">查看</a> |
                            <a href="#" onclick="reviewAchievement('pass')">通过</a> |
                            <a href="#" onclick="reviewAchievement('reject')">不通过</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    
    container.innerHTML = contentHTML;
}

// 成果认定模块
function loadAchievementConfirmationModule(container) {
    let contentHTML = `<div class="content-title">成果认定</div>
        <div class="card">
            <div class="card-title">成果认定</div>
            
            <div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部来源</option>
                        <option value="1">个人提报</option>
                        <option value="2">单位提报</option>
                    </select>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部类型</option>
                        <option value="1">考试成果</option>
                        <option value="2">培训成果</option>
                        <option value="3">研究成果</option>
                        <option value="4">训练成果</option>
                    </select>
                    <input type="text" class="form-input" placeholder="搜索成果名称或提交人" style="width: 200px; margin-right: 10px;">
                    <div class="button" style="margin-top: 0;">查询</div>
                </div>
                <div>
                    <div class="button" onclick="showConfirmationStatistics()">统计</div>
                    <div class="button">导出</div>
                </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox"></th>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>提交人</th>
                        <th>成果类型</th>
                        <th>初审时间</th>
                        <th>初审人</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>军事理论考试优秀</td>
                        <td>李四</td>
                        <td>考试成果</td>
                        <td>2023-03-16</td>
                        <td>王组长</td>
                        <td>待认定</td>
                        <td>
                            <a href="#" onclick="showAchievementDetail('confirm')">查看</a> |
                            <a href="#" onclick="confirmAchievement('pass')">通过</a> |
                            <a href="#" onclick="confirmAchievement('reject')">不通过</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>军事研究论文</td>
                        <td>王五</td>
                        <td>研究成果</td>
                        <td>2023-03-19</td>
                        <td>王组长</td>
                        <td>待认定</td>
                        <td>
                            <a href="#" onclick="showAchievementDetail('confirm')">查看</a> |
                            <a href="#" onclick="confirmAchievement('pass')">通过</a> |
                            <a href="#" onclick="confirmAchievement('reject')">不通过</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>军事技能培训</td>
                        <td>单位提报</td>
                        <td>培训成果</td>
                        <td>2023-03-20</td>
                        <td>自动初审</td>
                        <td>待认定</td>
                        <td>
                            <a href="#" onclick="showAchievementDetail('confirm')">查看</a> |
                            <a href="#" onclick="confirmAchievement('pass')">通过</a> |
                            <a href="#" onclick="confirmAchievement('reject')">不通过</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    
    container.innerHTML = contentHTML;
} 