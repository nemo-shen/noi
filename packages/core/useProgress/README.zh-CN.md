# useProgress

进度管理工具
支持2. 计算百分比 0...100 3. 提供update方法更新进度4. 提供step能力，可以动态管理进度，但最终的finish需要明确告知5. 提供finish方法，允许开发者告知是否完成6. 提供状态isProgress开发者可以根据这个值判断boolean 7. 提供进度条描述文案 [{ value: 10, text: '111'}, { value: 20, text: '222' }] 8. 提供onChange option，当进度变化时，会将进度返回，开发者可以通过这个callback做其他额外处理
