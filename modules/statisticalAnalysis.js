// 统计分析模块
function loadStatisticalAnalysisModule(container) {
    let contentHTML = `<div class="content-title">统计分析</div>
        <div class="card">
            <div class="card-title">统计分析</div>
            
            <div style="display: flex; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <div class="form-group">
                        <div class="form-label">统计周期</div>
                        <select class="form-input">
                            <option value="1">2023年度</option>
                            <option value="2">2022年度</option>
                            <option value="3">2021年度</option>
                        </select>
                    </div>
                </div>
                <div style="flex: 1; margin-left: 20px;">
                    <div class="form-group">
                        <div class="form-label">统计单位</div>
                        <select class="form-input">
                            <option value="1">全部单位</option>
                            <option value="2">第一学习小组</option>
                            <option value="3">第二学习小组</option>
                        </select>
                    </div>
                </div>
                <div style="flex: 1; margin-left: 20px;">
                    <div class="form-group">
                        <div class="form-label">成果类型</div>
                        <select class="form-input">
                            <option value="1">全部类型</option>
                            <option value="2">考试成果</option>
                            <option value="3">培训成果</option>
                            <option value="4">研究成果</option>
                            <option value="5">训练成果</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-end; margin-left: 20px;">
                    <div class="button">查询</div>
                </div>
            </div>
            
            <div class="dashboard">
                <div class="dashboard-card">
                    <div class="dashboard-card-title">总成果数</div>
                    <div class="dashboard-card-value">254</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">总分值</div>
                    <div class="dashboard-card-value">1625.5</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">平均每人成果数</div>
                    <div class="dashboard-card-value">6.05</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-card-title">平均每人分值</div>
                    <div class="dashboard-card-value">38.7</div>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <div style="font-weight: bold; margin-bottom: 10px;">成果类型统计</div>
                <div style="display: flex; margin-top: 20px;">
                    <div style="flex: 1; padding: 15px;">
                        <div style="width: 100%; height: 200px; background-color: #f0f2f5; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                            <div style="width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(#1890ff 0% 35%, #13c2c2 35% 55%, #52c41a 55% 75%, #faad14 75% 100%); position: relative;">
                                <div style="position: absolute; width: 100px; height: 100px; background-color: white; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
                            </div>
                            <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 10px;">
                                <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #1890ff; margin-right: 5px;"></span>考试成果 (35%)</span>
                                <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #13c2c2; margin-right: 5px;"></span>培训成果 (20%)</span>
                                <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #52c41a; margin-right: 5px;"></span>研究成果 (20%)</span>
                                <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #faad14; margin-right: 5px;"></span>训练成果 (25%)</span>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; padding: 15px;">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>成果类型</th>
                                    <th>数量</th>
                                    <th>占比</th>
                                    <th>平均分值</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>考试成果</td>
                                    <td>89</td>
                                    <td>35%</td>
                                    <td>5.2</td>
                                </tr>
                                <tr>
                                    <td>培训成果</td>
                                    <td>51</td>
                                    <td>20%</td>
                                    <td>8.3</td>
                                </tr>
                                <tr>
                                    <td>研究成果</td>
                                    <td>51</td>
                                    <td>20%</td>
                                    <td>9.5</td>
                                </tr>
                                <tr>
                                    <td>训练成果</td>
                                    <td>63</td>
                                    <td>25%</td>
                                    <td>7.8</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <div style="font-weight: bold; margin-bottom: 10px;">单位成果统计</div>
                <div style="display: flex; margin-top: 20px;">
                    <div style="flex: 1; padding: 15px;">
                        <div style="width: 100%; height: 200px; background-color: #f0f2f5; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                            <!-- 柱状图占位 -->
                            <div style="width: 90%; height: 80%; display: flex; align-items: flex-end; justify-content: space-between;">
                                <div style="display: flex; flex-direction: column; align-items: center; width: 40px;">
                                    <div style="width: 30px; background-color: #1890ff; height: 120px;"></div>
                                    <div style="margin-top: 10px; font-size: 12px;">第一学习小组</div>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; width: 40px;">
                                    <div style="width: 30px; background-color: #1890ff; height: 100px;"></div>
                                    <div style="margin-top: 10px; font-size: 12px;">第二学习小组</div>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; width: 40px;">
                                    <div style="width: 30px; background-color: #1890ff; height: 80px;"></div>
                                    <div style="margin-top: 10px; font-size: 12px;">第三学习小组</div>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; width: 40px;">
                                    <div style="width: 30px; background-color: #1890ff; height: 60px;"></div>
                                    <div style="margin-top: 10px; font-size: 12px;">第四学习小组</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; padding: 15px;">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>单位名称</th>
                                    <th>人数</th>
                                    <th>成果总数</th>
                                    <th>人均成果数</th>
                                    <th>人均分值</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>第一学习小组</td>
                                    <td>12</td>
                                    <td>78</td>
                                    <td>6.5</td>
                                    <td>42.3</td>
                                </tr>
                                <tr>
                                    <td>第二学习小组</td>
                                    <td>10</td>
                                    <td>65</td>
                                    <td>6.5</td>
                                    <td>39.8</td>
                                </tr>
                                <tr>
                                    <td>第三学习小组</td>
                                    <td>10</td>
                                    <td>58</td>
                                    <td>5.8</td>
                                    <td>36.4</td>
                                </tr>
                                <tr>
                                    <td>第四学习小组</td>
                                    <td>10</td>
                                    <td>53</td>
                                    <td>5.3</td>
                                    <td>35.2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <div class="button">导出统计报告</div>
                <div class="button">打印</div>
            </div>
        </div>`;
    
    container.innerHTML = contentHTML;
}

// 显示统计详情
function showStatisticsDetail(type) {
    let title, content;
    
    if (type === 'type') {
        title = '成果类型详细统计';
        content = `
            <div style="margin-bottom: 20px;">
                <div style="font-weight: bold; margin-bottom: 10px;">月度趋势分析</div>
                <div style="width: 100%; height: 300px; background-color: #f0f2f5; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                    <!-- 折线图占位 -->
                    <div style="color: #999;">此处将显示月度趋势折线图</div>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="font-weight: bold; margin-bottom: 10px;">成果明细</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>成果名称</th>
                            <th>提交人</th>
                            <th>单位</th>
                            <th>获得时间</th>
                            <th>分值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>军事理论考试优秀</td>
                            <td>张三</td>
                            <td>第一学习小组</td>
                            <td>2023-03-15</td>
                            <td>15.0</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>军事理论考试优秀</td>
                            <td>李四</td>
                            <td>第一学习小组</td>
                            <td>2023-03-15</td>
                            <td>15.0</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>军事理论考试良好</td>
                            <td>王五</td>
                            <td>第二学习小组</td>
                            <td>2023-03-15</td>
                            <td>10.0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    } else {
        title = '单位成果详细统计';
        content = `
            <div style="margin-bottom: 20px;">
                <div style="font-weight: bold; margin-bottom: 10px;">第一学习小组</div>
                <div style="display: flex;">
                    <div style="flex: 1; margin-right: 20px;">
                        <div style="width: 100%; height: 200px; background-color: #f0f2f5; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                            <div style="width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(#1890ff 0% 30%, #13c2c2 30% 55%, #52c41a 55% 70%, #faad14 70% 100%); position: relative;">
                                <div style="position: absolute; width: 100px; height: 100px; background-color: white; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
                            </div>
                            <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 10px;">
                                <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #1890ff; margin-right: 5px;"></span>考试成果</span>
                                <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #13c2c2; margin-right: 5px;"></span>培训成果</span>
                                <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #52c41a; margin-right: 5px;"></span>研究成果</span>
                                <span><span style="display: inline-block; width: 10px; height: 10px; background-color: #faad14; margin-right: 5px;"></span>训练成果</span>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>成果类型</th>
                                    <th>数量</th>
                                    <th>占比</th>
                                    <th>平均分值</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>考试成果</td>
                                    <td>23</td>
                                    <td>30%</td>
                                    <td>5.6</td>
                                </tr>
                                <tr>
                                    <td>培训成果</td>
                                    <td>20</td>
                                    <td>25%</td>
                                    <td>8.5</td>
                                </tr>
                                <tr>
                                    <td>研究成果</td>
                                    <td>12</td>
                                    <td>15%</td>
                                    <td>9.8</td>
                                </tr>
                                <tr>
                                    <td>训练成果</td>
                                    <td>23</td>
                                    <td>30%</td>
                                    <td>7.2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="font-weight: bold; margin-bottom: 10px;">人员统计</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>姓名</th>
                            <th>成果总数</th>
                            <th>总分值</th>
                            <th>平均分值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>张三</td>
                            <td>8</td>
                            <td>87.5</td>
                            <td>10.9</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>李四</td>
                            <td>6</td>
                            <td>68.0</td>
                            <td>11.3</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>王五</td>
                            <td>5</td>
                            <td>76.5</td>
                            <td>15.3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    
    const modalHTML = `<div id="statistics-detail-modal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000; overflow-y: auto;">
        <div style="position: relative; width: 80%; max-width: 900px; margin: 50px auto; background-color: #fff; padding: 20px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #e8e8e8;">
                ${title}
                <span style="position: absolute; right: 20px; top: 20px; cursor: pointer;" onclick="document.getElementById('statistics-detail-modal').remove()">×</span>
            </div>
            
            ${content}
            
            <div class="button-group">
                <div class="button" onclick="document.getElementById('statistics-detail-modal').remove()">关闭</div>
                <div class="button">导出</div>
                <div class="button">打印</div>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
} 