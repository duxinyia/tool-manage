<template>
	<div class="table-demo-container layout-padding">
		<div class="table-demo-padding layout-padding-view layout-padding-auto">
			<TableSearch :search="state.tableData.search" @search="onSearch" />
			<Table
				ref="tableRef"
				v-bind="state.tableData"
				class="table-demo"
				@delRow="onTableDelRow"
				@pageChange="onTablePageChange"
				@sortHeader="onSortHeader"
			/>
		</div>
	</div>
</template>

<script setup lang="ts" name="basicsPurchase">
import { defineAsyncComponent, reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const TableSearch = defineAsyncComponent(() => import('./search.vue'));
// 定义变量内容
const tableRef = ref<RefType>();
const state = reactive<TableDemoState>({
	tableData: {
		// 列表数据（必传）
		data: [],
		// 表头内容（必传，注意格式）
		header: [
			{ key: 'type', colWidth: '', title: '群组类型', type: 'text', isCheck: true },
			{ key: 'phone', colWidth: '', title: '厂区', type: 'text', isCheck: true },
			{ key: 'bu', colWidth: '', title: 'BU', type: 'text', isCheck: true },
			{ key: 'name', colWidth: '', title: '姓名', type: 'text', isCheck: true },
			{ key: 'workno', colWidth: '', title: '工号', type: 'text', isCheck: true },
			{ key: 'state', colWidth: '', title: '状态', type: 'text', isCheck: true },
			{ key: 'creat', colWidth: '', title: '创建人', type: 'text', isCheck: true },
			{ key: 'times', title: '创建时间', type: 'text', isCheck: true },
		],
		// 配置项（必传）
		config: {
			total: 0, // 列表总数
			loading: true, // loading 加载
			isBorder: false, // 是否显示表格边框
			isSerialNo: true, // 是否显示表格序号
			isSelection: true, // 是否显示表格多选
			isOperate: true, // 是否显示表格操作栏
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，注意格式）
		search: [
			{ label: '工号', prop: 'address', placeholder: '请输入工号', required: false, type: 'input' },
			{ label: '姓名', prop: 'name', placeholder: '请输入姓名', required: false, type: 'input' },
		],
		// 搜索参数（不用传，用于分页、搜索时传给后台的值，`getTableData` 中使用）
		param: {
			pageNum: 1,
			pageSize: 10,
		},
		// 打印标题
		printName: 'vueNextAdmin 表格打印演示',
	},
});

// 初始化列表数据
const getTableData = () => {
	state.tableData.config.loading = true;
	state.tableData.data = [];
	for (let i = 0; i < 20; i++) {
		state.tableData.data.push({
			id: `123456789${i + 1}`,
			type: `类型`,
			phone: `龙华${i + 1}`,
			bu: `BU`,
			name: `张三${i + 1}`,
			workno: `G16569${i + 1}`,
			state: `${i % 2 === 0 ? '是' : '否'}`,
			creat: `张三${i + 1}`,
			times: `2023-07-22 11:16:20`,
		});
	}
	// 数据总数（模拟，真实从接口取）
	state.tableData.config.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.config.loading = false;
	}, 500);
};
// 搜索点击时表单回调
const onSearch = (data: EmptyObjectType) => {
	state.tableData.param = Object.assign({}, state.tableData.param, { ...data });
	tableRef.value.pageReset();
};
// 删除当前项回调
const onTableDelRow = (row: EmptyObjectType) => {
	ElMessage.success(`删除${row.name}成功！`);
	getTableData();
};
// 分页改变时回调
const onTablePageChange = (page: TableDemoPageType) => {
	state.tableData.param.pageNum = page.pageNum;
	state.tableData.param.pageSize = page.pageSize;
	getTableData();
};
// 拖动显示列排序回调
const onSortHeader = (data: TableHeaderType[]) => {
	state.tableData.header = data;
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style scoped lang="scss">
.table-demo-container {
	.table-demo-padding {
		padding: 15px;
		.table-demo {
			flex: 1;
			overflow: hidden;
		}
	}
}
</style>
