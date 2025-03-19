// 成果名录管理模块
function loadDirectoryManagementModule(container) {
    let contentHTML = `<div class="content-title">成果名录管理</div>
        <div class="card">
            <div class="card-title">成果名录管理</div>
            
            <div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
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
                <div>
                    <div class="button" onclick="addAchievementDirectory()">新增成果名录</div>
                </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox"></th>
                        <th>序号</th>
                        <th>成果名称</th>
                        <th>成果类型</th>
                        <th>分值范围</th>
                        <th>创建时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>军事理论考试</td>
                        <td>考试成果</td>
                        <td>1.0-10.0</td>
                        <td>2023-02-10</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editDirectory(1)">编辑</a> |
                            <a href="#" onclick="disableDirectory(1)">禁用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>军事技能培训</td>
                        <td>培训成果</td>
                        <td>2.0-15.0</td>
                        <td>2023-02-12</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editDirectory(2)">编辑</a> |
                            <a href="#" onclick="disableDirectory(2)">禁用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>军事研究论文</td>
                        <td>研究成果</td>
                        <td>5.0-20.0</td>
                        <td>2023-02-15</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editDirectory(3)">编辑</a> |
                            <a href="#" onclick="disableDirectory(3)">禁用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>4</td>
                        <td>指挥能力训练</td>
                        <td>训练成果</td>
                        <td>3.0-12.0</td>
                        <td>2023-02-18</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editDirectory(4)">编辑</a> |
                            <a href="#" onclick="disableDirectory(4)">禁用</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="button-group">
                <div class="button">批量启用</div>
                <div class="button">批量禁用</div>
                <div class="button">导出</div>
            </div>
        </div>`;
    
    container.innerHTML = contentHTML;
}

// 模板样式管理模块
function loadTemplateManagementModule(container) {
    let contentHTML = `<div class="content-title">模板样式管理</div>
        <div class="card">
            <div class="card-title">模板样式管理</div>
            
            <div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部类型</option>
                        <option value="1">考试成果模板</option>
                        <option value="2">培训成果模板</option>
                        <option value="3">研究成果模板</option>
                        <option value="4">训练成果模板</option>
                    </select>
                    <input type="text" class="form-input" placeholder="搜索模板名称" style="width: 200px;">
                    <div class="button" style="margin-top: 0;">查询</div>
                </div>
                <div>
                    <div class="button" onclick="addAchievementTemplate()">新增模板</div>
                </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox"></th>
                        <th>序号</th>
                        <th>模板名称</th>
                        <th>适用成果类型</th>
                        <th>字段数量</th>
                        <th>创建时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>军事理论考试模板</td>
                        <td>考试成果</td>
                        <td>8</td>
                        <td>2023-02-20</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="viewTemplate(1)">查看</a> |
                            <a href="#" onclick="editTemplate(1)">编辑</a> |
                            <a href="#" onclick="disableTemplate(1)">禁用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>军事技能培训模板</td>
                        <td>培训成果</td>
                        <td>10</td>
                        <td>2023-02-22</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="viewTemplate(2)">查看</a> |
                            <a href="#" onclick="editTemplate(2)">编辑</a> |
                            <a href="#" onclick="disableTemplate(2)">禁用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>军事研究论文模板</td>
                        <td>研究成果</td>
                        <td>12</td>
                        <td>2023-02-25</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="viewTemplate(3)">查看</a> |
                            <a href="#" onclick="editTemplate(3)">编辑</a> |
                            <a href="#" onclick="disableTemplate(3)">禁用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>4</td>
                        <td>指挥能力训练模板</td>
                        <td>训练成果</td>
                        <td>9</td>
                        <td>2023-02-28</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="viewTemplate(4)">查看</a> |
                            <a href="#" onclick="editTemplate(4)">编辑</a> |
                            <a href="#" onclick="disableTemplate(4)">禁用</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="button-group">
                <div class="button">批量启用</div>
                <div class="button">批量禁用</div>
                <div class="button">导出</div>
            </div>
        </div>`;
    
    container.innerHTML = contentHTML;
}

// 敏感词监控模块
function loadSensitiveWordModule(container) {
    let contentHTML = `<div class="content-title">敏感词监控</div>
        <div class="card">
            <div class="card-title">敏感词管理</div>
            
            <div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部类型</option>
                        <option value="1">政治敏感</option>
                        <option value="2">军事安全</option>
                        <option value="3">其他</option>
                    </select>
                    <input type="text" class="form-input" placeholder="搜索敏感词" style="width: 200px;">
                    <div class="button" style="margin-top: 0;">查询</div>
                </div>
                <div>
                    <div class="button" onclick="addSensitiveWord()">新增敏感词</div>
                    <div class="button" onclick="importSensitiveWords()">导入敏感词库</div>
                </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox"></th>
                        <th>序号</th>
                        <th>敏感词</th>
                        <th>类型</th>
                        <th>级别</th>
                        <th>替换词</th>
                        <th>创建时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>***</td>
                        <td>政治敏感</td>
                        <td>高</td>
                        <td>***</td>
                        <td>2023-03-05</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editSensitiveWord(1)">编辑</a> |
                            <a href="#" onclick="disableSensitiveWord(1)">禁用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>***</td>
                        <td>军事安全</td>
                        <td>高</td>
                        <td>***</td>
                        <td>2023-03-08</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editSensitiveWord(2)">编辑</a> |
                            <a href="#" onclick="disableSensitiveWord(2)">禁用</a>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>***</td>
                        <td>军事安全</td>
                        <td>中</td>
                        <td>***</td>
                        <td>2023-03-10</td>
                        <td>启用</td>
                        <td>
                            <a href="#" onclick="editSensitiveWord(3)">编辑</a> |
                            <a href="#" onclick="disableSensitiveWord(3)">禁用</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="button-group">
                <div class="button">批量启用</div>
                <div class="button">批量禁用</div>
                <div class="button">导出</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-title">敏感词监控记录</div>
            
            <div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <select class="form-input" style="width: 150px; margin-right: 10px;">
                        <option value="">全部类型</option>
                        <option value="1">政治敏感</option>
                        <option value="2">军事安全</option>
                        <option value="3">其他</option>
                    </select>
                    <input type="text" class="form-input" placeholder="搜索用户名或内容" style="width: 200px; margin-right: 10px;">
                    <input type="date" class="form-input" style="width: 150px; margin-right: 10px;">
                    <div class="button" style="margin-top: 0;">查询</div>
                </div>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>用户名</th>
                        <th>姓名</th>
                        <th>敏感词</th>
                        <th>敏感词类型</th>
                        <th>触发位置</th>
                        <th>触发时间</th>
                        <th>处理状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>zhangsan</td>
                        <td>张三</td>
                        <td>***</td>
                        <td>军事安全</td>
                        <td>成果名称</td>
                        <td>2023-05-10 15:30:20</td>
                        <td>已替换</td>
                        <td>
                            <a href="#" onclick="viewSensitiveDetail(1)">查看详情</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>lisi</td>
                        <td>李四</td>
                        <td>***</td>
                        <td>军事安全</td>
                        <td>成果内容</td>
                        <td>2023-05-11 10:15:45</td>
                        <td>已替换</td>
                        <td>
                            <a href="#" onclick="viewSensitiveDetail(2)">查看详情</a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>wangwu</td>
                        <td>王五</td>
                        <td>***</td>
                        <td>政治敏感</td>
                        <td>成果名称</td>
                        <td>2023-05-12 09:20:30</td>
                        <td>已替换</td>
                        <td>
                            <a href="#" onclick="viewSensitiveDetail(3)">查看详情</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    共 28 条记录，当前第 1/3 页
                </div>
                <div>
                    <div class="button" style="margin-right: 5px;">首页</div>
                    <div class="button" style="margin-right: 5px;">上一页</div>
                    <div class="button" style="margin-right: 5px;">下一页</div>
                    <div class="button">末页</div>
                </div>
            </div>
        </div>`;
    
    container.innerHTML = contentHTML;
} 