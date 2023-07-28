<template>
	<div class="table-demo-container layout-padding">
		<div class="table-demo-padding layout-padding-view layout-padding-auto">
			<TableSearch v-if="state.tableData.search[0].options.length > 0" :search="state.tableData.search" @search="onSearch" />
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

<script setup lang="ts" name="basicsBasic">
import { defineAsyncComponent, reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getParentIdListApi, getBaseDaListApi } from '/@/api/basics/basic.ts';

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/search/search.vue'));
// 定义变量内容
const tableRef = ref<RefType>();
const state = reactive<TableDemoState>({
	tableData: {
		// 列表数据（必传）
		data: [],
		// 表头内容（必传，注意格式）
		header: [
			{ key: 'dataname', colWidth: '', title: '名称', type: 'text', isCheck: true },
			{ key: 'datacode', colWidth: '', title: '代码', type: 'text', isCheck: true },
			{ key: 'type', colWidth: '', title: 'message.pages.groupType', type: 'text', isCheck: true },
			{ key: 'runstatus', colWidth: '', title: 'message.pages.state', type: 'status', isCheck: true },
			{ key: 'creator', colWidth: '', title: 'message.pages.creator', type: 'text', isCheck: true },
			{ key: 'createtime', title: 'message.pages.creationTime', type: 'text', isCheck: true },
		],
		// 配置项（必传）
		config: {
			total: 0, // 列表总数
			loading: true, // loading 加载
			isBorder: false, // 是否显示表格边框
			isSerialNo: true, // 是否显示表格序号
			isSelection: true, // 是否显示表格多选
			isOperate: true, // 是否显示表格操作栏
			isEditBtn: false,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，注意格式）
		search: [
			{ label: '父节点', prop: 'parentid', placeholder: '请输入父节点', required: false, type: 'select', options: [] },
			{ label: '名称', prop: 'dataName', placeholder: '请输入名称', required: false, type: 'input' },
			{ label: '代码', prop: 'dataCode', placeholder: '请输入代码', required: false, type: 'input' },
		],
		form: {
			parentid: '',
			dataName: '',
			dataCode: '',
		},
		// 搜索参数（不用传，用于分页、搜索时传给后台的值，`getTableData` 中使用）
		page: {
			pageNum: 1,
			pageSize: 10,
		},
		// 打印标题
		printName: '表格打印演示',
		// 弹窗表单
		dialogConfig: [{ label: '工号', prop: 'workno', placeholder: '请输入工号', required: true, type: 'input', value: '' }],
	},
});

// 初始化列表数据
const getTableData = async () => {
	state.tableData.config.loading = true;
	const form = state.tableData.form;
	let data = {
		parentid: form.parentid,
		dataName: form.dataName,
		dataCode: form.dataCode,
		page: state.tableData.page,
	};
	const res = await getBaseDaListApi(data);
	state.tableData.data = res.data;
	state.tableData.config.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.config.loading = false;
	}, 500);
};
// 下拉框数据
const getSelect = async () => {
	const res = await getParentIdListApi();
	state.tableData.search[0].options = res.pars;
};
// 搜索点击时表单回调
const onSearch = (data: EmptyObjectType) => {
	console.log(5, data);
	state.tableData.form = Object.assign({}, state.tableData.form, { ...data });
	tableRef.value.pageReset();
};
// 删除当前项回调
const onTableDelRow = (row: EmptyObjectType) => {
	ElMessage.success(`删除${row.name}成功！`);
	getTableData();
};
// 分页改变时回调
const onTablePageChange = (page: TableDemoPageType) => {
	state.tableData.page.pageNum = page.pageNum;
	state.tableData.page.pageSize = page.pageSize;
	getTableData();
};
// 拖动显示列排序回调
const onSortHeader = (data: TableHeaderType[]) => {
	state.tableData.header = data;
};
// 页面加载时
onMounted(() => {
	getSelect();
	// getTableData();
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
