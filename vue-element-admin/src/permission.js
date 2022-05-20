import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'// 网站的标题

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist，路由白名单无需登录也可以访问

// 里面定义了一个钩子函数beforeEach，它是一个路由拦截，在进入界面前做一些限制，
// 我们可以在这里根据已存储的token获取用户的基本信息
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()// auth.js中的getToken()方法

  // 如果存在token
  if (hasToken) {
    // 且请求的为登录页
    if (to.path === '/login') {
      // if is logged in, redirect to the home page，就让用户直接跳转到首页
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939，关闭进度条
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // 如果存在用户token且请求的不是登录页，是其他页面，次数确定用户是否含有角色信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 如果登录的用户含有角色信息，拿到后，用户请求哪就跳转到哪
        next()
      } else {
        try {
          // 如果用户存在token,但没用户信息（第一次登录），就在vuex中调用getinfo获取用户信息
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles，返回可访问的路由表
          // store/modules/permission.js中的generateRoutes方法
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes，动态添加可访问路由表
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    // 登录用户没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 请求路由在白名单里
      // in the free login whitelist, go directly，
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
