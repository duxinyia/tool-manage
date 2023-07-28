import request from '/@/utils/request';

export function getParentIdListApi() {
			return request({
				url: '/api/BaseData/ParentIdList',
				method: 'GET',
			
			});
}
export function getBaseDaListApi(data:Object) {
  return request({
    url: '/api/BaseData/BaseDaList',
    method: 'POST',
  	data:data
  });
}