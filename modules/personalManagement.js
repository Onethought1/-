// 个人信息管理模块
function loadPersonalInfoModule(container) {
    let contentHTML = `<div class="content-title">个人信息管理</div>
        <div class="card">
            <div class="card-title">个人基本信息</div>
            <div style="display: flex; margin-bottom: 20px;">
                <div style="width: 100px; height: 100px; background-color: #e8e8e8; border-radius: 50%; margin-right: 20px; overflow: hidden;">
                    <img src="#" alt="用户头像" id="user-avatar" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="flex: 1;">
                    <div class="button" style="margin-top: 0;">上传头像</div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-label">姓名</div>
                <div class="form-input">张三</div>
            </div>
            <div class="form-group">
                <div class="form-label">性别</div>
                <div class="form-input">男</div>
            </div>
            <div class="form-group">
                <div class="form-label">身份证号</div>
                <div class="form-input">****************</div>
            </div>
            <div class="form-group">
                <div class="form-label">证件号</div>
                <div class="form-input">****************</div>
            </div>
            <div class="form-group">
                <div class="form-label">用户名</div>
                <div class="form-input">zhangsan</div>
            </div>
            <div class="form-group">
                <div class="form-label">学习兴趣</div>
                <input type="text" class="form-input" value="计算机科学、军事理论、数学">
            </div>
            
            <div class="button-group">
                <div class="button" onclick="alert('保存成功')">保存修改</div>
                <div class="button" onclick="alert('正在从某分系统获取最新信息...')">刷新基本信息</div>
            </div>
        </div>`;
    
    container.innerHTML = contentHTML;
}

// 成果登记模块
function loadAchievementRegisterModule(container) {
    let contentHTML = `<div class="content-title">成果登记</div>
        <div class="card">
            <div class="card-title">成果登记</div>
            <div class="button-group">
                <div class="button" onclick="showRegisterForm('claim')">认领学习成果</div>
                <div class="button" onclick="showRegisterForm('self')">自主登记</div>
            </div>
            
            <div id="register-form" style="display: none; margin-top: 20px;">
                <div class="card" style="background-color: #fff;">
                    <div class="card-title" id="register-form-title">自主登记</div>
                    
                    <div class="form-group">
                        <div class="form-label">成果名录</div>
                        <select class="form-input">
                            <option value="">请选择成果名录</option>
                            <option value="1">军事理论考试</option>
                            <option value="2">军事技能培训</option>
                            <option value="3">指挥能力训练</option>
                            <option value="4">暂未列入名录</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <div class="form-label">成果名称</div>
                        <input type="text" class="form-input" placeholder="请输入成果名称">
                    </div>
                    
                    <div class="form-group">
                        <div class="form-label">获取时间</div>
                        <input type="date" class="form-input">
                    </div>
                    
                    <div class="form-group">
                        <div class="form-label">佐证材料</div>
                        <input type="file" class="form-input" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
                        <div style="margin-top: 5px; font-size: 12px; color: #999;">支持Word文档、JPG图片、PNG图片、PDF格式</div>
                    </div>
                    
                    <div class="button-group">
                        <div class="button" onclick="alert('保存成功！')">暂存</div>
                        <div class="button" onclick="alert('提交成功，等待初审！')">提交</div>
                        <div class="button" style="background-color: #999;" onclick="document.getElementById('register-form').style.display='none'">取消</div>
                    </div>
                </div>
            </div>
            
            <div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部来源</option>
                        <option value="1">自主登记</option>
                        <option value="2">认领</option>
                    </select>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部状态</option>
                        <option value="1">暂存</option>
                        <option value="2">待初审</option>
                        <option value="3">初审未通过</option>
                        <option value="4">待认定</option>
                        <option value="5">认定未通过</option>
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
                        <th>获取时间</th>
                        <th>来源</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>军事理论考试优秀</td>
                        <td>考试成果</td>
                        <td>2023-01-15</td>
                        <td>自主登记</td>
                        <td>暂存</td>
                        <td>
                            <a href="#">编辑</a> |
                            <a href="#">删除</a> |
                            <a href="#">提交</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>军事职业技能培训结业</td>
                        <td>培训成果</td>
                        <td>2023-02-20</td>
                        <td>认领</td>
                        <td>初审中</td>
                        <td>
                            <a href="#">查看</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>军事战略研究论文</td>
                        <td>研究成果</td>
                        <td>2023-03-05</td>
                        <td>自主登记</td>
                        <td>初审未通过</td>
                        <td>
                            <a href="#">查看</a> |
                            <a href="#">编辑</a> |
                            <a href="#">提交</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>4</td>
                        <td>指挥能力训练优秀</td>
                        <td>训练成果</td>
                        <td>2023-03-18</td>
                        <td>自主登记</td>
                        <td>待认定</td>
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

// 学习档案模块
function loadLearningArchiveModule(container) {
    let contentHTML = `<div class="content-title">学习档案</div>
        <div class="card">
            <div class="card-title">已认定学习成果</div>
            
            <div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部来源</option>
                        <option value="1">自主登记</option>
                        <option value="2">认领</option>
                    </select>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部类型</option>
                        <option value="1">考试成果</option>
                        <option value="2">培训成果</option>
                        <option value="3">研究成果</option>
                        <option value="4">训练成果</option>
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
                        <th>获取时间</th>
                        <th>认定分值</th>
                        <th>认证状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>军事理论考试优秀</td>
                        <td>考试成果</td>
                        <td>2023-01-15</td>
                        <td>5.0</td>
                        <td>未认证</td>
                        <td>
                            <a href="#">查看</a> |
                            <a href="#">收藏</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>军事职业技能培训结业</td>
                        <td>培训成果</td>
                        <td>2023-02-20</td>
                        <td>8.0</td>
                        <td>已认证</td>
                        <td>
                            <a href="#">查看</a> |
                            <a href="#">收藏</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>指挥能力训练优秀</td>
                        <td>训练成果</td>
                        <td>2023-03-18</td>
                        <td>6.5</td>
                        <td>未认证</td>
                        <td>
                            <a href="#">查看</a> |
                            <a href="#">收藏</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="button-group">
                <div class="button" onclick="alert('证明报告生成中...')">生成证明报告</div>
                <div class="button">导出</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-title">证明报告记录</div>
            <table class="table">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>报告名称</th>
                        <th>生成时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2023年第一季度学习成果证明</td>
                        <td>2023-03-31</td>
                        <td>
                            <a href="#">预览</a> |
                            <a href="#">下载</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>军事理论学习成果证明</td>
                        <td>2023-02-15</td>
                        <td>
                            <a href="#">预览</a> |
                            <a href="#">下载</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="card">
            <div class="card-title">个人绩效评估结果</div>
            <table class="table">
                <thead>
                    <tr>
                        <th>年度</th>
                        <th>评估结果</th>
                        <th>评估时间</th>
                        <th>评估人</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2023年</td>
                        <td>优秀</td>
                        <td>2023-12-25</td>
                        <td>王组长</td>
                    </tr>
                    <tr>
                        <td>2022年</td>
                        <td>良好</td>
                        <td>2022-12-26</td>
                        <td>王组长</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="card">
            <div class="card-title">未认领学习成果</div>
            <div style="margin: 10px 0;">
                <div class="button" onclick="alert('正在从总平台获取最新学习成果...')">刷新</div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>成果类型</th>
                        <th>获取时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>全军军事理论竞赛参与</td>
                        <td>竞赛成果</td>
                        <td>2023-04-15</td>
                        <td>
                            <a href="#" onclick="alert('认领成功')">认领</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>军事指挥模拟训练</td>
                        <td>训练成果</td>
                        <td>2023-04-20</td>
                        <td>
                            <a href="#" onclick="alert('认领成功')">认领</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    
    container.innerHTML = contentHTML;
}

// 成长画像模块
function loadGrowthPortraitModule(container) {
    let contentHTML = `<div class="content-title">成长画像</div>
        <div class="card">
            <div class="card-title">成长轨迹</div>
            <div class="chart-container">
                <div style="width: 100%; height: 100%; position: relative;">
                    <div style="position: absolute; left: 0; bottom: 40px; width: 100%; height: 2px; background-color: #ccc;"></div>
                    
                    <div style="position: absolute; left: 10%; bottom: 40px; width: 20px; height: 20px; background-color: #1890ff; border-radius: 50%; transform: translateX(-50%) translateY(50%);"></div>
                    <div style="position: absolute; left: 10%; bottom: 70px; transform: translateX(-50%); text-align: center; width: 120px;">2022-01<br>军事理论考试</div>
                    
                    <div style="position: absolute; left: 30%; bottom: 40px; width: 20px; height: 20px; background-color: #1890ff; border-radius: 50%; transform: translateX(-50%) translateY(50%);"></div>
                    <div style="position: absolute; left: 30%; bottom: 70px; transform: translateX(-50%); text-align: center; width: 120px;">2022-05<br>技能培训结业</div>
                    
                    <div style="position: absolute; left: 50%; bottom: 40px; width: 20px; height: 20px; background-color: #1890ff; border-radius: 50%; transform: translateX(-50%) translateY(50%);"></div>
                    <div style="position: absolute; left: 50%; bottom: 70px; transform: translateX(-50%); text-align: center; width: 120px;">2022-09<br>指挥能力认证</div>
                    
                    <div style="position: absolute; left: 70%; bottom: 40px; width: 20px; height: 20px; background-color: #1890ff; border-radius: 50%; transform: translateX(-50%) translateY(50%);"></div>
                    <div style="position: absolute; left: 70%; bottom: 70px; transform: translateX(-50%); text-align: center; width: 120px;">2023-01<br>军事研究论文</div>
                    
                    <div style="position: absolute; left: 90%; bottom: 40px; width: 20px; height: 20px; background-color: #1890ff; border-radius: 50%; transform: translateX(-50%) translateY(50%);"></div>
                    <div style="position: absolute; left: 90%; bottom: 70px; transform: translateX(-50%); text-align: center; width: 120px;">2023-04<br>技战术训练</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-title">学习统计</div>
            <div class="dashboard">
                <div class="dashboard-card">
                    <div class="dashboard-card-title">学习总时长</div>
                    <div class="dashboard-card-value">120小时</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">总成果数</div>
                    <div class="dashboard-card-value">15个</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">总认定分值</div>
                    <div class="dashboard-card-value">87.5分</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">单位排名</div>
                    <div class="dashboard-card-value">5/42</div>
                </div>
            </div>
            
            <div style="display: flex; margin-top: 20px;">
                <div style="flex: 1; padding: 15px;">
                    <div style="font-weight: bold; margin-bottom: 10px;">成果类型分布</div>
                    <div style="width: 100%; height: 200px; background-color: #f0f2f5; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                        <div style="width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(#1890ff 0% 35%, #13c2c2 35% 55%, #52c41a 55% 75%, #faad14 75% 100%); position: relative;">
                            <div style="position: absolute; width: 100px; height: 100px; background-color: white; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
                        </div>
                        <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 10px;">
                            <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #1890ff; margin-right: 5px;"></span>考试</span>
                            <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #13c2c2; margin-right: 5px;"></span>培训</span>
                            <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #52c41a; margin-right: 5px;"></span>研究</span>
                            <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #faad14; margin-right: 5px;"></span>训练</span>
                        </div>
                    </div>
                </div>
                <div style="flex: 1; padding: 15px;">
                    <div style="font-weight: bold; margin-bottom: 10px;">学习时间分布</div>
                    <div style="width: 100%; height: 200px; background-color: #f0f2f5; border-radius: 4px; display: flex; align-items: flex-end; justify-content: space-around; padding: 10px;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 30px; height: 120px; background-color: #1890ff; margin-bottom: 5px;"></div>
                            <div>一季度</div>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 30px; height: 80px; background-color: #1890ff; margin-bottom: 5px;"></div>
                            <div>二季度</div>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 30px; height: 150px; background-color: #1890ff; margin-bottom: 5px;"></div>
                            <div>三季度</div>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 30px; height: 100px; background-color: #1890ff; margin-bottom: 5px;"></div>
                            <div>四季度</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <div style="font-weight: bold; margin-bottom: 10px;">学习兴趣分析</div>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    <div style="background-color: #e6f7ff; color: #1890ff; padding: 5px 10px; border-radius: 15px; border: 1px solid #91d5ff; font-size: 16px;">军事理论</div>
                    <div style="background-color: #e6f7ff; color: #1890ff; padding: 5px 10px; border-radius: 15px; border: 1px solid #91d5ff; font-size: 14px;">战术训练</div>
                    <div style="background-color: #e6f7ff; color: #1890ff; padding: 5px 10px; border-radius: 15px; border: 1px solid #91d5ff; font-size: 18px;">指挥能力</div>
                    <div style="background-color: #e6f7ff; color: #1890ff; padding: 5px 10px; border-radius: 15px; border: 1px solid #91d5ff; font-size: 12px;">军事历史</div>
                    <div style="background-color: #e6f7ff; color: #1890ff; padding: 5px 10px; border-radius: 15px; border: 1px solid #91d5ff; font-size: 15px;">武器装备</div>
                </div>
            </div>
        </div>`;
    
    container.innerHTML = contentHTML;
} 