//const axios = lib.axios
import axios from 'axios'
import store from 'app-x/redux/store'
import { notification } from 'antd'

// compute base path from namespace and app_name
function _get_base_path(namespace, app_name) {
  if (!globalThis.appx.API_MAPS) {
    throw new Error(`ERROR: appx.API_MAPS not set`)
  }

  if (typeof namespace != 'string') {
    throw new Error(`ERROR: namespace is not string [${typeof namespace}]`)
  }

  if (typeof app_name != 'string') {
    throw new Error(`ERROR: app_name is not string [${typeof app_name}]`)
  }

  if (! (namespace in globalThis.appx.API_MAPS)) {
    throw new Error(`ERROR: appx.API_MAPS missing [${namespace}]`)
  }

  if (! (app_name in globalThis.appx.API_MAPS[namespace])) {
    throw new Error(`ERROR: appx.API_MAPS[${namespace}] missing [${app_name}]`)
  }

  if (! ('rootPath' in globalThis.appx.API_MAPS[namespace][app_name])) {
    throw new Error(`ERROR: rootPath missing in appx.API_MAPS[${namespace}][${app_name}]`)
  }

  let basePath = globalThis.appx.API_MAPS[namespace][app_name]['rootPath']

  // deployment is optional
  if ('deployment' in globalThis.appx.API_MAPS[namespace][app_name]) {
    const deployment = globalThis.appx.API_MAPS[namespace][app_name]['deployment']
    if (!deployment.namespace || !deployment.app_name || !deployment.app_deployment) {
      throw new Error(`ERROR: deployment syntax incorrect ${JSON.stringify(deployment)}`)
    }

    basePath += '/' + deployment.namespace + '/' + deployment.app_name + '/' + deployment.app_deployment
  }

  basePath = ('/' + basePath + '/').replace(/\/+/g, '/')

  return basePath
}

// compute app auth base path from namespace and app_name
function _get_app_auth_base_path(namespace, app_name) {
  // validity check
  if (!globalThis.appx.API_MAPS) {
    throw new Error(`ERROR: appx.API_MAPS not set`)
  }

  if (typeof namespace != 'string') {
    throw new Error(`ERROR: namespace is not string [${typeof namespace}]`)
  }

  if (typeof app_name != 'string') {
    throw new Error(`ERROR: app_name is not string [${typeof app_name}]`)
  }

  if (! (namespace in globalThis.appx.API_MAPS)) {
    throw new Error(`ERROR: appx.API_MAPS missing [${namespace}]`)
  }

  if (! (app_name in globalThis.appx.API_MAPS[namespace])) {
    throw new Error(`ERROR: appx.API_MAPS[${namespace}] missing [${app_name}]`)
  }

  if (! ('rootPath' in globalThis.appx.API_MAPS[namespace][app_name])) {
    throw new Error(`ERROR: rootPath missing in appx.API_MAPS[${namespace}][${app_name}]`)
  }

  let basePath = globalThis.appx.API_MAPS[namespace][app_name]['rootPath']

  // deployment is optional
  if ('deployment' in globalThis.appx.API_MAPS[namespace][app_name]) {
    const deployment = globalThis.appx.API_MAPS[namespace][app_name]['deployment']
    if (!deployment.namespace || !deployment.app_name || !deployment.app_deployment) {
      throw new Error(`ERROR: deployment syntax incorrect ${JSON.stringify(deployment)}`)
    }

    basePath += '/' + deployment.namespace + '/' + deployment.app_name
  }

  basePath = ('/' + basePath + '/').replace(/\/+/g, '/')

  return basePath
}

// compute global auth base path
function _get_global_auth_base_path(realm) {
  // validity check
  if (!globalThis.appx.API_MAPS) {
    throw new Error(`ERROR: appx.API_MAPS not set`)
  }

  if (typeof realm != 'string') {
    throw new Error(`ERROR: realm is not string [${typeof realm}]`)
  }

  if (! ('sys' in globalThis.appx.API_MAPS) || ! ('auth' in globalThis.appx.API_MAPS['sys'])) {
    throw new Error(`ERROR: appx.API_MAPS missing [sys][auth]`)
  }

  if (! ('rootPath' in globalThis.appx.API_MAPS['sys']['auth'])) {
    throw new Error(`ERROR: rootPath missing in appx.API_MAPS[sys][auth]`)
  }

  let basePath = globalThis.appx.API_MAPS['sys']['auth']['rootPath']

  basePath = ('/' + basePath + '/').replace(/\/+/g, '/')

  return basePath
}

// get user token from redux store by realm
function _get_token_by_realm(realm) {
  let user_state = store.getState().userReducer
  let token = null
  let username = null
  if (realm in user_state && 'username' in user_state[realm] && 'token' in user_state[realm]) {
    username = user_state[realm].username
    token = user_state[realm].token
  }
  //console.log(username, token)
  return {
    realm: realm,
    username: username,
    token: token,
  }
}

// get user token from redux store by namespace and app_name
function _get_token_by_app(namespace, app_name, callback, handler) {
  // roleReducer
  let role_state = store.getState().roleReducer
  let realm = null
  let username = null
  let token = null
  if (namespace in role_state
      && app_name in role_state[namespace]
      && 'realm' in role_state[namespace][app_name]
      && 'username' in role_state[namespace][app_name]) {
    realm = role_state[namespace][app_name].realm
    username = role_state[namespace][app_name].username
  }
  if (realm != null) {
    // userReducer
    let user_state = store.getState().userReducer
    if (realm in user_state
        && 'token' in user_state[realm]
        && 'username' in user_state[realm]) {
      token = user_state[realm].token
      username = user_state[realm].username
      if (callback) {
        callback({
          realm: realm,
          username: username,
          token: token
        })
      }
    } else {
      if (handler) {
        handler(`ERROR: unable to find token for realm [${realm}]`)
      }
    }
  } else {
    lookupRealm(
      namespace,
      app_name,
      data => {
        realm = data.realm
        let user_state = store.getState().userReducer
        if (realm in user_state
            && 'token' in user_state[realm]
            && 'username' in user_state[realm]) {
          token = user_state[realm].token
          username = user_state[realm].username
          if (callback) {
            callback({
              realm: realm,
              username: username,
              token: token
            })
          }
        } else {
          if (handler) {
            handler(`ERROR: unable to find token for realm [${realm}]`)
          }
        }
      },
      err => {
        if (handler) {
          handler(err)
        }
      }
    )
  }
  //console.log(username, token)
  return {
    realm: realm,
    username: username,
    token: token,
  }
}

// clear token information at local storage, and broadcast redux message
function _handle_logout(realm) {

  // get base path
  const basePath = _get_global_auth_base_path(realm)

  // save username and token as null
  globalThis.localStorage.removeItem(`/app-x/realm/${realm}`)
  // broadcast logout message
  store.dispatch({
    type: 'user/logout',
    realm: realm,
  })
}

// login for app_name context
const login = (realm, username, password, callback, handler) => {
  // get base path
  const basePath = _get_global_auth_base_path(realm)
  //console.log(`INFO: api/login - ${realm} ${username} ${password}`)
  axios
    .post(
      basePath + 'login',
      {
        realm: realm,
        username: username,
        password: password
      })
    .then((res) => {
      if ('data' in res && 'status' in res.data && 'token' in res.data) {
        // login successful, let's record the realm and token
        let ret_token = res.data.token
        // save username and token
        globalThis.localStorage.setItem(`/app-x/realm/${realm}`,
            JSON.stringify({
                realm: realm,
                username: username,
                token: ret_token
            })
        )
        // broadcast login message
        store.dispatch({
          type: 'user/login',
          realm: realm,
          username: username,
          token: ret_token,
        })
        if (callback) {
          callback(res.data)
        }
      } else {
        let ret = {
          status: 'error',
          message: `ERROR: missing status or token in response`,
          data: res
        }
        if (handler) {
          handler(ret)
        } else {
          console.log(ret)
        }
      }
    })
    .catch((err) => {
      console.log(err.stack)
      if (err.response && 'status' in err.response && err.response.status === 401) {
        _handle_logout(realm)
      }
      let res = {
        status: 'error',
        message: err.toString(),
        data: err.response,
      }
      if ('response' in err && 'data' in err.response) {
        res = { ...res, ...err.response.data }
      }
      if (handler) {
        handler(res)
      }
    })
}

// logout for app_name context
const logout = (realm, callback, handler) => {
  // get base path
  const basePath = _get_global_auth_base_path(realm)
  //console.log(`INFO: api/logout - ${realm} ${username}`)
  let { username, token } = _get_token_by_realm(realm)
  return axios
    .post(
      basePath + 'logout',
      {
        realm: realm,
        username: username,
      },
      {
        headers: {
          'Authorization': `AppX ${token}`
        }
      }
    )
    .then((res) => {
      if ('data' in res && 'status' in res.data) {
        _handle_logout(realm)
        if (callback) {
          callback(res.data)
        }
      } else {
        let ret = {
          status: 'error',
          message: `ERROR: missing status in response`,
          data: res
        }
        if (handler) {
          handler(ret)
        } else {
          console.log(ret)
        }
      }
    })
    .catch((err) => {
      console.log(err.stack)
      if ('status' in err.response && err.response.status === 401) {
        _handle_logout(realm)
      }
      let res = {
        status: 'error',
        message: err.toString(),
        data: err.response,
      }
      if ('response' in err && 'data' in err.response) {
        res = { ...res, ...err.response.data }
      }
      if (handler) {
        handler(res)
      }
    })
}

// lookup realm
const lookupRealm = (namespace, app_name, callback, handler) => {
  // get base path
  const basePath = _get_app_auth_base_path(namespace, app_name)
  return axios
    .get(
      basePath + 'realm'
    )
    .then((res) => {
      if ('data' in res && 'status' in res.data && 'realm' in res.data) {
        if (callback) {
          callback(res.data)
        }
      } else {
        let ret = {
          status: 'error',
          message: `ERROR: missing status or realm in response`,
          data: res
        }
        if (handler) {
          handler(ret)
        } else {
          console.log(ret)
        }
      }
    })
    .catch((err) => {
      console.log(err.stack)
      let res = {
        status: 'error',
        message: err.toString(),
        data: err.response,
      }
      if ('response' in err && 'data' in err.response) {
        res = { ...res, ...err.response.data }
      }
      if (handler) {
        handler(res)
      }
    })
}

// get self information
const me = (namespace, app_name, callback, handler) => {
  lookupRealm(
    namespace,
    app_name,
    data => {
      //console.log(data)
      const realm = data.realm
      // get base path
      const basePath = _get_app_auth_base_path(namespace, app_name)
      //console.log(`INFO: api/logout - ${realm} ${username}`)
      const { username, token } = _get_token_by_realm(realm)
      return axios
        .post(
          basePath + 'me',
          {
            username: username,
          },
          {
            headers: {
              'Authorization': `AppX ${token}`
            }
          }
        )
        .then((res) => {
          if ('data' in res && 'status' in res.data && 'user' in res.data) {
            // save username and token
            globalThis.localStorage.setItem(`/app-x/role/${namespace}/${app_name}`,
                JSON.stringify({
                    namespace: namespace,
                    app_name: app_name,
                    realm: realm,
                    username: username,
                    data: res.data.user,
                })
            )
            // broadcast login message
            store.dispatch({
              type: 'role/info',
              namespace: namespace,
              app_name: app_name,
              realm: realm,
              username: username,
              data: res.data.user,
            })
            if (callback) {
              callback(res.data)
            }
          } else {
            let ret = {
              status: 'error',
              message: `ERROR: missing status or user info in response`,
              data: res
            }
            if (handler) {
              handler(ret)
            } else {
              console.log(ret)
            }
          }
        })
        .catch((err) => {
          console.log(err.stack)
          if (err.response && 'status' in err.response && err.response.status === 401) {
            _handle_logout(realm)
          }
          let res = {
            status: 'error',
            message: err.toString(),
            data: err.response,
          }
          if ('response' in err && 'data' in err.response) {
            res = { ...res, ...err.response.data }
          }
          if (handler) {
            handler(res)
          }
        })
    },
    err => {
      console.log(err.stack)
      let res = {
        status: 'error',
        message: err.toString(),
        data: err.response,
      }
      if ('response' in err && 'data' in err.response) {
        res = { ...res, ...err.response.data }
      }
      if (handler) {
        handler(res)
      }
    }
  )
}

// request for app_name context
const request = (namespace, app_name, conf, callback, handler) => {
  // get base path
  const basePath = _get_base_path(namespace, app_name)
  _get_token_by_app(
    namespace,
    app_name,
    data => {
      //console.log(data)
      const realm = data.realm
      const username = data.username
      const token = data.token
      // handle request
      let req = { ...conf }
      if ('url' in conf) {
        req.url = `${basePath}/${conf.url}`.replace(/\/+/g, '/')
      }
      if ('headers' in conf) {
        req.headers = {
          ...conf.headers,
          'Authorization': `AppX ${token}`
        }
      } else {
        req.headers = {
          'Authorization': `AppX ${token}`
        }
      }
      return axios
        .request(req)
        .then((res) => {
          if ('data' in res) {
            if ('status' in res.data) {
              if (res.data.status === 'ok') {
                callback(res.data)
              } else {
                notification['info']({
                  message: 'INFO',
                  description: String(res.data.message),
                  placement: 'bottomLeft',
                })
                if (!!handler) {
                  handler(res.data)
                }
              }
            } else {
              if (!!callback) {
                callback(res.data)
              }
            }
          } else {
            notification['error']({
              message: 'ERROR',
              description: `ERROR: empty response data`,
              placement: 'bottomLeft',
            })
            if (!!handler) {
              handler({
                status: `error`,
                message: `ERROR: empty response data`,
                data: res
              })
            }
          }
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            _handle_logout(realm)
          } else if (err?.response?.status >= 400) {
            notification['error']({
              message: 'ERROR',
              description: String(err),
              placement: 'bottomLeft',
            })
          }
          let res = {
            status: 'error',
            message: err.toString(),
            data: err.response,
          }
          if ('response' in err && 'data' in err.response) {
            res = { ...res, ...err.response.data }
          }
          if (!!handler) {
            handler(res)
          }
        })
    },
    err => {
      console.log(err.stack)
      notification['error']({
        message: 'ERROR',
        description: String(err),
        placement: 'bottomLeft',
      })
    }
  )
}

const get = (namespace, app_name, url, callback, handler) => {
  return request(
    namespace,
    app_name,
    {
      method: 'get',
      url: url,
    },
    callback,
    handler
  )
}

const head = (namespace, app_name, url, callback, handler) => {
  return request(
    namespace,
    app_name,
    {
      method: 'head',
      url: url,
    },
    callback,
    handler
  )
}

const post = (namespace, app_name, url, data, callback, handler) => {
  return request(
    namespace,
    app_name,
    {
      method: 'post',
      url: url,
      data: data,
    },
    callback,
    handler
  )
}

const put = (namespace, app_name, url, data, callback, handler) => {
  return request(
    namespace,
    app_name,
    {
      method: 'put',
      url: url,
      data: data,
    },
    callback,
    handler
  )
}

const patch = (namespace, app_name, url, data, callback, handler) => {
  return request(
    namespace,
    app_name,
    {
      method: 'patch',
      url: url,
      data: data,
    },
    callback,
    handler
  )
}

const del = (namespace, app_name, url, callback, handler) => {
  return request(
    namespace,
    app_name,
    {
      method: 'delete',
      url: url,
    },
    callback,
    handler
  )
}

export {
  login,
  logout,
  lookupRealm,
  me,
  get,
  head,
  post,
  put,
  patch,
  del,
  request,
}
