// org need orgAdmin function name 
orgAdminListDepartGroups(orgID) {
  const url = this.server + '/api/v2.1/org/' + orgID + '/admin/address-book/groups';
  return this.req.get(url);
}
orgAdminAddDepartGroup(orgID, parentGroup, groupName, geoupOwner, groupStaff) {
  const url = this.server + '/api/v2.1/org/' + orgID + '/admin/address-book/groups';
  let form =  new FormData();
  form.append('parent_group', parentGroup);
  form.append('group_name', groupName);
  if (groupOwner) {
    form.append('group_owner', groupOwner);
  }
  if (groupStaff) {
    form.append('group_staff', groupStaff);
    return this._sendPostRequest(url, form);
  }
}
// 注意： POST 请求需要加入formdata.数据类型是JSON，那么不同参数传入的值是字符串，不能直接传入数组。如果一个变量有多个参数加入，这样可以使用for循环遍历添加（例如同时添加多个群组成员）。