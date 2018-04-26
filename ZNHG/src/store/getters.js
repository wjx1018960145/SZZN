const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
  userlist:state=>state.user.userlist,
  roleList:state=>state.rolepermission.roleList,
  permissionList:state=>state.rolepermission.permissionList,
  interfaceList:state=>state.tool.interfaceList,
  interfaceStr:state=>state.tool.interfaceStr,
  path:state=>state.tool.path
}
export default getters
